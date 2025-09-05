// src/infrastructure/jwtService.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'gizli_anahtar';

function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}





function authenticateToken(req, res, next) {
 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 


  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }

 
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token geçersiz veya süresi dolmuş' });
    }


    req.user = user;
    next();
  });
}


module.exports = { generateToken,authenticateToken  };
