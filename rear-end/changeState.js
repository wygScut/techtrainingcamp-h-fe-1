//                      https://af6g9a.fn.thelarkcloud.com/changState
/////////////////////////
// request{
//   roomId:1111,
//   playerId:1,
//   toState:2
// }
/////////////////////////
// if roomId不存在
// response{
//   state:-2
// }
// elif playerId不存在
// response{
//   state:-1
// }
// else
// response{
//   state:2
// }
/////////////////////////



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
  if((typeof params.roomId!= 'number') || 
  (typeof params.playerId != 'number') || 
  (typeof params.toState != 'number'))
    return {
      state:-3,
      message:'请求格式错误'
    }

  var table = await larkcloud.db.table('langrensha');
  var room = await table.where({roomId:params.roomId}).findOne();
 if(room)   //房间存在
  {
    if(params.playerId<0 || params.playerId>=room.playerList.length) //playerId不存在
      return{
        state:-1,
        message:"playerId不存在",
        status:400
      }
    else{
      room.playerList[params.playerId].state = params.toState;
      await table.save(room)
      return {
        state:room.playerList[params.playerId].state,
        message:"请求正确",
        status:200
      }
    }
  }
  else   //房间不存在
  {
    return{
      state:-2,
      message:"房间号不存在",
      status:400
    }
  }
}