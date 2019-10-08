<template>
    <el-form ref="dataForm" :rules="rules" :model="obj" :label-position="data.labelPosition" label-width="70px">

        <el-form-item label="用户名" prop="username">
            <el-input v-model="obj.username" placeholder="用户名" maxlength="64" class="input"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
            <el-input v-model="obj.name" placeholder="姓名" maxlength="20" class="input"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
            <el-input v-model="obj.email" placeholder="邮箱" :rows="6" class="input"
                      maxlength="128"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="obj.gender">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="头像" prop="avatar">
            <el-upload :show-file-list="false" :auto-upload="false" :on-change="avatarChange"
                       class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
                <img v-if="obj.avatar" :src="obj.avatar" class="avatar"
                     alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submit">{{label}}</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import Obj from '@/views/user/class/User';
    import {validEmail} from '@/utils/validate';
    import Rule from '@/class/Rule';
    import Data from '@/class/Data';
    import {isUsernameExist, save, update} from '@/api/system/user';
    import {FormType} from '@/class/FormType';

    @Component
    export default class Form extends Vue {
        private static validateEmail(rule: Rule, value: string, callback: (error?: Error) => void) {
            if (!validEmail(value)) {
                callback(new Error('邮箱格式不正确'));
            } else {
                callback();
            }
        }

        public $refs!: {
            dataForm: HTMLFormElement,
        };

        @Prop({required: true})
        private obj!: Obj;

        @Prop({required: true})
        private type!: FormType;

        get label() {
            return '新增';
        }

        private formType!: string;
        private user = new Obj();
        private data = new Data();
        private img!: File;

        private rules = {
            name: [{required: true, trigger: 'blur', message: '请输入姓名'}],
            username: [
                new Rule({message: '用户名不能为空'}),
                new Rule({}, this.validateUsername),
            ],
            email: [
                new Rule({message: '邮箱不能为空'}),
                new Rule({}, Form.validateEmail),
            ],
        };

        private created() {
            console.info(this.formType);
        }

        private validateUsername(rule: Rule, value: string, callback: (error?: Error) => void) {
            isUsernameExist(this.obj.id, value).then((resp: any) => {
                if (resp.data.isExist) {
                    callback(new Error('用户名已存在'));
                } else {
                    callback();
                }
            });
        }

        private avatarChange(file: any) {
            this.img = file.raw;
            this.obj.avatar = URL.createObjectURL(file.raw);
        }

        private createFormData(): FormData {
            const data = new FormData();
            data.append('id', this.obj.id);
            data.append('name', this.obj.name);
            data.append('username', this.obj.username);
            data.append('email', this.obj.email);
            data.append('gender', this.obj.gender);
            data.append('avatar', this.obj.avatar);
            if (this.img) {
                data.append('img', this.img);
            }
            return data;
        }

        private submit() {
            this.$refs.dataForm.validate((valid: boolean) => {
                if (valid) {
                    this.$emit('handle-update', this.createFormData());
                }
            });
        }
    }
</script>

<style scoped>
    .input {
        width: 400px;
    }

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
