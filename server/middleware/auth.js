//necessary imports are made

import jwt from 'jsonwebtoken';
//asynchronous request response function for backend authorisation
const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
//decoding of encrypted data takes place and json web tokens are verified 
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;