<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.name" placeholder="角色名称" :clearable="true" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="getList"></el-input>

            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
                搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                       @click="handleCreate">
                新增
            </el-button>
        </div>
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
            <el-table-column label="备注" prop="describe" width="450px"
                             :align="data.commonAlign"></el-table-column>
            <el-table-column label="创建人" width="150px" :align="data.commonAlign">
                <template slot-scope="scope">
                    {{ scope.row.creatorName }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="200px" :align="data.commonAlign"></el-table-column>

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

        <!--编辑弹窗-->
        <el-dialog :visible.sync="data.dialogFormVisible" :title="data.dialogStatus === 'create' ? '新增' : '编辑'">
            <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left" label-width="80px"
                     style="width: 800px; margin-left:50px;">

                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="obj.name" placeholder="角色名称" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="key">
                    <el-input v-model="obj.describe" placeholder="备注" :rows="6" maxlength="200"
                              type="textarea"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="data.dialogStatus==='create'?create():update()">
                    保存
                </el-button>
            </div>
        </el-dialog>

        <!--分配权限弹窗-->
        <el-dialog :visible.sync="dialogAssignPermissionsVisible" title="分配权限">
            <el-tree
                    ref="tree"
                    :props="{
                          label: 'name',
                          children: 'children'
                     }"
                    :data="allMenuList"
                    :default-checked-keys="selectMenuList"
                    node-key="id"
                    show-checkbox></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAssignPermissionsVisible = false">取消</el-button>
                <el-button type="primary" @click="assignPermissions">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';

    import Pagination from '@/components/Pagination/index.vue';

    import {confirmDelete, success} from '@/utils/message';
    import Data from '@/class/Data';
    import Query from './Query';
    import Obj from './Role';
    import {del, list, roleMenuList, save, update, updateMenuList} from '@/api/system/role';
    import {allMenuList} from '@/api/system/menu';
    import Rule from '@/class/Rule';

    @Component({
        components: {
            Pagination,
        },
    })
    export default class Role extends Vue {

        public $refs!: {
            dataForm: HTMLFormElement,
            tree: HTMLFormElement,
        };

        private data = new Data();
        private query = new Query();
        private obj = new Obj();
        private dialogAssignPermissionsVisible = false;
        private selectMenuList = [];
        private allMenuList = [];
        private rules = {
            name: [new Rule({message: '请输入角色名称'})],
        };

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

        private handleCreate() {
            this.data.dialogStatus = 'create';
            this.data.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs.dataForm.resetFields();
                this.obj = new Obj();
            });
        }

        private create() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    const {name, describe} = this.obj;
                    save({name, describe}).then((resp: any) => {
                        this.editSuccess(resp.data.message);
                    });
                }
            });
        }

        private handleUpdate(row: any) {
            this.data.dialogStatus = 'update';
            this.data.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs.dataForm.resetFields();
                const {id, name, describe} = row;
                this.obj = {id, name, describe};
            });
        }

        private update() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    update(this.obj).then((resp: any) => {
                        this.editSuccess(resp.data.message);
                    });
                }
            });
        }

        private editSuccess(message: string) {
            success('成功', message);
            this.data.dialogFormVisible = false;
            this.obj = new Obj();
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

        private cancel() {
            this.data.dialogFormVisible = false;
            this.obj = new Obj();
        }

        private openAssignPermissionsDialog(row: any) {
            const that = this;
            axios.all([allMenuList(), roleMenuList(row.id)])
                .then(axios.spread((allMenuListResp, roleMenuListResp) => {
                    that.allMenuList = allMenuListResp.data;
                    that.selectMenuList = roleMenuListResp.data;
                    that.dialogAssignPermissionsVisible = true;
                    that.obj.id = row.id;
                }));
        }

        private assignPermissions() {
            if (this.obj.id) {
                updateMenuList(this.obj.id, this.$refs.tree.getCheckedKeys()).then((resp: any) => {
                    success('成功', resp.data.message);
                    this.dialogAssignPermissionsVisible = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
