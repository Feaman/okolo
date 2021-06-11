import * as types from './mutations-types'

export default {
  addToCart ({ commit }, product) {
    return new Promise(function (resolve) {
      commit(types.CART_ADDED, product)
      resolve()
    })
  },
  removeFromCart ({ commit }, product) {
    return new Promise(function (resolve) {
      commit(types.CART_REMOVED, product)
      resolve()
    })
  },
}
