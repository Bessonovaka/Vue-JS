const goods = Vue.component('goods-list', {
    props: ['goods'],
    template: '<section class="goods-list"><slot name="title"></slot><goods-item v-for="good in goods" :key="good.id" :good="good"></goods-item><slot name="nothing"></section>'
});
const good = Vue.component('goods-item', {
    props: ['good'],
    template: '<div class="goods-item"><img :src="good.img" :alt="good.title"><h3>{{good.title}}</h3><p>{{good.price}}</p><button :id="good.id" v-on:click="addBasket(event)">Добавить</button></div>'
});

export default {
    goods: goods,
    good: good
};