const objectiveModels = require('../models/objetive');
const keyresultModels = require('../models/keyresult');
const todo_keyresultModels = require('../models/todo_keyresult');
const todoModels = require('../models/todo');
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
  },
  completeKr: async(ctx,next) =>{
    try{
      let id = ctx.params.id
      await keyresultModels.update(id,{state:2})
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
  deletedKr: async(ctx,next) =>{
    try{
      let id = ctx.params.id
      await keyresultModels.deleted(id);
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
  },
  okrTodo:async (ctx,next) =>{
    try{
      let id = ctx.query.id
      let ob = await objectiveModels.where({id})
      let kr = await objectiveModels
        .where({'objective.id':id})
        .leftJoin('keyresult','keyresult.objective_id','objective.id')
        .column({'krId':'keyresult.id'},{'krText':'keyresult.text'},{'krState':'keyresult.state'})
      
      let krId = kr.map(data =>{
        return data.krId
      })
      
      let todoIds = await todo_keyresultModels.whereIn('keyresult_id',krId);
      let todoId = todoIds.map(data =>{
        return data.todo_id
      })
      let todo = await todoModels.whereIn('id',todoId);

      let data = []
      for(let k=0;k<kr.length;k++){
        data.push({krData:kr[k],todo:[]})
        for(let i=0;i<todoIds.length;i++){
          if(kr[k].krId == todoIds[i].keyresult_id){
            let todoId = todoIds[i].todo_id
            for(let t=0;t<todo.length;t++){
              if(todoId == todo[t].id){
                data[k].todo.push(todo[t])
              }
            }
          }
        }
      }

      // let objectives = await Objective.select({ id });
      // let objective = objectives[0];
      // let keyresults = await Keyresult.select({ objective_id: id });
      // objective.created_time = formate.formatTime(objective.created_time);
      // if(objective.finished_time){
      //   objective.finished_time = formate.formatTime(objective.finished_time);
      // }
      // let keyresult_ids = keyresults.map( data => data.id);
      // let todoKeyresults = await TodoKeyresult.knex()
      //   .whereIn('keyresult_id', keyresult_ids)
      //   .leftJoin('todo','todo_keyresult.todo_id','todo.id')
      //   .select({id: 'todo.id'},'todo_keyresult.keyresult_id','todo.title','todo.status')

      // let keyresultTmp = {}
      // keyresults.forEach(data => {
      //   data.todos = []
      //   keyresultTmp[data.id] = data;
      // })
      // todoKeyresults.forEach(data =>{
      //   keyresultTmp[data.keyresult_id].todos.push(data);
      // })
      // objective.keyresults = Object.values(keyresults);
      // ctx.state.code = 200;
      // ctx.state.data.okr = objective;



      ctx.body={
        code:200,
        obData:ob[0],
        krData:data
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