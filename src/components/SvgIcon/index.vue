<template>
    <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners"></div>
    <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    // doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
    import {isExternal} from '@/util/ValidateUtils';

    @Component
    export default class SvgClass extends Vue {
        @Prop(String)
        private iconClass!: string;
        @Prop(String)
        private className?: string;

        get styleExternalIcon(): object {
            return {
                'mask': `url(${this.iconClass}) no-repeat 50% 50%`,
                '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
            };
        }

        get isExternal() {
            return isExternal(this.iconClass);
        }

        get iconName(): string {
            return `#icon-${this.iconClass}`;
        }

        get svgClass(): string {
            if (this.className) {
                return 'svg-icon ' + this.className;
            } else {
                return 'svg-icon';
            }
        }
    }
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .svg-external-icon {
        background-color: currentColor;
        mask-size: cover !important;
        display: inline-block;
    }
</style>
