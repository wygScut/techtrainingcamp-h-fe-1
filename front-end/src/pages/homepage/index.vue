<template>
  <div :style="homepage">
    <header>狼人杀</header>
    <div class="choose">
      <mt-button @click="jumpToGod">我是上帝</mt-button>
      <mt-button @click="jumpToPlayer">我是玩家</mt-button>
    </div>
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
  data(){
    return{
      homepage:{
        padding:"10vh 5vw",
        boxSizing:"border-box",
        width:"100vw",
        height:"100vh",
        overflow:"hidden",
        background: "url(" + require("../../static/icons/home-bg.jpg") + ")",
      }
    }
  },
  methods: {
    jumpToGod(){
      this.$router.push("/roomSettings")
    },
    jumpToPlayer(){
      this.$router.push("/playerLogin")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  font-size: 3.2rem;
  font-weight: bold;
  color: white;
  margin: 11vh;
}
button{
  width: 60vw;
  background: transparent;
  color: #033549;
  font-size: 2rem;
  font-weight: bolder;
  box-shadow: none;
  height: 10vh;
  cursor: pointer;
}
.choose{
  margin-top: 20vh;
}
</style>
