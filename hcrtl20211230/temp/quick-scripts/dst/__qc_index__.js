
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/data/LevelData');
require('./assets/script/data/UserData');
require('./assets/script/gameScence/AndroidAdView');
require('./assets/script/gameScence/Bullet');
require('./assets/script/gameScence/GameScence');
require('./assets/script/gameScence/Lose');
require('./assets/script/gameScence/RoleBase');
require('./assets/script/gameScence/Success');
require('./assets/script/gameScence/TowerLayer');
require('./assets/script/gameScence/TowerTile');
require('./assets/script/loadscence/LoadScene');
require('./assets/script/mainScene/MainScene');
require('./assets/script/mainScene/SignInView');
require('./assets/script/mainScene/WeaponShop');
require('./assets/script/manager/BaseInstanceClass');
require('./assets/script/manager/PrefabsManager');
require('./assets/script/manager/SoundManager');
require('./assets/script/manager/SpineManager');
require('./assets/script/util/EventDefine');
require('./assets/script/util/FirebaseReport');
require('./assets/script/util/ItemRenderer');
require('./assets/script/util/ListView');
require('./assets/script/util/RotateAnimScript');
require('./assets/script/util/ScaleAnimScript');
require('./assets/script/util/SdkManager');
require('./assets/script/util/SkinShopItem');
require('./assets/script/util/SkinShopItemData');
require('./assets/script/util/Utils');
require('./assets/script/util/WeaponItemData');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();