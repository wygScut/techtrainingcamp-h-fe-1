//                        https://af6g9a.fn.thelarkcloud.com/gainState
//////////////////////////
// request{
//   roomId:2333,
//   playerId:1
// }
//////////////////////////
// if roomId不存在
// response{
//   state:-2
// }
// elif playerId 不存在 (包含两种状态，未被占用，或者不在范围内)
// response{
//   state:-1
//   statue:
//   message:
// }
// else
// response{
//   state:1|2|3|4,
//   status:
//   message:
// }
///////////////////////////



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
  
    if((typeof params.roomId!= 'number') || (typeof params.playerId != 'number'))//请求校验
    {
      return {
        state:-3,
        status:400,
        message:'请求格式错误'
      }
    }
  
    var table = await larkcloud.db.table('langrensha');
    var room = await table.where({roomId:params.roomId}).findOne();
    if(room) //存在房间号
    {
      if(params.playerId>=room.fill || params.playerId <0) //playerId不存在
      {
        return {
          state:-1,
          status:400,
          message:'playerId不存在'
        }
      }
      else         //playerId存在
      {
        return{
          message:'正确返回',
          status:200,
          state:room.playerList[params.playerId].state
        }
      }
    }
    else     //房间号不存在
    {
      return{
        state:-2,
        status:400,
        message:"房间号不存在"
      }
    }
  
  }