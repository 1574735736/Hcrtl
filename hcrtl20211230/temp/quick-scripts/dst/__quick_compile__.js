
(function () {
var scripts = [{"deps":{"./assets/script/gameScence/Lose":14,"./assets/script/gameScence/Bullet":20,"./assets/script/gameScence/RoleBase":2,"./assets/script/gameScence/TowerLayer":21,"./assets/script/gameScence/Success":5,"./assets/script/gameScence/TowerTile":28,"./assets/script/gameScence/AndroidAdView":16,"./assets/script/data/LevelData":31,"./assets/script/data/UserData":7,"./assets/script/loadscence/LoadScene":4,"./assets/script/mainScene/SignInView":8,"./assets/script/mainScene/WeaponShop":9,"./assets/script/mainScene/MainScene":3,"./assets/script/manager/SoundManager":17,"./assets/script/manager/PrefabsManager":15,"./assets/script/manager/SpineManager":18,"./assets/script/manager/BaseInstanceClass":13,"./assets/script/util/ItemRenderer":30,"./assets/script/util/ScaleAnimScript":25,"./assets/script/util/RotateAnimScript":23,"./assets/script/util/SkinShopItem":29,"./assets/script/util/SdkManager":22,"./assets/script/util/ListView":11,"./assets/script/util/Utils":27,"./assets/script/util/EventDefine":19,"./assets/script/util/SkinShopItemData":26,"./assets/script/util/WeaponItemData":24,"./assets/script/util/TableView":1,"./assets/script/util/FirebaseReport":10,"./assets/script/gameScence/BossBase":12,"./assets/script/gameScence/GameScence":6},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/script/util/TableView.js"},{"deps":{"../manager/PrefabsManager":15,"../manager/SpineManager":18,"../manager/SoundManager":17,"../data/UserData":7,"../util/Utils":27},"path":"preview-scripts/assets/script/gameScence/RoleBase.js"},{"deps":{"./WeaponShop":9,"./SignInView":8,"../data/UserData":7,"../manager/SpineManager":18,"../util/ListView":11,"../util/EventDefine":19,"../util/Utils":27,"../util/SdkManager":22,"../util/FirebaseReport":10},"path":"preview-scripts/assets/script/mainScene/MainScene.js"},{"deps":{"../util/SdkManager":22,"../util/FirebaseReport":10,"../manager/PrefabsManager":15,"../manager/SoundManager":17,"../gameScence/Success":5,"../gameScence/GameScence":6,"../gameScence/Lose":14,"../data/UserData":7,"../mainScene/WeaponShop":9,"../mainScene/MainScene":3},"path":"preview-scripts/assets/script/loadscence/LoadScene.js"},{"deps":{"../data/LevelData":31,"../manager/SpineManager":18,"../util/FirebaseReport":10,"../data/UserData":7,"./GameScence":6,"../util/Utils":27,"../util/SdkManager":22},"path":"preview-scripts/assets/script/gameScence/Success.js"},{"deps":{"../data/LevelData":31,"./TowerLayer":21,"../data/UserData":7,"../util/FirebaseReport":10,"../manager/SpineManager":18,"../util/SdkManager":22,"../util/Utils":27},"path":"preview-scripts/assets/script/gameScence/GameScence.js"},{"deps":{"../util/EventDefine":19,"../util/SkinShopItemData":26,"../util/WeaponItemData":24},"path":"preview-scripts/assets/script/data/UserData.js"},{"deps":{"../util/Utils":27,"../data/UserData":7,"../manager/SpineManager":18,"../util/SdkManager":22,"../util/FirebaseReport":10},"path":"preview-scripts/assets/script/mainScene/SignInView.js"},{"deps":{"../data/UserData":7,"../util/SdkManager":22,"../util/EventDefine":19,"../manager/SpineManager":18,"../util/FirebaseReport":10,"../util/Utils":27},"path":"preview-scripts/assets/script/mainScene/WeaponShop.js"},{"deps":{},"path":"preview-scripts/assets/script/util/FirebaseReport.js"},{"deps":{},"path":"preview-scripts/assets/script/util/ListView.js"},{"deps":{"../manager/SpineManager":18},"path":"preview-scripts/assets/script/gameScence/BossBase.js"},{"deps":{},"path":"preview-scripts/assets/script/manager/BaseInstanceClass.js"},{"deps":{"../manager/SpineManager":18,"../data/LevelData":31,"./GameScence":6,"../data/UserData":7,"../util/FirebaseReport":10,"../util/Utils":27,"../util/SdkManager":22},"path":"preview-scripts/assets/script/gameScence/Lose.js"},{"deps":{"./BaseInstanceClass":13},"path":"preview-scripts/assets/script/manager/PrefabsManager.js"},{"deps":{},"path":"preview-scripts/assets/script/gameScence/AndroidAdView.js"},{"deps":{"../manager/BaseInstanceClass":13},"path":"preview-scripts/assets/script/manager/SoundManager.js"},{"deps":{"./BaseInstanceClass":13},"path":"preview-scripts/assets/script/manager/SpineManager.js"},{"deps":{},"path":"preview-scripts/assets/script/util/EventDefine.js"},{"deps":{"../manager/SpineManager":18},"path":"preview-scripts/assets/script/gameScence/Bullet.js"},{"deps":{"./GameScence":6,"./TowerTile":28,"./RoleBase":2,"./BossBase":12,"../manager/SpineManager":18,"../manager/PrefabsManager":15,"../manager/SoundManager":17,"../data/UserData":7,"../data/LevelData":31,"../util/FirebaseReport":10},"path":"preview-scripts/assets/script/gameScence/TowerLayer.js"},{"deps":{},"path":"preview-scripts/assets/script/util/SdkManager.js"},{"deps":{},"path":"preview-scripts/assets/script/util/RotateAnimScript.js"},{"deps":{},"path":"preview-scripts/assets/script/util/WeaponItemData.js"},{"deps":{},"path":"preview-scripts/assets/script/util/ScaleAnimScript.js"},{"deps":{},"path":"preview-scripts/assets/script/util/SkinShopItemData.js"},{"deps":{},"path":"preview-scripts/assets/script/util/Utils.js"},{"deps":{"../manager/PrefabsManager":15,"./RoleBase":2},"path":"preview-scripts/assets/script/gameScence/TowerTile.js"},{"deps":{"../data/UserData":7,"./ItemRenderer":30,"./Utils":27,"./EventDefine":19,"../manager/SpineManager":18},"path":"preview-scripts/assets/script/util/SkinShopItem.js"},{"deps":{},"path":"preview-scripts/assets/script/util/ItemRenderer.js"},{"deps":{},"path":"preview-scripts/assets/script/data/LevelData.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            requestScript = scripts[ m.deps[request] ];
        }
        
        path = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                path = name2path[request];
            }

            if (!path) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            path = formatPath(requestScript.path);
        }

        m = modules[path];
        
        if (!m) {
            console.warn('Can not find module for path : ' + path);
            return null;
        }

        if (!m.module && m.func) {
            m.func();
        }

        if (!m.module) {
            console.warn('Can not find module.module for path : ' + path);
            return null;
        }

        return m.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }
                console.time && console.time('eval __quick_compile_project__');
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd('eval __quick_compile_project__');
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    