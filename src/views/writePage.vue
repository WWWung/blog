<template lang="html">
  <div id="write-page">
    <Head-view></Head-view>
    <Details></Details>
    <div id="show-wrap" v-html='editorHtml'>
    </div>
    <Editor v-model='editorHtml'></Editor>
    <div id="submit-article">
      <a href="#">提交</a>
    </div>
  </div>
</template>

<script>
import Head from '../components/head'
import Editor from '../components/editor'
import Details from '../components/article_details'
// import tinymce from 'tinymce/tinymce'
export default {
  components: {
    'Head-view': Head,
    'Editor': Editor,
    Details
  },
  data () {
    return {
      editorHtml: '',
      article: {
        name: '',
        time: '',
        user_id: null,
        type: 1,
        content: '',
      }
    }
  },
  methods: {
    submitArticle () {
      // let article = {}
      // article.
    }
  }
}
</script>

<style lang="css" scoped>
#show-wrap {
  padding: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
#submit-article {
  margin-top: 15px;
}
</style>
