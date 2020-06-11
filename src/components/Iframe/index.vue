<template>
    <div class="app-container" ref="appContainer">
        <iframe :style="{height: iframeHeight}" @load="changeFrameHeight" v-bind:src="url" v-if="url"></iframe>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RouteRecordImpl from '@/router/RouteRecordImpl';

@Component({
    components: {},
})
export default class Iframe extends Vue {
    public $refs!: {
        appContainer: HTMLDivElement,
    };
    private url = '';
    private iframeHeight = '800px';

    private mounted () {
        const {meta} = this.$route as RouteRecordImpl;
        this.url = meta.url;
        const appMainHeight = this.$refs.appContainer.parentElement?.offsetHeight ?? 1000;
        this.iframeHeight = `${appMainHeight - 55}px`;
    }
}
</script>

<style scoped>
    iframe {
        border: none;
        width: 100%;
    }
</style>
