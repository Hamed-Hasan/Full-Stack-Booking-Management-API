import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// const createToken = (
//   payload: Record<string, unknown>,
//   secret: Secret,
//   expireTime: string
// ): string => {
//   return jwt.sign(payload, secret, {
//     expiresIn: expireTime,
//   });
// };
const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
  role: string // Add this line
): string => {
  const newPayload = { ...payload, role }; // Include the role in the payload
  return jwt.sign(newPayload, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
