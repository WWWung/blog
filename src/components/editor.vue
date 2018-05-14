<template lang="html">
  <div class="">
    <textarea :id='id'></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/modern/theme'

// 引入功能 粘贴、插入链接、插入图片（插入图片还需要做特殊的处理--传方法，待续...）
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
//
const INIT = 0
// const CHANGED = 2

export default {
  props: {
    value: {
      type: String,
      require: true
    },
    setting: {}
  },
  // watch: {
  //   value (val) {
  //     if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
  //       tinymce.activeEditor.setContent(val)
  //     }
  //     this.status = CHANGED
  //   }
  // },
  data () {
    return {
      status: INIT,
      id: 'editor'
    }
  },
  mounted () {
    const _this = this
    const setting = {
      selector: '#' + this.id,
      language_url: '/static/tinymce/zh_CN.js',
      skin_url: '/static/tinymce/skins/lightgray',
      language: 'zh_CN',
      plugins: 'link image paste',
      // 工具栏
      toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
      init_instance_callback: function (editor) {
        editor.on('input change undo redo', () => {
          let content = editor.getContent()
          _this.$emit('input', content)
        })
      },
      fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
      // 最上层工具栏
      menubar: 'edit, format, insert'
    }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
</script>

<style lang="css">
#mceu_39 {
  display: none;
}

</style>
