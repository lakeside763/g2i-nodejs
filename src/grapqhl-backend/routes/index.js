const { Router } = require('express');
const Redis = require('ioredis');
const { name, version } = require('../package.json');

const enviroment = process.env.NODE_ENV;
const config = require('../config');

const redis = new Redis(config.redis);
const router = Router();

router.get('/', async (req, res) => res.status(200).send({ name, version, enviroment }));

router.get('/clear-cache', async (req, res) => {
  try {
    redis.keys('g2i*').then((keys) => {
      const pipeline = redis.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      return pipeline.exec();
    });
    return res.status(200).send({ status: true, message: 'OK' });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
