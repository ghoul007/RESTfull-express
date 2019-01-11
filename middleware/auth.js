const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'secretJWT')
        const userId = decode.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'invalid user ID'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: new Error('invalid request')
        })
    }

}