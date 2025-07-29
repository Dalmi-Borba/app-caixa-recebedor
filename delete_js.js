const delete_js = function(name){

    let spawn = require("child_process").spawn;
    
    let process = spawn('python3', ["./delete.py", name]);

    process.stdout.on('data', function (data) {
        console.log(data.toString())
    })
};

module.exports = delete_js;