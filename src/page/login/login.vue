<template>
    <div class='loginContainer'>
        <i-form class='loginForm' ref="userData" :rules="ruleInline" :model="userData">
            <section class='topContainer'>
                <div class='loginBox'>
                    <div class='loginImg'>
                        <img class='show' src='../../images/keduoshou@2x.png' />
                    </div>
                    <div class='userDiv'>
                        <FormItem prop="userAccount">
                            <i-input type='text' placeholder='请输入用户名' clearable v-model="userData.userAccount" size="large">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </i-input>
                        </FormItem>
                    </div>
                    <div class='userDiv'>
                        <FormItem prop="passWord">
                            <i-input type="password" placeholder="请输入密码" clearable v-model="userData.passWord" size="large">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                            </i-input>
                        </FormItem>
                    </div>
                    <div class='loginBtn'>
                        <FormItem>
                            <i-button type="primary" @click='login(userData)'>登录</i-button>
                        </FormItem>
                    </div>
                </div>
            </section>
            <section class='bottomContainer'>
                <h2>复星金服</h2>
                <h5>版权所有©掌星宝（上海）网络科技有限公司 沪ICP备17043191号</h5>
                <h5>服务热线：400-700-8808</h5>
            </section>
        </i-form>
        <!-- <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip> -->
    </div>
</template>

<script>
    import { accountLogin } from '../../service/getData'
    export default {
        data () {
            return {
                userInfo: null, //获取到的用户信息
                userData: { //用户数据
                    userAccount: null, //用户名
                    passWord: null, //密码
                },
                ruleInline: {
                    userAccount: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            //登录方法
            async login(name) {
                //前端验证用户名与密码时候为空
                if (!this.userData.userAccount && !this.userData.passWord) {
                    this.$Message.error('请输入用户名及密码!');
                    this.$Loading.error();
                    return
                }else if(!this.userData.userAccount) {
                    this.$Message.error('请输入用户名');
                    this.$Loading.error();
                    return
                }else if(!this.userData.passWord) {
                    this.$Message.error('请输入密码!');
                    this.$Loading.error();
                    return
                }else if(this.userData.passWord.length < 6) {
                    this.$Message.error('密码至少6位!');
                    this.$Loading.error();
                    return
                }else {
                    this.$Loading.start();
                    this.$Message.success('登录成功!');
                    this.$router.push('home')
                    this.$Loading.finish();
                    //用户名登录
                    this.userInfo = await accountLogin(this.userData).then((res) => {
                        console.log(res)
                    }).catch(err => {
                        console.error('aaaaa', err)
                    })
                    console.log(this.userInfo);
                    if(!this.userInfo) {
                        console.log('data error!');
                    }else{
                        this.$router.push('index')
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .loginContainer {
        height: 100%;
        position: absolute;
        width: 100%;
        .loginForm {
            height: inherit;
            width: inherit;
        }
        .topContainer {
            background: url('../../images/login-bg-16.png') no-repeat center;
            background-size:100% 100%; 
            height: 85%;
            .loginBox {
                width: 336px;
                margin: 0 auto;
                height: 100%;
                background: rgba(255, 255, 255, 0.4);
                .loginImg {
                    padding-top: 100px;
                    margin-bottom: 50px;
                    img{
                        width: 170px;
                        margin: 0 auto;
                    }
                }
                .userDiv {
                    height: 42px;
                    margin-bottom: 30px;
                    width: 90%;
                    margin: 0 auto;
                    border-radius: 20px;
                    margin-bottom: 30px;
                }
                .loginBtn {
                    height: 42px;
                    width: 90%;
                    margin: 0 auto;
                    button {
                        height: inherit;
                        width: 100%;
                        border-radius: 20px;
                        letter-spacing:10px;
                        font-size: 16px;
                    }
                }
            }
        }
        .bottomContainer {
            text-align: center;
            height: 110px;
            background: #29518e;
            position: absolute;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            h2 {
                font-size: 26px;
                margin-top: 15px;
                margin-bottom: 5px;
                color: #fff!important;
                font-weight: normal;
            }
            h5 {
                font-size: 15px;
                color: #fff!important;
                font-weight: normal;
                margin-bottom: 5px;
            }
        }
    }
</style>


