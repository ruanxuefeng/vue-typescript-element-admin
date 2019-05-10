<template>
    <div>{{name}}</div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Dashboard extends Vue {
        private name: string = 'asdfasdfsadf';
    }
</script>

<style scoped>

</style>
