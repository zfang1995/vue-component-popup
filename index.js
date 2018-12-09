import appPrompt from './components/appPrompt.vue'

let componentPopUp = {
  install (Vue) {
    // 注入实例方法
    Vue.prototype.$popUp = componentPopUp.actions.$popUp
    Vue.prototype.$popUp.cancel = componentPopUp.mutations.CANCEL_A_PROMPT_COMPONENT
    Vue.prototype.$popUp.store = componentPopUp
    // 注入GUI组件
    let PopUps = Vue.extend(appPrompt)
    let popUp = new PopUps()
    document.body.appendChild(popUp.$mount().$el)
    

  },
  state: {
    vueComponents: []
  },
  mutations: {
    ADD_PROMPT_COMPONENT ({vueComponent, wrapperStyle, stackContext}) {
      componentPopUp.state.vueComponents.push({vueComponent, wrapperStyle, stackContext})
    },
    CANCEL_A_PROMPT_COMPONENT (vueComponent) {
      componentPopUp.state.vueComponents.splice(componentPopUp.state.vueComponents.findIndex(element => element === vueComponent), 1)
    }
  },
  actions: {
    $popUp (vueComponent, {livingTime = undefined, wrapperStyle = undefined, stackContext = '#appPrompt'}) {
      if (typeof livingTime === 'number') { 
        setTimeout(() => componentPopUp.mutations.CANCEL_A_PROMPT_COMPONENT(vueComponent), livingTime) 
      }
      componentPopUp.mutations.ADD_PROMPT_COMPONENT({vueComponent, wrapperStyle, stackContext})
      return new Promise((resolve) => {
        resolve(function cancel () { componentPopUp.mutations.CANCEL_A_PROMPT_COMPONENT(vueComponent) })
      })
    }
  }
}

export default componentPopUp