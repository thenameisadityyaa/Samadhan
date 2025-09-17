const jwt = require('jsonwebtoken');

// Protect middleware - verifies JWT and attaches user id to req.user
async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.split(' ');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Server misconfiguration' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.sub };
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
}

module.exports = { protect };


