import {Tab} from '@/class/Tab';

export function getTabEditName(id: string) {
    return `edit-${id}`;
}

export function removeTab<T extends Tab>(tabs: T[], tabName: string) {
    return tabs.filter(tab => tab.name !== tabName);
}