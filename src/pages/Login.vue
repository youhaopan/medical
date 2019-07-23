<template lang="html">
  <div class="login-page">
    <div class="login-page-img">
      <div class="header">
        <img src="../images/login_logo.png" alt="">
      </div>
      <div class="content-box">
        <div class="content">
          <div class="content-logo"></div>
          <ul>
            <li>
              <Input prefix="icon-user" type="text" v-model="username" placeholder="用户名" />
            </li>
            <li>
              <Input prefix="icon-pass" type="password" v-model="password" placeholder="密码" />
            </li>
            <li>
              <i-input prefix="icon-vcode" class="code-box" v-model="vCode" placeholder="验证码">
                <span slot="suffix" class="code-span">
                  <span class="code-img"></span>
                  <Icon type="ios-refresh"  />
                </span>
              </i-input>
            </li>
          </ul>
          <div class="btn-line">
            <input type="button" class="login-btn" @click="loginClick" value="登录">
          </div>
          <div class="btn-line">
            <router-link :to="{ name: 'index'}">忘记密码？</router-link>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import urlPath from '../actions/api.js';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      vCode: '',
      imgCode: '/images/v_code.png'
    }
  },
  methods: {
    loginClick: function() {
      if (this.username !== "" && this.password !== "") {
             var lk={ACCOUNTS:this.username,PASSWORD:this.password};
                localStorage.setItem('UNAME',this.username)//用户名
               let that = this;
          //     console.log(urlPath.getIndexTable);
            $.ajax({
            method:'post',
            url:urlPath.getIndexTable+'/api/UserManager/SystemUserLogin',
            data:lk,
            success:function(dataRet){
                if(dataRet.Y==100) {
                        that.$Message.info(dataRet.M);
                        localStorage.setItem('UID',dataRet.D.ID)//用户编码
                        localStorage.setItem('RANDOMCODE',dataRet.D.RANDOMCODE) //随机码
                        that.$router.push('home');//跳转页面
                    }
                }
            })
      } else {
        this.$Message.error('请输入用户名和密码！')
        this.$router.push('home');

//当前为测试非正式
      }

    }  }
}
</script>

<style lang="less" scoped>
.login-page {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: auto;
}
.login-page-img {
    position: relative;
    background: url("../images/login_bg.png") no-repeat;
    background-size: 100%;
    height: 100%;
    width: 100%;
    min-height: 500px;
}
.header {
    text-align: left;
    position: absolute;
    top: 76px;
    left: 10%;
    @media (max-height:900px) and (min-height:701px) {
        top: 50px;
        left: 0px;
    }
    @media (max-height:700px) {
        top: 30px;
        left: 0px;
    }
    img {
        width: 535px;
        height: 106px;
        @media (max-height:900px) and (min-height: 701px) {
            width: 360px;
            height: 70px;
        }
        @media (max-height:700px) {
            width: 270px;
            height: 50px;
        }
    }
}
.content-box {
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        z-index: 1000;
        @media (max-height:900px) and (min-height: 701px) {
            // top: 17%;
            width: 100%;
        }
        @media (max-height:700px) {
            // top: 15%;
            width: 100%;
        }
        .content-logo {
            height: 250px;
            background: url("../images/login_icon.png") no-repeat center;
            @media (max-height:900px) and (min-height: 701px) {
                background-size: 110px;
                height: 150px;
            }
            @media (max-height:700px) {
                background-size: 80px;
                height: 80px;
            }
        }
    }
    ul {
        max-width: 350px;
        min-width: 200px;
        margin: 0 auto;
    }
    li {
        padding: 10px;
        @media (max-height:700px) {
            padding: 7px;
        }
    }
    .footer {
        height: 200px;
        width: 100%;
        position: absolute;
        background: url("../images/login_backl.png") left bottom no-repeat;
        background-size: 100%;
        bottom: 0;
        &:after {
            display: block;
            content: '.';
            font-size: 0;
            height: 100%;
            width: 100%;
            background: url("../images/login_backr.png") right bottom no-repeat;
            background-size: 60%;
        }
    }
    .btn-line {
        padding: 10px;
        width: 350px;
        margin: 0 auto;
        @media (max-height:700px) {
            padding: 7px;
        }
    }
}

a {
    color: #76819E;
}
.login-btn {
    background: linear-gradient(230deg, #56E0CB, #28B5F2);
    width: 347px;
    height: 60px;
    border-radius: 31px;
    font-size: 18px;
    color: #fff;
    border: 0;
    outline: none;
    cursor: pointer;
    @media (max-height:900px) and (min-height: 701px) {
        height: 55px;
        border-radius: 28px;
    }
    @media (max-height:700px) {
        height: 50px;
        border-radius: 25px;
    }
}
.code-span {
    display: block;
    width: 160px;
    height: 62px;
    @media (max-height:900px) and (min-height: 701px) {
        height: 55px;
    }
    @media (max-height:700px) {
        height: 50px;
    }
}
.code-img {
    background: url("../images/v_code.png");
    width: 79px;
    height: 27px;
    display: inline-block;
    vertical-align: middle;
}
</style>
