//                        https://af6g9a.fn.thelarkcloud.com/gainInfo
////////////////////////////
// request
// {
//   roomId:1111
// }
////////////////////////////
// if roomId不存在
// response{
//   playerList:null
// }
// else
// response
// {
//   playerList:[
//               {
//                 name:
//                 role:
//                 state:
//               },...
//             ]
//   full:true
// }
////////////////////////////



module.exports = async function(params, context) {

    if(typeof(params.roomId) == 'string')
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
    if(typeof params.roomId != 'number')
      return{
        playerList:null,
        status:400,
        message:'请求格式错误'
      }
  
    var table = await larkcloud.db.table('langrensha');
    var room = await table.where({roomId:params.roomId}).findOne();
    if(room)  //房间存在
    {
        return{
          playerList:room.playerList.slice(0,room.fill),
          status:200,
          message:'请求正确'
        }
    }
    else    //房间不存在
    {
        return{
          playerList:null,
          status:400,
          message:'房间号不存在'
        }
    }
  }