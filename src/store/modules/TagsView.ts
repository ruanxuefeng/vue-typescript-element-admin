import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

import store from '@/store';
import View from '@/store/types/View';

export interface TagsView {
    visitedViews: View[];
    cachedViews: View[];
}

@Module({dynamic: true, store, name: 'tagsView'})
export default class TagsViewImpl extends VuexModule implements TagsView {
    public visitedViews: View[] = [];
    public cachedViews: View[] = [];

    @Action
    public addVisitedView(view: View) {
        this.ADD_VISITED_VIEW(view);
    }

    @Action
    public addCachedView(view: View) {
        this.ADD_CACHED_VIEW(view);
    }

    @Action
    public addView(view: View) {
        this.ADD_VISITED_VIEW(view);
        this.ADD_CACHED_VIEW(view);
    }

    @Action
    public deleteView(view: View) {
        return new Promise(((resolve) => {
            this.DEL_VISITED_VIEW(view);
            this.DEL_CACHED_VIEW(view);
            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            });
        }));
    }

    @Action
    public deleteCachedView(view: View) {
        this.DEL_CACHED_VIEW(view);
    }

    @Action
    public deleteOthersViews(view: View) {
        this.DEL_OTHERS_VISITED_VIEWS(view);
        this.DEL_OTHERS_CACHED_VIEWS(view);
    }

    @Action
    public deleteAllViews() {
        this.DEL_ALL_VISITED_VIEWS();
        this.DEL_ALL_CACHED_VIEWS();
    }

    @Action
    public updateVisitedView(view: View) {
        this.UPDATE_VISITED_VIEW(view);
    }

    @Mutation
    private UPDATE_VISITED_VIEW(view: View) {
        for (let v of this.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break;
            }
        }
    }

    @Mutation
    private DEL_ALL_VISITED_VIEWS() {
        // keep affix tags
        this.visitedViews = this.visitedViews.filter((tag) => tag.meta.affix);
    }

    @Mutation
    private DEL_ALL_CACHED_VIEWS() {
        this.cachedViews = [];
    }

    @Mutation
    private DEL_OTHERS_CACHED_VIEWS(view: View) {
        for (const [i, v] of this.cachedViews.entries()) {
            if (v.name === view.name) {
                this.cachedViews = this.cachedViews.slice(i, i + 1);
                break;
            }
        }
    }

    @Mutation
    private DEL_OTHERS_VISITED_VIEWS(view: View) {
        this.visitedViews = this.visitedViews.filter((v) => {
            return v.meta.affix || v.path === view.path;
        });
    }

    @Mutation
    private ADD_VISITED_VIEW(view: View) {
        if (this.visitedViews.some((item) => item.path === view.path)) {
            return;
        } else {
            this.visitedViews.push(view);
        }
    }

    @Mutation
    private ADD_CACHED_VIEW(view: View) {
        if (this.cachedViews.some((item) => item.path === view.path)) {
            return;
        }
        if (!view.meta.noCache) {
            this.cachedViews.push(view);
        }
    }

    @Mutation
    private DEL_VISITED_VIEW(route: View) {
        for (const [i, v] of this.visitedViews.entries()) {
            if (v.path === route.path) {
                this.visitedViews.splice(i, 1);
                break;
            }
        }
    }

    @Mutation
    private DEL_CACHED_VIEW(route: View) {
        for (const [i, item] of this.cachedViews.entries()) {
            if (item.name === route.name) {
                this.cachedViews.splice(i, 1);
                break;
            }
        }
    }
}

export const TagsViewState = getModule(TagsViewImpl);
