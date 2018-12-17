<template>
  <div v-show="true" id="appPrompt">
    <popup-component  v-for="(element, index) in popUPComponents" 
      v-bind:key="index" 
      v-bind:component="element.component"
      v-bind="element.options">

    </popup-component>
  </div>
</template>

<script>
import popupComponent from './popupComponent.vue'

export default {
  components: {popupComponent},
  data () {
    return {
      popUPComponents: this.$popUp.store.state.components
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

