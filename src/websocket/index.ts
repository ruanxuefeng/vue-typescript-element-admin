import {Notification} from 'element-ui';
import {Client, Message, StompHeaders, StompSubscription} from '@stomp/stompjs/esm6';
import {TOKEN_NAME} from '@/class/Constant';
import {UserState} from '@/store/modules/User';
import {SystemLogState} from '@/store/modules/SystemLog';

export default class WebSocket {
    private static client: Client;

    public static start() {
        if (process.env.VUE_APP_WEB_SOCKET && !WebSocket.client) {
            console.log('websocket init start');
            const connectHeaders: StompHeaders = new StompHeaders();
            connectHeaders[TOKEN_NAME] = UserState.token || '';

            const client = new Client({
                brokerURL: process.env.VUE_APP_WEB_SOCKET,
                connectHeaders,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: function (frame) {
                    client.subscribe('/topic/bulletin', (req: Message) => {
                        const bulletin = JSON.parse(req.body);
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

                    client.subscribe('/topic/log', (req: Message) => {
                        const {dateTime, level, levelName, message} = JSON.parse(req.body);
                        SystemLogState.addLog({dateTime, level, levelName, message});
                    });
                }
            });

            client.activate();
            WebSocket.client = client;
            console.log('websocket init end');
        }
    }

    public static stop() {
        if (WebSocket.client) {
            WebSocket.client.deactivate();
        }
    }

    public static subscribe(url: string, callback: (message: Message) => void): StompSubscription | null {
        if (!WebSocket.client) {
            WebSocket.start();
        }
        return WebSocket.client.subscribe(url, callback);
    }

    public static unsubscribe(id: string) {
        if (WebSocket.client) {
            WebSocket.client.unsubscribe(id);
        }
    }
}
