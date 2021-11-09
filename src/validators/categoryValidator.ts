import { Joi } from 'koa-joi-router';
import Koa from 'koa';
import { Categorie } from '../models/index';
import { Validator } from 'node-input-validator'
const categorySaveValidate = (ctx: Koa.Context, next: any) => {
  const v = new Validator(ctx.request.body, {
    name: 'required'
  });

  v.check().then(async (matched) => {
    if (!matched) {
      console.log('Validation Failed')
      ctx.status = 422;
      ctx.body = { status: 'error', code: 422, messages: `Validation Failed`, data: v.errors }
    } else {
      console.log('Validation Failed next')

      await next();
    }
  });
}
const categoryUpdateValidate = Joi.object({
  name: Joi.string().required(),
  childCategory: Joi.string(),
  _id: Joi.string(),
});

const isUniqueField = (accessor: any, name: any) => async (ctx: Koa.Context, next: any) => {
  const isExists = await Categorie.findOne({ [name]: accessor(ctx) });
  const id = ctx.request.body ? ctx.request.body : 1
  if (isExists && isExists._id != id) {
    console.log('isUniqueField IF')
    ctx.status = 410;
    ctx.body = { status: 'error', code: 410, messages: `Validation Failed`, data: null }
  }
  else {
    console.log('isUniqueField ELSE Next')
    await next();
  }
}

export { categorySaveValidate, categoryUpdateValidate, isUniqueField };
