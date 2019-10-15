const todoModels = require('../models/todo');
const {formatTime} = require('../utils/formatDate');

const todoController = {
  all: async (ctx,next) =>{
    try{
      let user_id = ctx.query.user_id;
      let todo = await todoModels.where({user_id,state:1});
      
      todo.forEach( data =>{
        data.created_time = formatTime(data.created_time)
      })

      ctx.body = {
        code:200,
        data:todo
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  add: async (ctx,next) =>{
    try{
      let user_id = ctx.request.body.user_id;
      let text = ctx.request.body.text;
      await todoModels.insert({user_id,text,end_time:null})
      ctx.body={
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
  deleted: async (ctx,next) =>{
    try{
      let id = ctx.params.id;
      await todoModels.deleted(id)
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
  complete: async(ctx,next) =>{
    try{
      let id = ctx.params.id;
      let end_time = new Date();
      await todoModels.update(id,{state:2,end_time});
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
  honor: async(ctx,next) =>{
    try{
      let user_id = ctx.query.user_id;
      let todo = await todoModels.where({user_id,state:2});
      todo.forEach( data =>{
        data.created_time = formatTime(data.created_time)
        data.end_time = formatTime(data.end_time)
      })

      ctx.body = {
        code:200,
        data:todo
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

module.exports = todoController;