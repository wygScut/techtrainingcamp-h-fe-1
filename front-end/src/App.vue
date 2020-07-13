<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#app {
   position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  z-index:-10;
  zoom: 1;
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
</style>
