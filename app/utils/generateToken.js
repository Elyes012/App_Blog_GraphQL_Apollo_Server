const jwt = require('jsonwebtoken');
const secretKey = require('../../config/key.config').SECRET_KEY;



const defaultToken = async (result) => {
    const token = jwt.sign({
        id: result.id,
        email: result.email,
        userName: result.userName
    }, secretKey, { expiresIn: '1h' });
    return token
}


module.exports = {
    'defaultToken': defaultToken
}
