<template>
    <div class="hello">
        <h1>房间设置</h1>
        <p @click="showBattle">选择推荐阵容</p>
        <div class='selectedRole aBorder'>
          <p>{{title}}</p>
          <mt-button @click="cutRole(i)" class="roleBorder" size="small" type="primary" v-for='(item,i) in yrolelist' :key="i">{{item}}</mt-button>
        </div>
        <div class='selectedRole'>
            <p>点击按钮添加角色</p>
            <mt-button @click="addRole(item)" class="roleBorder" size="small" v-for='(item,i) in rolelist' :key="i">{{item}}</mt-button>
        </div>
        <mt-button type="danger" class="creatRole" @click="creatRole()">创建角色</mt-button>
     
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          class="creatRole">
          <div class="FselectRole">
           <div class="selectRole">推荐场次</div>
           <mt-button type="default" class="selectRole" @click="recommend('0')">6人场：预猎两狼两民</mt-button>
           <mt-button type="default" class="selectRole" @click="recommend('1')">9人场：预女猎三狼三民</mt-button>
           <mt-button type="default" class="selectRole" @click="recommend('2')">12人场：预女猎白</mt-button>
           <mt-button type="default" class="selectRole" @click="recommend('3')">12人场：白狼王&守卫</mt-button>
        </div>
        </mt-popup>
        
    </div>
</template>

<script>
// 任俊燊
export default {
 data() {
    return {
      title:"请选择角色",
      popupVisible:false,
      yrolelist: [],
      rolelist: ['平民', '预言家', '女巫', '狼人', '白狼王', '守卫', '猎人', '暗恋者', '白痴'],
      countedNames:{}
    };
  },
 methods: {
    addRole(ev) {
      this.yrolelist.push(ev)
      if(this.yrolelist.length==1) {
        this.title='已选择角色'
      }
    },
    cutRole(ev) {
       this.yrolelist.splice(ev,1)
      if(this.yrolelist.length==0) {
              this.title='请选择角色'
            }
    },
  async creatRole() { 
      this.countedNames = this.yrolelist.reduce(function (allNames, name) { // 计算各类角色数量
          if (name in allNames) {
            allNames[name]++
          }
          else {
            allNames[name] = 1
          }
          return allNames
        },{});
      // console.log(this.countedNames)

      const res = await this.$axios.post('/createRoom',this.countedNames);
      // console.log(res);
      const {
              message,
              status,
              roomId
            } = res.data
      if(status === 200) {
        this.$router.push({
          // path:"godControl",
          name:"godControl",
          params:{
            roomId:roomId
          }

        }),
        this.$toast({
        message: message, //弹窗内容
        position: "middle", //弹窗位置
        duration: 1000, //弹窗时间毫秒,如果值为-1，则不会消失
        //  iconClass: 'icon icon-success' //设置 图标类
      })
      } else {
        this.$message.error(message)
      }
   },
   recommend(ev) {
     var arr=[['平民', '平民','预言家',  '猎人' ,'狼人' , '狼人'],
        ['平民', '平民','平民','预言家', '女巫','猎人','狼人' , '狼人' ,'狼人', ],
        ['平民', '平民','平民', '平民','预言家', '女巫','猎人','白痴', '狼人' , '狼人','狼人' , '狼人' ],
        ['平民', '平民','平民', '平民','预言家', '女巫','猎人','守卫', '白狼王' , '狼人','狼人' , '狼人'  ]]
     this.yrolelist=arr[ev]
     this.popupVisible = false
   },
   showBattle() {
     this.popupVisible = true 
   }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
p {
  margin: 0.8rem;
}
.hello {
  width: 100%;
  /* font-size: 1rem; */
}
.roleBorder {
  width: 25%;
  height: 2rem;
  margin: 0.5rem;
  font-size: 0.9rem;
}
.selectedRole {
  margin: 10px auto;
  width: 90%;
}
.aBorder {
  border: 1px solid black;
  border-radius:0.5rem; 
}
.creatRole {
  width: 100%;
  font-size: 1rem;
}
.FselectRole .selectRole {
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  border:0px;
  border-radius: 0;
  border-top: 1px solid	#000000;
}
.FselectRole div {
  color: #000000;
  height: 3rem;
  line-height: 3rem;
}

</style>
