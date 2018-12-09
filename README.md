# vue-component-popup

## install
### via vue-cli
``` bash
yarn install vue-component-popup --save
```
then , in main.js
``` javascript
import vueComponentPopup from 'vue-component-popup'
Vue.use(vueComponentPopup)
```
## usage
### basis
in any ``` .vue ``` single file, you can invoke components pop-up easily by using ``` this.$popUp ```  method. for example: 
``` html
<script>
  import test from '@/components/common/test.vue'

  export default {
    mounted() {
      this.$popUp(test)
    }
  }
</script>
```
### advanced options
the ``` this.$popUp ``` method accepts another object type argument for receiving options,
for example:
``` javascript
this.$popUp(test, {
	timeout: 3000 // indicates the component pop-up will be cancel after 3000ms.
})
```
#### overview
| option    |  meaning | value for example |
| :-------- | --------:|
| timeout  | the component pop-up will be cancel after (value)ms | 1000 |
| wrapperStyle | the style of pop-up component`s wrapper| {'background-color': 'rgba(95, 75, 200, 0.5)', ‘margin’: 'none'} |
