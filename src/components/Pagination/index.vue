<template>
    <div :class="{'hidden':hidden}" class="pagination-container">
        <el-pagination
                :background="background"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                :layout="layout"
                :page-sizes="pageSizes"
                :total="total"
                v-bind="$attrs"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {scrollTo} from '@/uitils/scroll-to';

    @Component
    export default class Pagination extends Vue {
        @Prop(Number)
        private total!: number;

        @Prop(Number)
        private page!: number;

        @Prop(Number)
        private limit!: number;

        @Prop(Array)
        private pageSizes!: number[];

        @Prop(String)
        private layout!: string;

        @Prop(Boolean)
        private background!: boolean;

        @Prop(Boolean)
        private autoScroll!: boolean;

        @Prop(Boolean)
        private hidden!: boolean;

        get currentPage() {
            return this.page;
        }

        set currentPage(page: number) {
            this.$emit('update:page', page);
        }

        get pageSize() {
            return this.limit;
        }

        set pageSize(val: number) {
            this.$emit('update:limit', val);
        }


        private handleSizeChange(val: number) {
            this.$emit('pagination', {page: this.currentPage, limit: val});
            if (this.autoScroll) {
                scrollTo(0, 800);
            }
        }

        private handleCurrentChange(val: number) {
            this.$emit('pagination', {page: val, limit: this.pageSize});
            if (this.autoScroll) {
                scrollTo(0, 800);
            }
        }
    }
</script>

<style scoped>
    .pagination-container {
        background: #fff;
        padding: 32px 16px;
    }

    .pagination-container.hidden {
        display: none;
    }
</style>
