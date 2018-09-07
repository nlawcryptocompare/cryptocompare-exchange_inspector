<template>
    <div class="home-header">
        <div class="intro-text">
            <h2>Welcome to the CryptoCompare Exchange Inspector!</h2>

            <p>You can use this web interface for testing development
                instances of exchange environments.
            </p>
            
            <p>Useful links:</p>
            
            <ul>
                <li>
                    <a href="#" target="_blank">Docker Docs</a>
                </li>
                <li>
                    <a href="http://confluence.cryptocompare.lan/pages/viewpage.action?spaceKey=COD&title=Dev+environment+for+CCCAGG" target="_blank">Confluence Docs</a>
                </li>
                <li>
                    <a href="#" target="_blank">Something Else!</a>
                </li>
            </ul>
        </div>

        <div class="status-list">
            <status-list></status-list>
        </div>
    </div>
</template>

<script>
import StatusList from './StatusList.vue';

export default {
    name: 'home-header',
    components: {
        StatusList,
    },
};
</script>


<style scoped>
.home-header{
    padding: 10rem 4rem 4rem 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #ccc;
    background: #f4f4f4;
}

.intro-text h2{
    margin-top: 0;
}
</style>
