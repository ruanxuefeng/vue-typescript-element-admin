<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :unique-opened="false"
                    :active-text-color="variables.menuActiveText"
                    :collapse-transition="false"
                    mode="vertical">
                <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path" :is-nest="false"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';

    import variables from '@/styles/variables.scss';
    import Logo from './Logo.vue';
    import SidebarItem from './SidebarItem.vue';
    import SideBarClass from '@/store/types/Sidebar';
    import RouteConfigImpl from '@/router/RouteRecordImpl';

    @Component({
        components: {
            Logo,
            SidebarItem,
        },
    })
    export default class Sidebar extends Vue {

        @Getter('routers')
        private routers!: RouteConfigImpl[];

        @Getter('sidebar')
        private sidebar!: SideBarClass;

        get activeMenu() {
            const route = this.$route;
            const {meta, path} = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }

        get showLogo() {
            return this.$store.state.settings.sidebarLogo;
        }

        get variables() {
            return variables;
        }

        get isCollapse() {
            return !this.sidebar.opened;
        }
    }
</script>

<style scoped>

</style>
