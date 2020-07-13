<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="transitionBody"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:'transitionLeft'
    }
  },
  watch: {
    $route(to, from){
      //判断索引前进与后退
      if(to.meta.index > from.meta.index){
        this.transitionName = 'transitionLeft';
      }else{
        this.transitionName = 'transitionRight';
      }
    }
  },
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  /* 显示滚动条 */
  bottom:0; 
  overflow-y:scroll; 
  overflow-x:hidden;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  z-index:-10;
  zoom: 1;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  background-image: url(../public/asset/backimg.jpg);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.transitionBody{
  transition: all 1s ease-out; 
  -webkit-transition: all 1s ease;
 -moz-transition: all 1s ease;
}
.transitionLeft-enter,
.transitionRight-leave-active {
  opacity: 0;
  transform: translate3d(50% 0, 0);
  -webkit-transform: translate3d(50%, 0, 0);
  -moz-transform: translate3d(50%, 0, 0);
}
.transitionLeft-leave-active,
.transitionRight-enter {
  opacity: 0;
  transform: translate3d(-50% 0, 0);
  -webkit-transform: translate3d(-50%, 0, 0);
  -moz-transform: translate3d(-50%, 0, 0);
}
.transitionLeft-enter-active,
.transitionRight-enter-active {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
