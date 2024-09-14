<script setup lang="ts">

import {computed, reactive} from "vue";

interface Product {
  id: string,
  name: string,
  description: string,
  price: number,
  img: string,
}

let basket = reactive([])

function addToCart(newProduct): void {
  console.log("Adding " + newProduct.name)
  const basketItem = basket.find(b => b.item.name === newProduct.name);
  if (basketItem) {
    basketItem.quantity++;
    console.log("New amount: " + basketItem.quantity);
  } else {
    basket.push({item: newProduct, quantity: 1});
  }
}

function removeFromBasket(item: Product): void {
  const basketItem = basket.find(b => b.item.name === item.name);
  if (basketItem && basketItem.quantity > 0) {
    basketItem.quantity--;
    console.log("Removing 1");
    if (basketItem.quantity === 0) {
      const index = basket.indexOf(basketItem);
      basket.splice(index, 1); // Removes the item when quantity is 0
    }
  }
}

function clearBasket(): void {
  basket.splice(0, basket.length); // Clears all items
}

const totalPrice = computed(() => {
  let total = 0;
  basket.map((product) => {
    total += product.item.price * product.quantity;
  });
  return total;
})

type Products = Product[]


const productData: Products = [{
  id: "0001",
  name: "Burger",
  description: "A lovely burger",
  price: 50,
  img: "src/assets/front-view-tasty-meat-burger-with-cheese-salad-dark-background.png"
},
  {
    id: "0002",
    name: "Pizza",
    description: "Baked in stone oven",
    price: 65,
    img: "src/assets/pizza-time-tasty-homemade-traditional-pizza-italian-recipe.png"
  }
]

</script>

<template>
  <header>
    <h1>The Fast Food Joint</h1>
  </header>

  <main>
    <section class="products">
      <h2>Available Products</h2>
      <ul>
        <li v-for="product in productData" :key="product.id" class="product-item">
          <div class="item">
            <h3>{{ product.name }}</h3>
            <img :src="product.img" :alt="product.name" class="product-img" />
            <div class="product-bottom">
<p class="product-description">{{product.description}}</p>
              <div class="product-price">
                <a @click="addToCart(product)">+</a>
            <p class="price">{{ product.price }} kr.</p>
              </div>
            </div>
            <div class="item-btn">
<!--              <a class="plus" @click="addToCart(product)">+</a>
              <a class="minus" @click="removeFromBasket(product)">-</a>-->
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section class="basket">
      <h2>Your Basket</h2>
      <ul>
        <li v-for="basketItem in basket" :key="basketItem.item.id" class="basket-item">
          <div class="basket-item-details">
            <span>{{ basketItem.item.name }} - {{ basketItem.quantity }} x {{ basketItem.item.price }} kr.</span>
            <span class="subtotal">{{basketItem.item.price * basketItem.quantity}} kr.</span>
            <div class="item-btn">
              <button @click="addToCart(basketItem.item)">+</button>
              <button @click="removeFromBasket(basketItem.item)">-</button>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="basket.length === 0" class="empty-basket">Your basket is empty.</p>
      <p class="total">Total: {{ totalPrice }} kr.</p>
      <button @click="clearBasket" class="clear-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.088 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"/></svg></button>
    </section>
  </main>
</template>

<style scoped>
/* Basic layout and typography */
header {
  text-align: center;
  margin-bottom: 20px;
}

main {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

h1, h2 {
  color: black;
  font-weight: 700;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  margin-bottom: 15px;
}

/* Styling for product section */

main {
  border: #f1f1f1 solid 1px;
  background-color: white;

}

.products {
  width: 40%;
}

.product-item {
  background-color: #F6F6F6;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.item h3 {
  margin-top: 0px;
}

.item-btn {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.item-btn a {
  padding: 10px 15px;
  background-color: #E6E8DD;
  color: black;
  font-size: 20px;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.item-btn a.plus {
  border-radius: 5px 0 0 5px;
}

.item-btn a.minus {
  border-radius: 0 5px 5px 0;
}

.item-btn a:hover {
  background-color: black;
  color: #B9FF82;
}

.product-price {
  display: flex;
  width: fit-content;
  height: fit-content;
  min-width: 64px;
  border-radius: 18px;
  margin: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: #E6E8DD;
  border: #B6BAB0 solid 1px;
  padding-top: 2px;
  padding-bottom: 2px;
  color: black;
  user-select: none;
  cursor: pointer;

}

.product-price a {
  font-size: 24px;
  color: black;
  margin-bottom: 4px;

}

.product-price:hover a {
  color: #B9FF82;
}

.product-price:hover {
  background-color: black;
  color: #B9FF82;

}

.price {
  font-weight: bold;
  margin: 0;
}

/* Styling for basket section */
.basket {
  width: 40%;
}

.basket-item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 10px;
}

.subtotal {
  font-weight: bold;
}

.product-img {
  height: 150px;
  width: auto;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
}

.product-bottom {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  margin-top: 20px;
  padding: 6px 12px;
  background-color: crimson;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.clear-btn:hover {
  background-color: darkred;
}

.empty-basket {
  text-align: center;
  color: grey;
}

.total {
  font-weight: bold;
  margin-top: 15px;
}
</style>
