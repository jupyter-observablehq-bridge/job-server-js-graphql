import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import conf from './conf';
import { log } from '../log';

const deserializer = (string) => {
  const arr = JSON.parse(string);
  const { name, value } = arr;
  log(`deserialize ${string}`);
  //   log(`deserialized ${JSON.stringify({ name, value })}`);
  return { subscribe: { name, value } };
};

let pubsub;
try {
  const redisSub = new Redis(conf);
  const redisPub = new Redis(conf);
  pubsub = new RedisPubSub({
    subscriber: redisSub,
    publisher: redisPub,
    deserializer
  });
} catch (e) {
  console.log('ERROR');
  console.log(JSON.stringify(e));
}

const publish = async (args) => {
  const { channel, name, value } = args;
  log('publish');
  log({ channel, name, value });
  await pubsub.publish(channel, { name, value });
  return { channel, name };
};

export { pubsub, publish };
