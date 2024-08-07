import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  access_token_secret: process.env.JWT_ACCESS_TOKEN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
}
