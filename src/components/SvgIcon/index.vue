<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class SvgClass extends Vue {
        @Prop(String)
        private iconClass!: string;
        @Prop(String)
        private className?: string;

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
</style>
