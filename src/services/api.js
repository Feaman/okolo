const products = []
const groups = []

for (let i = 0; i < 5; i++) {
  groups.push({
    id: i + 1,
    title: `Group ${i + 1}`,
  })
}

for (let i = 0; i < 50; i++) {
  products.push({
    id: i + 1,
    title: `Product ${i + 1}`,
    groupId: Math.round(Math.random() * (5 - 1) + 1),
    price: Math.round(Math.random() * (5000 - 1) + 1),
    imageUrl: 'https://ogorod-foodmarket.ru/image/catalog/molochnye-produkty/moloko/8/729561493-moloko-prostokvashino-otbornoe-930-ml.jpg',
  })
}

export default class ApiService {
  static getProducts () {
    return new Promise(resolve => {
      setTimeout(() => resolve(products), 1000)
    })
  }

  static getGroups () {
    return Promise.resolve(groups)
  }
}
