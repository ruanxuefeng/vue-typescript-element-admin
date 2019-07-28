<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="loginRules" auto-complete="on" class="login-form" label-position="left"
                 ref="loginForm">

            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>

            <el-form-item prop="username">
        <span class="svg-container">
            <svg-icon icon-class="user"></svg-icon>
        </span>
                <el-input
                        auto-complete="on"
                        name="username"
                        placeholder="用户名"
                        ref="username"
                        tabindex="1"
                        type="text"
                        v-model="loginForm.username"
                ></el-input>
            </el-form-item>

            <el-tooltip content="Caps lock is On" manual placement="right" v-model="capsTooltip">
                <el-form-item prop="password">
          <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
          </span>
                    <el-input
                            :key="passwordType"
                            :type="passwordType"
                            @blur="capsTooltip = false"
                            @keyup.enter.native="handleLogin"
                            @keyup.native="checkCapsLock"
                            auto-complete="on"
                            name="password"
                            placeholder="密码"
                            ref="password"
                            tabindex="2"
                            v-model="loginForm.password"
                    ></el-input>
                    <span @click="showPwd" class="show-pwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-button :loading="loading" @click.native.prevent="handleLogin" style="width:100%;margin-bottom:30px;"
                       type="primary">
                登录
            </el-button>
        </el-form>

    </div>
</template>

<script lang="ts">

    import {Component, Vue, Watch} from 'vue-property-decorator';

    import {validUsername} from '@/utils/validate';
    import Rule from '@/class/Rule';
    import LoginForm from '@/class/LoginForm';
    import {UserState} from '@/store/modules/User';

    @Component
    export default class Login extends Vue {

        private static validateUsername(rule: Rule, value: string, callback: (error?: Error) => void): void {
            if (validUsername(value)) {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        }

        private static validatePassword(rule: Rule, value: string, callback: (error?: Error) => void): void {
            if (value.length < 5) {
                callback(new Error('密码必须超过5位'));
            } else {
                callback();
            }
        }

        public $refs!: {
            loginForm: HTMLFormElement;
            username: HTMLInputElement;
            password: HTMLInputElement;
        };

        private loginForm = new LoginForm();
        private loginRules = {
            username: [new Rule({}, Login.validateUsername)],
            password: [new Rule({}, Login.validatePassword)],
        };
        private passwordType: string = 'password';
        private capsTooltip: boolean = false;
        private loading: boolean = false;
        private redirect?: string;

        private mounted() {
            if (this.loginForm.username === '') {
                this.$refs.username.focus();
            } else if (this.loginForm.password === '') {
                this.$refs.password.focus();
            }
        }

        @Watch('$route')
        private route(route: any) {
            this.redirect = route.query && route.query.redirect;
        }

        private checkCapsLock(shiftKey: string, key: string) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true;
                } else {
                    this.capsTooltip = false;
                }
            }
            if (key === 'CapsLock' && this.capsTooltip) {
                this.capsTooltip = false;
            }
        }

        private showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        }

        private handleLogin() {
            this.$refs.loginForm.validate((valid: boolean) => {
                if (valid) {
                    this.loading = true;
                    UserState.login({
                        username: this.loginForm.username,
                        password: Buffer.from(this.loginForm.password).toString('base64'),
                    }).then(() => {
                        console.info(111);
                        this.$router.push({path: this.redirect || '/'});
                        this.loading = false;
                    }).catch(() => {
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

    }
</script>


<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>
