<template>
    <el-card shadow="hover">
        <el-tabs @tab-remove="removeTab" type="border-card" v-model="activeTab">
            <!--列表-->
            <el-tab-pane :closable='false' name="list">
                <span slot="label"><svg-icon icon-class="list"></svg-icon> 公告列表</span>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input :clearable="true" @keyup.enter.native="getList" class="filter-item" placeholder="内容"
                                  style="width: 200px;"
                                  v-model="query.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList" class="filter-item" icon="el-icon-search" type="primary">搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    :data="data.list"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;"
                    v-loading="data.tableLoading"
                >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="标题" prop="title"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="内容" prop="content"
                                     width="400px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="状态" width="150px">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status === '未发布'">{{scope.row.status}}</el-tag>
                            <el-tag type="success" v-if="scope.row.status === '已发布'">{{scope.row.status}}</el-tag>
                            <el-tag type="info" v-if="scope.row.status === '过期'">{{scope.row.status}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column :align="data.commonAlign" label="发布时间" prop="date" width="400px"></el-table-column>
                    <el-table-column :align="data.commonAlign" label="创建人" width="150px">
                        <template slot-scope="scope">
                            {{ scope.row.creatorBy }}
                        </template>
                    </el-table-column>
                    <el-table-column :align="data.commonAlign" label="创建时间" prop="createdTime"
                                     width="200px"></el-table-column>

                    <el-table-column :align="data.commonAlign" class-name="small-padding fixed-width" label="操作"
                                     min-width="300px">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button @click="handleUpdate(scope.row)" type="primary">编辑</el-button>
                                <el-button @click="handlePublish(scope.row)" type="primary"
                                           v-if="scope.row.status === '未发布'">发布
                                </el-button>
                                <el-button @click="handleDelete(scope.row)" type="danger">删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination :layout="data.layout" :limit.sync="query.pageSize" :page-sizes="data.pageSizes"
                            :page.sync="query.page" :total="query.total" @pagination="getList"
                            v-show="query.total > query.pageSize"/>
            </el-tab-pane>
            <!--新增tab-->
            <el-tab-pane :closable='false' name="add">
                <span slot="label"><svg-icon icon-class="add"></svg-icon> 新增</span>
                <bulletin-form @handle-update="saveHandle" type="ADD"/>
            </el-tab-pane>
            <!--编辑tabs-->
            <el-tab-pane :key="tab.name" :name="tab.name" closable v-for="tab in tabs">
                <span slot="label"><svg-icon icon-class="edit"></svg-icon> {{tab.label}}</span>
                <bulletin-form :obj="tab.obj" @handle-update="updateHandle" type="UPDATE"></bulletin-form>
            </el-tab-pane>

            <el-dialog :visible.sync="publishDialogVisible" title="发布提示">
                <span>{{publishObj.content}}</span>
                <div class="dialog-footer" slot="footer">
                    <el-button @click="publishDialogVisible = false">取消</el-button>
                    <el-button @click="publish" type="primary">确定</el-button>
                </div>
            </el-dialog>
        </el-tabs>
    </el-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import Pagination from '@/components/Pagination/index.vue';
import BulletinForm from './components/Form.vue';

import Data from '@/class/Data';
import Query from './class/Query';
import Obj from './class/Bulletin';
import {del, list, publish, save, update} from '@/views/bulletin/api';
import {confirmDelete, success} from '@/utils/MessageUtils';
import {getTabEditName, removeTab} from '@/utils/TabUtils';
import BulletinTab from '@/views/bulletin/class/BulletinTab';

@Component({
    components: {
        Pagination,
        BulletinForm
    },
})
export default class Menu extends Vue {

    public $refs!: {
        dataForm: HTMLFormElement,
    };

    private activeTab = 'list';
    private data = new Data();
    private tabs: BulletinTab[] = [];
    private query = new Query();
    private publishDialogVisible = false;
    private publishObj: Obj = {};


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

    private saveHandle(data: Obj) {
        save(data).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
        });
    }

    private handleUpdate(row: any) {
        const {id, title, content, days} = row;
        const tabs = this.tabs.filter(tab => tab.name === `edit-${id}`);
        if (tabs.length === 0) {
            const tab = {
                name: getTabEditName(id),
                label: `编辑-${title}`,
                obj: {id, title, content, days}
            };
            this.tabs.push(tab);
            this.activeTab = tab.name;
        } else {
            this.activeTab = tabs[0].name;
        }
    }

    private updateHandle(data: Obj) {
        update(data).then((resp) => {
            success('成功', resp.data.message, this.editSuccess);
            this.removeTab(this.activeTab);
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

    private editSuccess() {
        this.data.dialogFormVisible = false;
        this.getList();
    }

    private removeTab(tabName: string) {
        console.log(tabName);
        if (this.activeTab === tabName) {
            this.activeTab = 'list';
        }

        console.log(this.tabs);
        this.tabs = removeTab(this.tabs, tabName);
    }
}
</script>

<style scoped>

</style>
