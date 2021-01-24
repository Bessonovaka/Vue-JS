
// Компонент поиска
const search = Vue.component('search', {
    props: [],
    template: '<div class="search"><input type="search" v-on:keydown.enter="filterGoods" v-model="app.searchLine" placeholder="Type and press enter"></div>'
});

export default {
    search: search
};