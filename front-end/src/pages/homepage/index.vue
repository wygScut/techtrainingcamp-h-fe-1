<template>
  <div class="hompage">
    <h1>主页</h1>
    <mt-button @click="jumpToGod">我是上帝</mt-button>
    <mt-button @click="jumpToPlayer">我是玩家</mt-button>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Button,
} from 'mint-ui'

Vue.component(Button.name, Button)
export default {
  name: 'HomePage',
  methods: {
    jumpToGod(){
      this.$router.push("/godControl")
    },
    jumpToPlayer(){
      this.$router.push("/playerLogin")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button:first-child{

}

</style>
