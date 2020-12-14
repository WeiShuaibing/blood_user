<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">血液管理系统——用户端</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <div>
        <el-button type="text" @click="toRegist">注册</el-button>
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登 录
      </el-button>

    </el-form>

    <el-dialog title="注册" :visible.sync="registVisible">
      <div style="width: 80%;margin: 0 auto;">
        <el-row>
          <el-col :span="4"> <span style="line-height: 2">姓名：</span></el-col>
          <el-col :span="18"><el-input v-model="regist.name" placeholder="请输入..." /></el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="4"> <span style="line-height: 2">年龄：</span></el-col>
          <el-col :span="18"><el-input v-model="regist.age" placeholder="请输入..." /></el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="4"> <span style="line-height: 2">性别：</span></el-col>
          <el-col :span="18">
            <el-select v-model="regist.sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="4"> <span style="line-height: 2">电话：</span></el-col>
          <el-col :span="18"><el-input v-model="regist.phone" placeholder="请输入..." /></el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="4"> <span style="line-height: 2">密码：</span></el-col>
          <el-col :span="18"><el-input show-password v-model="regist.password" placeholder="请输入..." /></el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="4"> <span style="line-height: 2">确认密码：</span></el-col>
          <el-col :span="18"><el-input show-password v-model="regist.password2" placeholder="请输入..." /></el-col>
        </el-row>
        <el-row style="margin-top: 8px;">
          <el-col :span="4"> <span style="line-height: 2">地址：</span></el-col>
          <el-col :span="18"><el-input v-model="regist.address" placeholder="请输入..." /></el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registVisible = false">取 消</el-button>
        <el-button type="primary" @click="enshureRegist">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { save } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '12345678901',
        password: '123456'
      },
      regist: {
        name: '',
        age: '',
        sex: '',
        phone: '',
        password: '',
        password2: '',
        address: ''
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      registVisible: false,
      redirect: undefined,
      otherQuery: {},
      userRole: 1
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    enshureRegist() {
      console.log(this.regist)
      if (this.regist.name === '' || this.regist.age === '' || this.regist.sex === '' ||
        this.regist.phone === '' || this.regist.password === '' || this.regist.password2 === '' ||
        this.regist.address === '') {
        this.$message.warning('请完善信息')
        return
      } else if (this.regist.password !== this.regist.password2) {
        this.$message.warning('密码不一致')
      } else {
        this.regist.password = this.$md5(this.regist.password)
        save(this.regist).then(res => {
          this.$message.success('注册成功,请登录')
          this.registVisible = false
        })
      }
    },
    toRegist() {
      this.registVisible = true
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message.info('账号或者密码不能为空')
        return
      }
      if (this.loginForm.password.length < 6) {
        this.$message.info('密码长度不能小于6位')
        return
      }
      // this.loginForm.password = this.$md5(this.loginForm.password)
      const username = this.loginForm.username
      const md5_pwd = this.$md5(this.loginForm.password)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', { username, password: md5_pwd })
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #283443;
  $cursor: #283443;

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
        /*border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;*/
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
      background: rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #F8F8FF;
  $dark_gray: #889aa4;
  $light_gray: #000;

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
