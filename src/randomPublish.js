import { pubsub } from './redis/pubsub';
const { set } = require('./redis/oper');

const randomChoice = (n) => {
  return parseInt(Math.random() * n);
};

const rndInt = () => {
  const min = 100;
  const max = 200;
  const value = parseInt(Math.random() * (max - min) + min);
  return value;
};

const rndFloat = () => {
  const min = 100;
  const max = 200;
  const value = Math.random() * (max - min) + min;
  return value;
};

const rndJson = () => {
  return {
    a: rndInt(),
    b: rndFloat(),
    c: rndString(),
    d: {
      aa: rndInt(),
      bb: rndFloat(),
      cc: rndString()
    }
  };
};

const rndString = () => {
  const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const value = [...Array(10)]
    .map(() => c[~~(Math.random() * c.length)])
    .join('');
  return value;
};

const publishRandom = async (
  channel,
  name,
  generator,
  add_histo = true,
  expiry = null
) => {
  const value = JSON.stringify(generator());
  console.log('generator -->', channel, name, value);
  pubsub.publish(channel, { name, value });
  await set({ channel, name, value, add_histo, expiry });
};

const randomPublish = () => {
  const arrChannel = ['channel-1'];
  const arrName = ['toto', 'titi'];
  const arrGen = [rndString, rndInt, rndFloat, rndJson];
  const c = randomChoice(arrChannel.length);
  const n = randomChoice(arrName.length);
  const g = randomChoice(arrGen.length);
  const channel = arrChannel[c];
  const name = arrName[n];
  const gen = arrGen[g];

  publishRandom(channel, name, gen, true, null);
};

setInterval(() => randomPublish(), 1000);
