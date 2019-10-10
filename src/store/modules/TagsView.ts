import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

import store from '@/store';
import View from '@/store/types/View';

export interface TagsView {
    $visitedViews: View[];
    $cachedViews: View[];
}

@Module({dynamic: true, store, name: 'tagsView'})
export default class TagsViewImpl extends VuexModule implements TagsView {
    public $visitedViews: View[] = [];
    public $cachedViews: View[] = [];

    @Action
    public addVisitedView(view: View) {
        this.addVisitedViewMutation(view);
    }

    @Action
    public addCachedView(view: View) {
        this.addCachedViewMutation(view);
    }

    @Action
    public addView(view: View) {
        this.addVisitedViewMutation(view);
        this.addCachedViewMutation(view);
    }

    @Action
    public deleteView(view: View) {
        return new Promise(((resolve) => {
            this.delVisitedViewMutation(view);
            this.delCachedViewMutation(view);
            resolve({
                visitedViews: [...this.$visitedViews],
                cachedViews: [...this.$cachedViews],
            });
        }));
    }

    @Action
    public deleteCachedView(view: View) {
        this.delCachedViewMutation(view);
    }

    @Action
    public deleteOthersViews(view: View) {
        this.delOthersVisitedViewsMutation(view);
        this.delOthersCachedViewsMutation(view);
    }

    @Action
    public deleteAllViews() {
        this.delAllVisitedViewsMutation();
        this.delAllCachedViewsMutation();
    }

    @Action
    public updateVisitedView(view: View) {
        this.updateVisitedViewMutation(view);
    }

    get visitedViews(): View[] {
        return this.$visitedViews;
    }

    get cachedViews(): View[] {
        return this.$cachedViews;
    }

    @Mutation
    private updateVisitedViewMutation(view: View) {
        for (let v of this.$visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break;
            }
        }
    }

    @Mutation
    private delAllVisitedViewsMutation() {
        // keep affix tags
        this.$visitedViews = this.$visitedViews.filter((tag) => tag.meta.affix);
    }

    @Mutation
    private delAllCachedViewsMutation() {
        this.$cachedViews = [];
    }

    @Mutation
    private delOthersCachedViewsMutation(view: View) {
        for (const [i, v] of this.$cachedViews.entries()) {
            if (v.name === view.name) {
                this.$cachedViews = this.$cachedViews.slice(i, i + 1);
                break;
            }
        }
    }

    @Mutation
    private delOthersVisitedViewsMutation(view: View) {
        this.$visitedViews = this.$visitedViews.filter((v) => {
            return v.meta.affix || v.path === view.path;
        });
    }

    @Mutation
    private addVisitedViewMutation(view: View) {
        if (this.$visitedViews.some((item) => item.path === view.path)) {
            return;
        } else {
            this.$visitedViews.push(view);
        }
    }

    @Mutation
    private addCachedViewMutation(view: View) {
        if (this.$cachedViews.some((item) => item.path === view.path)) {
            return;
        }
        if (!view.meta.noCache) {
            this.$cachedViews.push(view);
        }
    }

    @Mutation
    private delVisitedViewMutation(route: View) {
        for (const [i, v] of this.$visitedViews.entries()) {
            if (v.path === route.path) {
                this.$visitedViews.splice(i, 1);
                break;
            }
        }
    }

    @Mutation
    private delCachedViewMutation(route: View) {
        for (const [i, item] of this.$cachedViews.entries()) {
            if (item.name === route.name) {
                this.$cachedViews.splice(i, 1);
                break;
            }
        }
    }
}

export const TagsViewState = getModule(TagsViewImpl);
