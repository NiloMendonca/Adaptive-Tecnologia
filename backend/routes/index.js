var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const Link = require('../models/link');
const Users = require('../models/users');
const Flags = require('../models/flags');

const login = require('../middleware/login');

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  router.use(cors());
  next();
});

async function generateCode(amountDigits, collision){
  if(amountDigits == 0){
    let flags = await Flags.findOne({where: {id: 0}});
    if(!flags){
      const id = 0;
      amountDigits = 1;
      await Flags.create({
        id,
        amountDigits
      });
    }
    else {
      amountDigits = flags.amountDigits;
    }
  }
  let code = '';
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i=0; i<amountDigits; i++){
    code += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }
  let result = await Link.findOne({where: {code: code}});
  if(!result) return code;

  if(collision > 3){
    let flags = await Flags.findOne({where: {id: 0}});
    amountDigits++;
    flags.amountDigits = amountDigits;
    await flags.save();
    return await generateCode(amountDigits, 0);
  }
  collision++;
  return await generateCode(amountDigits, collision);
};

router.post('/user', login, async function(req, res, next) {
  const result = await Users.findOne({where: {login: req.body.login}});
  if(!result) return res.sendStatus(401);

  res.send(result.login);
});

router.post('/user/create', async function(req, res, next) {
  const login = req.body.login;
  let password = req.body.password;

  if(!login || !password) return res.sendStatus(500);

  bcrypt.hash(password, 10, async function(errBcrypt, hash) {
    if(errBcrypt) return res.sendStatus(500);

    password = hash;

    try{
      await Users.create({
        login,
        password
      });
      const token = jwt.sign({
        login: login,
      }, 
      'senhaSuperSecreta',
      {
        expiresIn: "3h"
      });

      return res.status(200).send({
        token: token
      });
    }
    catch(er){
      console.log(er);
      return res.sendStatus(500);
    }
  });
});

router.post('/user/login', async function(req, res, next) {
  const login = req.body.login;
  const password = req.body.password;

  const result = await Users.findOne({where: {login: login}});
  if(!result) return res.sendStatus(401);

  bcrypt.compare(password, result.password, (err, result) => {
    if(err){
      return res.sendStatus(401);
    }
    if(result){
      const token = jwt.sign({
        login: result.login,
      }, 
      'senhaSuperSecreta',
      {
        expiresIn: "3h"
      });

      return res.status(200).send({
        token: token
      });
    }
    return res.sendStatus(401);
  })
});

router.get('/link/all', async function(req, res, next) {
  const result = await Link.findAll();
  if(!result) return res.sendStatus(404);

  res.send(result);
});

router.get('/:code', async function(req, res, next) {
  const code = req.params.code;

  const result = await Link.findOne({where: {code: code}});
  if(!result) return res.sendStatus(404);

  result.hits++;
  await result.save();

  res.send(result.url);
});

router.post('/link/create', async function(req, res, next) {
  const url = req.body.url;
  const login = req.body.login;
  const code = await generateCode(0, 0);

  const result = await Link.create({
    url,
    code,
    login
  });

  res.send(result.dataValues);
});


router.post('/link/remove', login, async function(req, res, next) {
  const id = req.body.id;
  const login = req.body.login;

  const result = await Link.findOne({where: {id: id}});
  if(!result) return res.sendStatus(404);

  if(result.login == login){
    await Link.destroy({where: {id: id}})
  }
  res.send(200);
});

module.exports = router;
