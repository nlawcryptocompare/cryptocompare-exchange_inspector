<template>
    <div class="section-wrapper">
        <h2>Exchange Transactions ({{ activeExchange }})</h2>

        <table>
            <tr>
                <th>Market</th>
                <th>Price</th>
                <th>Open 24H</th>
                <th>Range 24H</th>
                <th>Last Trade</th>
                <th>Volume 24H</th>
            </tr>
            <tr v-for='(item, idx) in tableData' :key='idx'>
                <!-- <td>{{ item }}</td> -->
                 <td>{{ item.FROMSYMBOL }}/{{ item.TOSYMBOL }}</td>
                <td>{{ item.PRICE }} {{ item.TOSYMBOL }}</td>
                <td>{{ item.OPEN24HOUR }}</td>
                <td>
                    H: {{ item.HIGH24HOUR }}
                    <br>
                    L: {{ item.LOW24HOUR }}
                </td>
                <td>
                    Last Volume: {{ item.LASTVOLUME }}
                    <br>
                    Last Trade ID: {{ item.TRADEID }}
                    <br>
                    Last Time: {{new Date(item.LASTUPDATE * 1000) }}
                    <br>
                </td>
                <td>{{ item.VOLUME24HOUR }} {{ item.FROMSYMBOL }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
// Load dependencies
import cccTrade from 'ccc-trade'; // eslint-disable-line import/no-extraneous-dependencies
import cccCurrent from 'ccc-current'; // eslint-disable-line import/no-extraneous-dependencies

// Set vars
const fsym = 'BTC';
const tsym = 'USD';
const dataUrl = `https://min-api.cryptocompare.com/data/subs?fsym=${fsym}&tsyms=${tsym}`;

export default {
    sockets: {
        connect() {
            console.log('socket connected');
        },

        '2'(currentData) {
            // Unpack data
            const unpackedData = cccCurrent.unpack('2~'+currentData);

            // Set active exchange
            if (this.activeExchange !== unpackedData.MARKET) {
                this.activeExchange = unpackedData.MARKET;
            }

            // Set a 'pricePair' string, based on from and to symbols
            const pricePair = `${unpackedData.FROMSYMBOL}/${unpackedData.TOSYMBOL}`;

            // Checck if the incoming pair is already being tracked
            const trackedPair = this.tableData.filter((tableEntry) => tableEntry.FROMSYMBOL === unpackedData.FROMSYMBOL && tableEntry.TOSYMBOL === unpackedData.TOSYMBOL)[0];

            // If the incoming pair is not yet being tracked, push it into our table and add it's
            // table index to the pair tracker
            if (!trackedPair) {
                this.tableData.push(unpackedData);

                this.trackedPairs.push({
                    prices: pricePair,
                    idx: this.tableData.length - 1,
                });
            } else {
                // If the pair is already being tracked, update the apporopriate values
                // Loop over properties of incoming data and update our table entry
                Object.keys(unpackedData).forEach((thisKey) => {
                    trackedPair[thisKey] = unpackedData[thisKey];
                });
            }
        },
    },

    data() {
        return {
            activeExchange: '',
            tableData: [],
            trackedPairs: [],
        };
    },
};
</script>

<style scoped>
    .section-wrapper{
        padding: 4rem;
    }

    table{
        width: 100%;
        border: 1px solid #ccc;
    }

    table tr:nth-child(even){
        background: #f4f4f4;
    }

    table tr th{
        text-align: left;
        width: 16.67;
        padding: 0.5rem;
        padding-bottom: 1rem;
    }

    table tr td{
        padding: 0.5rem;
        width: 16.67%;
    }
</style>
