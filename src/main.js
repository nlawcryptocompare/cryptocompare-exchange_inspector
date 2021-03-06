import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex';
import App from './App.vue';


Vue.config.productionTip = false;

// Connect to socket server
Vue.use(VueSocketio, 'http://localhost:6969/streamers');

// Set up state store
Vue.use(Vuex);

new Vue({
    render: h => h(App),
}).$mount('#app');
