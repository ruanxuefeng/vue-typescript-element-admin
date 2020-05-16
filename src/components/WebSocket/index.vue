<template>
    <div></div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Client, Message, StompHeaders} from '@stomp/stompjs/esm6';
import {UserState} from '@/store/modules/User';
import {TOKEN_NAME} from '@/class/Constant';

@Component
export default class ReceiveBulletin extends Vue {

    private client!: Client;

    get token() {
        return UserState.token;
    }

    private created() {
        this.init();
    }

    @Watch('token')
    private tokenChange(token: string) {
        if (!token) {

        }
    }

    private init() {
        const that = this;
        if (process.env.VUE_APP_WEB_SOCKET) {
            const connectHeaders: StompHeaders = new StompHeaders();
            connectHeaders[TOKEN_NAME] = this.token || '';

            const client = new Client({
                brokerURL: process.env.VUE_APP_WEB_SOCKET,
                connectHeaders,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: function (frame) {
                    client.subscribe('/topic/bulletin', (message: Message) => {
                        const {title, content} = JSON.parse(message.body);
                        that.$notify({
                            title: title,
                            message: content,
                            position: 'bottom-right'
                        });
                    });

                    client.subscribe(`/topic/permission/${UserState.id}`, () => {
                        that.$notify({
                            title: '权限消息',
                            message: '权限已被管理员更新',
                            position: 'bottom-right'
                        });
                        UserState.resetRouter();
                    });
                }
            });

            client.activate();

        }

    }
}
</script>

<style scoped>

</style>
