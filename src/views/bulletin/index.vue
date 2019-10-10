<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="query.content" placeholder="内容" :clearable="true" style="width: 200px;"
                      class="filter-item"
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
            <el-table-column label="内容" prop="content" width="400px" :align="data.commonAlign"></el-table-column>
            <el-table-column label="状态" width="150px" :align="data.commonAlign">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === '未发布'">{{scope.row.status}}</el-tag>
                    <el-tag v-if="scope.row.status === '已发布'" type="success">{{scope.row.status}}</el-tag>
                    <el-tag v-if="scope.row.status === '过期'" type="info">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="date" width="400px" :align="data.commonAlign"></el-table-column>
            <el-table-column label="创建人" width="150px" :align="data.commonAlign">
                <template slot-scope="scope">
                    {{ scope.row.creatorBy }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createdTime" width="200px" :align="data.commonAlign"></el-table-column>

            <el-table-column label="操作" :align="data.commonAlign" class-name="small-padding fixed-width"
                             min-width="300px">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.status === '未发布'" type="primary" @click="handlePublish(scope.row)">发布
                        </el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                    :limit.sync="query.pageSize" :page-sizes="data.pageSizes" :layout="data.layout"
                    @pagination="getList"/>

        <el-dialog :visible.sync="data.dialogFormVisible" :title="data.dialogStatus === 'create' ? '新增' : '编辑'">
            <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left" label-width="80px"
                     style="width: 800px; margin-left:50px;">

                <el-form-item label="内容" prop="content">
                    <el-input v-model="obj.content" placeholder="请输入内容" type="textarea" :rows="4"></el-input>
                </el-form-item>

                <el-form-item label="过期天数" prop="days">
                    <el-input v-model="obj.days" placeholder="请输入过期天数"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="data.dialogStatus === 'create' ? create() : update()">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="发布提示" :visible.sync="publishDialogVisible">
            <span>{{publishObj.content}}</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="publishDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="publish">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import Pagination from '@/components/Pagination/index.vue';
    import Data from '@/class/Data';
    import Query from './Query';
    import Obj from './Bulletin';
    import Rule from '@/class/Rule';
    import {del, list, publish, save, update} from '@/api/bulletion';
    import {confirmDelete, success} from '@/util/MessageUtils';

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
        private publishDialogVisible = false;
        private publishObj: Obj = {};

        private rules = {
            content: [new Rule({message: '请输入内容'})],
            days: [new Rule({message: '请输入过期天数'})],
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
                    const {content, days} = this.obj;
                    save({content, days}).then((resp) => {
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
                const {id, content, days} = row;
                this.obj = {id, content, days};
            });
        }

        private update() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    const {id, content, days} = this.obj;
                    update({id, content, days}).then((resp) => {
                        this.editSuccess(resp.data.message);
                    });
                }
            });
        }

        private handlePublish(row: any) {
            this.publishDialogVisible = true;
            const {id, content} = row;
            this.publishObj = {id, content};
        }

        private publish() {
            if (this.publishObj.id) {
                publish(this.publishObj.id).then((resp) => {
                    success('成功', resp.data.message);
                    this.publishDialogVisible = false;
                    this.getList();
                });
            }
        }

        private handleDelete(row: any) {
            const that = this;
            confirmDelete('删除提示', '公告将会被删除', '确定', '取消', () => {
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
