// Компоненты корзины
const cart = Vue.component('basket-list', {
    props: ['goods'],
    template: '<aside class="basket-list"><slot name="title"></slot><basket-item v-for="good in goods" :key="good.id" :good="good"></basket-item><slot name="totalCart"></slot></aside>'
});
const cartItem = Vue.component('basket-item', {
    props: ['good'],
    template: '<div class="basket-item"><img :src="good.img" :alt="good.title"><button :id="good.id" v-on:click="deleteItem(event)">&times;</button><div class="basket-item-info"><h3>{{good.title}}</h3><p>{{good.price}}</p></div></div>'
});

export default {
    cart: cart,
    cartItem: cartItem
};