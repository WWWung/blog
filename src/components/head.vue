<template lang="html">
  <header id="app-head">
    <div id="user-img-wrap">
      <img :src="user.image" alt="" id='user-img'/>
    </div>
    <div id="user-info-wrap">
      <div id="user-name">
        {{user.name}}
      </div>
      <div id="user-introduce">
        {{user.introduce}}
      </div>
    </div>
    <div id="search-wrap">
      <input type="text" name="" value="" id="search-box">
      <a href="#">搜索</a>
    </div>
  </header>
</template>

<script>
var url = 'https://www.easy-mock.com/mock/5ae432a63ed818654bc27f5e/blog/users'
export default {
  data () {
    return {
      user: {
        name: '',
        introduce: '',
        image: ''
      }
    }
  },
  mounted () {
    this.$http.get(url).then((d) => {
      this.user.name = d.data.users[0].name
      this.user.introduce = d.data.users[0].introduce
      this.user.image = d.data.users[0].img
    })
  }
}
</script>

<style lang="css">
  #app-head {
    width: 1400px;
    height: 135px;
    text-align: center;
  }

  #user-img , #user-img-wrap {
    float: left;
    width: 135px;
    height: 135px;
  }

  #user-img {
    display: block;
    border-radius: 50%;
  }

  #user-info-wrap {
    float: left;
    margin-left: 30px;
    padding-top: 18px;
  }

  #user-name , #user-introduce {
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    margin: 5px;
    max-width: 200px;
  }

  #search-wrap {
    float: right;
  }
</style>
