const testController = {
  index: async (ctx,next) =>{
    ctx.body = {code:200,message:'homepage'}
  },
  info: async (ctx,next) =>{
    ctx.body = {code:200,message:'success'}
  }
}

module.exports = testController;