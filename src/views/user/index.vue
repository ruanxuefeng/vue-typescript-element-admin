<template>
    <el-card shadow="hover">
        <el-tabs @tab-remove="removeTab" type="border-card" v-model="activeTab">
            <!--列表-->
            <el-tab-pane :closable='false' name="list">
                <span slot="label"><svg-icon icon-class="list"></svg-icon> 用户列表</span>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input @keyup.enter.native="search" clearable placeholder="姓名"
                                  v-model="query.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input @keyup.enter.native="search" clearable placeholder="邮箱"
                                  v-model="query.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input @keyup.enter.native="search" clearable placeholder="用户名"
                                  v-model="query.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList" icon="el-icon-search" type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="data.list" border fit highlight-current-row v-loading="data.tableLoading">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="头像" prop="avatar" width="100px">
                        <template slot-scope="scope">
                            <pic :content="scope.row.avatar" type="SERVER_RESOURCE" style="width: 40px;height: 40px;border-radius: 10px;font-size: 20px;"></pic>
                        </template>
                    </el-table-column>
                    <el-table-column :align="data.commonAlign" label="用户名" prop="username"
                                     width="200px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="姓名" prop="name" width="200px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="邮箱" prop="email" width="300px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="性别" prop="gender" width="100px">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.gender === '男'">男</el-tag>
                            <el-tag type="warning" v-else>女</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column :align="data.commonAlign" label="创建人" width="150px">
                        <template slot-scope="scope">
                            {{ scope.row['creatorName'] }}
                        </template>
                    </el-table-column>
                    <el-table-column :align="data.commonAlign" label="创建时间" prop="createTime"
                                     width="200px"></el-table-column>

                    <el-table-column :align="data.commonAlign" label="操作" min-width="300px">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button @click="handleUpdate(scope.row)" type="primary">编辑</el-button>
                                <el-button @click="restPassword(scope.row)" type="primary">重置密码</el-button>
                                <el-button @click="openUpdateRoleDialog(scope.row)" type="primary">分配角色</el-button>
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
                <user-form @handle-update="saveHandle" type="ADD"></user-form>
            </el-tab-pane>
            <!--编辑tabs-->
            <el-tab-pane :key="tab.name" :name="tab.name" closable v-for="tab in tabs">
                <span slot="label"><svg-icon icon-class="edit"></svg-icon> {{tab.label}}</span>
                <user-form :obj="tab.obj" @handle-update="updateHandle" type="UPDATE"></user-form>
            </el-tab-pane>
        </el-tabs>

        <!--更该角色弹窗-->
        <el-dialog :visible.sync="dialogUpdateRoleVisible" title="编辑角色">
            <el-transfer
                :data="roles"
                :filter-method="filterRole"
                :props="{
                        key:'id',
                        label:'name'
                     }"
                :titles="['待选角色', '已选角色']"
                filter-placeholder="请输入角色名称"
                filterable
                v-model="userRole.roleIdList"></el-transfer>
            <div slot="footer">
                <el-button @click="dialogUpdateRoleVisible = false">取消</el-button>
                <el-button @click="updateRole" type="primary">保存</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import axios from 'axios';

import Pagination from '@/components/Pagination/index.vue';
import UserForm from '@/views/user/components/Form.vue';

import Data from '@/class/Data';
import {del, list, resetPassword, save, update, updateRole, userRoleList} from '@/views/user/api';
import {roleList} from '@/views/role/api';
import {confirmDelete, success} from '@/utils/MessageUtils';
import Query from '@/views/user/class/Query';
import UserTab from './class/UserTab';
import UserRole from './class/UserRole';
import {getTabEditName, removeTab} from '@/utils/TabUtils';

@Component({
    components: {
        Pagination,
        UserForm,
    },
})
export default class User extends Vue {

    private activeTab = 'list';
    private query = new Query();
    private data = new Data();
    private roles = [];
    private userRole: UserRole = {id: '', roleIdList: []};
    private dialogUpdateRoleVisible = false;
    private tabs: UserTab[] = [];

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

    private saveHandle(data: FormData) {
        save(data).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
            this.activeTab = 'list';
        });
    }

    private handleUpdate(row: any) {
        const tabs = this.tabs.filter(tab => tab.name === getTabEditName(row.id));
        if (tabs.length === 0) {
            const tab = {
                name: getTabEditName(row.id),
                label: `编辑-${row.name}`,
                obj: row,
            };
            this.tabs.push(tab);
            this.activeTab = tab.name;
        } else {
            this.activeTab = tabs[0].name;
        }
    }

    private updateHandle(data: FormData) {
        update(data).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
            this.removeTab(this.activeTab);
            this.activeTab = 'list';
        });
    }

    private removeTab(tabName: string) {
        if (this.activeTab === tabName) {
            this.activeTab = 'list';
        }
        this.tabs = removeTab(this.tabs, tabName);
    }

    private editSuccess() {
        this.data.dialogFormVisible = false;
        this.getList();
    }

    private handleDelete(row: any) {
        const that = this;
        confirmDelete('删除提示', `${row.name}将会被删除`, '确定', '取消', () => {
            del(row.id).then((resp) => {
                success('成功', resp.data.message);
                that.tabs = removeTab(this.tabs, getTabEditName(row.id));
                that.getList();
            });
        });
    }

    private filterRole(query: string, item: any) {
        if (item.name) {
            return item.name.indexOf(query) > -1;
        }
    }

    private openUpdateRoleDialog(row: any) {
        const that = this;
        axios.all([roleList(), userRoleList(row.id)])
            .then(axios.spread((allRoleListResp, userRoleListResp) => {
                that.roles = allRoleListResp.data;
                // this.$set(this.obj, 'roleIdList',  userRoleListResp.data);
                that.userRole = {roleIdList: (userRoleListResp.data as string[]), id: (row.id as string)};
                that.dialogUpdateRoleVisible = true;
            }));
    }

    private updateRole() {
        updateRole(this.userRole).then((resp) => {
            success('成功', resp.data.message);
            this.dialogUpdateRoleVisible = false;
            this.getList();
            this.userRole = {id: '', roleIdList: []};
        });
    }

    private restPassword(row: any) {
        const {id} = row;
        resetPassword(id).then((resp) => {
            success('成功', resp.data.message);
        });
    }

}
</script>

<style scoped>

</style>
