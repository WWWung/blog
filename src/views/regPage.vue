<template lang="html">
  <div class="login-layer">
    <div id="reg-wrap">
      <div class="login-row">
        <h2>欢迎加入王建BLOG</h2>
      </div>
      <div class="login-row">
        <input type="text" name="" value="" id='account' v-model='name' placeholder="请输入用户名称" @keydown='keydown($event)'>
      </div>
      <div class="login-row">
        <input type="password" name="" value="" id='password' v-model='pwd' placeholder="请输入用户密码" @keydown='keydown($event)'>
      </div>
      <div class="login-row">
        <input type="password" name="" value="" id='rePassword' v-model='rePwd' placeholder="请重复用户密码" @keydown='keydown($event)'>
      </div>
      <div class="login-row">
        <a href="javascript:;" @click='regUser' ref='loginBtn' class="reg-btn">注册</a>
      </div>
    </div>
    <Dialog :width='dialog.width'
            :msg='dialog.msg'
            :height='dialog.height'
            :show-dialog='dialog.show'>
          </Dialog>
  </div>
</template>

<script>
import Dialog from '../components/dialog'
const url = 'http://127.0.0.8:3000/register'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      name: '',
      pwd: '',
      rePwd: '',
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      }
    }
  },
  methods: {
    regUser () {
      if (!this.name) {
        this.dialog.msg = '请输入名称'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return
      }
      if (this.name < 4) {
        this.dialog.msg = '名称不能少于四位'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return
      }
      if (!this.pwd) {
        this.dialog.msg = '请输入密码'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return
      }
      const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if (!pwdReg.test(this.pwd)) {
        this.dialog.msg = '密码必须是8-20位数字和字母的组合'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      if (this.pwd !== this.rePwd) {
        this.dialog.msg = '重复密码需与密码一致'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return
      }
      const user = {
        name: this.name,
        pwd: this.pwd,
        registerTime: new Date().getTime(),
        imageUrl: '../../../static/imgs/portrait.png'
      }
      this.$http.post(url, JSON.stringify(user)).then((d) => {
        this.$store.commit('getUserInfo', user)
        this.$store.commit('setLoginState', true)
        this.$router.push({path: '/'})
      }).catch((err) => {
        console.log(err)
      })
    },
    toRegisterPage () {
      this.$router.push({path: '/register'})
    },
    keydown (e) {
      if (e.keyCode === 13) {
        this.$refs.loginBtn.click()
      }
    },
    letDialogClear (_this, time, fun) {
      let timer = setTimeout(() => {
        _this.dialog.show = false
        clearTimeout(timer)
        if (typeof fun === 'function') {
          fun()
        }
      }, time)
    }
  }
}
</script>

<style lang="css">
.login-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  background: #d8eef8;
  display: flex;
  align-items: center;
}
#reg-wrap {
  width: 388px;
  margin: 0 auto;
  height: 480px;
  border: 1px solid #d5dce5;
  border-radius: 5px;
  background: #fefefe;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding-bottom: 20px;
}
#account, #password, #rePassword {
  width: 302px;
  border: 1px solid #d5dce5;
  height: 40px;
  line-height: 30px;
  border-radius: 4px;
  text-indent: 20px;
}
.login-row {
  display: flex;
  justify-content: space-around;
}
.login-row h2 {
  font-size: 32px;
}
.reg-btn{
  width: 260px;
  height: 32px;
  border: 1px solid #eee;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
  background-color: #0077e6;
  color: #fff;
}
.register-btn {
  background-color: #fff;
  color: #0077e6;
}
</style>
