<template>
  <div id="app">
    <app-header></app-header>

    <router-view></router-view>

    <!-- <home-header></home-header>

    <data-table></data-table> -->

    <!-- <exchange-data></exchange-data> -->
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import ExchangeData from './components/ExchangeData.vue';
import DataTable from './components/DataTable.vue';
import HomeHeader from './components/HomeHeader.vue';

export default {
    name: 'app',
    components: {
        AppHeader,
        ExchangeData,
        DataTable,
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
