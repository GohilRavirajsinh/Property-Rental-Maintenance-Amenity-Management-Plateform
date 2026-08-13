const jwt = require('jsonwebtoken');

// Protected Function when needed
const protect = async (req, res, next) => {
    let token;

    // check request header me Bearer Token bheja hai ya nhin
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Bearer token ko tod kar sirf token nikalna
            token = req.headers.authorization.split(' ')[1];

            // Token Verify (fake or Expired?)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // if token true than inside user(id, role) store into req.user
            req.user = decoded;

            // if this alll true than continue
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized, token failed"
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token"
        })
    }
};

module.exports = { protect }