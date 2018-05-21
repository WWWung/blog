<template lang="html">
  <div>
    <Head-view></Head-view>
    <div id="login-wrap">
      <div class="login-row">
        <label for="account">账号</label>
        <input type="text" name="" value="" id='account' v-model='name'>
      </div>
      <div class="login-row">
        <label for="password">密码</label>
        <input type="password" name="" value="" id='password' v-model='psw'>
      </div>
      <div class="login-row">
        <a href="javascript:;" @click='loginIn'>登录</a>
        <a href="#">注册</a>
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
import Head from '../components/head'
import Dialog from '../components/dialog'
const url = 'http://127.0.0.8:3000/loginIn'
export default {
  components: {
    'Head-view': Head,
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
    loginIn () {
      if (!this.name || !this.psw) {
        return
      }
      const data = JSON.stringify({
        name: this.name,
        psw: this.psw
      })
      this.$http.post(url, data).then((d) => {
        if (d.data.name) {
          this.$store.commit('getUserInfo', d.data)
          this.$store.commit('setLoginState', true)
          this.$router.push({path: '/'})
        } else {
          this.dialog.msg = d.data
          this.dialog.show = true
          this.letDialogClear(this, 1000)
        }
      }).catch((err) => {
        console.log(err)
      })
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
#login-wrap {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.login-row {
  display: flex;
  justify-content: center;
}
</style>
