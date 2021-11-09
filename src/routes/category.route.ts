import { addCategory, updateCategory, fetchCategoryById, deleteCategory, restoreCategory } from './../controllers/category.controllers';
import { fetchAllCategories } from '../controllers/category.controllers'
import Router from 'koa-joi-router'
import { categorySaveValidate, categoryUpdateValidate, isUniqueField } from '../validators/categoryValidator';

const router = Router();

router.prefix('/category');

router.route({
  method: 'GET',
  path: '/fetch-all-categories',
  handler: fetchAllCategories
});

router.route({
  method: 'GET',
  path: '/categories/:_id',
  handler: fetchCategoryById
});

router.route({
  method: 'DELETE',
  path: '/delete/:_id',
  handler: deleteCategory
});

router.route({
  method: 'POST',
  path: '/restor/:_id',
  handler: restoreCategory
});

router.route({
  method: 'POST',
  path: '/add-cateogry',
  validate: {
    type: 'json'
  },
  // pre: [categorySaveValidate],
  handler: [
    categorySaveValidate,
    isUniqueField((ctx:any) => ctx.request.body.name, 'name'),
    addCategory
  ]
});

router.route({
  method: 'POST',
  path: '/update-cateogry',
  validate: {
    type: 'json',
    body: categoryUpdateValidate
  },
  handler: [
    isUniqueField((ctx:any) => ctx.request.body.name, 'name'),
    updateCategory
  ]
});
export default router;
