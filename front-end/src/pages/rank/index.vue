<template>
<div class="rank">
	<h1>排行榜</h1>
	<div class="ranking">
			<ul>
				<li v-for="(item,i) in scoreList" :key="i"><a>{{item.name}}:{{item.score}}</a></li>
			</ul>
		</div>
    <div class='btn'>
		<mt-button type='primary' @click="back">返回</mt-button>
    </div>
</div>
</template>

<script>
// 宋秋雁
export default {
  data () {
    return {
      Room:sessionStorage.getItem('roomId')||sessionStorage.getItem('Room'),
      scoreList:[
      ]
      
    }
  },
  mounted() {
	this.getRoom();
  },
methods: {
		async getRoom() {
				const res = await this.$axios.get(`/gainScoreList?roomId=${this.Room}`)
				
				console.log(res.data.scoreList)
				this.scoreList = res.data.scoreList
				this.getList()
			},
		getList() {
				let finalList = this.scoreList.sort(function(a, b){return b.score - a.score});
				this.scoreList = finalList;
				},
		back() {
				this.$router.go(-1);
				}
	}
}

</script>

<style scoped>

		.rank {
			height: 100%;
			width: 100%;
			position: relative;
		}
		a {
			color: #525C66;
			text-decoration: none;
		}
  
		.ranking {
			display: inline-block;
			width: 340px;
			/* margin-top: 0px;
			margin-left: 10px; */
			background: #fff;
			border: 1px solid;
            border-radius: 25px;
			margin: 0 auto;
		}

		.ranking ul {
			counter-reset: section;
			
		}

		.ranking li {
			float: left;
            text-align: left;
			width: 260px;
			border-bottom: 1px solid #b8c2cc;
			line-height: 46px;
			height: 46px;
			overflow: hidden;
			color: #525C66;
			font-size: 20px;

		}

		.ranking li:before {
			counter-increment: section;
			content: counter(section);
			display: inline-block;
			padding: 0 12px;
			margin-right: 10px;
			height: 18px;
			line-height: 18px;
			background: #b8c2cc;
			color: #fff;
			border-radius: 3px;
			font-size: 15px
		}
  
		.ranking li:nth-child(1):before {
			background: #0164b4
		}

		.ranking li:nth-child(2):before {
			background: #0164b4
		}

		.ranking li:nth-child(3):before {
			background: #0164b4
		}

		.btn {
			position:absolute; 
			top:20px;
			right: 20px;
			float: inherit;
			}
	</style>

