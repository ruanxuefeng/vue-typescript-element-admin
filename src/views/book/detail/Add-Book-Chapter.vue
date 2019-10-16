<template>
    <el-form ref="dataForm" :rules="rules" :model="obj" :label-position="data.labelPosition"
             label-width="80px">

        <el-form-item label="标题" prop="title">
            <el-input v-model="obj.title" placeholder="标题" maxlength="256"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
            <tinymce height="1800px" v-model="obj.content" :toolbar="toolbar" :plugins="plugins" :menubar="false"
                     :paste-as-text="true"></tinymce>
        </el-form-item>

        <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="create">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Tinymce from '@/components/Tinymce/index.vue';

    import {save} from '@/views/book/api/book-chapter';
    import {success} from '@/utils/MessageUtils';

    import Obj from './BookChapter';
    import Data from '@/class/Data';
    import Rule from '@/class/Rule';
    import {plugins, toolbar} from './config';

    @Component({
        components: {
            Tinymce,
        },
    })
    export default class AddBookChapter extends Vue {

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        @Prop(String)
        private bookId!: string;

        private toolbar = toolbar;
        private plugins = plugins;
        private data = new Data();
        private obj = new Obj();
        private rules = {
            title: [new Rule({message: '请输入标题'})],
            content: [new Rule({message: '请输入内容'})],
        };

        private reset() {
            this.$refs.dataForm.resetFields();
            this.obj = new Obj();
        }

        private create() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    const {title, content} = this.obj;
                    save({title, content, bookId: this.bookId}).then((resp: any) => {
                        success('成功', resp.data.message);
                        this.reset();
                    });
                }
            });
        }
    }
</script>

<style scoped>

</style>
