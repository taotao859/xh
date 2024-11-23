<template>
  <div class="login-wrapper">
    <div class="login-inner">
      <div class="login-inner-left">
        <div class="logo-container">
          <img :src="logo" alt="logo" />
        </div>
        <div class="content-container">
          <div class="main-title">
            <h2>智驭风控</h2>
            <p class="pinyin">ZhiYuFengKong</p>
          </div>
          <div class="welcome-text">
            <p>Hi，您好</p>
            <p>欢迎进入AI风险决策平台</p>
          </div>
          <div class="footer-text">
            <p>AI驱动，风险预防</p>
          </div>
        </div>
      </div>

      <div class="login-inner-right">
        <el-form
          class="login-container"
          label-position="center"
          label-width="0px"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="用户登录界面"
            placement="top"
          >
            <h3 class="login_title">
              {{ title }}
            </h3>
          </el-tooltip>

          <div class="login-form-main">
            <div class="form-item-wrapper">
              <el-form-item class="form-item-style-input">
                <el-col :span="6">
                  <div class="form-item-label">
                    <p class="form-item-label-text">用户名:</p>
                  </div>
                </el-col>
                <el-col :span="18">
                  <el-input
                    v-model="loginForm.staffId"
                    class="form-item-input"
                    type="text"
                    auto-complete="off"
                    placeholder="账号"
                  />
                </el-col>
              </el-form-item>
              <el-form-item class="form-item-style-input">
                <el-col :span="6">
                  <div class="form-item-label">
                    <p class="form-item-label-text">密码:</p>
                  </div>
                </el-col>
                <el-col :span="18">
                  <el-input
                    v-model="loginForm.staffPassword"
                    class="form-item-input"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                  />
                </el-col>
              </el-form-item>
              <el-form-item prop="vertify_code" class="form-item-style-input">
                <el-col :span="6">
                  <div class="form-item-label">
                    <p class="form-item-label-text">验证码:</p>
                  </div>
                </el-col>
                <el-col :span="18">
                  <el-input
                    v-model="loginForm.verifyCode"
                    class="form-item-input"
                    type="text"
                    placeholder="验证码"
                  >
                    <template slot="append">
                      <img
                        class="login-code"
                        :src="code_url"
                        :height="30"
                        title="看不清？点击切换"
                        @click="getVertifyCode"
                      >
                    </template>
                  </el-input>
                </el-col>
              </el-form-item>
            </div>
          <el-button
            type="primary"
            class="login-btn"
            @click="login"
          >
            登录
          </el-button>
          </div>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import background_pic from '@/assets/background.png'
import logo from '@/assets/logo1.jpg'
export default {
  name: 'Login',
  data () {
    return {
      background_pic: background_pic,
      logo: logo,
      loginForm: {
        staffId: '',
        staffPassword: '',
        verifyCode: ''
      },
      staff: [],
      code_url: '',
      v_code: '',
      title: '用户登录'
    }
  },
  created () {
    this.getVertifyCode()
  },
  methods: {
    login () {
      if (this.loginForm.staffId === '' || this.loginForm.staffPassword === '' || this.loginForm.verifyCode === '') {
        this.$message.error('请输入完整信息');
        return
      }
      console.log(this.loginForm.verifyCode.toLowerCase())
      console.log(this.v_code.toLowerCase())
      if (this.loginForm.verifyCode.toLowerCase() !== this.v_code.toLowerCase()){
        this.$message.error('验证码错误');
        return;
      }
      this.$cookie.set('name', '棒棒')
      this.$router.replace('/home')
    },
    // 获取验证码
    async getVertifyCode() {
      console.log(1221313131)
      const { data: res } = await this.$http.get('/getVerifyCodeImage')
      this.code_url = 'data:image/png;base64,' + res.img // 验证码图片渲染
      this.v_code = res.v_code
    },
  },
  mounted: function () {
  }
}

</script>

<style>

.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/background.png") no-repeat center;
}
.login-inner {
  position: absolute;
  top: 50px;
  left: 100px;
  right: 100px;
  bottom: 50px;
  display: flex;
  height: calc(100vh - 100px); /* 使其占满视口高度 */
  align-items: stretch; /* 确保子元素高度一致 */
}
.login-inner-left {
  width: 50%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center; /* 水平居中 */
  flex-direction: column;
  align-items: flex-start; /* 左对齐 */
  padding-left: 20px; /* 左侧内边距 */

  .logo-container {
    position: absolute; /* 使 logo 固定在页面左上角 */
    top: 20px;
    left: 20px;
    z-index: -1;
    img {
      width: 150px; /* 设置 logo 缩放 */
      height: auto;
    }
  }

  .content-container {
    margin-left: 10px;
    text-align: left;
    background-color: #032262; /* 蓝色背景 */
    border-radius: 10px; /* 圆角 */
    padding: 20px; /* 内边距 */
    color: #fff; /* 白色字体 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
    width: 80%; /* 根据需要设置宽度 */
    height: 60%;
    max-width: 600px; /* 限制最大宽度 */

    .main-title {
      h2 {
        font-size: 40px; /* 标题字号变大 */
        font-weight: bold;
        margin-bottom: 5px;
      }
      .pinyin {
        font-size: 30px; /* 拼音字号略小 */
        font-weight: bold;
        margin-bottom: 20px;
      }
    }

    .welcome-text {
      p {
        font-size: 20px; /* 欢迎文本较小 */
        margin: 5px 0;
      }
    }

    .footer-text {
      margin-top: 20px; /* 与欢迎文字分隔 */
      p {
        font-size: 14px; /* 最小字体 */
      }
    }
  }

}
.login-inner-right {
  display: flex;
  width: 50%;
  height: calc(100vh - 100px);
}
.login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 60px 40px;
  background-color: #fff;
}
.login_title {
  position: relative;
  margin: 0;
  font-size: 40px;
  color: #00237d;
  text-align: center;
  padding-bottom: 10px; /* 添加适当的底部内边距 */
  font-weight: bold;
}

.login-btn {
  display: block;
  width: 100%;
  max-width: 540px;
  height: 70px;
  margin: 0 auto;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 3px;
  background-color: #032262;
  color: #ffffff;

  &.is-disabled {
    background-color: #f0f0f0;
    color: #bababa;
  }
}
.login-form-main {
  position: relative;
  width: 100%;
}
.form-row-button {
  position: relative;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
}
.form-item-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background: rgba(0, 35, 125, 0.1);
  border-radius: 2px 0px 0px 2px;
}
.form-item-label-text {
  font-size: 20px;
  color: #00237d;
}
.form-item-style-input {
  position: relative;
  width: 100%;
  max-width: 540px;
  margin: 0 auto 15px;
}

.form-item-input {
  height: 70px;
  background-color: #f5f6fa;
  border-radius: 0px 2px 2px 0px;

  .el-input__inner {
    height: 70px;
    font-size: 20px;
  }
}


</style>
