import {Tab} from '@/class/Tab';
import Obj from '@/views/scheduled-task/class/ScheduledTask';

export default class ScheduledTaskTab implements Tab {
    public name!: string;
    public label!: string;
    public obj!: Obj;
}
