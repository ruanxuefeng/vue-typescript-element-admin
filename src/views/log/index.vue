<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.name" placeholder="操作人" :clearable="true" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="getList"></el-input>
            <el-input v-model="query.menu" placeholder="菜单" :clearable="true" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="getList"></el-input>
            <el-input v-model="query.operate" placeholder="操作" :clearable="true"
                      style="width: 200px;" class="filter-item" @keyup.enter.native="getList"></el-input>

            <el-date-picker
                    class="filter-item"
                    style="width: 400px;"
                    v-model="dates"
                    :picker-options="pickerOptions"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    align="right"
                    unlink-panels
                    @change="dateChange"></el-date-picker>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
                搜索
            </el-button>
        </div>
        <el-table
                v-loading="data.tableLoading"
                :data="data.list"
                border
                fit
                highlight-current-row
        >
            <el-table-column type="index" width="50px"></el-table-column>
            <el-table-column label="菜单" prop="menu" :align="data.commonAlign"></el-table-column>
            <el-table-column label="操作" prop="operate" :align="data.commonAlign"></el-table-column>
            <el-table-column label="操作人" prop="name" :align="data.commonAlign"></el-table-column>
            <el-table-column label="IP" prop="ip" :align="data.commonAlign"></el-table-column>
            <el-table-column label="操作时间" prop="createTime" :align="data.commonAlign"></el-table-column>
        </el-table>

        <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                    :limit.sync="query.pageSize" @pagination="getList"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Pagination from '../../components/Pagination/index.vue';
    import Query from './Query';
    import {list} from '@/api/log';
    import Data from '@/class/Data';

    @Component({
        components: {
            Pagination,
        },
    })
    export default class User extends Vue {
        private query = new Query();
        private data = new Data();
        private dates: string[] = [];
        private pickerOptions = {
            shortcuts: [{
                text: '最近一周',
                onClick(picker: any) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                },
            }, {
                text: '最近一个月',
                onClick(picker: any) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                },
            }, {
                text: '最近三个月',
                onClick(picker: any) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                },
            }],
        };

        private created() {
            this.getList();
        }

        private getList() {
            this.data.tableLoading = true;
            list(this.query).then((resp) => {
                const data = resp.data;
                this.data.list = data.rows;
                this.query.total = data.total;
                this.query.pageSize = data.pageSize;

                this.data.tableLoading = false;
            });
        }

        private dateChange(value: string[]) {
            if (value && value.length > 0) {
                this.query.startDate = value[0];
                this.query.endDate = value[1];
            } else {
                this.query.startDate = '';
                this.query.endDate = '';
            }
        }
    }
</script>

<style scoped>

</style>
