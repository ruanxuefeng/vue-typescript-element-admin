<template>
    <div></div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import StompJS, {Client} from 'stompjs';
    import {UserState} from '@/store/modules/User';

    @Component
    export default class ReceiveBulletin extends Vue {

        private client!: Client;

        private created() {
            this.init();
        }

        get token() {
            return UserState.token;
        }

        @Watch('token')
        private tokenChange(token: string) {
            if (!token) {
                this.client.disconnect(() => {});
            }
        }

        private init() {
            const that = this;
            if (process.env.VUE_APP_WEB_SOCKET) {
                const client = StompJS.client(process.env.VUE_APP_WEB_SOCKET);

                // client will send heartbeats every 2000ms
                client.heartbeat.outgoing = 2000;
                client.heartbeat.incoming = 0;

                client.connect({
                    'ENJOY-BOOK-TOKEN': that.token,
                }, () => {
                    that.client = client;

                    client.subscribe('/topic/bulletin', (message) => {
                        const bulletin = JSON.parse(message.body);
                        that.$notify({
                            title: '公告',
                            message: bulletin.content,
                            position: 'bottom-right',
                        });
                    });

                    client.subscribe(`/topic/permission/${UserState.id}`, () => {
                        that.$notify({
                            title: '权限消息',
                            message: '权限已被管理员更新',
                            position: 'bottom-right',
                        });
                        UserState.resetRouter();
                    });
                }, (error) => {
                    setTimeout(that.init, 3000);
                });

                client.disconnect = () => {

                };
            }

        }
    }
</script>

<style scoped>

</style>
