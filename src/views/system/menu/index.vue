<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.name" placeholder="名称" :clearable="true" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="getList"></el-input>
            <el-input v-model="query.key" placeholder="Key" :clearable="true" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="getList"></el-input>

            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                       @click="handleCreate">新增
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
            <el-table-column label="名称" prop="name" width="200px" :align="data.commonAlign"></el-table-column>
            <el-table-column label="父级" width="200px" :align="data.commonAlign">
                <template slot-scope="scope">
                    {{ scope.row.parentName }}
                </template>
            </el-table-column>
            <el-table-column label="Key" prop="key" width="150px" :align="data.commonAlign"></el-table-column>
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
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                    :limit.sync="query.pageSize" :page-sizes="data.pageSizes" :layout="data.layout"
                    @pagination="getList"/>

        <el-dialog :visible.sync="data.dialogFormVisible" :title="data.dialogStatus === 'create' ? '新增' : '编辑'">
            <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left" label-width="70px"
                     style="width: 800px; margin-left:50px;">

                <el-form-item label="名称" prop="name">
                    <el-input v-model="obj.name" placeholder="请输入名称"></el-input>
                </el-form-item>

                <el-form-item label="Key" prop="key">
                    <el-input v-model="obj.key" placeholder="请输入Key"></el-input>
                </el-form-item>

                <el-form-item label="父级" prop="pid">
                    <el-select v-model="obj.pid" :clearable="true" class="filter-item">
                        <el-option v-for="item in parentList" :key="item.id" :label="item.name" :value="item.id"
                                   :disabled="item.id === obj.id"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="data.dialogStatus === 'create' ? create() : update()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import Pagination from '@/components/Pagination/index.vue';
    import Data from '@/class/Data';
    import Query from './Query';
    import Obj from './Menu';
    import Rule from '@/class/Rule';
    import {del, getParentList, list, save, update} from '@/api/system/menu';
    import {confirmDelete, success} from '@/utils/message';

    @Component({
        components: {
            Pagination,
        },
    })
    export default class Menu extends Vue {

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        private data = new Data();
        private query = new Query();
        private obj = new Obj();
        private parentList = [];

        private rules = {
            name: [new Rule({message: '请输入名称'})],
            key: [new Rule({message: '请输入Key'})],
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

        private handleCreate() {
            this.getParentList();
            this.data.dialogStatus = 'create';
            this.data.dialogFormVisible = true;
        }

        private getParentList() {
            getParentList().then((resp) => {
                this.parentList = resp.data;
            });
        }

        private create() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    save(this.obj).then((resp) => {
                        this.editSuccess(resp.data.message);
                    });
                }
            });
        }

        private handleUpdate(row: any) {
            this.getParentList();
            const {id, name, key, pid} = row;
            this.obj = {id, name, key, pid};
            this.data.dialogStatus = 'update';
            this.data.dialogFormVisible = true;
        }

        private update() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    update(this.obj).then((resp) => {
                        this.editSuccess(resp.data.message);
                    });
                }
            });
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

        private editSuccess(message: string) {
            success('成功', message);
            this.data.dialogFormVisible = false;
            this.obj = new Obj();
            this.getList();
        }

        private cancel() {
            this.data.dialogFormVisible = false;
            this.obj = new Obj();
        }
    }

</script>

<style scoped>

</style>
