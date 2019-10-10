<template>
    <el-form ref="dataForm" :rules="rules" :model="obj" :label-position="data.labelPosition" label-width="80px">

        <el-form-item label="角色名称" prop="name">
            <el-input v-model="obj.name" placeholder="角色名称" maxlength="20" class="input"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="memo">
            <el-input v-model="obj.memo" placeholder="备注" :rows="6" maxlength="200" class="input"
                      type="textarea"></el-input>
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
            name: [new Rule({message: '请输入角色名称'})],
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