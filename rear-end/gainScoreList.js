//                              https://af6g9a.fn.thelarkcloud.com/gainScoreList
///////////////////////////////
// request{
//    roomId:1111
// }
///////////////////////////////
// response{
//   scoreList:[{
//               name:'xiaoming',
//               score:11
//              },
//              ..
//             ]
//   message:"",
//   status:
// }
////////////////////////////////



module.exports = async function(params, context) {
    if(typeof(params.roomId) == 'string') //roomId如果是string转为number
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
    return {
      scoreList:null,
      message:'请求格式错误',
      status:400
    }

  var table = await larkcloud.db.table('langrensha');
  var scores = await larkcloud.db.table('scores');
  var room = await table.where({roomId:params.roomId}).findOne();
  if(room)
  {
    var scoreList = []
    for(var i=0;i<room.playerList.length;i++)
    {
      var name = room.playerList[i].name;
      var score = room.playerList[i].score;
      if(typeof await scores.where({'name':name}).findOne() == 'undefined')
        return{
          scoreList:null,
          message:'存在未录入玩家',
          status:400
        }
      scoreList.push({'name':name,'score':score});
    }
    var i,j;
    for(i=0;i<room.playerList.length-1;i++)
    {
      for(j=0;j<room.playerList.length-1-i;j++)
      {
        if(room.playerList[j]<room.playerList[j+1])
        {
          var tmp = room.playerList[j];
          room.playerList[j] = room.playerList[j+1];
          room.playerList[j+1] = tmp;
        }
      }
    }
    return{
      scoreList:scoreList,
      message:'返回积分值',
      status:200
    }
  }
  else{
    return {
      scoreList:null,
      message:'房间号不存在',
      status:400
    }
  }
}