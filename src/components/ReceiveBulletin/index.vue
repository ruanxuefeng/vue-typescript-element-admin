<template>
    <div></div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import StompJS, {Client} from 'stompjs';
    import {getToken} from '@/utils/auth';


    @Component
    export default class ReceiveBulletin extends Vue {

        private client!: Client;

        private created() {
            this.init();
        }

        private init() {
            const that = this;
            if (process.env.VUE_APP_WEB_SOCKET) {
                const client = StompJS.client(process.env.VUE_APP_WEB_SOCKET);

                // client will send heartbeats every 2000ms
                client.heartbeat.outgoing = 2000;
                client.heartbeat.incoming = 0;

                client.connect({
                    'AM-TOKEN': getToken(),
                }, () => {
                    that.client = client;

                    client.subscribe('/topic/notice', (message) => {
                        const bulletin = JSON.parse(message.body);
                        that.$notify({
                            title: '公告',
                            message: bulletin.content,
                            position: 'bottom-right',
                        });

                        client.disconnect = () => {
                            console.info('web socket disconnect');
                        };
                    });
                }, (error) => {
                    console.log('client connect error:', error);
                    console.log('try to reconnection');
                    setTimeout(that.init, 3000);
                });
            }

        }
    }
</script>

<style scoped>

</style>
