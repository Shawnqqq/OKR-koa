const objectiveModels = require('../models/objetive');
const keyresultModels = require('../models/keyresult');
const {formatTime} = require('../utils/formatDate');

const okrController = {
  insert: async (ctx,next)=>{
    try{
      let user_id = ctx.request.body.user_id;
      let obText = ctx.request.body.objective;
      let krText = ctx.request.body.keyresult;

      // 增加到 objective表 并返回 id
      let obIds = await objectiveModels.insertReturn({user_id,text:obText,end_time:null})
      let obId = obIds[0]

      krText.forEach(async data =>{
        await keyresultModels.insert({objective_id:obId,text:data})
      })

      ctx.body = {
        code:200,
        message:'增加成功'
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  all: async (ctx,next)=>{
    try{
      let user_id = ctx.query.user_id;
      let objective = await objectiveModels.where({user_id});
      
      objective.forEach( data =>{
        data.created_time = formatTime(data.created_time)
        data.end_time ? data.end_time=formatTime(data.end_time) : null
      })

      ctx.body={
        code:200,
        data:objective
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  complete: async(ctx,next) =>{
    try{
      let id = ctx.params.id;
      let end_time = new Date();
      await objectiveModels.update(id,{state:2,end_time});
      ctx.body={
        code:200,
        message:'修改成功'
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  okr: async(ctx,next) =>{
    try{
      let id = ctx.query.id;
      let okr = await objectiveModels
        .where({'objective.id':id})
        .leftJoin('keyresult','keyresult.objective_id','objective.id')
        .column('keyresult.id',{'obText':'objective.text'},{'krText':'keyresult.text'})
      ctx.body={
        code:200,
        data:okr
      }                        
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  edit: async(ctx,next) =>{
    try{
      let id = ctx.params.id             // objective的ID
      let objectiveText = ctx.request.body.objectiveText   // objective的内容
      let krData = ctx.request.body.krData;   // keyresult的 ID 和 内容 组成的数组
      let deletedId = ctx.request.body.deleted;   // 删除的 keyresult 的 ID

      await objectiveModels.update(id,{text:objectiveText})
      krData.forEach(async data =>{
        if(data.id !== false){
          await keyresultModels.update(data.id,{text:data.krText})
        }else{
          await keyresultModels.insert({objective_id:id,text:data.krText})
        }
      })
      await keyresultModels.deleted(deletedId)

      ctx.body={
        code:200,
        message:'修改成功'
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  deleted: async(ctx,next) =>{
    try{
      let id = ctx.params.id
      
      await objectiveModels.deleted(id);
      await keyresultModels.where({objective_id:id}).del()
      
      ctx.body={
        code:200,
        message:'删除成功'
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  }
}

module.exports = okrController;