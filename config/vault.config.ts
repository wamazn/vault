export default () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    redisErrorCounterLimit:
      parseInt(process.env.REDIS_ERROR_COUNTER_LIMIT, 10) || 5,
  },
});
