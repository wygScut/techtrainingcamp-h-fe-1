<template>
  <div class="hello">
    <header>狼人杀</header>
    <mt-button class="god-button" @click="jumpToGod">我是上帝</mt-button>
    <mt-button class="player-button" @click="jumpToPlayer">我是玩家</mt-button>
  </div>
</template>

<script>
// 张斯璟
import Vue from 'vue'
import {
  Button,
} from 'mint-ui';

Vue.component(Button.name, Button);
export default {
  name: 'HomePage',
  methods: {
    jumpToGod(){
      this.$router.push({ path:'/roomSettings' })
    },
    jumpToPlayer(){
      this.$router.push({ path:'/playerLogin' })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  font-size: 3rem;
  margin-top: 100px;
}
button{
  float: left;
}
</style>
