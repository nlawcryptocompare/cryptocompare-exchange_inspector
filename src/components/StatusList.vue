<template>
    <div>
        <h3 :class="{ up: masterStatus === true, down: masterStatus === false }">
            Status:
            <span v-if="masterStatus === true">Up</span>
            <span v-if="masterStatus === false">Down</span>
        </h3>
        <ul>
            <li v-for="serviceItem in services" :key="serviceItem.name" :class="{ up: serviceItem.status === true, down: serviceItem.status === false }">
                <b>{{ serviceItem.name }}</b>
                |
                <span class="info">
                    <span v-if="serviceItem.status === true">
                        Connected
                    </span>
                    <span v-if="serviceItem.status === false">
                        Connecting
                    </span>
                    on {{ serviceItem.protocol }}//{{ serviceItem.host }}:{{ serviceItem.port }}
                    <span v-if="serviceItem.status === false">...</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'status-list',

    mounted() {
        // Ping each service initially on startup, and again every 5 seconds
        this.servicePing();
        setInterval(this.servicePing, 5000);
    },

    data() {
        return {
            activeExchange: 'Bitfinex',
            services: {
                cccStreamMid: {
                    name: 'CCC Stream Mid',
                    status: false,
                    protocol: 'http',
                    host: 'localhost',
                    port: '6969',
                },
                cccagg: {
                    name: 'CCCAGG',
                    status: false,
                    protocol: 'http',
                    host: 'localhost',
                    port: '6950',
                },
                exchange: {
                    name: 'Exchange',
                    status: false,
                    protocol: 'http',
                    host: 'localhost',
                    port: '6971',
                },
                // redis: {
                //     name: 'Redis',
                //     status: false,
                //     protocol: 'http',
                //     host: 'localhost',
                //     port: '6379',
                // },
                // postgres: {
                //     name: 'Postgres',
                //     status: false,
                //     protocol: 'http',
                //     host: 'localhost',
                //     port: '5432',
                // },
                // cccStreamer: {
                //     name: 'CCC Streamer',
                //     status: false,
                //     protocol: 'http',
                //     host: 'localhost',
                //     port: '6960',
                // },
            },
        };
    },

    computed: {
        masterStatus() {
            return (
                this.services.cccStreamMid.status === true &&
                this.services.exchange.status === true
                // this.services.redis.status === true &&
                // this.services.postgres.status === true &&
                // this.services.cccagg.status === true &&
            );
        },
    },

    methods: {
        servicePing() {
            // Loop over our services object (use object.keys to get an array of keys)
            Object.keys(this.services).forEach((service) => {
                const thisService = this.services[service];
                fetch(`${thisService.protocol}://${thisService.host}:${thisService.port}`, { mode: 'no-cors' })
                    .then((response) => {
                        //  If service did respond, set status to true, else set to false
                        if (response) {
                            thisService.status = true;
                        } else {
                            thisService.status = false;
                        }
                    })
                    .catch((error) => {
                        // If service threw an error, log it and set status to false
                        console.error(`Error connecting to ${thisService.name}: ${error}`);
                        thisService.status = false;
                    });
            });
        },
    },
};
</script>


<style scoped>
ul{
    list-style: none;
    padding: 0;
    margin: 0;
}

li{
    transition: all 0.2s ease-in-out;
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: left center;
    padding-left: 30px;
    margin-bottom: 1rem;
}

li.up{
    background-image: url(../assets/status-up.png);
}

li.down{
    background-image: url(../assets/status-down.png);
    color: red;
}

.info{
    color: #999;
}

li.down .info{
    font-style: italic;
    animation: blinker 1s linear infinite;
}

h3{
    margin-top: 0;
    border: 1px solid green;
    padding: 1rem;
    display: inline-block;
    border-radius: 2px;
}

h3.up{
    color: green;
    border-color: green;
    background-color: #a8eab6;
}

h3.down{
    color: red;
    border-color: red;
    background-color: #ffcccc;
}

@keyframes blinker {
  50% {
    opacity: 0.3;
  }
}
</style>
