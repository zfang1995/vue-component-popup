<template>
  <div v-show="true" id="appPrompt">
    <propmt-component  v-for="(element, index) in popUPComponents" 
      v-bind:key="index" 
      v-bind:component="element.vueComponent"
      v-bind:wrapperStyle="element.wrapperStyle">

    </propmt-component>
  </div>
</template>

<script>
import propmtComponent from './promptComponent.vue'

export default {
  components: {propmtComponent},
  data () {
    return {
      popUPComponents: this.$popUp.store.state.vueComponents
    }
  }
}
</script>

<style scoped>
  #appPrompt {
    width: 0;
    height: 0;
  }
</style>

