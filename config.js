import { config } from "dotenv";

config()


const PORT = Number(process.env.PORT) || 6969
const TOKEN = process.env.TOKEN.toString()
const DB_URL = process.env.DB_URL.toString()

export {PORT, TOKEN, DB_URL}