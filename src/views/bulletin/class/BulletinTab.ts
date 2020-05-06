import {Tab} from '@/class/Tab';
import Obj from './Bulletin';

export default class ScheduledTaskTab implements Tab {
    public name!: string;
    public label!: string;
    public obj!: Obj;
}
