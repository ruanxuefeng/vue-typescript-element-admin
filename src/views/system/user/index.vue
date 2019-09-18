<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.name" placeholder="姓名" :clearable="true" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="getList"></el-input>
            <el-input v-model="query.email" placeholder="邮箱" :clearable="true" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="getList"></el-input>
            <el-input v-model="query.username" placeholder="用户名" :clearable="true" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="search"></el-input>

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
            <el-table-column label="头像" prop="avatar" width="100px" :align="data.commonAlign">
                <template slot-scope="scope">
                    <img :src="`${scope.row.avatar}?d=${new Date().getTime()}`"
                         style="width: 40px;height: 40px;border-radius: 10px" alt="头像">
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="username" width="200px"
                             :align="data.commonAlign"></el-table-column>
            <el-table-column label="姓名" prop="name" width="200px"
                             :align="data.commonAlign"></el-table-column>
            <el-table-column label="邮箱" prop="email" width="300px"
                             :align="data.commonAlign"></el-table-column>
            <el-table-column label="性别" prop="gender" width="100px" :align="data.commonAlign">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.gender === '男'" type="success">男</el-tag>
                    <el-tag v-else type="warning">女</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="创建人" width="150px" :align="data.commonAlign">
                <template slot-scope="scope">
                    {{ scope.row['creatorName'] }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="200px"
                             :align="data.commonAlign"></el-table-column>

            <el-table-column label="操作" :align="data.commonAlign" class-name="small-padding fixed-width"
                             min-width="300px">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                        <el-button type="primary" @click="openUpdateRoleDialog(scope.row)">
                            分配角色
                        </el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                    :limit.sync="query.pageSize" @pagination="getList"/>

        <!--编辑弹窗-->
        <el-dialog :visible.sync="data.dialogFormVisible" :title="data.dialogStatus === 'create' ? '新增' : '编辑'">
            <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left" label-width="70px"
                     style="width: 800px; margin-left:50px;">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="obj.username" placeholder="用户名" maxlength="64"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="obj.name" placeholder="姓名" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="obj.email" placeholder="邮箱" :rows="6"
                              maxlength="128"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="obj.gender">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="头像" prop="avatar">
                    <el-upload
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="avatarChange"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                    >
                        <img v-if="obj.avatar" :src="obj.avatar" class="avatar"
                             alt="">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="data.dialogStatus==='create'?create():update()">
                    保存
                </el-button>
            </div>
        </el-dialog>

        <!--更该角色弹窗-->
        <el-dialog :visible.sync="dialogUpdateRoleVisible" title="编辑角色">
            <el-transfer
                    v-model="obj.roleIdList"
                    :filter-method="filterRole"
                    :data="roles"
                    :props="{
                        key:'id',
                        label:'name'
                     }"
                    :titles="['待选角色', '已选角色']"
                    filterable
                    filter-placeholder="请输入角色名称"></el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateRoleVisible = false">取消</el-button>
                <el-button type="primary" @click="updateRole">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';

    import Pagination from '@/components/Pagination/index.vue';

    import Data from '@/class/Data';
    import Obj from './User';
    import {validEmail} from '@/utils/validate';
    import {del, isUsernameExist, list, save, update, updateRole, userRoleList} from '@/api/system/user';
    import {roleList} from '@/api/system/role';
    import Rule from '@/class/Rule';
    import {confirmDelete, success} from '@/utils/message';
    import Query from './Query';
    import {UserState} from '@/store/modules/User';

    @Component({
        components: {
            Pagination,
        },
    })
    export default class User extends Vue {

        private static validateEmail(rule: Rule, value: string, callback: (error?: Error) => void) {
            if (!validEmail(value)) {
                callback(new Error('邮箱格式不正确'));
            } else {
                callback();
            }
        }

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        private query = new Query();
        private data = new Data();
        private obj = new Obj();
        private img!: File;
        private roles = [];
        private dialogUpdateRoleVisible: boolean = false;
        private rules = {
            name: [{required: true, trigger: 'blur', message: '请输入姓名'}],
            username: [
                new Rule({message: '用户名不能为空'}),
                new Rule({}, this.validateUsername),
            ],
            email: [
                new Rule({message: '邮箱不能为空'}),
                new Rule({}, User.validateEmail),
            ],
        };

        private created() {
            this.getList();
        }

        private validateUsername(rule: Rule, value: string, callback: (error?: Error) => void) {
            isUsernameExist(this.obj.id, value).then((resp: any) => {
                if (resp.data.isExist) {
                    callback(new Error('用户名已存在'));
                } else {
                    callback();
                }
            });
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

        private handleCreate() {
            this.data.dialogStatus = 'create';
            this.data.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs.dataForm.resetFields();
                this.obj = new Obj();
            });
        }

        private createFormData(): FormData {
            const data = new FormData();
            data.append('id', this.obj.id);
            data.append('name', this.obj.name);
            data.append('username', this.obj.username);
            data.append('email', this.obj.email);
            data.append('gender', this.obj.gender);
            data.append('avatar', this.obj.avatar);
            if (this.img) {
                data.append('img', this.img);
            }
            return data;
        }

        private create() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    save(this.createFormData()).then((resp) => {
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
                const {id, name, username, email, gender, avatar, roleIdList} = row;
                this.obj = {id, name, username, email, gender, avatar, roleIdList};
            });
        }

        private update() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    update(this.createFormData()).then((resp) => {
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
            confirmDelete('删除提示', `${row.name}将会被删除`, '确定', '取消', () => {
                del(row.id).then((resp) => {
                    success('成功', resp.data.message);
                    that.getList();
                });
            });
        }

        private cancel() {
            this.data.dialogFormVisible = false;
            this.obj = new Obj();
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
                    this.obj.roleIdList = userRoleListResp.data;
                    that.obj.id = row.id;
                    that.dialogUpdateRoleVisible = true;
                }));
        }

        private updateRole() {
            updateRole(this.obj.id, this.obj.roleIdList).then((resp) => {
                success('成功', resp.data.message);
                this.dialogUpdateRoleVisible = false;
                this.getList();
                this.obj = new Obj();
                UserState.resetRouter();
            });
        }

        private avatarChange(file: any) {
            this.img = file.raw;
            this.obj.avatar = URL.createObjectURL(file.raw);
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
