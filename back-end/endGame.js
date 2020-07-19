///////////////////////
// request{
//   roomId:1111,
//   winners:[1,2,3],
//   reset: true
// }
///////////////////////
// if 房间号不存在
// response{
//   code:-2
//   status:
//   message:
// }
// elif winner 不存在
// response{
//   code:-1
//   status:
//    message:
// }
// else
// response{
//   code:1
//   status:
//   message:
// }
///////////////////////



module.exports = async function(params, context) {

  if(typeof(params.roomId) == 'string')  //roomId如果是string转为number
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
  if((typeof params.roomId != 'number') ||
  !(Array.isArray(params.winners))) //请求校验
    return {
      code:-3,
      message:'请求格式错误',
      status:400
    }

  var table = await larkcloud.db.table('langrensha');
  // var scores = await larkcloud.db.table('scores');
  var room = await table.where({roomId:params.roomId}).findOne();
  if(room)   //房间存在
  {
    if(params.winners.length>0)   //传入winners积分
    {
      for(var i in params.winners) //对winner分数进行累加
      {
        if(i>=room.fill || i<0)   // winner不存在
          return{
            code:-1,
            message:'winner不存在',
            status:400
          }
        room.playerList[params.winners[i]].score++;
        room.running = false;
      }

    }
    else{  //未传入winners不计分
      room.running = false;
    }
    console.log(room);
    await table.save(room);
    return{
      code:1,
      message:'结束游戏',
      status:200
    }
  }
  else{     //房间不存在
    return{
      code:-2,
      message:'房间不存在',
      status:400
    }
  }
}