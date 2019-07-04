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
                <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path"
                              :is-nest="false"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import variables from '@/styles/variables.scss';
    import Logo from './Logo.vue';
    import SidebarItem from './SidebarItem.vue';
    import {UserState} from '@/store/modules/User';
    import {AppState} from '@/store/modules/App';
    import {SettingsState} from '@/store/modules/Setting';

    @Component({
        components: {
            Logo,
            SidebarItem,
        },
    })
    export default class Sidebar extends Vue {


        get activeMenu() {
            const route = this.$route;
            const {meta, path} = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }

        get sidebar() {
            return AppState.sidebar;
        }

        get routers() {
            return UserState.routers;
        }

        get showLogo() {
            return SettingsState.sidebarLogo;
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
