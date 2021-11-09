import Router from 'koa-joi-router';
import healthCheckRouter from './healthCheck';
import categoryRouter from './category.route';

const router = Router();

// prefix for microservice
router.prefix('/api');

router.route({
  handler: ctx => {
    ctx.body = {
      response: 'Ok'
    };
  },
  method: 'GET',
  path: '/'
});

router.use(healthCheckRouter.middleware());
router.use(categoryRouter.middleware());

export default router;
