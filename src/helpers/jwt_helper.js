import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

//-----------------------------------------------> generate token
const signAccessToken = (userId) => {
  const payload = { id: userId };
  const secretKey = process.env.SECRET_KEY;
  const option = {
    issuer: "localhost:3000",
    audience: userId,
  }

  try {
    const token = jwt.sign(payload, secretKey, option);
    return token;
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
}

//-----------------------------------------------> 
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next(createHttpError.Unauthorized());
  }

  try {
    const token = authHeader.split(" ").pop();
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    next(createHttpError.Unauthorized());
  }

};

export { signAccessToken, verifyAccessToken }