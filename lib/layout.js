exports.layout = ()=>{
    var header = require('../layout/header');
    var nav = require('../layout/nav');
    var footer = require('../layout/footer');

    var layout = {
        header,nav,footer
    }
    return layout;

}