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
#### cancel a pop-up
for axample:
``` javascript
this.$popUp.cancel(test) // destroy the component--"test" with its wrapper.
this.$popUp.cancel() // if method--"cancel" doesn`t received any argument, it will destroy the lastest popped component.
```
another way:
``` javascript
this.$popUp(test)
  .then(cancel => cancel())
// when $popUp method has been executed, it will return a promise object, and a cancel function will be passed to its callback function. This cancel function is same as this.$popUp.cancel .
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
