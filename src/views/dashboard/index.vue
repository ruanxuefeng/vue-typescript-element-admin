<template>
    <div class="dashboard-container">
        <component :is="currentRole"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import EditorDashboard from './editor/index.vue';

    @Component({
        components: {
            EditorDashboard,
        },
    })
    export default class Dashboard extends Vue {
        private currentRole: string = 'EditorDashboard';
    }
</script>

<style scoped>

</style>
