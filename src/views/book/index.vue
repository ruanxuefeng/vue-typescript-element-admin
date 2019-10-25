<template>

    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
        <el-tab-pane name="list" :closable=false>
            <span slot="label"><svg-icon icon-class="list"></svg-icon> 书籍列表</span>
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
                                <el-button type="primary" @click="handleOperate(scope.row, 'UPDATE')">编辑
                                </el-button>
                                <el-button type="primary" @click="handleOperate(scope.row, 'DETAIL')">详情
                                </el-button>
                                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="query.total > query.pageSize" :total="query.total" :page.sync="query.page"
                            :limit.sync="query.pageSize" :page-sizes="data.pageSizes" :layout="data.layout"
                            @pagination="getList"/>
            </el-card>
        </el-tab-pane>
        <el-tab-pane name="add" :closable=false>
            <span slot="label"><svg-icon icon-class="add"></svg-icon> 新增</span>
            <book-form type="ADD" @handle-update="saveHandle"></book-form>
        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name" closable>
            <span slot="label">
                <svg-icon :icon-class="tab.type === 'UPDATE'?'edit':'detail'"></svg-icon> {{tab.label}}
            </span>
            <div v-if="tab.type === 'UPDATE'">
                <book-form :obj="tab.obj" type="UPDATE"
                           @handle-update="updateHandle"></book-form>
            </div>

            <div v-if="tab.type === 'DETAIL'">
                <book-detail :book-id="tab.obj.id"></book-detail>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import Pagination from '@/components/Pagination/index.vue';
    import BookDetail from '../book-detail/index.vue';
    import BookForm from './components/Form.vue';

    import {confirmDelete, success} from '@/utils/MessageUtils';
    import {del, list, save, statusList, update} from './api';
    import Data from '@/class/Data';
    import Query from './class/Query';
    import Obj from './class/Book';
    import {BookTab, TabType} from './class/BookTab';
    import {getTabDetailLabel, getTabDetailName, getTabEditLabel, getTabEditName, removeTab} from '@/utils/TabUtils';
    import {all as getBookTypeList} from '@/views/book-type/api';

    @Component({
        components: {
            Pagination,
            BookDetail,
            BookForm
        },
    })
    export default class Book extends Vue {

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        private data = new Data();
        private query = new Query();
        private obj = new Obj();
        private activeTab = 'list';
        private statusList = [];
        private bookTypeList = [];
        private tabs: BookTab[] = [];
        private tabType = TabType;

        private created() {
            this.getList();
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


        private saveHandle(data: FormData) {
            save(data).then((resp: any) => {
                this.editSuccess(resp.data.message);
                this.activeTab = 'list';
            });
        }

        private updateHandle(data: FormData) {
            update(data).then((resp) => {
                this.editSuccess(resp.data.message);
                this.removeTab(this.activeTab);
                this.activeTab = 'list';
            });
        }

        private handleOperate(row: any, tabType: TabType) {
            const {id, name, cover, author, type, status, score, summary} = row;
            let tabName: string, tabLabel: string, tabs: BookTab[];
            switch (tabType) {
                case TabType.DETAIL:
                    tabName = getTabDetailName(id);
                    tabLabel = getTabDetailLabel(name);
                    break;
                case TabType.UPDATE:
                    tabName = getTabEditName(id);
                    tabLabel = getTabEditLabel(name);
                    break;
                default:
                    return;
            }
            tabs = this.tabs.filter(tab => tab.name === tabName);
            if (tabs.length === 0) {
                const tab: BookTab = {
                    name: tabName,
                    label: tabLabel,
                    obj: {id, name, cover, author, type: type.id, status: status.value, score, summary},
                    type: tabType
                };
                this.tabs.push(tab);
                this.activeTab = tabName;
            } else {
                this.activeTab = tabs[0].name;
            }
        }

        private getBookStatusList() {
            statusList().then((resp) => this.statusList = resp.data);
        }

        private getBookTypeList() {
            getBookTypeList().then((resp) => this.bookTypeList = resp.data);
        }

        private handleDelete(row: any) {
            const that = this;
            confirmDelete('删除提示', `${row.name}将要被删除`, '确定', '取消', () => {
                del(row.id).then((resp) => {
                    success('成功', resp.data.message);
                    that.getList();
                });
            });
        }

        private editSuccess(message: string) {
            success('成功', message);
            this.getList();
        }

        private removeTab(tabName: string) {
            if (this.activeTab === tabName) {
                this.activeTab = 'list';
            }
            console.info(removeTab(this.tabs, tabName));
            this.tabs = removeTab(this.tabs, tabName);
        }

    }
</script>

<style scoped>

</style>
