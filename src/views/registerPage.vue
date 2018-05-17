<template lang="html">
  <div>
    <div class="register-row">
      <label for="rg-name" class="register-row-left">名称</label>
      <input type="text" name="" value="" id="rg-name" class="register-row-right" v-model='user.name'>
    </div>
    <div class="register-row">
      <label for="rg-pwd" class="register-row-left">密码</label>
      <input type="text" name="" value="" id="rg-pwd" class="register-row-right" v-model='user.pwd'>
    </div>
    <div class="register-row">
      <label for="rg-repwd" class="register-row-left">重复密码</label>
      <input type="text" name="" value="" id="rg-repwd" class="register-row-right" v-model='user.repwd'>
    </div>
    <div class="register-row">
      <label for="rg-description" class="register-row-left">个人介绍</label>
      <input type="text" name="" value="" id="rg-description" class="register-row-right"  v-model='user.description'>
    </div>
    <div class="register-row">
      <label for="rg-phone" class="register-row-left">电话</label>
      <input type="text" name="" value="" id="rg-phone" class="register-row-right"  v-model='user.phone'>
    </div>
    <div class="register-row">
      <label for="rg-sex" class="register-row-left">性别</label>
      <div class="register-row-right">
        <label for="rg-man">男</label>
        <input type="radio" name="" value=0 id="rg-man" v-model='user.sex'>
        <label for="rg-woman">女</label>
        <input type="radio" name="" value=1 id="rg-woman" v-model='user.sex'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-QQ" class="register-row-left">QQ</label>
      <input type="text" name="" value="" id="rg-QQ" class="register-row-right"  v-model='user.qq'>
    </div>
    <div class="register-row">
      <label for="rg-email" class="register-row-left">邮箱</label>
      <input type="text" name="" value="" id="rg-email" class="register-row-right"  v-model='user.email'>
    </div>
    <div class="register-row">
      <label for="rg-address" class="register-row-left">地址</label>
      <input type="text" name="" value="" id="rg-address" class="register-row-right"  v-model='user.address'>
    </div>
    <div class="register-row">
      <label for="rg-birthday" class="register-row-left">生日</label>
      <input type="text" name="" value="" id="rg-birthday" class="register-row-right"  v-model='user.birthday'>
    </div>
    <div class="register-row">
      <label for="rg-school" class="register-row-left">学校</label>
      <input type="text" name="" value="" id="rg-school" class="register-row-right"  v-model='user.school'>
    </div>
    <div class="register-row">
      <label for="rg-weibo" class="register-row-left">微博</label>
      <input type="text" name="" value="" id="rg-weibo" class="register-row-right"  v-model='user.weibo'>
    </div>
    <Dialog :width='dialog.width'
            :msg='dialog.msg'
            :height='dialog.height'
            :show-dialog='dialog.show'>
          </Dialog>
  </div>
</template>

<script>
import dialog from '../components/dialog'
export default {
  data () {
    return {
      user: {
        sex: 0,
        name: '',
        pwd: '',
        repwd: '',
        description: '',
        phone: '',
        sex: '',
        qq: '',
        email: '',
        address: '',
        birthday: '',
        school: '',
        weibo: ''
      },
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      }
    }
  },
  methods: {
    confirmUser () {
      if (!this.user.name) {
        this.dialog.msg = '请输入名称'
        this.dialog.show = true
      }
      if (this.user.name.length < 4) {
        this.dialog.msg = '账号不得少于四位'
        this.dialog.show = true
      }
      if (!this.user.pwd) {
        this.dialog.msg = '请输入密码'
        this.dialog.show = true
      }
      if (!this.user.repwd) {
        this.dialog.msg = '请输入重复密码'
        this.dialog.show = true
      }
      const pwdReg =  /^[A-Za-z0-9]{6,20}$/
      if (!pwdReg.test(this.user.pwd)) {
        this.dialog.msg = '密码必须是6-20位数字和字母的组合'
        this.dialog.show = true
      }
      if (!this.user.repwd) {
        this.dialog.msg = '请输入重复密码'
        this.dialog.show = true
      }
      if (this.user.repwd !== this.user.pwd) {
        this.dialog.msg = '重复密码必须和密码一致'
        this.dialog.show = true
      }
    }
  }
}
</script>

<style lang="css">
.register-row {
  margin: 20px;
  display: flex;
  justify-content: space-around;
}
.register-row-left {
  width: 80px;
  text-align: center;
}
.register-row-right {
  width: 300px;
  text-align: center;
}
</style>
