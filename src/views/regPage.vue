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
    <Dialog :dialog='dialog'></Dialog>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
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
    ...mapMutations(['setUserInfo', 'setLoginState']),
    regUser () {
      if (!this.name) {
        this.letDialogClear(this, '请输入名称', 1000)
        return
      }
      if (this.getStrLength(this.name) < 4) {
        this.letDialogClear(this, '名称长度不能少于四位', 1000)
        return
      }
      if (!this.pwd) {
        this.letDialogClear(this, '请输入密码', 1000)
        return
      }
      const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if (!pwdReg.test(this.pwd)) {
        this.letDialogClear(this, '密码必须是8-20位数字和字母的组合', 1000)
        return false
      }
      if (this.pwd !== this.rePwd) {
        this.letDialogClear(this, '重复密码需与密码一致', 1000)
        return
      }
      const user = {
        name: this.name,
        pwd: this.pwd,
        registerTime: new Date().getTime(),
        imageUrl: '../../../static/imgs/portrait.png'
      }
      this.$http.post(url, JSON.stringify(user)).then((d) => {
        if (d.data === '账号已存在') {
          this.letDialogClear(this, '账号已存在', 1000)
        }
        if (d.data.msg === '账号注册成功') {
          user.id = d.data.id
          this.setUserInfo(user)
          this.setLoginState(true)
          this.$router.push({path: '/'})
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
    letDialogClear (_this, time, msg, fun) {
      this.dialog.msg = msg
      this.dialog.show = true
      let timer = setTimeout(() => {
        _this.dialog.show = false
        clearTimeout(timer)
        if (typeof fun === 'function') {
          fun()
        }
      }, time)
    },
    getStrLength (str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
          len += 2
        } else {
          len++
        }
      }
      return len
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
