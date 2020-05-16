<template>
    <el-form :label-position="data.labelPosition" :model="obj" :rules="rules" label-width="80px" ref="dataForm">
        <el-form-item label="标题" prop="title">
            <el-input class="input" placeholder="请输入标题" v-model="obj.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
            <el-input :rows="4" class="input" placeholder="请输入内容" type="textarea" v-model="obj.content"></el-input>
        </el-form-item>

        <el-form-item label="过期天数" prop="days">
            <el-input class="input" placeholder="请输入过期天数" type="number" v-model="obj.days"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="submit" type="primary">{{label}}</el-button>
            <el-button @click="cancel">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

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
    private data = new Data();
    private rules = {
        title: [new Rule({message: '请输入标题'})],
        content: [new Rule({message: '请输入内容'})],
        days: [new Rule({message: '请输入过期天数'})],
    };

    get label() {
        switch (this.type) {
            case FormType.ADD:
                return '新增';
            case FormType.UPDATE:
                return '修改';
        }
    }

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
