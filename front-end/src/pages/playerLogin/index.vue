<template>
  <div class="hello">
    <header>狼人杀</header>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Button,
} from 'mint-ui'

Vue.component(Button.name, Button);

export default {
  name: 'PlayerLogin',
  data() {
    return{
      form:{
        "name":"",
        "roomId":null,
      }
    }
  },
  props: {
  },
  methods: {
    submit(){
      let formData = new FormData();
      for(let key in this.form){
        formData.append(key,this.form[key])
      }
      this.$axios({
        method: "post",
        url:"/gainRole",
        headers:{
          "Content-Type":"multipart/form-data"
        },
        data:formData
      }).then(res=>{
        const userInfo = res.data;
        switch(userInfo.playerId){
          case(-1): alert("房间满了");break;
          case(-2): alert("没有这个房间");break;
          case(-3): alert("重复");break;
          default: this.$router.push({path:"/playerPage"})
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
