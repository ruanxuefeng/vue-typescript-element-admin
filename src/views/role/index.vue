<template>
    <el-card shadow="hover">
        <el-tabs type="border-card" v-model="activeTab" @tab-remove="removeTab">
            <!--列表-->
            <el-tab-pane name="list" :closable='false'>
                <span slot="label"><svg-icon icon-class="list"></svg-icon> 角色列表</span>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input v-model="query.name" placeholder="角色名称" clearable
                                  @keyup.enter.native="getList"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                        v-loading="data.tableLoading"
                        :data="data.list"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="角色名称" prop="name" width="200px"
                                     :align="data.commonAlign"></el-table-column>
                    <el-table-column label="备注" prop="memo" width="450px"
                                     :align="data.commonAlign"></el-table-column>
                    <el-table-column label="创建人" width="150px" :align="data.commonAlign">
                        <template slot-scope="scope">
                            {{ scope.row.creatorName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" width="200px"
                                     :align="data.commonAlign"></el-table-column>

                    <el-table-column label="操作" :align="data.commonAlign" class-name="small-padding fixed-width"
                                     min-width="300px">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                                <el-button type="primary" @click="openAssignPermissionsDialog(scope.row)">
                                    分配权限
                                </el-button>
                                <el-button type="danger" @click="handleDelete(scope.row)">
                                    删除
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                            :limit.sync="query.pageSize" :page-sizes="data.pageSizes" :layout="data.layout"
                            @pagination="getList"/>
            </el-tab-pane>
            <!--新增tab-->
            <el-tab-pane name="add" :closable='false'>
                <span slot="label"><svg-icon icon-class="add"></svg-icon> 新增</span>
                <role-form type="ADD" @handle-update="saveHandle"></role-form>
            </el-tab-pane>
            <!--编辑tabs-->
            <el-tab-pane v-for="(tab,index) in tabs" :key="index" :name="tab.name" closable>
                <span slot="label"><svg-icon icon-class="edit"></svg-icon> {{tab.label}}</span>
                <role-form :obj="tab.obj" type="UPDATE" @handle-update="updateHandle"></role-form>
            </el-tab-pane>
        </el-tabs>
        <!--分配权限弹窗-->
        <el-dialog :visible.sync="dialogAssignPermissionsVisible" title="分配权限">
            <el-tree
                    ref="tree"
                    :props="{
                          label: 'name',
                          children: 'children'
                     }"
                    :data="permissionTree"
                    :default-checked-keys="rolePermission"
                    node-key="mark"
                    show-checkbox></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAssignPermissionsVisible = false">取消</el-button>
                <el-button type="primary" @click="assignPermissions">保存</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';

    import Pagination from '@/components/Pagination/index.vue';
    import RoleForm from './components/Form.vue';

    import {confirmDelete, success} from '@/util/MessageUtils';
    import Data from '@/class/Data';
    import Query from '@/views/role/class/Query';
    import RoleTab from '@/views/role/class/RoleTab';
    import {del, list, save, update, rolePermission, permissionTree, updatePermission} from '@/views/role/api';
    import Obj from './class/Role';
    import {getTabEditName, removeTab} from '@/util/TabUtils';
    import {UserState} from '@/store/modules/User';
    import RolePermission from '@/views/role/class/RolePermission';

    @Component({
        components: {
            Pagination,
            RoleForm
        },
    })
    export default class Role extends Vue {

        public $refs!: {
            dataForm: HTMLFormElement,
            tree: HTMLFormElement,
        };

        private activeTab = 'list';
        private data = new Data();
        private query = new Query();
        private dialogAssignPermissionsVisible = false;
        private permissionTree = [];
        private rolePermission = [];
        private id = '';
        private tabs: RoleTab[] = [];

        private created() {
            this.getList();
        }

        private getList() {
            this.data.tableLoading = true;
            list(this.query).then((resp: any) => {
                const data = resp.data;
                this.data.list = data.rows;
                this.query.total = data.total;

                this.data.tableLoading = false;
            });
        }

        private removeTab(tabName: string) {
            if (this.activeTab === tabName) {
                this.activeTab = 'list';
            }
            this.tabs = removeTab(this.tabs, tabName);
        }

        private saveHandle(data: Obj) {
            save(data).then((resp) => {
                this.editSuccess(resp.data.message);
                this.activeTab = 'list';
            });
        }

        private handleUpdate(row: any) {
            const {id, name, memo} = row;
            const tabs = this.tabs.filter(tab => tab.name === `edit-${id}`);
            if (tabs.length === 0) {
                const tab = {
                    name: getTabEditName(id),
                    label: `编辑-${name}`,
                    obj: {id, name, memo},
                };
                this.tabs.push(tab);
                this.activeTab = tab.name;
            } else {
                this.activeTab = tabs[0].name;
            }
        }

        private updateHandle(data: Obj) {
            update(data).then((resp) => {
                this.editSuccess(resp.data.message);
                this.removeTab(this.activeTab);
                this.activeTab = 'list';
            });
        }

        private editSuccess(message: string) {
            success('成功', message);
            this.data.dialogFormVisible = false;
            this.getList();
        }

        private handleDelete(row: any) {
            const that = this;
            confirmDelete('删除提示', `${row.name}将要被删除`, '确定', '取消', () => {
                del(row.id).then((resp: any) => {
                    success('成功', resp.data.message);
                    that.getList();
                });
            });
        }

        private openAssignPermissionsDialog(row: any) {
            const that = this;
            axios.all([permissionTree(), rolePermission(row.id)])
                .then(axios.spread((permissionTreeResp, rolePermissionResp) => {
                    that.permissionTree = permissionTreeResp.data;
                    that.rolePermission = rolePermissionResp.data;
                    that.dialogAssignPermissionsVisible = true;
                    that.id = row.id;
                }));
        }

        private assignPermissions() {
            if (this.id) {
                updatePermission(this.id, this.$refs.tree.getCheckedKeys()).then((resp: any) => {
                    success('成功', resp.data.message);
                    UserState.resetRouter();
                    this.dialogAssignPermissionsVisible = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
