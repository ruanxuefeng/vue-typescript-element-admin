<template>

    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
        <el-tab-pane label="书籍管理" name="book" :closable="false">
            <el-card shadow="hover">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input v-model="query.name" placeholder="名称" clearable
                                  @keyup.enter.native="getList"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="query.author" placeholder="作者" clearable
                                  @keyup.enter.native="getList"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="query.status" placeholder="状态" clearable @keyup.enter.native="getList">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="query.type" placeholder="类型" clearable @keyup.enter.native="getList">
                            <el-option
                                    v-for="item in bookTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
                    </el-form-item>
                </el-form>
                <el-table v-loading="data.tableLoading" :data="data.list" border fit highlight-current-row>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="名称" prop="name" :align="data.commonAlign"></el-table-column>
                    <el-table-column label="作者" prop="author" :align="data.commonAlign"></el-table-column>
                    <el-table-column label="状态" prop="status.name" :align="data.commonAlign"></el-table-column>
                    <el-table-column label="类型" prop="type.name" :align="data.commonAlign"></el-table-column>
                    <el-table-column label="创建时间" prop="createdTime" :align="data.commonAlign"></el-table-column>
                    <el-table-column label="更新时间" prop="updatedTime" :align="data.commonAlign"></el-table-column>

                    <el-table-column label="操作" :align="data.commonAlign" min-width="300px">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                                <el-button type="primary" @click="handleDetail(scope.row)">详情</el-button>
                                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                            :limit.sync="query.pageSize" :page-sizes="data.pageSizes" :layout="data.layout"
                            @pagination="getList"/>

                <!--编辑弹窗-->
                <el-dialog :visible.sync="data.dialogFormVisible" :title="data.dialogStatus === 'create' ? '新增' : '编辑'">
                    <el-form ref="dataForm" :rules="rules" :model="obj" :label-position="data.labelPosition"
                             label-width="80px">

                        <el-form-item label="名称" prop="name">
                            <el-input v-model="obj.name" placeholder="名称" maxlength="20"></el-input>
                        </el-form-item>

                        <el-form-item label="作者" prop="author">
                            <el-input v-model="obj.author" placeholder="作者" maxlength="20"></el-input>
                        </el-form-item>

                        <el-form-item label="类型" prop="type">
                            <el-select v-model="obj.type" placeholder="类型" clearable @keyup.enter.native="getList">
                                <el-option
                                        v-for="item in bookTypeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="状态" prop="status">
                            <el-select v-model="obj.status" placeholder="状态" clearable @keyup.enter.native="getList">
                                <el-option
                                        v-for="item in statusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="评分" prop="score">
                            <el-input-number v-model="obj.score" placeholder="评分" :precision="1" :step="0.1" :min="1"
                                             :max="10"></el-input-number>
                        </el-form-item>

                        <el-form-item label="简介" prop="summary">
                            <el-input v-model="obj.summary" placeholder="简介" :rows="8" maxlength="500"
                                      type="textarea"></el-input>
                        </el-form-item>

                        <el-form-item label="封面" prop="cover">
                            <el-upload :show-file-list="false" :auto-upload="false" :on-change="coverChange"
                                       class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
                                <img v-if="obj.cover" :src="obj.cover" class="avatar"
                                     alt="">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="data.dialogStatus==='create'?create():update()">
                            保存
                        </el-button>
                    </div>
                </el-dialog>
            </el-card>
        </el-tab-pane>
        <el-tab-pane v-for="tab in tabList" :label="tab.name" :key="tab.id" :name="tab.id" closable>
            <book-detail :book-id="tab.id"></book-detail>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import Pagination from '@/components/Pagination/index.vue';
    import BookDetail from './detail/Book-Detail.vue';

    import {confirmDelete, success} from '@/utils/MessageUtils';
    import {del, list, save, statusList, update} from './api';
    import {all as getBookTypeList} from '@/views/book-type/api';
    import Data from '@/class/Data';
    import Query from './Query';
    import Obj from './Book';
    import Rule from '@/class/Rule';
    import Tab from './class/Tab';

    @Component({
        components: {
            Pagination,
            BookDetail
        },
    })
    export default class Book extends Vue {

        private validateCover(rule: Rule, value: string, callback: (error?: Error) => void): void {
            if (!value.length || !this.img) {
                if (this.data.dialogStatus === 'update') {
                    callback();
                } else {
                    callback(new Error('请选择封面图'));
                }
            } else {
                callback();
            }

        }

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        private data = new Data();
        private query = new Query();
        private obj = new Obj();
        private statusList = [];
        private bookTypeList = [];
        private activeTab = 'book';
        private img!: File;
        private rules = {
            name: [new Rule({message: '请输入名称'})],
            author: [new Rule({message: '请输入作者'})],
            type: [new Rule({message: '请选择类型'})],
            status: [new Rule({message: '请选择状态'})],
            score: [new Rule({message: '请输入评分'})],
            summary: [new Rule({message: '请输入简介'})],
            cover: [new Rule({}, this.validateCover)],
        };
        private tabList: Tab[] = [];

        private created() {
            this.getList();
            this.getBookStatusList();
            this.getBookTypeList();
        }

        private getList() {
            this.data.tableLoading = true;
            list(this.query).then((resp) => {
                const {rows, total, pageSize} = resp.data;
                this.data.list = rows;
                this.query.total = total;
                this.query.pageSize = pageSize;

                this.data.tableLoading = false;
            });
        }

        private getBookStatusList() {
            statusList().then((resp) => this.statusList = resp.data);
        }

        private getBookTypeList() {
            getBookTypeList().then((resp) => this.bookTypeList = resp.data);
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
                    save(this.createFormData()).then((resp: any) => {
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
                const {id, name, cover, author, type, status, score, summary} = row;
                this.obj = {
                    id,
                    name,
                    cover: `${cover}?${new Date()}`,
                    author,
                    type: type.id,
                    status: status.value,
                    score,
                    summary
                };
            });
        }

        private update() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    update(this.createFormData()).then((resp: any) => {
                        this.editSuccess(resp.data.message);
                    });
                }
            });
        }

        private createFormData(): FormData {
            const data = new FormData();
            data.append('id', this.obj.id);
            data.append('name', this.obj.name);
            data.append('author', this.obj.author);
            data.append('type', this.obj.type);
            data.append('status', this.obj.status);
            data.append('score', this.obj.score.toString());
            data.append('summary', this.obj.summary);
            if (this.img) {
                data.append('cover', this.img);
            }
            return data;
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

        private editSuccess(message: string) {
            success('成功', message);
            this.data.dialogFormVisible = false;
            this.obj = new Obj();
            this.getList();
        }

        private removeTab(tabName: string) {
            this.tabList = this.tabList.filter(tab => tab.id !== tabName);
            this.activeTab = 'book';
        }

        private handleDetail(row: any) {
            const {id, name} = row;
            const tab = this.tabList.filter(tab => tab.id === id);
            if (!tab || tab.length === 0) {
                this.tabList.push({id, name});
            }
            this.activeTab = id;
        }

        private coverChange(file: any) {
            this.img = file.raw;
            this.obj.cover = URL.createObjectURL(file.raw);
        }
    }
</script>

<style scoped>
    .avatar-uploader >>> .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader >>> .el-upload:hover {
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
