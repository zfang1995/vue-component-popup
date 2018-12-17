<template>
  <div class="wrap" :style="wrapperStyle | generateStyleFromDictionary" 
  v-on:click.stop.native="cancelThisComponent" 
  v-on:touchend.stop.native="cancelThisComponent">
    <component v-bind:is="component" 
    v-on:click.stop.native 
    v-on:touchend.stop.native>
    </component>
  </div>
</template>

<script>
export default {
  props: ['component', 'wrapperStyle', 'livingTime', 'mountedEventEmiter', 'destroyedEventEmiter'],
  filters: {
    generateStyleFromDictionary (dictionary = {}) {z
      let style = ''
      for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
          const value = dictionary[key]
          style = style + key + ':' + value+ '; '
        }
      }
      return style
    }
  },
  methods: {
    cancelThisComponent () {
      this.$popUp.store.mutations.CANCEL_A_POPUP_COMPONENT(this.component)
    }
  },
  mounted () {
    if (livingTime) { setTimeout(() => this.cancelThisComponent(), livingTime) } // 挂载后开始生存时间倒计时
    this.mountedEventEmiter(this)
  },
  destroyed () {
    this.destroyedEventEmiter()
  }
}
</script>

<style lang="css" scoped>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: none;
    z-index: 1000;
  }
</style>

