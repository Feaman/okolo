<template>
  <div class="main d-flex">
    <div
      v-if="isLoading"
      class="loader"
    >
      Loading
    </div>
    <template v-else>
      <div class="flex-column">
        <div class="d-flex">
          <div class="current-group">
            {{ currentGroup.title }}
          </div>
          <div class="search">
            <input
              v-model="searchQuery"
              placeholder="Product title"
            >
          </div>
        </div>
        <div class="d-flex">
          <div
            v-for="group in groups"
            :key="group .id"
            class="group cursor-pointer"
            @click="currentGroup = group"
          >
            {{ group.title }}
          </div>
        </div>
        <div
          v-if="isProductsLoading"
          class="loader"
        >
          Loading
        </div>
        <div
          v-else
          class="d-flex flex-wrap"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="card"
          >
            <img
              :src="product.imageUrl"
              class="image"
            >
            <div>{{ product.title }}</div>
            <div>{{ product.price }}р.</div>
            <div class="d-flex">
              <div
                class="minus cursor-pointer"
                @click="removeFromCart(product)"
              >
                -
              </div>
              <div class="quantity">
                {{ productQuantity(product) }}
              </div>
              <div
                class="plus cursor-pointer"
                @click="addToCart(product)"
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="cart.length"
          class="cart"
        >
          <div>Cart</div>
          <div class="d-flex">
            <div>{{ cart.length }} products for {{ cartPrice }}</div>
            <div
              v-for="cartProduct in cartProducts"
              :key="cartProduct.id"
            >
              <img
                :src="cartProduct.imageUrl"
                class="cart-image"
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ProductsService from '../services/products'
import { mapState } from 'vuex'

export default {
  name: 'MainPage',
  data () {
    return {
      isLoading: true,
      isProductsLoading: false,
      products: [],
      groups: [],
      currentGroup: null,
      cartPrice: 0,
      searchQuery: '',
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    cartProducts () {
      return this.cart.map(cartProduct => this.products.find(product => cartProduct.productId === product.id))
    },
    productQuantity () {
      return product => this.cart.find(cartProduct => cartProduct.productId === product.id)?.quantity || 0
    },
    filteredProducts () {
      return this.products.filter(product => {
        const regExp = new RegExp(this.searchQuery, 'i')
        console.log(this.searchQuery, product.title, regExp.test(product.title))
        return product.groupId === this.currentGroup.id && regExp.test(product.title)
      })
    },
  },
  watch: {
    cart: {
      deep: true,
      handler () {
        this.cartPrice = 0
        this.cart.forEach(cartProduct => {
          const product = this.products.find(product => product.id === cartProduct.productId)
          if (product) {
            this.cartPrice += product.price * cartProduct.quantity
          }
        })
      }
    },
    async currentGroup () {
      this.isProductsLoading = true
      this.products = await ProductsService.getList(this.currentGroup)
      this.isProductsLoading = false
    }
  },
  async created () {
    this.groups = await ProductsService.getGroups()
    this.currentGroup = this.groups[0]
    this.products = await ProductsService.getList(this.currentGroup)
    this.isLoading = false
  },
  methods: {
    addToCart (product) {
      this.$store.dispatch('addToCart', product)
    },
    removeFromCart (product) {
      this.$store.dispatch('removeFromCart', product)
    },
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: auto;
  padding: 16px;;
}

.card {
  width: 150px;
  height: 200px;
  margin: 16px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 6px;
}

.group {
  margin: 16px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 6px;
}

.image {
  width: 50px;
}

.minus, .plus {
  width: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 6px;
  text-align: center;
}

.quantity {
  margin: 0 4px;
}

.cart {
  width: calc(100% + 16px);
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: -16px;
  bottom: 0;
  padding: 32px;
  color: #fff;
}

.cart-image {
  width: 36px;
  border-radius: 50%;
}
</style>
