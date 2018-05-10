<template lang="html">
  <textarea :id='id' :value='value'></textarea>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'

const INIT = 0
const CHANGED = 2
var EDITOR = null

export default {
  props: {
    value: {
      type: String,
      require: true
    },
    setting: {}
  },
  watch: {
    value: function (val) {
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        tinymce.activeEditor.setContent(val)
      }
      this.status = CHANGED
    }
  },
  data () {
    return {
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds()
    }
  },
  mounted () {
    const _this = this
    const setting = {
      selector: '#' + this.id,
      language: 'zh_CN',
      init_instance_callback: function (editor) {
        EDITOR = editor
        editor.on('input change undo redo', () => {
          let content = editor.getContent()
          _this.$emit('input', content)
        })
      },
      plugins: []
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
</style>
