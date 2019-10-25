<template>
    <el-card shadow='hover'>
        <el-row>
            <el-col :span='4' :offset='6'>
                <img alt='封面' width='180' height='240' :src='book.cover'>
            </el-col>
            <el-col :span='8'>
                <h1>{{book.name }}</h1>
                <p>作者：{{book.author}}</p>
                <p>类型：{{book.type.name}}</p>
                <p>状态：{{book.status.name}}</p>
                <div>
                    <div style='float: left'>评分：</div>
                    <el-rate style='float: left' v-model='book.score' :max='10' disabled show-score
                             text-color='#ff9900'></el-rate>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span='8' :offset='6'>
                {{book.summary}}
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-tabs v-model='activeTab' type='border-card' @tab-remove="removeTab">
            <el-tab-pane label='章节列表' name='chapter-list' :closable='false'>
                <el-row>
                    <el-form :inline='true'>
                        <el-form-item>
                            <el-input v-model='query.title' placeholder='标题' clearable
                                      @keyup.enter.native='getBookChapterList'></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' icon='el-icon-search' @click='getBookChapterList'>搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table v-loading='data.tableLoading' :data='data.list' border fit highlight-current-row>
                        <el-table-column type='index' width='50'></el-table-column>
                        <el-table-column label='标题' prop='title' min-width='500px'
                                         :align='data.commonAlign'></el-table-column>
                        <el-table-column label='创建时间' prop='createdTime' :align='data.commonAlign'></el-table-column>

                        <el-table-column label='操作' :align='data.commonAlign' min-width='200px'>
                            <template slot-scope='scope'>
                                <el-button-group>
                                    <el-button type='primary' @click='handleUpdate(scope.row)'>编辑</el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination v-show='query.total > query.pageSize' :total='query.total' :page.sync='query.page'
                                :limit.sync='query.pageSize' :page-sizes='data.pageSizes' :layout='data.layout'
                                @pagination='getBookChapterList'/>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label='新增章节' name='chapter-add' :closable='false'>
                <add-book-chapter :book-id='bookId'></add-book-chapter>
            </el-tab-pane>
            <el-tab-pane v-for="tab in tabList" :label='`编辑-${tab.name}`' :key="tab.id" :name='tab.id' closable>
                <update-book-chapter :book-chapter-id="tab.id"></update-book-chapter>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Pagination from '@/components/Pagination/index.vue';
    import AddBookChapter from './components/Add-Book-Chapter.vue';
    import UpdateBookChapter from './components/Update-Book-Chapter.vue';

    import {getById as getBookById} from '@/views/book/api';
    import {list} from '@/views/book/api/book-chapter';

    import Book from '../book/class/Book';
    import Query from './class/Query';
    import Data from '@/class/Data';
    import Rule from '@/class/Rule';
    import Tab from '../book/class/Tab';

    @Component({
        components: {
            Pagination,
            AddBookChapter,
            UpdateBookChapter
        },
    })
    export default class BookDetail extends Vue {

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        @Prop(String)
        private bookId!: string;

        private book = new Book();
        private query = new Query();
        private data = new Data();
        private activeTab = 'chapter-list';
        private rules = {
            title: [new Rule({message: '请输入标题'})],
            content: [new Rule({message: '请输入内容'})],
        };
        private tabList: Tab[] = [];

        private created() {
            this.query.bookId = this.bookId;
            this.getById();
            this.getBookChapterList();
        }

        private getById() {
            getBookById(this.bookId).then((resp: any) => {
                const {id, name, cover, author, type, status, score, summary} = resp.data;
                this.book = {id, name, cover, author, type, status, score, summary};
            });
        }

        private getBookChapterList() {
            this.data.tableLoading = true;
            list(this.query).then((resp: any) => {
                const {rows, total, pageSize} = resp.data;
                this.data.list = rows;
                this.query.total = total;
                this.query.pageSize = pageSize;

                this.data.tableLoading = false;
            });
        }

        private handleUpdate(row: any) {
            const {id, title} = row;
            const tab = this.tabList.filter(item => item.id === id);
            if (!tab || tab.length === 0) {
                this.tabList.push({id, name: title});
            }
            this.activeTab = id;
        }

        private removeTab(tabName: string) {
            console.info(tabName);
            this.tabList = this.tabList.filter(tab => tab.id !== tabName);
            this.activeTab = 'chapter-list';
        }

    }
</script>

<style scoped>

</style>
