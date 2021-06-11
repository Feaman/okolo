import ProductModel from "../models/product"
import GroupModel from "../models/group"
import ApiService from "./api"

export default class ProductsService {
  static async getList () {
    try {
      const productsData = await ApiService.getProducts()
      const products = []
      productsData.forEach(productData => {
        products.push(new ProductModel(productData))
      })

      return products
    } catch (error) {
      console.error(error)
    }
  }

  static async getGroups () {
    try {
      const groupsData = await ApiService.getGroups()
      const groups = []
      groupsData.forEach(groupData => {
        groups.push(new GroupModel(groupData))
      })

      return groups
    } catch (error) {
      console.error(error)
    }
  }
}
