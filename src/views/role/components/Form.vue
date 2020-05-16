<template>
    <el-form :label-position="data.labelPosition" :model="obj" :rules="rules" label-width="80px" ref="dataForm">

        <el-form-item label="角色名称" prop="name">
            <el-input class="input" maxlength="20" placeholder="角色名称" v-model="obj.name"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="memo">
            <el-input :rows="6" class="input" maxlength="200" placeholder="备注" type="textarea"
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

import Data from '@/class/Data';
import Obj from '@/views/role/class/Role';
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
        name: [new Rule({message: '请输入角色名称'})],
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
