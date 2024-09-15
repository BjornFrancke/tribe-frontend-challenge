<script setup lang="ts">

import {computed, reactive, ref} from "vue";
import Cart from "@/components/Cart.vue";

interface Product {
  id: string,
  name: string,
  description: string,
  price: number,
  img: string,
}

let basket = reactive([])
let isCartOpen: boolean = ref(false)

function toggleCart() {
  isCartOpen = false
}

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
      basket.splice(index, 1);
    }
  }
}

function clearBasket(): void {
  basket.splice(0, basket.length);
}

const totalPrice = computed(() => {
  let total = 0;
  basket.map((product) => {
    total += product.item.price * product.quantity;
  });
  return total;
})

const itemsInCart = computed(() => {
  let total = 0;
  basket.map((product) => {
    total += product.quantity;
  })
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
    description: "Baked in a stone oven",
    price: 65,
    img: "src/assets/pizza-time-tasty-homemade-traditional-pizza-italian-recipe.png"
  },
  {
    id: "0003",
    name: "Sandwich",
    description: "Meats and cheese",
    price: 49,
    img: "src/assets/tasty-sandwich-with-vegetables-ham-cheese.png"
  },
  {
    id: "0004",
    name: "Garlic bread",
    description: "Very garlicky",
    price: 49,
    img: "src/assets/png-baked-garlic-bread-isolated-white-background-top-view.png"
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
      <ul class="items-ul">
        <li v-for="product in productData" :key="product.id" class="product-item">
          <div class="item">
            <h3>{{ product.name }}</h3>
            <img :src="product.img" :alt="product.name" class="product-img"/>
            <div class="product-bottom">
              <p class="product-description">{{ product.description }}</p>
              <a @click="addToCart(product)">
              <div class="product-price">
                <a>+</a>
                <p class="price">{{ product.price }} kr.</p>
              </div>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </section>


    <div class="cart-div">
      <button @click="isCartOpen = !isCartOpen">
        <div class="cart-container">

          <span class="cart-badge" v-if="itemsInCart > 0">{{ itemsInCart }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
            <path
                d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.3 65.3 0 0 1 13.36 1.412a.75.75 0 0 1 .58.875a49 49 0 0 1-1.618 6.2a.75.75 0 0 1-.712.513H6q-.171 0-.336.022A2.5 2.5 0 0 0 3.708 13.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807a4 4 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75M6 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m9.5 1.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/>
          </svg>
        </div>
      </button>
    </div>
    <Cart v-if="isCartOpen"
          @toggleCart="isCartOpen = false"
          :basket="basket"
          :totalPrice="totalPrice"
          @addToCart="addToCart"
          @removeFromBasket="removeFromBasket"
          @clearBasket="clearBasket"

    />
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

.cart-div {
  position: relative;
  display: inline-block;
}

.cart-div button {
  background-color: #E6E8DD;
  border: #B6BAB0 solid 1px;
  padding: 10px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 8px;
}

.cart-div button:hover {
  background-color: black;
  color: #B9FF82;
  fill: #B9FF82
}


.cart-container {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: black;
  color: #B9FF82;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.cart-container:hover .cart-badge {
  background-color: #E6E8DD;
  color: black;
}


/* Styling for product section */

main {
  border: #f1f1f1 solid 1px;
  background-color: white;

}

.products {
  width: 100%;
}

.products ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Two items per row */
  gap: 20px; /* Adds spacing between grid items */
  padding: 0;
}

@media (max-width: 970px) {
  .products ul {
    grid-template-columns: repeat(2, 1fr); /* Two items per row */
  }
}

/* On small screens (like mobile), display one item per row */
@media (max-width: 675px) {
  .products ul {
    grid-template-columns: 1fr; /* One item per row */
  }
}


.product-item {
  background-color: #F6F6F6;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
  padding: 8px 15px;
  background-color: #E6E8DD;
  color: black;
  font-size: 20px;
  border: none;
  margin: 2px;
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
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  margin-bottom: 15px;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
