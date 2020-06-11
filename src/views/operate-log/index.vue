<template>
    <el-card shadow="hover">
        <el-tabs type="border-card" v-model="activeTab">
            <el-tab-pane :closable='false' name="list">
                <span slot="label"><svg-icon icon-class="list"></svg-icon> 用户操作日志</span>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input :clearable="true" @keyup.enter.native="getList" class="filter-item" placeholder="操作人"
                                  style="width: 200px;" v-model="query.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input :clearable="true" @keyup.enter.native="getList" class="filter-item" placeholder="菜单"
                                  style="width: 200px;" v-model="query.menu"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input :clearable="true" @keyup.enter.native="getList" class="filter-item"
                                  placeholder="操作" style="width: 200px;" v-model="query.operate"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            :picker-options="pickerOptions"
                            @change="dateChange"
                            align="right"
                            class="filter-item"
                            style="width: 400px;"
                            type="daterange"
                            unlink-panels
                            v-model="dates"
                            value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList" class="filter-item" icon="el-icon-search" type="primary">
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    :data="data.list"
                    border
                    fit
                    highlight-current-row
                    v-loading="data.tableLoading"
                >
                    <el-table-column type="index" width="50px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="菜单" prop="menu"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="操作" prop="operate"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="操作人" prop="name"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="IP" prop="ip"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="操作时间" prop="createTime"></el-table-column>
                </el-table>

                <pagination :limit.sync="query.pageSize" :page.sync="query.page" :total="query.total"
                            @pagination="getList" v-show="query.total > query.pageSize"/>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Pagination from '../../components/Pagination/index.vue';
import Query from './Query';
import {list} from '@/views/operate-log/api';
import Data from '@/class/Data';

@Component({
    components: {
        Pagination,
    },
})
export default class OperateLog extends Vue {
    private query = new Query();
    private data = new Data();
    private dates: string[] = [];
    private activeTab = 'list';
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
