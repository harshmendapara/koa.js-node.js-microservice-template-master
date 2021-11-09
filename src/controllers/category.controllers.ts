import Koa from 'koa';
import CategoryService from '../services/category.services';

export const fetchAllCategories = async (ctx: Koa.Context) => {
  const categoryService = new CategoryService()
  var { perRowPage, currentPage, search, isActive, isDeleted } = ctx.request.query

  if (!perRowPage) perRowPage = '10'
    if (!currentPage) currentPage = '1'
    var pagination = {
      currentPage: Number(currentPage),
      perRowPage: Number(perRowPage),
      totalPages: 0,
      totalItems: 0,
      search: search ? search : null,
      regexSearch: null,
      isActive: isActive ? isActive : [true, false],
      isDeleted: isDeleted ? isDeleted: [true, false]
    }
  var regexSearch = new RegExp(search, 'i');
  const count = await categoryService.fetchCategoryCount(pagination, isDeleted, regexSearch)
  pagination.totalItems = Number(count)
  try {
    pagination.totalPages = Math.ceil(pagination.totalItems / Number(perRowPage))
    const data = await categoryService.fetchAll(pagination, isDeleted, regexSearch)
    ctx.body = data
  } catch (err) {
    ctx.body = { err }
  }
}

export const addCategory = async (ctx: Koa.Context, next: any) => {
  const { name, childCategory } = ctx.request.body;
  const categoryService = new CategoryService()
  try {
    const data = await categoryService.saveCategory({ name, childCategory: childCategory ? childCategory : null })
    console.log('Save Data TRY')
    ctx.status = data.code || 200;
    ctx.body = data
  } catch (err) {
    console.log('Save Data catch')
    ctx.status = err.code || 500;
    ctx.body = err
  }
}

export const updateCategory = async (ctx: Koa.Context) => {
  const categoryService = new CategoryService()
  try {
    const data = await categoryService.updateCategory(ctx.request.body)
    ctx.body = data
  } catch (err) {
    ctx.body = { err };
  }
}
export const fetchCategoryById = async (ctx: Koa.Context) => {
  const categoryService = new CategoryService()
  try {
    const data = await categoryService.fetchCategoryById(ctx.request.params)
    ctx.body = data
  } catch (err) {
    ctx.body = { err };
  }
}
export const deleteCategory = async (ctx: Koa.Context) => {
  const categoryService = new CategoryService()
  try {
    const data = await categoryService.deleteCategory(ctx.request.params)
    ctx.body = data
  } catch (err) {
    ctx.body = { err };
  }
}
export const restoreCategory = async (ctx: Koa.Context) => {
  const categoryService = new CategoryService()
  try {
    const data = await categoryService.restoreCategory(ctx.request.params)
    ctx.body = data
  } catch (err) {
    ctx.body = { err };
  }
}
