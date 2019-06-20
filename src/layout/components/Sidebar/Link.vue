<template>
    <!-- eslint-disable vue/require-component-is -->
    <component v-bind="linkProps(to)">
        <slot/>
    </component>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import {isExternal} from '@/utils/validate';

    @Component
    export default class AppLink extends Vue {
        @Prop(String)
        private to!: string;

        private linkProps(url: string) {
            if (isExternal(url)) {
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener',
                };
            }
            return {
                is: 'router-link',
                to: url,
            };
        }
    }
</script>
