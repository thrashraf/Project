import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
 
  console.log(req.headers)
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  console.log('token:' + authHeader)

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

    console.log(err)

    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
};
 