<template lang="html">
  <div>
    <header class="register-head">
      <div class="head-portrait-wrap">
        <img :src="user.imageUrl" alt="个人头像" class="head-portrait">
        <a href="javascript:;" class="upload-portrait" @click="changePortrait">点击上传头像</a>
        <input type="file" name="portrait" value="" ref="portrait" accept="image/gif,image/jpeg,image/jpg,image/png" @change='changeFile($event)'>
      </div>
    </header>
    <div class="register-row">
      <label for="rg-name" class="register-row-left">名称</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-name" class="text-input" v-model='user.name'>
        <span class="must-fill">*</span>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-pwd" class="register-row-left">密码</label>
      <div class="register-row-right ">
        <input type="password" name="" value="" id="rg-pwd" class="text-input" v-model='user.pwd'>
        <span class="must-fill">*</span>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-repwd" class="register-row-left">重复密码</label>
      <div class="register-row-right ">
        <input type="password" name="" value="" id="rg-repwd" class="text-input" v-model='user.repwd'>
        <span class="must-fill">*</span>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-description" class="register-row-left">个人介绍</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-description" class="text-input"  v-model='user.description'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-phone" class="register-row-left">电话</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-phone" class="text-input"  v-model='user.phone'>
      </div>
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
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-QQ" class="text-input"  v-model='user.qq'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-email" class="register-row-left">邮箱</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-email" class="text-input"  v-model='user.email'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-address" class="register-row-left">地址</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-address" class="text-input"  v-model='user.address'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-birthday" class="register-row-left">生日</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-birthday" class="text-input"  v-model='user.birthday'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-school" class="register-row-left">学校</label>
      <div class="register-row-right ">
        <input type="text" name="" value="" id="rg-school" class="text-input"  v-model='user.school'>
      </div>
    </div>
    <div class="register-row">
      <label for="rg-weibo" class="register-row-left">微博</label>
      <div class="register-row-right">
        <input type="text" name="" value="" id="rg-weibo" class="text-input"  v-model='user.weibo'>
      </div>
    </div>
    <div class="register-row">
      <a href="javascript:;" @click='confirmUser'>注册</a>
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
const poUrl = 'http://127.0.0.8:3000/portrait'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      user: {
        sex: 0,
        name: '',
        pwd: '',
        repwd: '',
        description: null,
        phone: null,
        qq: null,
        email: null,
        address: null,
        birthday: null,
        school: null,
        weibo: null,
        imageUrl: '../../static/imgs/portrait.png'
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
        this.letDialogClear(this, 1000)
        return false
      }
      if (this.user.name.length < 4) {
        this.dialog.msg = '账号不得少于四位'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      if (!this.user.pwd) {
        this.dialog.msg = '请输入密码'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      if (!this.user.repwd) {
        this.dialog.msg = '请输入重复密码'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if (!pwdReg.test(this.user.pwd)) {
        this.dialog.msg = '密码必须是8-20位数字和字母的组合'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      if (!this.user.repwd) {
        this.dialog.msg = '请输入重复密码'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      if (this.user.repwd !== this.user.pwd) {
        this.dialog.msg = '重复密码必须和密码一致'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      let data = {}
      for (let key in this.user) {
        if (key !== 'repwd') {
          data[key] = this.user[key]
        }
      }
      data.birthday = new Date(data.birthday).getTime()
      this.$http.post(url, JSON.stringify(data)).then((d) => {
        console.log(d.data)
        this.$store.commit('getUserInfo', data)
        this.$store.commit('setLoginState', true)
        this.$router.push({path: '/'})
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
    },
    changePortrait () {
      this.$refs.portrait.click()
    },
    changeFile (e) {
      console.log(e.target.files[0])
      const file = e.target.files[0]
      if (file.size > 3148576) {
        alert('请选择小于3M的图片')
        return false
      }
      let formData = new FormData()
      formData.append('portrait', file)
      this.$http.post(poUrl, formData).then((d) => {
        console.log(d.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
.register-row {
  margin: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ebebeb;
  padding: 30px;
}
.register-row input {
  text-align: left;
  text-indent: 10px;
}
.text-input {
  width: 300px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #999;
  box-sizing: border-box;
}
.register-row-left {
  width: 80px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #444;
}
.register-row-right {
  width: 330px;
}
.must-fill {
  display: inline-block;
  padding-left: 10px;
  font-size: 20px;
  vertical-align: middle;
  font-weight: 600;
  color: #444
}
.register-head {
  height: 200px;
  position: relative;
}
.head-portrait-wrap {
  background-color: #eee;
  width: 168px;
  position: absolute;
  height: 168px;
  border-radius: 4px;
  overflow: hidden;
  left: 20px;
}
.head-portrait {
  width: 168px;
  height: 168px;
  display: block;
}
.upload-portrait {
  position: absolute;
  text-align: center;
  width: 168px;
  height: 168px;
  top: 0;
  left: 0;
  background-color: rgba(26, 26, 26, .4);
  line-height: 168px;
  color: #fff;
}
</style>
