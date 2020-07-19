//                  https://af6g9a.fn.thelarkcloud.com/killRoom
////////////////////
// request{
//   roomId:1111
// }
////////////////////
// if roomId不存在
// response{
//   kill:false
//   message:'房间号不存在'
// }
// else
// response{
//   kill:true
//   message:'成功结束房间'
// }
////////////////////



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
  if(typeof params.roomId != 'number')//请求校验
    return{
      kill:false,
      message:'请求格式错误',
      status:400
    }

  var table = await larkcloud.db.table('langrensha');

  var room = await table.where({roomId:params.roomId}).findOne();
  if(room)   //房间存在
  {
    //await table.delete(room)
    room.running = false;
    room.exist = false;
    await table.save(room);
    
    return{
      kill:true,
      message:'成功结束房间',
      status:200
    };
  }
  else
  {
    return{
      kill:false,
      message:'房间号不存在',
      status:400
    };
  }
}