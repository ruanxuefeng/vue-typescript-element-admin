<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <svg-icon :icon-class="item.meta.icon" style="margin-right: 5px"></svg-icon>
                <span class="no-redirect">{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
    import pathToRegexp from 'path-to-regexp';
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {RouteRecord} from 'vue-router';

    @Component
    export default class Breadcrumb extends Vue {

        private static isDashboard(route: any) {
            const name = route && route.name;
            if (!name) {
                return false;
            }
            return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
        }

        private levelList: RouteRecord[] = [];

        @Watch('$route')
        private routeChange() {
            this.getBreadcrumb();
        }

        private created() {
            this.getBreadcrumb();
        }

        private getBreadcrumb() {
            // only show routes with meta.title
            this.levelList = this.$route.matched.filter((item) => item.meta && item.meta.title);
        }

        private pathCompile(path: any) {
            // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
            const {params} = this.$route;
            const toPath = pathToRegexp.compile(path);
            return toPath(params);
        }

        private handleLink(item: any) {
            const {redirect, path} = item;
            if (redirect) {
                this.$router.push(redirect);
                return;
            }
            this.$router.push(this.pathCompile(path));
        }
    }
</script>

<style lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
