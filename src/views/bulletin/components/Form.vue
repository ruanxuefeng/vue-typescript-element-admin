<template>
    <el-form ref="dataForm" :rules="rules" :model="obj" :label-position="data.labelPosition" label-width="80px">
        <el-form-item label="标题" prop="title">
            <el-input class="input" v-model="obj.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
            <el-input class="input" v-model="obj.content" placeholder="请输入内容" type="textarea" :rows="4"></el-input>
        </el-form-item>

        <el-form-item label="过期天数" prop="days">
            <el-input class="input" v-model="obj.days" type="number" placeholder="请输入过期天数"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submit">{{label}}</el-button>
            <el-button @click="cancel">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    import Data from '@/class/Data';
    import Obj from '@/views/bulletin/class/Bulletin';
    import {FormType} from '@/class/FormType';
    import Rule from '@/class/Rule';

    @Component
    export default class Form extends Vue {
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

        private data = new Data();
        private rules = {
            title: [new Rule({message: '请输入标题'})],
            content: [new Rule({message: '请输入内容'})],
            days: [new Rule({message: '请输入过期天数'})],
        };

        private submit() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    this.$emit('handle-update', this.obj);
                    if (this.type === FormType.ADD) {
                        this.$refs.dataForm.resetFields();
                    }
                }
            });
        }

        private cancel() {
            this.$refs.dataForm.resetFields();
        }
    };
</script>

<style scoped>
    .input {
        width: 400px;
    }
</style>
