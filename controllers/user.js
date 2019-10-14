const userModels = require('../models/user');
const configs = require('../config');
const axios = require('axios');

const userController = {
  login: async (ctx,next) =>{
    try{
      let appid = configs.wechat.appid;
      let secret = configs.wechat.secret;
      let js_code = ctx.query.code;
      let name = ctx.query.name;

      //获取 openID 并判断
      let data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
      let openid = data.data.openid;

      if(!openid){
        ctx.body={
          code:0,
          message:'服务器错误'
        }
        return
      }
      if(openid.length !== 28){
        ctx.body={
          code:0,
          message:'服务器错误'
        }
        return
      }
      //存储数据库
      await userModels.insert({name,wechatID:openid});
      //获取信息
      let userInfo = await userModels.where({wechatID:openid})
      let id = userInfo[0].id

      ctx.body={
        code:200,
        message:'登录成功',
        userInfo:{name:name,id:id}
      }
    }catch(err){
      console.log(err)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  all: async (ctx,next) =>{
    try{
      let user = await userModels.all()
      ctx.body = {
        code:200,
        data:user
      }
    }catch(err){
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  
}

module.exports = userController;