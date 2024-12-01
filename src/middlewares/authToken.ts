import jwt from "jsonwebtoken";

interface Payload {
  email: string;
}

export const createAccesToken = (payload: Payload): Promise<string> => {
  const TOKEN_KEY = process.env.TOKEN_SECRET as string;
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};
