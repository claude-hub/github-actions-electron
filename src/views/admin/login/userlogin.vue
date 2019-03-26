<template>
  <el-form ref="loginForm" class="login-form" status-icon :rules="loginRules" :model="loginForm" label-width="0">
    <el-form-item prop="loginStr">
      <el-input
        v-model="loginForm.loginStr"
        size="small"
        auto-complete="off"
        placeholder="用户名 | 邮箱 | 手机号"
        @keyup.enter.native="handleLogin"
      >
        <i slot="prefix" class="iconfont icon-user" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        size="small"
        :type="passwordType"
        auto-complete="off"
        placeholder="密码"
        @keyup.enter.native="handleLogin"
      >
        <i slot="suffix" class="iconfont icon-eye" @click="showPassword" />
        <i slot="prefix" class="iconfont icon-password" />
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-row :span="24">
        <el-col :span="12">
          <el-input
            v-model="loginForm.captcha"
            size="small"
            :maxlength="code.len"
            auto-complete="off"
            placeholder="请输入验证码"
            @keyup.enter.native="handleLogin"
          >
            <i slot="prefix" class="iconfont icon-yanzhengma" />
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="login-code">
            <img :src="code.src" alt="" @click="refreshCode">
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-checkbox v-model="loginForm.remember">
      记住账号
    </el-checkbox>
    <el-form-item>
      <el-button type="primary" size="small" class="login-submit" @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from '@/utils/utiltools'
import { Msg } from '@/utils/message'

export default {
  name: 'Userlogin',
  data() {
    return {
      loginForm: {
        loginStr: 'admin',
        password: '123456',
        captcha: '',
        remember: false
      },
      code: {
        src: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        loginStr: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  created() {
    this.refreshCode()
  },
  methods: {
    refreshCode() {
      const randomStr = randomLenNum(this.code.len, true)
      this.code.src = `${process.env.VUE_APP_BASE_API}/api/admin/tool/captcha?randomStr=${randomStr}`
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
          }).catch(err => {
            console.log(err)
            Msg.error('验证码错误')
            this.refreshCode()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-eye {
    cursor: pointer;
  }
</style>
