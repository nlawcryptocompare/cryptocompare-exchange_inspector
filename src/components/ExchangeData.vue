<template>
    <div class="exchange-data">
        <h2>Exchange Data</h2>
    </div>
</template>

<script>
// Set vars
const fsym = 'BTC';
const tsym = 'USD';
const dataUrl = `https://min-api.cryptocompare.com/data/subs?fsym=${fsym}&tsyms=${tsym}`;

export default {
    mounted() {
        // Load available pairs from Redis
        fetch(dataUrl)
            .then((response) => {
                console.log('-->', response);
                
                const currentSubs = response.data[tsym].TRADES;

                // Subscribe to available pairs
                this.$socket.emit('SubAdd', { subs: currentSubs });
            })
            .catch((error) => {
                console.error(error);
            });
    },

    sockets: {
        connect() {
            console.log('socket connected');
        },

        m(currentData) {
            // Push to table list
            // this.tableData.push(cccTrade.unpack(currentData));

            // When we get to 20 items in the list, start removing the oldest item
            if (this.tableData.length === 20) {
                this.tableData.shift();
            }
        },
    },

    data() {
        return {
            tableData: [],
        };
    },
}
</script>

<style scoped>
.exchange-data{
    padding: 4rem;
}
</style>

