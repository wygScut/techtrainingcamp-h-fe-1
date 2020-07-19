//                       https://af6g9a.fn.thelarkcloud.com/resetRoom
/////////////////////
// request{
//   roomId:2333,
//   werewolf:2,
//   ...
// }
////////////////////
// response{
//   playerList:
//   status:
//   message:
// }
////////////////////


module.exports = async function(params, context) {
    if(typeof(params.roomId) == 'string')  // 如果roomId为string，则转换为number
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

  let itemNum = 0;
  for(let item in params)  //请求校验
  {
    if(typeof params[item] != 'number')
      return{
        message:'请求格式错误',
        status:400
      }
    itemNum++;
  }


  var table =  await larkcloud.db.table('langrensha');
  var room = await table.where({roomId:params.roomId}).findOne();
  if(room)
  {
    if(room.running)    //游戏没有结束
    {
      return{
        message:'游戏没有结束',
        status:400
      }
    }
    if(itemNum>1)      // 需要更改房间配置
    {
      room.playerList = []
      for(let chara in params)
      {
        if(chara != 'roomId')
        {
          for(var i=0;i<params[chara];i++)
          {
            room.playerList.push({
            name:'',
            role:chara,
            state:-1,      //uninitialize
            score:0
            })
          }
        }
      }
    }
    else{        // 不更改房间配置
      for(let i = 0; i< room.playerList.length; i++)
      {
        room.playerList[i].name = '';
        room.playerList[i].score= 0;
        room.playerList[i].state= -1;
      }
    }
    room.running = true;
    room.fill = 0;
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
    return{
      message:'房间重置',
      status:200
    }
  }
  else
  {
    return{
      message:'房间号不存在',
      status:400
    }
  }
}