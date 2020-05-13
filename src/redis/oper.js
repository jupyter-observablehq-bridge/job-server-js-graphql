import Redis from 'ioredis';
import conf from './conf';
import { log } from '../log';

let redis;
try {
  redis = new Redis(conf);
} catch (e) {
  console.log('ERROR');
  console.log(JSON.stringify(e));
}

const get = async (args) => {
  const { channel, name } = args;
  log('get');
  log({ channel, name });
  const keyRedis = `${channel}:${name}`;
  const value = await redis.get(keyRedis);
  log(`--> value=${value}`);

  if (value) return { name, value };
};

const getHisto = async (args) => {
  const { channel, name, start, end } = args;
  log('getHisto');
  log({ channel, name });
  const keyRedis = `${channel}:${name}|histo`;
  const value = await redis.lrange(keyRedis, start, end);
  if (value) {
    const res = value.map((e) => JSON.parse(e));
    log(`--> res=${JSON.stringify(res)}`);
    return res;
  }
};

const set = async (args) => {
  const { channel, name, value, add_histo, expiry } = args;
  log('set');
  log({ channel, name, value, add_histo, expiry });

  const keyRedis = `${channel}:${name}`;
  if (expiry) await redis.set(keyRedis, value, 'EX', expiry);
  else await redis.set(keyRedis, value);

  if (add_histo) {
    const keyRedisHisto = `${channel}:${name}|histo`;
    const timestamp = new Date().toISOString().slice(0, -1);
    await redis.lpush(keyRedisHisto, JSON.stringify({ value, timestamp }));
  }

  return { channel, name };
};

export { get, getHisto, set };
