const handleError = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  };
  
  const parseBody = (req, res, next) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      req.body = JSON.parse(body);
      next();
    });
  };
  
  const requireAuth = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized access' });
    }
  };
  
  module.exports = { handleError, parseBody, requireAuth };
  