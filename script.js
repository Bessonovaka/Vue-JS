
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basketGoods: [],
        searchLine: '',
        isVisibleCart: true,
        totalPriceMessage: '',
        totalPriceCoin: ''
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                let fetch = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
                fetch.open("GET", url, true);
                fetch.onload = () => resolve(JSON.parse(fetch.responseText));
                fetch.onerror = () => reject(fetch.statusText);
                fetch.send();
            });
        },
        makePOSTRequest(url, data, callback) {
            let fetch;
        
            if (window.XMLHttpRequest) {
              fetch = new XMLHttpRequest();
            } else if (window.ActiveXObject) { 
              fetch = new ActiveXObject("Microsoft.XMLHTTP");
            }
        
            fetch.onreadystatechange = function () {
              if (fetch.readyState === 4) {
                callback(fetch.responseText);
              }
            }
        
            fetch.open('POST', url, true);
            fetch.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
            fetch.send(data);
          },
        addToBasket(id) {
            let toBasket;
            this.goods.forEach(function (item) {
                if (id == item.id) {
                    toBasket = {
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        img: item.img
                    }
                }
            });
            this.basketGoods.push(toBasket);
            this.calcAllGoods();
            // Обновляем cart.json
            this.makePOSTRequest('/addToCart', toBasket);
        },
        deleteFromBasket(id) {
            let getIdElemen;
            this.basketGoods.forEach(function (item, i) {
                let thisId = item.id;
                if (id == thisId) {
                    getIdElemen = i;
                }

            });
            this.basketGoods.splice(getIdElemen, 1);
            this.calcAllGoods();
            // Обновляем cart.json
            this.makePOSTRequest('/updateCart', this.basketGoods);
        },
        viewCart() {
            switch (this.isVisibleCart) {
                case (false): {
                    this.isVisibleCart = true;
                    break;
                }
                case (true): {
                    this.isVisibleCart = false;
                    break;
                }
            }
        },
        calcAllGoods() {
            let totalPrice = 0;
            this.basketGoods.forEach((good) => {
                if (good.price !== undefined) {
                    totalPrice += good.price;
                }
            });
            this.totalPriceMessage = 'Cумма товаров в корзине: ' + totalPrice;
            this.totalPriceCoin = totalPrice;
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        },
    },
    async created() {
        try {
            this.goods = await this.makeGETRequest('response.json');
            this.filteredGoods = this.goods;
        } catch (err) {
            console.error(err);
        }
    },
    mounted() {
        this.makeGETRequest(`/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
          });
    }
});

// Компоненты товаров
import module from './goods.js';

const goods = module.goods,
      good = module.good;

// Компоненты корзины cart.js
import module from './cart.js';

const cart = module.cart,
      cartItem = module.cartItem;

//Компонент поиска search.js
import module from './search.js';

const search = module.search;