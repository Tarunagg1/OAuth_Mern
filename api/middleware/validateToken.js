const jwt = require('jsonwebtoken');


const tokenValidate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
            req.name = decodedData?.name;
            
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            req.name = decodedData?.name;
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Acess" });
    }
}


module.exports = tokenValidate;









