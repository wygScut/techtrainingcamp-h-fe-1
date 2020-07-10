<template>
  <div class="player-login" :style="loginPage">
    <div class="back-button" @click="backHome"><img src="../../static/icons/button/back.png"/></div>
    <header>玩家登录</header>
    <form>
      <div><span>玩 家 名：</span><input type="text" placeholder="请输入昵称" v-model="form.name"/></div>
      <div><span>房 间 号：</span><input type="text" placeholder="请输入房号" v-model="form.roomId"  /></div>
    </form>
    <div><mt-button @click="submit">进入游戏</mt-button></div>
    <div class="rules" @click="jumpToRules">规则说明</div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Button,
  Indicator,
  Toast,
} from 'mint-ui'

Vue.component(Button.name, Button);

export default {
  name: 'PlayerLogin',
  data() {
    return{
      form:{
        name:"",
        roomId:null,
      },
      loginPage:{
        padding:"20vh 5vw 20vh 5vw",
        boxSizing:"border-box",
        width:"100vw",
        height:"100vh",
        overflow:"hidden",
        background: "url(" + require("../../static/icons/home-bg.jpg") + ")",
      }
    }
  },
  props: {
  },
  methods: {
    submit(){
      Indicator.open();
      let loginInfo = {
        name:this.form.name,
        roomId: parseInt(this.form.roomId)
      }
      this.$axios({
        method: "post",
        url:"/gainRole",
        data:loginInfo
      }).then(res=>{
        Indicator.close();
        const userInfo = res.data;
        if(userInfo.playerId>=0){
          Toast({
            message: '登录成功！',
            position: 'middle'
          });
          this.$router.push({
            path:"/playerPage",
            name:"playerPage",
            params:{
              name:loginInfo.name,
              roomId:loginInfo.roomId,
              playerId:userInfo.playerId,
              role:userInfo.role
            }
          });
        }else{
          Toast({
            message:userInfo.message
          });
        }
      });
    },
    jumpToRules(){
      this.$router.push("/rules")
    },
    backHome(){
      this.$router.go(-1);
    }
  },
}
</script>

<style scoped>
.back-button img{
  position: absolute;
  top: 5%;
  left: 5%;
  width: 8vw;
  height: 4vh;
}
.rules{
  color: white;
  cursor: pointer;
}
header{
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 10vh;
}
form div{
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  line-height: 1.8rem;
  margin-bottom: 5vh;
}
form div:first-child{
  margin-top: 20vh;
}

form div input{
  outline: none;
  border: none;
  background: transparent;
  border-bottom: solid 1px white;
  line-height: 1.8rem;
  font-size: 1.8rem;
  width: 50%;
  color: #033549;
}

form div input:focus {
  outline: none;
  box-shadow: none;
}

button{
  background: transparent;
  margin-top: 10vh;
  color: rgb(246, 250, 252);
  font-size: 2rem;
  font-weight: bold;
  box-shadow: none;
  width: 60vw;
  height: 10vh;
  letter-spacing: 2vw;
  text-align: center;
  cursor: pointer;
}

</style>
