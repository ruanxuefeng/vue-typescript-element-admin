<template>
    <el-card shadow="hover">
        <el-tabs @tab-remove="removeTab" type="border-card" v-model="activeTab">
            <!--列表-->
            <el-tab-pane :closable='false' name="list">
                <span slot="label"><svg-icon icon-class="list"></svg-icon> 定时任务列表</span>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input @keyup.enter.native="getList" clearable placeholder="姓名"
                                  v-model="query.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList" icon="el-icon-search" type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="data.list" border fit highlight-current-row v-loading="data.tableLoading">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="任务名称" prop="name" width="200px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="corn表达式" prop="corn"
                                     width="300px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="标识" prop="bean" width="200px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="状态" prop="status" width="100px">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.status === 'Enable'">已启用</el-tag>
                            <el-tag type="danger" v-if="scope.row.status === 'Disable'">已禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column :align="data.commonAlign" label="上次执行日期" prop="latestDate"
                                     width="200px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="执行耗时(秒)" prop="timeConsuming"
                                     width="100px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="创建人" prop="creatorName"
                                     width="100px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="创建时间" prop="createTime"
                                     width="200px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="最后更新人" prop="updaterName"
                                     width="100px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="最后更新时间" prop="updatedTime"
                                     width="200px"></el-table-column>

                    <el-table-column :align="data.commonAlign" label="操作" min-width="300px">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button @click="handleUpdate(scope.row)" type="primary">编辑</el-button>
                                <el-button :type="scope.row.status === 'Enable'?'danger':'success'"
                                           @click="handleUpdateStatus(scope.row)">
                                    {{scope.row.status === 'Enable'?'禁用':'启用'}}
                                </el-button>
                                <el-button @click="trigger(scope.row)" type="primary">直接触发</el-button>
                                <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination :limit.sync="query.pageSize" :page.sync="query.page" :total="query.total"
                            @pagination="getList" v-show="query.total > query.pageSize"/>
            </el-tab-pane>
            <!--新增tab-->
            <el-tab-pane :closable='false' name="add">
                <span slot="label"><svg-icon icon-class="add"></svg-icon> 新增</span>
                <scheduled-task-form @handle-update="saveHandle" type="ADD"></scheduled-task-form>
            </el-tab-pane>
            <!--编辑tabs-->
            <el-tab-pane :key="tab.name" :name="tab.name" closable v-for="tab in tabs">
                <span slot="label"><svg-icon icon-class="edit"></svg-icon> {{tab.label}}</span>
                <scheduled-task-form :obj="tab.obj" @handle-update="updateHandle" type="UPDATE"></scheduled-task-form>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import Pagination from '@/components/Pagination/index.vue';
import ScheduledTaskForm from '@/views/scheduled-task/components/Form.vue';
import {getTabEditName, removeTab} from '@/utils/TabUtils';

import Query from '@/views/scheduled-task/class/Query';
import Data from '@/class/Data';
import {del, list, save, trigger, update, updateStatus} from '@/views/scheduled-task/api';
import ScheduledTaskTab from './class/ScheduledTaskTab';
import Obj from './class/ScheduledTask';
import {success} from '@/utils/MessageUtils';

@Component({
    components: {
        Pagination,
        ScheduledTaskForm
    },
})
export default class ScheduledTask extends Vue {
    private activeTab = 'list';
    private query = new Query();
    private data = new Data();
    private tabs: ScheduledTaskTab[] = [];

    private created() {
        this.getList();
    }

    private search() {
        this.query.page = 1;
        this.getList();
    }

    private getList() {
        this.data.tableLoading = true;
        list(this.query).then((resp) => {
            const data = resp.data;
            this.data.list = data.rows;
            this.query.total = data.total;

            this.data.tableLoading = false;
        });
    }

    private saveHandle(data: Obj) {
        save(data).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
        });
    }

    private updateHandle(data: Obj) {
        update(data).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
            this.removeTab(this.activeTab);
        });
    }

    private handleUpdate(row: any) {
        const {id, name, corn, bean, memo} = row;
        const tabs = this.tabs.filter(tab => tab.name === `edit-${id}`);
        if (tabs.length === 0) {
            const tab = {
                name: getTabEditName(id),
                label: `编辑-${name}`,
                obj: {id, name, corn, bean, memo},
            };
            this.tabs.push(tab);
            this.activeTab = tab.name;
        } else {
            this.activeTab = tabs[0].name;
        }
    }

    private handleUpdateStatus(row: any) {
        const {id} = row;
        updateStatus(id).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
        });
    }

    private trigger(row: any) {
        trigger(row.id).then((resp) => {
            success('成功', resp.data.message);
        });
    }

    private del(row: any) {
        del(row.id).then((resp) => {
            success('成功', resp.data.message);
        });
    }

    private editSuccess() {
        this.data.dialogFormVisible = false;
        this.getList();
    }

    private removeTab(tabName: string) {
        if (this.activeTab === tabName) {
            this.activeTab = 'list';
        }
        this.tabs = removeTab(this.tabs, tabName);
    }
}
</script>

<style scoped>

</style>
