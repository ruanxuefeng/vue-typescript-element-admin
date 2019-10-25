import {FormType} from '@/class/FormType';
<template>
    <div>
        <el-form ref="dataForm" :rules="rules" :model="obj" :label-position="data.labelPosition"
                 label-width="80px">

            <el-form-item label="名称" prop="name">
                <el-input v-model="obj.name" placeholder="名称" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
                <el-input v-model="obj.author" placeholder="作者" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="类型" prop="type">
                <el-select v-model="obj.type" placeholder="类型" clearable>
                    <el-option
                            v-for="item in bookTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <el-select v-model="obj.status" placeholder="状态" clearable>
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

            <el-form-item>
                <el-button type="primary" @click="submit">{{label}}</el-button>
                <el-button @click="cancel">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {FormType} from '@/class/FormType';
    import Rule from '@/class/Rule';
    import Data from '@/class/Data';
    import Obj from '@/views/book/class/Book';
    import {statusList} from '@/views/book/api';
    import {all as getBookTypeList} from '@/views/book-type/api';

    @Component
    export default class Form extends Vue {
        private validateCover(rule: Rule, value: string, callback: (error?: Error) => void): void {
            if (!value.length || !this.img) {
                if (this.type === FormType.UPDATE) {
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

        @Prop({
            default: () => new Obj()
        })
        private obj!: Obj;

        @Prop({required: true})
        private type!: FormType;

        get label() {
            switch (this.type) {
                case FormType.ADD:
                    return '新增';
                case FormType.UPDATE:
                    return '修改';
            }
        }

        private img!: File;
        private statusList = [];
        private bookTypeList = [];
        private data = new Data();
        private rules = {
            name: [new Rule({message: '请输入名称'})],
            author: [new Rule({message: '请输入作者'})],
            type: [new Rule({message: '请选择类型'})],
            status: [new Rule({message: '请选择状态'})],
            score: [new Rule({message: '请输入评分'})],
            summary: [new Rule({message: '请输入简介'})],
            cover: [new Rule({}, this.validateCover)],
        };

        private created() {
            this.getBookStatusList();
            this.getBookTypeList();
        }

        private getBookStatusList() {
            statusList().then((resp) => this.statusList = resp.data);
        }

        private getBookTypeList() {
            getBookTypeList().then((resp) => this.bookTypeList = resp.data);
        }

        private coverChange(file: any) {
            this.img = file.raw;
            this.obj.cover = URL.createObjectURL(file.raw);
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

        private submit() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    this.$emit('handle-update', this.createFormData());
                    if (this.type === FormType.ADD) {
                        this.$refs.dataForm.resetFields();
                    }
                }
            });
        }

        private cancel() {
            this.$refs.dataForm.resetFields();
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