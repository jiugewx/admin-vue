/**
 * Created by wangxin on 2016/9/24.
 */
var fs = require('fs'),
    stat = fs.stat;
var path = require('path');

/**
 * 复制目录中的所有文件包括子目录
 * @param src { String } 需要复制的目录
 * @param dst { String } 复制到指定的目录
 */
var copy = function(src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function(err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function(path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat(_src, function(err, st) {
                if (err) {
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function(src, dst, callback) {
    fs.exists(dst, function(exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function() {
                callback(src, dst);
            });
        }
    });
};

function deleteFolderRecursive(path) {

    var files = [];

    if (fs.existsSync(path)) {

        files = fs.readdirSync(path);

        files.forEach(function(file, index) {

            var curPath = path + "/" + file;

            if (fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

        console.log("REMOVE:", path, " 【SUCCESS】!");
    }

};


function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    console.log("CREATE:", dirpath + " 【SUCCESS】!");
    return true;
}

var fileTool = {
    copy: function(fileArray) {
        for (var i = 0; i < fileArray.length; i++) {
            var from = fileArray[i].from;
            var to = fileArray[i].to;
            //先删除
            deleteFolderRecursive(to);
            //再复制
            exists(from, to, copy);
            console.log("COPY:", from, "=>", to, " 【SUCCESS】!");
        }
    },
    clear: function(fileArray) {
        for (var i = 0; i < fileArray.length; i++) {
            var file = fileArray[i];
            //删除
            deleteFolderRecursive(file);
        }
    },
    create: function(dirpathArray, mode) {
        for (var i = 0; i < dirpathArray.length; i++) {
            mkdirsSync(dirpathArray[i], mode)
        }
    }
};

module.exports = fileTool;
