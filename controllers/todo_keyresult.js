const objectiveModels = require('../models/objetive');
const keyresultModels = require('../models/keyresult');
const todo_keyresultModels = require('../models/todo_keyresult');
const todoModels = require('../models/todo');
const {formatTime} = require('../utils/formatDate');

const todo_keyresultController = {
  keyresult:async (ctx,next) =>{
    try{
      let id = ctx.query.id;
      let ob = await objectiveModels
        .where({state:1})
        .column({'obText':'objective.text'})
      let okr = await objectiveModels
        .where({'objective.state':1})
        .leftJoin('keyresult','keyresult.objective_id','objective.id')
        .column('keyresult.id',{'obText':'objective.text'},{'krText':'keyresult.text'})
      let todo_kr = await todo_keyresultModels
        .where({todo_id:id})
        .column({'krId':'todo_keyresult.keyresult_id'})

      let data = [];
      for(let i=0;i<ob.length;i++){
        data.push({obText:ob[i].obText,krData:[]})
        for(let o=0;o<okr.length;o++){
          if(ob[i].obText == okr[o].obText){
            let bind = todo_kr.some(item => item.krId == okr[o].id)
            data[i].krData.push({id:okr[o].id,text:okr[o].krText,bind:bind})
          }
        }
      }

      ctx.body={
        code:200,
        data:data
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  bind: async (ctx,next) =>{
    try{
      let todoId = ctx.request.body.todoId;
      let krId = ctx.request.body.krId;
      
      await todo_keyresultModels.insert({todo_id:todoId,keyresult_id:krId})

      ctx.body={
        code:200,
        message:'绑定成功'
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
      let todoId = ctx.request.body.todoId;
      let krId = ctx.request.body.krId;
      let idArr = await todo_keyresultModels
        .where({todo_id:todoId,keyresult_id:krId})
        .column({'id':'todo_keyresult.id'})
      let id = idArr[0].id
      await todo_keyresultModels.deleted(id)

      ctx.body={
        code:200,
        message:'取关成功'
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

module.exports = todo_keyresultController;