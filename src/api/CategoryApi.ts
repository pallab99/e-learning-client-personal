import Api from './apiConfigs';

class CategoryApi {
  endPoints = {
    getAllCategory: '/category/all',
  };
  async getAllCategory() {
    return await Api?.http?.get(this.endPoints.getAllCategory);
  }
}

export default new CategoryApi();
