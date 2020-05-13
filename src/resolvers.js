import { get, getHisto, set } from './redis/oper';
import { pubsub, publish } from './redis/pubsub';

const Query = {
  checkPassword: (parent, args) => args.password === process.env.REDIS_PWD,
  read: async (parent, args) => await get(args),
  readHisto: async (parent, args) => await getHisto(args)
};

const Mutation = {
  write: async (parent, args) => await set(args),
  publish: async (parent, args) => publish(args),
  publishWrite: async (parent, args) => {
    publish(args);
    return await set(args);
  }
};

const Subscription = {
  subscribe: {
    subscribe: (parent, args) => {
      const { channel, pattern } = args;
      return pubsub.asyncIterator(channel, { pattern });
    }
  }
};

export default { Query, Mutation, Subscription };
