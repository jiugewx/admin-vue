var packageConfig = require('../package.json');
var description = packageConfig.description;
var version = packageConfig.version;
var author = packageConfig.author;
var date = new Date();
var regFristNewline = /\n/;
var year = date.getFullYear();
var month = addZero(date.getMonth() + 1);
var day = addZero(date.getDate());
var h = addZero(date.getHours());
var m = addZero(date.getMinutes());
var s = addZero(date.getSeconds());
var time = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
var time2 = year + month + day +  h +  m +  s;

// 添加0
function addZero(i) {
    if ( i < 10 ) {
        i = "0" + i
    }
    return i
}

function getBanner(projectName) {
    return `
    Project: ${projectName} v${version} (c) ${year} By ${author}
    ${description}
    ${time}`
}

var setBanner = function (projectName) {
    var banner = getBanner('This Project').replace(regFristNewline, '');
    if ( typeof projectName != "undefined" ) {
        banner = getBanner(projectName).replace(regFristNewline, '');
    }
    console.log("\033[33m " + banner + " \033[0m");
    return {
        content: banner,
        version: "v" + version + "(c)" + time2
    }
};

module.exports = setBanner();
