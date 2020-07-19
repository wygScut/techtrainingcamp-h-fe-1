//                                https://af6g9a.fn.thelarkcloud.com/gainRole
//////////////////////////////////
// request{
//   roomId: int      //>=0
//   name: string
// }
/////////////////////////////////
//  if 满员
//  response{
//    role:null
//    playerId:-1
//    status:
//    message:
//  }
// elif 房间不存在
// response{
//     role:null,
//     playerId:-2
//    status:
//    message:
// }
// else
// response{
//   role:'wereWolf',
//   playerId:1
//    status:
//    message:
// }
/////////////////////////////////



const random = require('random')
 
module.exports = async function(params, context) {

    if(typeof(params.roomId) == 'string')//roomId如果是string转为number
    try{
      params.roomId = parseInt(params.roomId);
    }
    catch(err)
    {
      return{
        playerList:null,
        status:400,
        message:'请求格式错误'
      }
    }
  if((typeof params.name != 'string') || (typeof params.roomId!='number'))//请求检查
  {
    return{
      role:null,
      playerId:-4,
      status:400,
      message:'请求格式错误'
    }
  }

  var table = await larkcloud.db.table('langrensha');
  var room = await table.where({roomId:params.roomId}).findOne();

  if(room) //房间存在
  {
    for(var playerId in room.playerList)
    {
      if(room.playerList[playerId].name===params.name)
        return{
          role:null,
          playerId:-3,
          status:400,
          message:'名称重复'
        }
    }

    var len = room.playerList.length;
    if(room.fill == len) // 房间满员
        return {
              role:null,
              playerId:-1,
              status:400,
              message:'房间满员了'
              };
    else{
        room.playerList[room.fill].state = 1;
        room.playerList[room.fill].name = params.name;
        room.fill++;
        await table.save(room);
        return {
          role:room.playerList[room.fill-1].role,
          status:200,
          message:'请求成功',
          playerId:room.fill-1,
        }
        }
  }
  else        //房间不存在
  {
    return {
          role:null,
          playerId:-2,
          status:400,
          message:'房间不存在'
          };
  }
}