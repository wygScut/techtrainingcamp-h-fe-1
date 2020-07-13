<template>
  <div>
    <h1>狼人杀</h1>
    <strong>房间号:{{Room}}</strong>
      
    <div class="biankuang">
      <table border="0" cellspacing="1" cellpadding="0" class="table">
         <caption><strong>玩家状态</strong></caption>
          <thead class="fixedThead">
          <tr>
              <th>角色</th>
              <th>姓名</th>
              <th>状态</th>
              <th>更改状态</th>
          </tr>
          </thead>
          <tbody class="scrollTbody"> 
          <tr v-for="(item,i) in yplayerList" :key="i">
              <td>{{item.name}}</td>
              <td>{{item.role}}</td>
              <td>{{item.state}}</td>
              <td><div class="btn" @click="change(i)">更改</div></td>
          </tr>
          </tbody>
      </table>
    </div>
    <div class="abottom">

        <!-- <img src="../../../public/asset/over.png" height="200" width="200"/> -->
        
          <mt-button type="primary" @click="countDown" class="bottom"> <span>计时器:
            <img src="../../../public/asset/block.png" width="20">
            </span></mt-button>
             {{this.time}}
          <mt-button type="danger" @click="over" class="bottom"><span>结束游戏
            <img src="../../../public/asset/over.png" width="20"></span>
          </mt-button>
    </div>
    <mt-actionsheet
              :actions="actions"
              v-model="sheetVisible">
    </mt-actionsheet>
    
  </div>
</template>

<script>
// 任俊燊
export default {
  data() {
    return {
        Room:this.$route.params.roomId,
        roleId:0,
        actions:[
          {
            name:'存活',
            method: this.alive
          },
            {
            name:'被放逐', 
            method: this.exile
          },
            {
            name:'晚上死亡',
            method: this.death
          },
            {
            name:' 被猎杀',
            method: this.shoot
          },
            {
            name:'当选警长',
            method: this.Sheriff
          },
        ],
        yplayerList:[
        ],
        sheetVisible: false,
        winArrays:[],
        time:90,
        intervalTimer:0
    };
  },
  mounted() {
     this.lunxun() 
  },
  methods: {
       
      async alive() {
        let data = {
          'roomId': this.Room,
          'playerId': this.roleId,
          'toState': 1
        }
        console.log(data)
         const res = await this.$axios.put('/changState',data)
         if(res.status===200){
            this.gainInfo()
         }
         this.sheetVisible = false
      },  
      async exile() {
        let data = {
          'roomId': this.Room,
          'playerId': this.roleId,
          'toState': 2
        }
         const res = await this.$axios.put('/changState',data)
         if(res===200){
            this.gainInfo()
         }
         this.sheetVisible = false
      },
      async death() {
        let data = {
          'roomId': this.Room,
          'playerId': this.roleId,
          'toState': 3
        }
         const res = await this.$axios.put('/changState',data)
         if(res===200){
            this.gainInfo()
         }
         this.sheetVisible = false
      },
      async shoot() {
        let data = {
          'roomId': this.Room,
          'playerId': this.roleId,
          'toState': 4
        }
         const res = await this.$axios.put('/changState',data)
         if(res===200){
            this.gainInfo()
         }
         this.sheetVisible = false
      },
      async Sheriff() {
        let data = {
          'roomId': this.Room,
          'playerId': this.roleId,
          'toState': 5,
        }
         const res = await this.$axios.put('/changState',data)
         console.log(res)
        //  if(res===200){
            this.gainInfo()
        //  }
         this.sheetVisible = false
      },
      async gainInfo() {
            const res = await this.$axios.get(`/gainInfo?roomId=${this.Room}`)
              const {message,status,playerList} = res.data 
              // console.log(res) 
              // this.yplayerList=[
              //         {'name':'xx',
              //         'role':'狼人',
              //         'state':1,
              //         },
              //         {'name':'xz',
              //         'role':'预言家',
              //         'state':2,
              //         },
              //         {'name':'xxsz',
              //         'role':'猎人',
              //         'state':1,
              //         },
              //         {'name':'xxsz',
              //         'role':'狼人',
              //         'state':1,
              //         },
              //         {'name':'xxsz',
              //         'role':'村民',
              //         'state':1,
              //         },
              //         {'name':'xxsz',
              //         'role':'女巫',
              //         'state':1,
              //         },
              //         {'name':'xxsz',
              //         'role':'狼人',
              //         'state':2,
              //         }]
                      // console.log(this.yplayerList)  //假数据
              if(status===200) {
                    this.yplayerList = playerList.forEach(item => {
                           Object.keys({state:1}).every(key => {
                              switch (item[key]) {
                                    case 1:
                                        item[key] = "存活";
                                        break;
                                    case 2:
                                        item[key] = "被放逐";
                                        break;
                                    case 3:
                                        item[key] = "晚上死亡";
                                        break;
                                    case 4:
                                        item[key] = "被猎杀";
                                        break;
                                    case 5:
                                        item[key] = "当选警长";
                                        break;
                                  }
                             })
                       })
                }else {
                    this.$toast({
                        message: message, 
                        position: "middle", 
                        duration: 1000, 
                      })
                }
            },
       lunxun() {
            window.setInterval(() => {
              setTimeout(this.gainInfo, 0)
            }, 3000)
        },
      change(ev) {
              console.log(ev)
              this.roleId = ev
              this.sheetVisible = true
            },
      over() {
              // 判断输赢
              // 筛选
                this.$messagebox.confirm('确定执行此操作?').then(async () => {
                   let werwolfList1=[]  // 所有的狼
                   let werwolfList2=[]  // 活者的狼
                let wplayerList1= this.yplayerList.filter((item,i) => {      
                    return Object.keys({role:''}).every(key => {
                      if(item[key] === '狼人' ){
                        console.log(i)
                        werwolfList1.push(i)
                        return true
                      }
                  })
                 })
                          //  console.log(werwolfList1)
                          //  console.log(fplayerList1)
                wplayerList1.filter((item,i) => {   
                      return Object.keys({state:1}).every(key => {
                        if((item[key] === "存活")||(item[key] === "当选警长")) {
                              werwolfList2.push(i)
                              return true
                      }
                  })
                })
                    let villagerList1=[]  // 所有的民
                    let villagerList2=[]  // 活者的民
                 let vplayerList1= this.yplayerList.filter((item,i) => {      
                    return Object.keys({role:''}).every(key => {
                      if(item[key] === '村民' ){
                        // console.log(i)
                        villagerList1.push(i)
                        return true
                      }
                  })
                 })
                vplayerList1.filter((item,i) => {   
                      return Object.keys({state:1}).every(key => {
                        if((item[key] === "存活")||(item[key] === "当选警长")) {
                              villagerList2.push(i)
                              return true
                      }
                  })
                })
                 let aplayerList2 = this.yplayerList.filter(item => {     // 活着的人
                      return Object.keys({state:1}).every(key => {
                        return item[key] === "存活"||item[key] === "当选警长"
                  })
                })
                console.log(werwolfList1)
                let heroList=[]
                for(let i=0;i<this.yplayerList.length;i++) {
                  if(werwolfList1.includes(i)){
                    console.log(i)
                    heroList[i]='x'
                  }else {
                    heroList[i]=i
                  } 
                }
                heroList = heroList.filter(item=>{
                  return item!=='x'
                })
                      // 判断谁赢了
                 if((werwolfList2.length-1)>(this.yplayerList.length-werwolfList2.length)||aplayerList2.length-villagerList2.length===0||villagerList2.length===0){
                   this.winArrays=werwolfList1
                }else {
                  this.winArrays=heroList
                }
                  console.log(this.winArrays)
                  // 提交胜利名单var
                var data = {"roomId":this.Room,"winners":this.winArrays}
                console.log(data)
                const res = await this.$axios.post('/endGame',data)
                console.log(res)
                  //跳转到结束页面
                this.$router.push({path:"gameOver",});
                       })      
                      },
   countDown() {
            let t = 90
             clearInterval(this.intervalTimer);   // 重新开始
           //设置定时器
            this.intervalTimer = setInterval(() => {
                // 得到剩余时间
                this.time=t
                t--
                // 时间剩余30s
                if (t === 30) {
                     this.$toast({
                        message: "还剩30s", 
                        position: "middle", 
                        duration: 1000, 
                      })
                } else if (t <= 0) {
                    clearInterval(this.intervalTimer);
                }
            }, 1000)
      },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 2rem;
}
.table {
    background-color: #ccd8eb;
    text-align:left;
     width: 100%;
     border-collapse:collapse; 
     border-spacing:0; 
     table-layout:fixed
}
.fixedThead{
    /* overflow: auto; */
    width: calc( 100% - 1em );
			display: table;
			width: 100%;
      text-align: left;
       table-layout:fixed;
      background-color: #5a6366;  
}
.scrollTbody {
			display: block;
			height: 20rem;
			overflow: auto;
			width: 100%;
      color: #656b79;
      background-color: #6f7b88;
		}
.table thead, .scrollTbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
.table td,.table th{ 
      height: 2.5rem;
      border-bottom: 1px solid #131212;
      text-align: center;
		}
.biankuang {
      width: 90%;
      margin: 1rem auto;
}
.btn {
  background-color: #ccd8eb;
  font-size:1rem;
  border:0px;
  border-radius: 0px;
}
.btn:active {
  background-color:  #188a84;
  color: #cccccc;
}
.bottom {
  width: 35%;
  margin:0 1rem;
  font-size: 1rem;
  text-align: center;
  height: 100%;
  
}
.bottom span {
line-height: 3rem;
}
.abottom {
  height: 3rem;
}
</style>