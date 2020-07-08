<template>
   <div class="hello">
        <h1>房间设置</h1>
        <p>推荐玩法阵容</p>
        <div class='selectedRole aBorder'>
          <p>已选择角色</p>
          <mt-button @click="cutRole(i)" class="roleBorder" size="small" type="primary" v-for='(item,i) in yrolelist' :key="i">{{item}}</mt-button>
        </div>
        <div class='selectedRole'>
            <p>点击按钮添加角色</p>
            <mt-button @click="addRole(item)" class="roleBorder" size="small" v-for='(item,i) in rolelist' :key="i">{{item}}</mt-button>
        </div>
        <mt-button type="danger" class="creatRole" @click="creatRole()">创建角色</mt-button>
    </div>
</template>

<script>
// 任俊燊
export default {
 data() {
    return {
      yrolelist: ['平民', '预言家', '女巫', '狼人', '白狼王', '守卫', '猎人', '白狼王', '白痴'],
      rolelist: ['平民', '预言家', '女巫', '狼人', '白狼王', '守卫', '猎人', '白狼王', '白痴'],
      countedNames:{}
    };
  },
  created() {
    
  },
 methods: {
    addRole(ev) {
      console.log(ev)
      this.yrolelist.push(ev)
    },
    cutRole(ev) {
      console.log(ev)
      this.yrolelist.splice(ev,1)
      this.countedNames = this.yrolelist.reduce(function (allNames, name) { 
          if (name in allNames) {
            allNames[name]++;
          }
          else {
            allNames[name] = 1;
          }
          return allNames;
        },{});
        console.log(this.countedNames)
    },
  async creatRole() { 
       console.log(1)
      // const res = await this.$http.post('https://af6g9a.fn.thelarkcloud.com/createRoom',this.countedNames);
      // console.log(res);

  //     const {
  //             meta: {msg, status}
  //           } = res.data
  //     if(status === 200) {
  //        this.$router.push({name: 'home'})
  //        this.$message.success(msg)
  //     } else {
  //       this.$message.error(msg)
  //     }
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
  font-size: 1rem;
}
.selectedRole {
  margin: 10px auto;
  width: 90%;
  /* height: 12rem; */
}
.aBorder {
  border: 1px solid black;
  border-radius:0.5rem;
  
}
.creatRole {
  width: 100%;
  font-size: 1rem;
}

    


</style>
