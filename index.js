import appPrompt from './components/appPrompt.vue'

let components = [],
    options = [],
    instances = []

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
    components,
    options,
    instances
  },
  mutations: {
    ADD_POPUP ({component, options}) {
      components.push(component)
      componentPopUp.state.options.push(options)
    },
    REMOVE_A_POPUP () {
      let arr = [components, instances, options]
      for (let i = 0; i < arr.length; i++) {
        let stack = arr[i]
        stack.splice(componentIndex - stack.length, 1) 
      }
    },
    CLEAR () {
      let arr = [components, instances, options]
      for (let i = 0; i < arr.length; i++) {
        let stack = arr[i]
        stack.splice(0, stack.length) 
      }
    }
  },
  actions: {
    async popUp (component, options = {
                    livingTime: undefined,
                    wrapperStyle: undefined,
                    stackContext: '#appPrompt',
                    mountedEventEmiter: undefined,
                    destroyedEventEmiter: undefined
                  } ) {
      componentPopUp.mutations.ADD_POPUP({component, options})
      return new Promise((resolve) => {
        options.mountedEventEmiter = resolve
      })
    },
    async cancel (key) {
      if (key) {
        for (let i = instances.length; i > 0; i--) {
          const vm = instances[i], component = components[i]
          if (
            (key.__proto__.constructor.name === 'VueComponent' && key === vm)
            || (key === component)
          ) {
            return new Promise(resolve => {
              options[i].destroyedEventEmiter = resolve
              componentPopUp.mutations.REMOVE_A_POPUP( i )
            })
          }
        }
      }
      else {
        return new Promise(resolve => {
          options[components.length - 1].destroyedEventEmiter = resolve
          componentPopUp.mutations.REMOVE_A_POPUP(components.length - 1)
        })
      }
    },
    async cancelAll (VueComponent) {
      let promiseList = []
      if (VueComponent) {
        let componentIndex = components.findIndex(VueComponent)
        while (componentIndex !== -1) {
          promiseList.push( componentPopUp.actions.cancel(VueComponent) )
        }
      } else {
        for (let element of options) {
          promiseList.push(new Promise(resolve => {
            element.destroyedEventEmiter = resolve
          }))
        }
        componentPopUp.mutations.CLEAR()
      }
      return Promise.all(promiseList)
    }
  }
}

export default componentPopUp