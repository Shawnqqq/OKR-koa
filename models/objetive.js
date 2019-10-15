const Base = require('./base')

class objectiveModels extends Base{
    constructor(props = 'objective'){
        super(props);
    }
}

module.exports = new objectiveModels();