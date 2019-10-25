import {Tab} from '@/class/Tab';
import Obj from './Book';

export  class BookTab implements Tab {
    public name!: string;
    public label!: string;
    public type!: TabType;
    public obj!: Obj;
}

export enum TabType {
    UPDATE = 'UPDATE',
    DETAIL = 'DETAIL',
}