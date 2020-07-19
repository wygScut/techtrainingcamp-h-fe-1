<template>
  <div class="hello">
    <h1 style="color:white">游戏结束</h1>
	<div class='main'>
	<button @click="close">关闭房间</button>
	<button @click="restart">再来一局</button>
	<button @click="toList">查看排行榜</button>
 </div>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  props: {
    msg: String
  },
  data(){
	return{
		Room:sessionStorage.getItem('roomId')||sessionStorage.getItem('Room')
	}
  },
  methods:{
		close : function () {
			this.$messagebox.confirm('确定要关闭本房间吗？').then(async () => {
				this.$axios.post('/killRoom',this.Room).then((re)=>{
				console.log(re);
				alert('成功关闭房间')
				console.log('成功关闭房间');
				this.$router.push({path:"/"});
				})
				
				})
		},
		toList : function () {
			this.$router.push({path:"rank",});
		},
		restart : function () {
			console.log('点击了再来一局');
			this.$router.push({path:"/roomSettings"});
		}
			
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main{
		margin: 60px auto;
		width:200px;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.main button{
		height: 30px;
		border-radius: 8px;
	}
</style>
