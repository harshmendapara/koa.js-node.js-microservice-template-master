import { Categorie } from './../models/index'
export default class CategoryService {
  public async saveCategory(payload: any) {
    try {
      const data = await Categorie.create(payload)
        return { status: 'Success', code: 200, message: 'Category Added Successfully', data}
    } catch (err) {
      return { status: 'Error', code: 500, message: '', err}
    }
  }
  public async updateCategory(payload: any) {
    const { name, childCategory, _id } = payload
    try {
      const data = await Categorie.findByIdAndUpdate(_id, { name, childCategory:childCategory ? childCategory : null }, { new: true }).populate('childCategory')
      return { status: 'Success', code: 200, message: 'Category Update Successfully', data}
    } catch (err){
      return { status: 'Error', code: 500, message: '', err}
    }
  }
  public async fetchCategoryById(_id:any) {
    try {
      const data = await Categorie.findOne({ _id }).populate('childCategory')
      return { status: 'Success', code: 200, message: '', data }
    } catch (err){
      return { status: 'Error', code: 500, message: '', err}
    }
  }
  public async fetchAll(pagination:any, isDeleted:any, search:any) {
    try {
      const data = await Categorie.find({name: search, isDeleted: isDeleted , isActive: pagination.isActive})
        .select('name childCategory isActive')
        .populate('childCategory', 'name isActive')
        .limit(pagination.perRowPage * 1)
        .skip((pagination.currentPage - 1) * pagination.perRowPage);
      return { status: 'Success', code: 200, message: '', data: {pagination, categories: data} }
    } catch (err){
      return { status: 'Error', code: 500, message: '', err}
    }
  }
  public async fetchCategoryCount(pagination: any, isDeleted: any, search: any) {
    try {
      return await Categorie.countDocuments({name: search, isDeleted: isDeleted , isActive: pagination.isActive})
    } catch (err){
      return { status: 'Error', code: 500, message: '', err}
    }
  }
  public async deleteCategory(_id:any) {
    try {
      const data = await Categorie.findByIdAndUpdate(_id, { isDeleted: true }, { new: true })
      return { status: 'Success', code: 200, message: 'Category Deleted Successfully', data }
    } catch (err){
      return { status: 'Error', code: 500, message: '', err}
    }
  }
  public async restoreCategory(_id: any) {
    try {
      const data = await Categorie.findByIdAndUpdate(_id, { isDeleted: false }, { new: true })
      return { status: 'Success', code: 200, message: 'Category Restore Successfully', data }
    } catch (err){
      return { status: 'Error', code: 500, message: '', err}
    }
  }
}

