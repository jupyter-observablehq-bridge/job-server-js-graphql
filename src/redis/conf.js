const conf = {
  host: process.env.REDIS_HOST, // localhost or '127.0.0.1'
  port: process.env.REDIS_PORT, //6379
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: process.env.REDIS_PWD,
  db: 0
};

console.log(conf);

export default conf;
