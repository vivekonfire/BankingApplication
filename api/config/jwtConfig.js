const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

exports.createToken = function(accountNumber){
  let token = jwt.sign({accountNumber},key,{expiresIn:360000})
  return token;
}

exports.validateToken = function(req,res,next){
  let token = req.header("x-auth-token");

  if(!token)
    return res.status(401).json({message:"No Token Found"});

  try {
    const decoded = jwt.verify(token, key);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({message:"Token is invalid"})
  }
}