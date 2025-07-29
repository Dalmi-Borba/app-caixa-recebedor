const zip_js = function(data){

    let spawn = require("child_process").spawn;
    
    spawn('python3', ["./zip.py"]);  
};

module.exports = zip_js;