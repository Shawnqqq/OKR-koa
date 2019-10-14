const knex = require('./knex');

class Base{
  constructor(props){
    this.table = props
  }
  all(){
    return knex(this.table).select()
  }
  single(id){
    return knex(this.table).where('id','=',id)
  }
  where(params){
    return knex(this.table).where(params)
  }
  insert(params){
    return knex(this.table).insert(params)
  }
  update(id,params){
    return knex(this.table).where('id','=',id).update(params)
  }
  deleted(id){
    return knex(this.table).where('id','=',id).del()
  }
}

module.exports = Base