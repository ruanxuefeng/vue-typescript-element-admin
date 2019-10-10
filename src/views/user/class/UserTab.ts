import {Tab} from '@/class/Tab';
import Obj from '@/views/user/class/User';

export default class UserTab implements Tab {
    public name!: string;
    public label!: string;
    public obj!: Obj;
}