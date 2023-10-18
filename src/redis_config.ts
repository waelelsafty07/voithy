import Redis  from 'ioredis';

const redisPublisher = new Redis(`redis://redis:6379`);;
const redisSubscriber  = new Redis(`redis://redis:6379`);

export { redisPublisher, redisSubscriber };