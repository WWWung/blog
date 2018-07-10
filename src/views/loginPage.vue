<template lang="html">
  <div class="login-layer">
    <div id="login-wrap">
      <div class="login-row">
        <h2>欢迎加入王建BLOG</h2>
      </div>
      <div class="login-row">
        <input type="text" name="" value="" id='account' v-model='name' placeholder="请输入用户名称" @keydown='keydown($event)'>
      </div>
      <div class="login-row">
        <input type="password" name="" value="" id='password' v-model='psw' placeholder="请输入用户密码" @keydown='keydown($event)'>
      </div>
      <div class="login-row">
        <a href="javascript:;" @click='loginIn' ref='loginBtn' class="login-btn">登录</a>
        <a href="javascript:;" @click='toRegisterPage' class="register-btn">注册</a>
      </div>
    </div>
    <Dialog :dialog='dialog'></Dialog>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Dialog from '../components/dialog'
const url = 'http://127.0.0.8:3000/loginIn'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      name: '',
      psw: '',
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setLoginState']),
    loginIn () {
      if (!this.name) {
        this.dialog.msg = '请输入名称'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return
      }
      if (!this.psw) {
        this.dialog.msg = '请输入密码'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return
      }
      const data = JSON.stringify({
        name: this.name,
        psw: this.psw
      })
      this.$http.post(url, data).then((d) => {
        if (d.data.name) {
          this.setUserInfo(d.data)
          this.setLoginState(true)
          this.$router.go(-1)
        } else {
          this.dialog.msg = d.data
          this.dialog.show = true
          this.letDialogClear(this, 1000)
        }
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
#login-wrap {
  width: 388px;
  margin: 0 auto;
  height: 340px;
  border: 1px solid #d5dce5;
  border-radius: 5px;
  background: #fefefe;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 24px;
  box-sizing: border-box;
}
#account, #password {
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
.login-btn, .register-btn{
  width: 60px;
  height: 28px;
  border: 1px solid #eee;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
}
.login-btn {
  background-color: #0077e6;
  color: #fff;
}
.register-btn {
  background-color: #fff;
  color: #0077e6;
}
</style>
