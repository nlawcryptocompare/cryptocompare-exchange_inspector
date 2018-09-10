<template>
  <div id="app">
    <app-header></app-header>

    <home-header></home-header>

    <exchange-data></exchange-data>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import ExchangeData from './components/ExchangeData.vue';
import HomeHeader from './components/HomeHeader.vue';

export default {
    name: 'app',
    components: {
        AppHeader,
        ExchangeData,
        HomeHeader,
    },
};
</script>

<style>
    body{
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
