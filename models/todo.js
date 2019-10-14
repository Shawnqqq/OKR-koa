const Base = require('./base')

class todoModels extends Base{
    constructor(props = 'todo'){
        super(props);
    }
}

module.exports = new todoModels();