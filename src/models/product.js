export default class ProductModel {
  constructor (data) {
    this.id = data.id
    this.title = data.title
    this.groupId = data.groupId
    this.imageUrl = data.imageUrl
    this.price = data.price
  }
}
