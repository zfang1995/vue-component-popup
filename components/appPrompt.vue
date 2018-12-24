<template>
  <div v-show="true" id="appPrompt">
    <popup-component  v-for="(element, index) in popUpComponents" 
      v-bind:key="index" 
      v-bind:component="element"
      v-bind="popUpOptions[index]">

    </popup-component>
  </div>
</template>

<script>
import popupComponent from './popupComponent.vue'

export default {
  components: {popupComponent},
  data () {
    return {
      popUpComponents: this.$popUp.state.components,
      popUpOptions: this.$popUp.state.options
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

