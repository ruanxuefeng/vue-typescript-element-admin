import Vue, {AsyncComponent, ComponentOptions} from 'vue';
import {RouteConfig} from 'vue-router';

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;
export default class RouteConfigImpl implements RouteConfig {
    public path!: string;
    public name?: string;
    public component?: Component;
    public redirect?: string;
    public children?: RouteConfigImpl[];
    public meta?: any;

    public hidden?: boolean = false;
    public permissions?: string[];
    public fullPath?: string;
    public noShowingChildren?: boolean;
}
