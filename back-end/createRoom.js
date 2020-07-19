//                             https://af6g9a.fn.thelarkcloud.com/createRoom
///////////////////////////////
// request
// {
//   role1:1,
//   ...
// }
///////////////////////////////
// response
// {
//   roomId:1111
// }
///////////////////////////////
// item in table
// {
//   roomId: 1111,
//   playerList:[
//             {
//               name:'Nick',
//               role:'werewolf',
//               state:-1
//             },...
//             ],
//   fill:0
// }
///////////////////////////////

const random = require('random')


module.exports = async function(params, context) {

  for(var key in params) //请求校验
  {
    if(typeof params[key] != 'number')
      return{
        roomId:-1,
        status:400,
        message:'请求格式错误'
      }
  }

  const table = larkcloud.db.table('langrensha');
  var room={};
  room.roomId = await table.where().count();
  room.running = true;
  room.exist = true;
  //console.log(room.roomId);
  var playerList = [];
  for(var chara in params)
  {
    var number = params[chara]
    //console.log(chara);
    //console.log(number);
    for(let i=0;i<number;i++)
    {
      playerList.push({
        name:'',
        role:chara,
        state:-1,      //uninitialize
        score:0
      });
    }
  }
  //这里进行随机交换
  for(let i=0;i<playerList.length;i++){
    let swapId=random.int(i,playerList.length-1);
    let role=playerList[swapId].role;
    playerList[swapId].role=playerList[i].role;
    playerList[i].role=role;
  }
  room.playerList = playerList;
  room.fill = 0;
  await table.save(room);
  return {
    roomId:room.roomId,
    status:200,
    message:'创建成功'
  };
}