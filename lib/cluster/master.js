var os      = require('os');
var util    = require('util');
var cluster = require('cluster');

module.exports = function(app) {
    var max = os.cpus().length;

    for (var i = 0; i < max; i++) {
        cluster.fork();
    }

    cluster.on('fork', onWorkerFork);
    cluster.on('exit', onWorkerExit);
};

function onWorkerFork(worker) {
    console.log(util.format('application forked worker', worker.id));
}

function onWorkerExit(worker) {
    console.log(util.format('application exited worker', worker.id));
}
