const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	console.log(req.body);
	try{
		const token = req.headers.authorization.split(' ')[1];
		const decode = jwt.verify(token, 'senhaSuperSecreta');
		req.user = decode;
		next();
	}
	catch(error) {
		return res.sendStatus(401);
	}
	
}
