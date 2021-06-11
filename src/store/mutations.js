import * as types from './mutations-types'

export default {
  [types.CART_ADDED] (state, product) {
    const existingCartProduct = state.cart.find(cartProduct => cartProduct.productId === product.id)
    if (existingCartProduct) {
      existingCartProduct.quantity++
    } else {
      state.cart.push({
        productId: product.id,
        quantity: 1,
      })
    }
  },
  [types.CART_REMOVED] (state, product) {
    const existingProduct = state.cart.find(cartObject => cartObject.productId === product.id)
    if (existingProduct && existingProduct.quantity > 0) {
      existingProduct.quantity--
    }
    if (existingProduct.quantity === 0) {
      state.cart = state.cart.filter(cartObject => cartObject.productId !== product.id)
    }
  },
}
