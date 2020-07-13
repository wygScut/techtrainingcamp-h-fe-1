<template>
  <div :style="playerPage">
    <div class="player-avatar">
      <img :src='require(`../../static/icons/role/${info.role}.png`)'/>
    </div>
    <div class="player-name">
      {{info.name}}
    </div>
    <div class="player-id">
      编号：{{info.playerId}}
    </div>
    <div class="player-role">
      <h2>你的角色：{{info.role}}</h2>
    </div>
    <div class="player-state">
      <h2>当前状态：{{info.state}}</h2>
    </div>
    <div class="bottom-buttons">
      <div class="refresh-state">
        <mt-button @click="refreshState">状态刷新</mt-button>
      </div>
      <div class="check-result">
        <mt-button @click="checkResult">查看结果</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 玩家信息页
import {
  Button,
  Indicator
} from 'mint-ui'
import Vue from 'vue'

Vue.component(Button.name, Button);

export default {
  name: 'PlayerPage',
  data(){
    return{
      info:{
        name:"",
        role:"default",
        playerId:null,
        roomId:null,
        state:"初始"
      },
      playerPage:{
        padding:"10vh 5vw",
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
  methods:{
    refreshState(){
      Indicator.open();
      let getState = {
        roomId:parseInt(localStorage.getItem("roomId")),
        playerId: parseInt(localStorage.getItem("playerId"))
      };
      console.log("getstate:");
      console.log(getState)
      this.$axios({
        url:"/gainState",
        method:"post",
        data:getState
      }).then(res=>{
        Indicator.close();
        const roleState = res.data;
        if(roleState.message==="正确返回"){
          switch(roleState.state){
            case(1):this.info.state="存活";break;
            case(2):this.info.state="被放逐";break;
            case(3):this.info.state="晚上死亡";break;
            case(4):this.info.state="被猎杀";break;
            case(5):this.info.state="当选警长";break;
            default: break;
          }
        }else{
          alert(roleState.message)
        }
      });
    },
    checkResult(){
      this.$router.push("/gameOver")
    }
  },
  mounted(){
    let name,role,playerId,roomId;
    const playerinfo = this.$route.params;
    if(JSON.stringify(playerinfo) == "{}"){
      roomId = localStorage.getItem("roomId");
      name= localStorage.getItem("name");
      playerId = localStorage.getItem("playerId");
      role = localStorage.getItem("role");
    }else{
      [{name,playerId,role,roomId}] = [playerinfo];
      localStorage.setItem('name',name);
      localStorage.setItem('playerId',playerId);
      localStorage.setItem('role',role);
      localStorage.setItem('roomId',roomId);
    }
    Object.assign(this.info,{name,roomId,role,playerId});
  }
}

</script>

<style scoped>
.player-name{
  font-size: 2rem;
  font-weight: bold;
}
.player-id{
  font-size: 1.1rem;
  font-weight: bold;
}
.player-role{
  margin-top: 2vh;
}
.player-state{
  margin-top: 1vh;
}
.player-avatar img{
  width: 80vw;
  height: 33vh;
}
.bottom-buttons{
  display: flex;
  margin-top: 5vh;
  justify-content: center;
}
button{
  width: 40vw;
  background: transparent;
  color: #033549;
  font-size: 1.4rem;
  font-weight: bolder;
  box-shadow: none;
  cursor: pointer;
}
</style>
