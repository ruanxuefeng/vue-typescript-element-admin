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

        private static isScreenFull(sf: Screenfull | false) {
            return (sf as Screenfull).isFullscreen;
        }

        private isFullscreen = false;

        private mounted() {
            this.init();
        }

        private beforeDestroy() {
            this.destroy();
        }

        private click() {
            const sf = screenFull as Screenfull;
            if (!sf.enabled) {
                this.$message({
                    message: '您的浏览器不支持全屏显示',
                    type: 'warning',
                });
                return false;
            }
            sf.toggle();
        }

        private change() {
            this.isFullscreen = ScreenFull.isScreenFull(screenFull);
        }

        private init() {
            const sf = screenFull as Screenfull;
            if (sf.enabled) {
                sf.on('change', this.change);
            }
        }

        private destroy() {
            const sf = screenFull as Screenfull;
            if (sf.enabled) {
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
