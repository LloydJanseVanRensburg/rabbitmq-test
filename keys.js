import dotenv from "dotenv";
dotenv.config();

const KEYS = {
  RABBIT_MQ_USERNAME: process.env.RABBIT_MQ_USERNAME || "yourusername",
  RABBIT_MQ_PASSWORD: process.env.RABBIT_MQ_PASSWORD || "yourpassword",
  RABBIT_MQ_HOST: process.env.RABBIT_MQ_HOST || "localhost",
  RABBIT_MQ_PORT: process.env.RABBIT_MQ_PORT || "5672",
};

export default KEYS;
