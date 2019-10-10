<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device === 'mobile'&& sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container"></sidebar>
        <div :class="{hasTagsView:needTagsView}" class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <navbar/>
                <web-socket></web-socket>
                <tags-view v-if="needTagsView"/>
            </div>
            <app-main/>
            <!--<right-panel v-if="showSettings">
              <settings />
            </right-panel>-->
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import {AppMain, Navbar, Sidebar, TagsView} from './components';
    import WebSocket from '@/components/WebSocket/index.vue';
    import {AppState} from '@/store/modules/App';
    import {SettingsState} from '@/store/modules/Setting';

    @Component({
        components: {
            AppMain,
            Sidebar,
            Navbar,
            WebSocket,
            TagsView,
        },
    })
    export default class Layout extends Vue {

        get classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile',
            };
        }

        get fixedHeader() {
            return SettingsState.fixedHeader;
        }

        get needTagsView() {
            return SettingsState.tagsView;
        }

        get sidebar() {
            return AppState.sidebar;
        }

        get device() {
            return AppState.device;
        }

        private handleClickOutside() {
        }

    }

</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>
