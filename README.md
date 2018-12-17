# vue-component-popup

## install
### via vue-cli
``` bash
yarn install vue-component-popup --save
```
then , in main.js
``` javascript
import componentPopup from 'vue-component-popup'
Vue.use(componentPopup)
```
## usage
### basis
#### pop-up a component
in any ``` .vue ``` single file, you can invoke components pop-up easily by using ``` this.$popUp ```  method. for example: 
``` html
<script>
  import test from '@/components/common/test.vue'

  export default {
    mounted() {
      this.$popUp(test)
    }b
</script>
```
##### wrokflow with promise
```javascript
// at the end of this method run, these will return a promise object, and the instance of given component in arguments will be resolved while the instance being mounted.

this.$popUp(test)
  .then(vm => settimeout( () => vm.$refresh() ), 1000 ) // vm is a instance of test
```


#### cancel a pop-up
for axample:
``` javascript
this.$popUp.cancel(test) // destroy the instance of component--"test" with its wrapper.
this.$popUp.cancel() // if method--"cancel" doesn`t received any argument, it will destroy the lastest popped component.
```
##### wrokflow with promise
```javascript
// at the end of this method run, these will return a promise object, and undefineded will be resolved while the instance being destroyed.

this.$popUp.cancel(test)
  .then( /* do something else */ )
```

#### cancel many pop-ups
for example:
``` javascript
this.$popUp.cancelAll(test) // destroy all the instances of component--"test" with these wrappers
this.$popUp.cancelAll() // if method--"cancel" doesn`t received any argument, it will destroy all popped components.
```

### advanced options
the ``` this.$popUp ``` method accepts another object type argument for receiving options,
for example:
``` javascript
this.$popUp(test, {
	livingTime: 3000 // indicates the component pop-up will be cancelled after 3000ms.
})
```
#### overview
| option    |  meaning | value for example |
| --------- | -------- | -------- |
| livingTime  | the component pop-up will be cancel after (value)ms | 1000 |
| wrapperStyle | the style of pop-up component`s wrapper| {'background-color': 'rgba(95, 75, 200, 0.5)', ‘margin’: 'none'} |
