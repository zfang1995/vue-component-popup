import appPrompt from './components/appPrompt.vue'

let componentPopUp = {
  install (Vue) {
    // 注入实例方法
    Vue.prototype.$popUp = componentPopUp.actions.popUp
    Vue.prototype.$popUp.state = componentPopUp.state
    Vue.prototype.$popUp.cancel = componentPopUp.actions.cancel
    // 注入GUI组件
    let PopUps = Vue.extend(appPrompt)
    let popUp = new PopUps()
    document.body.appendChild(popUp.$mount().$el)
  },
  state: {
    components: [],
    options: [],
    instances: []
  },
  mutations: {
    ADD_POPUP ({component, options}) {
      componentPopUp.state.components.push(component)
      componentPopUp.state.options.push(options)
    },
    CANCEL_A_POPUP (componentIndex) {
      [componentPopUp.state.components, componentPopUp.state.instances, componentPopUp.state.options].forEach((stack) => {
        stack.splice(componentIndex - stack.length, 1) 
      })
    }
  },
  actions: {
    async popUp (component,
                 options = {
                    livingTime: undefined,
                    wrapperStyle: undefined,
                    stackContext: '#appPrompt',
                    mountedEventEmiter: undefined,
                    destroyedEventEmiter: undefined
                  }
                ) {
      componentPopUp.mutations.ADD_POPUP({component, options})
      return new Promise((resolve) => {
        options.mountedEventEmiter = resolve
      })
    },
    async cancel (key) {
      let methodsSwitch = {
        Object: function () {
          componentPopUp.state.components.forEach((element, index) => {
            if (element === key) componentPopUp.mutations.CANCEL_A_POPUP(index)
          })
        },
        VueComponent: function () {
          let componentIndex = componentPopUp.state.instances.findIndex(key)
          componentPopUp.mutations.CANCEL_A_POPUP(componentIndex)
        }
      }
      methodsSwitch[key.__proto__.constructor]()
      // return new Promise(resolve => {
      //   options.destroyedEventEmiter = resolve
      // })
    }
  }
}

export default componentPopUp