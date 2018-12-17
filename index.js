import appPrompt from './components/appPrompt.vue'

let componentPopUp = {
  install (Vue) {
    // 注入实例方法
    Vue.prototype.$popUp = componentPopUp.actions.popUp
    Vue.prototype.$popUp.cancel = componentPopUp.actions.cancel
    Vue.prototype.$popUp.store = componentPopUp
    // 注入GUI组件
    let PopUps = Vue.extend(appPrompt)
    let popUp = new PopUps()
    document.body.appendChild(popUp.$mount().$el)
  },
  state: {
    components: [],
    options: []
  },
  mutations: {
    ADD_POPUP_COMPONENT ({component, wrapperStyle, stackContext}) {
      componentPopUp.state.components.push(component)
      componentPopUp.state.options.push(options)
    },
    CANCEL_A_POPUP_COMPONENT (component) {
      componentPopUp.state.components.splice(componentPopUp.state.components.findIndex(element => element === component), 1)
      componentPopUp.state.options.splice(componentPopUp.state.options.findIndex(element => element === options), 1)
    }
  },
  actions: {
    async popUp (component,
                 options = {
                    livingTime = undefined,
                    wrapperStyle = undefined,
                    stackContext = '#appPrompt',
                    mountedEventEmiter = undefined,
                    destroyedEventEmiter = undefined
                  }
                ) {
      componentPopUp.mutations.ADD_POPUP_COMPONENT({component, options})
      return new Promise((resolve) => {
        options.mountedEventEmiter = resolve
      })
    },
    async cancel (component) {
      componentPopUp.mutations.CANCEL_A_POPUP_COMPONENT(component)
      return new Promise(resolve => {
        options.destroyedEventEmiter = resolve
      })
    }
  }
}

export default componentPopUp