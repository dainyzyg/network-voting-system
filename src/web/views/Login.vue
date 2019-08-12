<template lang="pug">
  .page-wraper
    .form
      el-form(:model="userInfo" :rules="rules" ref="ruleForm")
        el-form-item(prop="userName")
          el-input(v-model="userInfo.userName" placeholder="请输入用户名" prefix-icon="el-icon-user")
        el-form-item(prop="password")
          el-input(v-model="userInfo.password" placeholder="请输入密码" prefix-icon="el-icon-lock")
        el-form-item
          el-button(type="primary" style="width:100%" @click="login") 登2 陆
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import auth from '@/libs/auth'

export default Vue.extend({
  name: 'home',
  data() {
    return {
      userInfo: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }]
      }
    }
  },
  methods: {
    login() {
      let ruleForm = this.$refs.ruleForm as Form
      ruleForm.validate(valid => {
        if (valid) {
          let r = auth.login(this.userInfo)
          if (r) {
            this.$router.push('/')
          } else {
            console.log('登陆失败！')
          }
        } else {
          return false
        }
      })
    }
  }
})
</script>
<style scoped>
.form {
  border: 1px solid silver;
  padding: 20px;
  width: 300px;
  border-radius: 5px;
}
.page-wraper {
  justify-content: center;
  align-items: center;
}
</style>

