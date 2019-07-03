<template>
    <div id="tags-view-container" class="tags-view-container">
        <el-scrollbar ref="scrollContainer" :vertical="false" class="tags-view-wrapper scroll-container">
            <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :key="tag.path"
                    :class="isActive(tag)?'active':''"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    tag="span"
                    class="tags-view-item"
                    @click.middle.native="closeTag(tag)"
            >
                {{ tag.meta.title }}
                <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeTag(tag)"></span>
            </router-link>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import path from 'path';

    import RouteRecordImpl from '@/router/RouteRecordImpl';
    import {RouteConfig} from 'vue-router';
    import {TagsViewState} from '@/store/modules/TagsView';
    import {UserState} from '@/store/modules/User';

    @Component
    export default class TagsView extends Vue {

        private affixTags!: RouteRecordImpl[];
        private selectedTag!: RouteConfig;

        @Watch('$route')
        private route() {
            this.addTags();
        }

        get visitedViews() {
            return TagsViewState.visitedViews;
        }

        get routers() {
            return UserState.routers;
        }

        private mounted() {
            this.init();
            this.addTags();
        }

        private isActive(route: RouteRecordImpl) {
            return route.path === this.$route.path;
        }

        private init() {
            const affixTags = this.affixTags = this.filterAffixTags(this.routers);
            affixTags.forEach((item) => {
                const {path, name, fullPath, meta} = item;
                TagsViewState.addView({path, name, fullPath, meta});
            });
        }

        private filterAffixTags(routes: RouteRecordImpl[], basePath = '/') {
            let tags: RouteRecordImpl[] = [];
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path);
                    const {name, component, children, meta} = route;
                    const newRoute: RouteRecordImpl = {
                        name,
                        path: tagPath,
                        fullPath: tagPath,
                        children,
                        meta,
                        component,
                    };
                    tags.push(newRoute);
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(route.children, route.path);
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags];
                    }
                }
            });
            return tags;
        }

        private addTags() {
            const {name} = this.$route;
            if (name) {
                const {path, name, fullPath, meta} = this.$route;
                TagsViewState.addView({path, name, fullPath, meta});
            }
        }

        private closeTag(tag: RouteRecordImpl) {
            const {path, name, fullPath, meta} = tag;
            TagsViewState.deleteView({path, name, fullPath, meta}).then((obj: any) => {
                const {visitedViews} = obj;
                if (this.isActive(tag)) {
                    this.toLastView(visitedViews, tag);
                }
            });
        }

        private toLastView(visitedViews: RouteRecordImpl[], view: RouteRecordImpl) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
                this.$router.push(latestView);
            } else {
                // now the default is to redirect to the home page if there is no tags-view,
                // you can adjust it according to your needs.
                if (view.name === 'Dashboard') {
                    // to reload home page
                    this.$router.replace({path: '/redirect' + view.fullPath});
                } else {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags-view-container {
        height: 34px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

        .tags-view-wrapper {
            .tags-view-item {
                display: inline-block;
                position: relative;
                cursor: pointer;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;

                &:first-of-type {
                    margin-left: 15px;
                }

                &:last-of-type {
                    margin-right: 15px;
                }

                &.active {
                    background-color: #42b983;
                    color: #fff;
                    border-color: #42b983;

                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 2px;
                    }
                }
            }
        }

        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 3000;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }
            }
        }
    }
</style>

<style lang="scss">
    //reset element css of el-icon-close
    .tags-view-wrapper {
        .tags-view-item {
            .el-icon-close {
                width: 16px;
                height: 16px;
                vertical-align: 2px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;

                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }

                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
    .scroll-container {
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        width: 100%;

        /deep/ {
            .el-scrollbar__bar {
                bottom: 0px;
            }

            .el-scrollbar__wrap {
                height: 49px;
            }
        }
    }
</style>
