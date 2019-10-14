const Base = require('./base')

class userModels extends Base{
    constructor(props = 'user'){
        super(props);
    }
}

module.exports = new userModels();