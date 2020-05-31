<template>
    <el-form :label-position="data.labelPosition" :model="obj" :rules="rules" label-width="80px" ref="dataForm">

        <el-form-item label="用户名" prop="username">
            <el-input class="input" maxlength="64" placeholder="用户名" v-model="obj.username"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
            <el-input class="input" maxlength="20" placeholder="姓名" v-model="obj.name"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
            <el-input :rows="6" class="input" maxlength="128" placeholder="邮箱"
                      v-model="obj.email"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="obj.gender">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="头像" prop="avatar">
            <el-upload :auto-upload="false" :on-change="avatarChange" :show-file-list="false"
                       action="https://jsonplaceholder.typicode.com/posts/" class="avatar-uploader">
                <pic :content="obj.avatar" :type="avatarType" class="avatar" v-if="obj.avatar"/>
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button @click="submit" type="primary">{{label}}</el-button>
            <el-button @click="cancel">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Obj from '@/views/user/class/User';
import {validEmail} from '@/utils/ValidateUtils';
import Rule from '@/class/Rule';
import Data from '@/class/Data';
import {isUsernameExist} from '@/views/user/api';
import {FormType} from '@/class/FormType';
import Picture from '@/components/Picture/index.vue';

@Component
export default class Form extends Vue {
    public $refs!: {
        dataForm: HTMLFormElement,
        avatar: Picture
    };
    @Prop({
        default: () => new Obj()
    })
    private obj!: Obj;
    @Prop({required: true})
    private type!: FormType;
    private data = new Data();
    private img!: File;
    private avatarType = 'SERVER_RESOURCE';
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

    get label() {
        switch (this.type) {
            case FormType.ADD:
                return '新增';
            case FormType.UPDATE:
                return '修改';
        }
    }

    private static validateEmail(rule: Rule, value: string, callback: (error?: Error) => void) {
        if (!validEmail(value)) {
            callback(new Error('邮箱格式不正确'));
        } else {
            callback();
        }
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
        console.log(11);
        this.img = file.raw;
        this.obj.avatar = file.raw;
        this.avatarType = 'FILE';
    }

    private createFormData(): FormData {
        const data = new FormData();
        for (const key in this.obj) {
            if (this.obj.hasOwnProperty(key) && typeof this.obj[key] === 'string') {
                data.append(key, this.obj[key] as string);
            }
        }
        if (this.img) {
            data.append('img', this.img);
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
