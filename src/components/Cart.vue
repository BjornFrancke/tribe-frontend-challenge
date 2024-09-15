<script setup lang="ts">
interface BasketItem {
  item: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Props {
  basket: BasketItem[];
  totalPrice: number;
}

const props = defineProps<Props>();

defineEmits(['toggleCart', 'addToCart', 'removeFromBasket', 'clearBasket']);

</script>

<template>
  <div class="basket-container">
    <section class="basket">
      <div class="basket-top">
        <h2>Your Basket</h2>
        <button class="close-btn" @click="$emit('toggleCart')">X</button>
      </div>
      <ul>
        <li v-for="basketItem in props.basket" :key="basketItem.item.id" class="basket-item">
          <div class="basket-item-details">
            <span>{{ basketItem.item.name }} - {{ basketItem.quantity }} x {{ basketItem.item.price }} kr.</span>
            <span class="subtotal">{{ basketItem.item.price * basketItem.quantity }} kr.</span>
            <div class="item-btn">
              <a class="plus" @click="$emit('addToCart', basketItem.item)">+</a>
              <a class="minus" @click="$emit('removeFromBasket', basketItem.item)">-</a>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="props.basket.length === 0" class="empty-basket">Your basket is empty.</p>
      <p class="total">Total: {{ props.totalPrice }} kr.</p>
      <button @click="$emit('clearBasket')" class="clear-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.088 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"/>
        </svg>
      </button>
    </section>
  </div>
</template>

<style scoped>
h1 {
  color: black
}

.basket-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.basket {
  align-content: start;
  padding-left: 15px;
  padding-right: 15px;
}

.basket-item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 10px;
}

.close-btn {
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

}

.close-btn:hover {
  background-color: black;
  color: #B9FF82;
}

.subtotal {
  font-weight: bold;
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


.empty-basket {
  text-align: center;
  color: grey;
}

.total {
  font-weight: bold;
  margin-top: 15px;
  text-align: end;
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

.basket-container {
  position: absolute;
  right: 0;
  width: 33%;
  min-height: 100vh;
  height: auto;
  top: 0;
  background-color: white;
  border: 1px solid #B6BAB0;
}
</style>
