import {Notification} from 'element-ui';
import {Client, Message, StompHeaders} from '@stomp/stompjs/esm6';
import {TOKEN_NAME} from '@/class/Constant';
import {UserState} from '@/store/modules/User';

export default class WebSocket {
    private static client: Client;

    public static start() {
        if (process.env.VUE_APP_WEB_SOCKET && !WebSocket.client) {
            const connectHeaders: StompHeaders = new StompHeaders();
            connectHeaders[TOKEN_NAME] = UserState.token || '';

            const client = new Client({
                brokerURL: process.env.VUE_APP_WEB_SOCKET,
                connectHeaders,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: function (frame) {
                    client.subscribe('/topic/bulletin', (message: Message) => {
                        const bulletin = JSON.parse(message.body);
                        Notification({
                            title: '公告',
                            message: bulletin.content,
                            position: 'bottom-right'
                        });
                    });

                    client.subscribe(`/topic/permission/${UserState.id}`, () => {
                        Notification({
                            title: '权限消息',
                            message: '权限已被管理员更新',
                            position: 'bottom-right'
                        });
                        UserState.resetRouter();
                    });
                }
            });

            client.activate();
            WebSocket.client = client;
        }
    }

    public static stop() {
        if (WebSocket.client) {
            WebSocket.client.deactivate();
        }
    }
}
