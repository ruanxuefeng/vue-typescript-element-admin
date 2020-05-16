<template>
    <el-form :label-position="data.labelPosition" :model="obj" :rules="rules" label-width="100px" ref="dataForm">

        <el-form-item label="名称" prop="name">
            <el-input class="input" maxlength="64" placeholder="名称" v-model="obj.name"></el-input>
        </el-form-item>

        <el-form-item label="corn表达式" prop="corn">
            <el-input class="input" maxlength="64" placeholder="corn" v-model="obj.corn"></el-input>
        </el-form-item>

        <el-form-item label="标识" prop="bean">
            <el-input class="input" maxlength="64" placeholder="标识" v-model="obj.bean"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="memo">
            <el-input :rows="6" class="input" maxlength="128" placeholder="备注" show-word-limit type="textarea"
                      v-model="obj.memo"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="submit" type="primary">{{label}}</el-button>
            <el-button @click="cancel">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Obj from '@/views/scheduled-task/class/ScheduledTask';
import Data from '@/class/Data';
import {FormType} from '@/class/FormType';

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
        name: [{required: true, trigger: 'blur', message: '请输入名称'}],
        corn: [{required: true, trigger: 'blur', message: '请输入corn表达式'}],
        bean: [{required: true, trigger: 'blur', message: '请输入标识'}],
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
}
</script>

<style scoped>
    .input {
        width: 400px;
    }
</style>
