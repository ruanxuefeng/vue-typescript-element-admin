import {Tab} from '@/class/Tab';

export function getTabEditName(id: string) {
    return `edit-${id}`;
}

export function getTabEditLabel(id: string) {
    return `编辑-${id}`;
}

export function getTabDetailName(id: string) {
    return `detail-${id}`;
}

export function getTabDetailLabel(name: string) {
    return `${name}`;
}

export function removeTab<T extends Tab>(tabs: T[], tabName: string) {
    return tabs.filter(tab => tab.name !== tabName);
}