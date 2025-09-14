const envs = {
  PORT: parseInt(process.env.PORT || "3000"),
  NODE_ENV: process.env.NODE_ENV,
  URL_FRONTEND: process.env.URL_FRONTEND,
  SECRET_JWT: process.env.SECRET_JWT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT || "3330"),
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  KEYSHA256: process.env.KEYSHA256,
};

export default envs;
