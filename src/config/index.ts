import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_token_expireIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
}