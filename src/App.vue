<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import Cart from "@/components/Cart/Cart.vue";
import type {BasketItem, Product} from "@/types";
import {productData} from "@/ProductData";

const basket = reactive<BasketItem[]>([]);
const isCartOpen = ref(false);

// Helper function to find basket item by product
function findBasketItem(product: Product) {
  return basket.find((b) => b.item.id === product.id);
}

// Toggle cart visibility
function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}

// Add a product to the cart
function addToCart(product: Product): void {
  const basketItem = findBasketItem(product);
  if (basketItem) {
    basketItem.quantity++;
  } else {
    basket.push({item: product, quantity: 1});
  }
}

// Remove a product from the cart
function removeFromBasket(product: Product): void {
  const basketItem = findBasketItem(product);
  if (basketItem && basketItem.quantity > 0) {
    basketItem.quantity--;
    if (basketItem.quantity === 0) {
      basket.splice(basket.indexOf(basketItem), 1);
    }
  }
}

// Clear all items in the cart
function clearBasket(): void {
  basket.splice(0, basket.length);
}

// Computed: total price of the basket
const totalPrice = computed(() => {
  return basket.reduce((total, {item, quantity}) => total + item.price * quantity, 0);
});

// Computed: total items in the cart
const itemsInCart = computed(() => {
  return basket.reduce((total, {quantity}) => total + quantity, 0);
});

</script>


<template>
  <header>
    <h1>The Fast Food Joint</h1>
  </header>

  <main>
    <section class="products">
      <div class="products-top">
        <h2>Available Products</h2>
        <div class="cart-div">
          <button @click="toggleCart">
            <div class="cart-container">
              <span class="cart-badge" v-if="itemsInCart > 0">{{ itemsInCart }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
                <path
                    d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.3 65.3 0 0 1 13.36 1.412a.75.75 0 0 1 .58.875a49 49 0 0 1-1.618 6.2a.75.75 0 0 1-.712.513H6q-.171 0-.336.022A2.5 2.5 0 0 0 3.708 13.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807a4 4 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75M6 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m9.5 1.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <ul class="items-ul">
        <li v-for="product in productData" :key="product.id" class="product-item">
          <div class="item">
            <h3>{{ product.name }}</h3>
            <img :src="product.img" :alt="product.name" class="product-img"/>
            <div class="product-bottom">
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price" @click="addToCart(product)">
                <a>+</a>
                <p class="price">{{ product.price }} kr.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <Cart
        v-if="isCartOpen"
        @toggleCart="toggleCart"
        :basket="basket"
        :totalPrice="totalPrice"
        @addToCart="addToCart"
        @removeFromBasket="removeFromBasket"
        @clearBasket="clearBasket"
    />
  </main>
</template>


<style scoped>
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

.products-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-div {
  position: relative;
  display: inline-block;
}

.cart-div button {
  background-color: #E6E8DD;
  border: #B6BAB0 solid 1px;
  padding: 10px 12px;
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



main {
  border: #f1f1f1 solid 1px;
  background-color: white;

}

.products {
  width: 100%;
}

.products ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0;
}

@media (max-width: 970px) {
  .products ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 675px) {
  .products ul {
    grid-template-columns: 1fr;
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
  margin-top: 0;
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
  background-color: #E6E8DD;
  border: #B6BAB0 solid 1px;
  padding: 2px 8px;
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


.product-img {
  height: 150px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  margin-bottom: 15px;
  user-select: none;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

</style>
