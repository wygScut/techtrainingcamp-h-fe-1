<template>
  <div class="hello">
    <h1>规则说明</h1>
    <h2>游戏流程</h2>
    <div class='dl'><p>每一局狼人杀游戏都将从夜晚开始，每一个夜晚狼人可以睁眼并共同猎杀场上的一位玩家。夜晚之后将会进入白天，白天是所有玩家发言和投票的环节。
每个白天场上存活的玩家将按顺序依次进行发言，在所有玩家发言结束后，法官将会组织一次放逐公投，在放逐公投中每一位玩家都拥有一票的投票权，
玩家可以选择把票投给自己心目中所认为的狼人。</p><p>最终，得票数最多的玩家将会被放逐出局并留下“遗言”。
“遗言”之后游戏将会进入下一个夜晚，狼人又可以再一次睁眼选择一位玩家进行猎杀，“黑夜—白天—黑夜”循环，直到某一方阵营达成了胜利条件，则游戏结束。</p></div>
    <h2>胜负判断</h2>
    <div class='dl'><p>好人阵营:<br>
    狼人全部出局即获胜。</p>
    <p>狼人阵营：<br>
    屠边:获胜方式有两种，一种是让四位神职全部出局；另外一种是让四位平民全部出局。<br>
    屠城:杀死所有好人。</p></div>
    <h2>卡牌设定</h2>
    <div class='dl'>
    <h3>好人阵营:</h3>
    <p>平民：无特殊技能，分析其他玩家发言。认真的投出每一票，直到驱逐所有狼人。</p>
    <p>预言家:每天晚上可以查验一名玩家的身份是好人还是狼人。利用自己的能力带领大家找出、驱逐所有狼人。</p>
    <p>女巫：女巫拥有两瓶药，解药可以救活一名当晚被狼人杀害的玩家，毒药可以毒杀一名玩家，女巫每天晚上最多使用一瓶药，女巫不可自救。善用毒药和解药，驱逐全部狼人出局。</p>
    <p>猎人：当且仅当猎人被狼人杀害或被投票放逐时，猎人可以亮出自己的身份牌并指定枪杀一名玩家，被女巫毒杀则无法发动技能。一命换一命，驱逐全部狼人出局。</p>
    <p>守卫：每晚可以守护一名玩家，包括自己，但不能连续两晚守护同一名玩家。被守卫守护的玩家当晚不会被狼人杀害。守护关键好人，驱逐狼人获胜。</p>
    <p>暗恋者：与暗恋对象相同，暗恋者在第一夜开始时最先选择一名其他玩家成为自己的暗恋对象，获胜条件与暗恋对象一致，暗恋者不知道暗恋对象的身份，暗恋对象也不知道自己被暗恋。被预言家查验结果始终为好人。</p>
    <h3>狼人阵营:</h3>
    <p>狼人：每天夜里可以杀死一个人。白天装作好人混淆视听，夜晚袭击村民，霸占村庄。</p>
    <p>白狼王：属于狼人阵营，白狼王可以在白天自爆的时候，选择带走一名玩家，非自爆出局不得发动技能。白天装作好人混淆视听，夜晚袭击村民，霸占村庄。</p>
    <h3>第三方阵营:</h3>
    <p>警长：附加身份牌，游戏开始后第一天从所有玩家中通过投票选举出一名玩家为警长，警长在白天最后发言并且投票时有1.5 票。</p>
    </div>
        <div class='btn'>
		<mt-button type='primary' @click="back">返回</mt-button>
    </div>
  </div>
  
</template>

<script>
// 宋秋雁
export default {
    mounted() {
	
  },
  methods: {
		back() {
				this.$router.go(-1);
        },
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  width: 100%;
  position: relative;
}
h1 {
  margin: 10px;
}
h2 {
  margin: 10px 10px;
}
h3 {
  margin: 10px 10px;
  text-align: left;
}
p {
  margin: 5px 10px;
  padding: 0px 10px;
  text-indent: 2em;
  text-align: left;
  font-size: 16px;
}
.dl {
  border-radius: 25px;
  border: 2px solid;
}
.btn {
position:absolute; 
top:20px;
right: 20px;
float: inherit;
}
</style>
