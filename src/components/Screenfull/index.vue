<template>
    <div>
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
    </div>
</template>

<script lang="ts">
import screenFull, {Screenfull} from 'screenfull';
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ScreenFull extends Vue {

    private isFullscreen = false;

    private static isScreenFull(sf: Screenfull) {
        return sf.isFullscreen;
    }

    private mounted() {
        this.init();
    }

    private beforeDestroy() {
        this.destroy();
    }

    private click() {
        const sf = screenFull;
        if (!sf.isEnabled) {
            this.$message({
                message: '您的浏览器不支持全屏显示',
                type: 'warning',
            });
            return false;
        }
        sf.toggle();
    }

    private change() {
        this.isFullscreen = ScreenFull.isScreenFull(screenFull as Screenfull);
    }

    private init() {
        const sf = screenFull;
        if (sf.isEnabled) {
            sf.on('change', this.change);
        }
    }

    private destroy() {
        const sf = screenFull;
        if (sf.isEnabled) {
            sf.off('change', this.change);
        }
    }
}
</script>

<style scoped>
    .screenFull-svg {
        display: inline-block;
        cursor: pointer;
        fill: #5a5e66;;
        width: 20px;
        height: 20px;
        vertical-align: 10px;
    }
</style>
