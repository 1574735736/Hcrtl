"use strict";
cc._RF.push(module, '6433684BONKH5pwzrd1dQnp', 'LevelData');
// script/data/LevelData.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelData = /** @class */ (function (_super) {
    __extends(LevelData, _super);
    function LevelData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelData_1 = LevelData;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    LevelData.prototype.start = function () {
    };
    LevelData.saveLevel = function () {
        console.log("============save level: " + LevelData_1.curLevel);
        localStorage.setItem("level", LevelData_1.curLevel + "");
    };
    LevelData.getLevel = function () {
        var level = 46; //localStorage.getItem("level");
        if (level == null) {
            level = "2";
        }
        LevelData_1.curLevel = Number(level);
        console.log("============get level: " + LevelData_1.curLevel);
    };
    var LevelData_1;
    LevelData.curLevel = 1;
    //关卡说明
    /**
     * 关卡数据中prefab名称如角色创建：{prefab:"LVL_1",hp:100,type:"player"}
     * prefab 为下方预制体名
     * hp     为血量
     * type   预制体类型
     * data   附加属性 如：prefab:"Goblin",hp:100,type:"monster",data:{prefab:"Weapon_4",hp:100,type:"item"}} 怪物死亡后会产生data内物品
     *
     * 预制体名prefab                 预制体对应怪物         对应配置
     * ***************************************引导人物**********************************************************
     *
     * *************************************玩家**********************************************************
     * LVL_1                            玩家              {prefab:"LVL_1",hp:100,type:"player"}
     ***************************************怪物**********************************************************
     * Sword_1 Sword_2                  剑手            {prefab:"Sword_2",hp:100,type:"monster"}
     * Bow_1,Bow_2 ,Bow_3               3种弓箭手         {prefab:"Bow_1",hp:100,type:"monster"}
     * Dragon_2head                     双头龙           {prefab:"Dragon_2head",hp:100,type:"monster"}
     * DualSword                        双剑客           {prefab:"DualSword",hp:100,type:"monster"}
     * Goblin                           道具怪            {prefab:"DualSword",hp:100,type:"monster",data:{prefab:"Weapon_4",hp:100,type:"item"}}
     * Priest                           法师             {prefab:"Priest",hp:100,type:"monster"}
     * Shield_1,Shield_2,Shield_3       3种盾牌手         {prefab:"Shield_1",hp:100,type:"monster",data:{shield_hp:100}}  shield_hp为盾的血量
     * T-rex                            飞龙             {prefab:"T-rex",hp:100,type:"monster"}
     * Vampire_1,Vampire_2,Vampire_3    3种飞蝙蝠         {prefab:"Vampire_1",hp:100,type:"monster"}
     * Wizard                           男巫师            {prefab:"Wizard",hp:100,type:"monster"}
     ***************************************物品**********************************************************
     * LockTower                        锁链             {prefab:"LockTower",hp:0,type:"lock"}
     * Weapon_4                         武器大宝剑        {prefab:"Weapon_4",hp:100,type:"item"}
     * Weapon_3                         武器大宝刀        {prefab:"Weapon_3",hp:100,type:"item"}
     * Items_Armor1                     角色盾            {prefab:"Items_Armor1",hp:100,type:"item"}
     * Egg                              宠物蛋            {prefab:"Egg",hp:0,type:"item"}
     ***************************************关卡结构**********************************************************
     * { bg:背景,     //0，1，2，3
     *   towerData:[//塔楼数据每个{}为一栋
     *      {       //第一栋
               data: [
                   [{ prefab: "LVL_1", hp: 50, type: "player" }],//第一个[]为一个格子，[]中每个{}为一个怪或物体
                   [{}]//空格子
                   ]
            }
            ，{第二栋
                data: [[{ 第一个怪},{  第二个怪 },{ 第三个怪  }],
                    [第二层}],
                    [第三层],
                    ...依此类推
                ]
            },
            {
                第三栋
            },
            ...依此类推
     *   ]
     * }
     */
    LevelData.guideData = [
        {
            bg: 0,
            towerData: [
                {
                    data: []
                },
                {}
            ]
        }
    ];
    LevelData.levelData = [
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 10, type: "player" }],
                        [{ prefab: "princess", hp: 50, type: "princess" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 3, type: "monster" }, { prefab: "GuidanceRow", hp: 100, type: "guidance" }],
                        [{ prefab: "Sword_1", hp: 12, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 6, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 5, type: "monster" }, { prefab: "Sword_2", hp: 9, type: "monster" }]],
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 12, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 22, type: "monster" }, { prefab: "TreasureBox1", hp: 30, type: "item", data: { prefab: "", count: 10, type: "glod" }, scale: 0.6 }]],
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 4, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 3, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 6, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 10, type: "monster" }]]
                },
                {
                    prefab: "Boss_1", type: "boss", hp: 20
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 4, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 1, type: "monster" }, { prefab: "Dragon_2head", hp: 8, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4, type: "monster" }],
                        [{ prefab: "Vampire_1", hp: 15, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 7, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 1, type: "monster" }, { prefab: "Weapon_4", hp: 7, type: "item" }],
                        [{ prefab: "Sword_1", hp: 12, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 45, type: "item" }, { prefab: "princess", hp: 50, type: "princess" }],
                        [{ prefab: "T-rex", hp: 22, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 11, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 20, type: "item" }, { prefab: "Weapon_4", hp: 50, type: "item" }],
                        [{ prefab: "Sword_1", hp: 4, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 14, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 40, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 120, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 40, type: "item" }, { prefab: "Weapon_4", hp: 100, type: "item" }]]
                },
                {
                    data: [[{ prefab: "T-rex", hp: 269, type: "monster" }, { prefab: "princess", hp: 50, type: "princess" }]]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 19, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 15, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 24, type: "item" }, { prefab: "Sword_1", hp: 39, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 30, type: "monster" }, { prefab: "WeaponItem_2", hp: 5, type: "weapon" }],
                        [{ prefab: "T-rex", hp: 75, type: "monster" }]]
                },
                {
                    prefab: "Boss_2", hp: 150, type: "boss"
                },
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 5, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 6, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 24, type: "monster" }],
                        [{ prefab: "WeaponItem_2", hp: 5, type: "weapon" }, { prefab: "Sword_2", hp: 15, type: "monster" }],
                        [{ prefab: "T-rex", hp: 45, type: "monster" }]]
                },
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 11, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 30, type: "monster" }],
                        [{ prefab: "Weapon_4", hp: 9, type: "item" }],
                        [{ prefab: "Item_Barrier1", hp: 5, type: "item" }, { prefab: "Sword_1", hp: 20, type: "monster" }],
                        [{ prefab: "T-rex", hp: 10, type: "monster" }],]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 14, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 35, type: "monster" }],
                        [{ prefab: "Weapon_4", hp: 300, type: "item" }, { prefab: "Sword_1", hp: 55, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 13, type: "monster" }, { prefab: "Sword_2", hp: 110, type: "monster" }],
                        [{ prefab: "T-rex", hp: 200, type: "monster" }]]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 16, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 15, type: "monster" }],
                        [{ prefab: "WeaponItem_2", hp: 120, type: "weapon" }],
                        [{ prefab: "Sword_2", hp: 10, type: "monster" }]]
                },
                {
                    prefab: "Boss_3", hp: 72, type: "boss"
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 8, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 7, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 10, type: "item" }, { prefab: "WeaponItem_2", hp: 25, type: "weapon" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 99, type: "monster" }, { prefab: "T-rex", hp: 30, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 40, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 25, type: "monster" }, { prefab: "Vampire_1", hp: 20, type: "monster" }]]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 19, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Sword_2", hp: 30, type: "monster" }],
                        [{ prefab: "WeaponItem_1", hp: 28, type: "weapon" }, { prefab: "Sword_1", hp: 5, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 70, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "T-rex", hp: 94, type: "monster" }]]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 10, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 15, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 10, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 30, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 20, type: "item" }, { prefab: "Sword_2", hp: 20, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 30, type: "item" }, { prefab: "Sword_1", hp: 30, type: "monster" }, { prefab: "Sword_2", hp: 30, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 70, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 10, type: "monster" }, { prefab: "Sword_2", hp: 150, type: "monster" }],
                        [{ prefab: "Goblin", hp: 10, type: "monster", data: { prefab: "Weapon_4", hp: 40, type: "item" } }],
                        [{ prefab: "Shield_2", hp: 160, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 50, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 95, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 55, type: "monster", data: { shield_hp: 55 } }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 120, type: "monster", data: { shield_hp: 120 } }, { prefab: "Sword_1", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 3000, type: "monster", data: { shield_hp: 3000 } }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 120, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }, { prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 400, type: "item" } }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 5000, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "Sword_2", hp: 2500, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 900, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 35, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Goblin", hp: 35, type: "monster", data: { prefab: "WeaponItem_9", hp: 10, type: "weapon" } }],
                        [{ prefab: "Shield_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 20, type: "monster" }],
                        [{ prefab: "T-rex", hp: 120, type: "monster" }]]
                },
                {
                    prefab: "Boss_4", hp: 270, type: "boss"
                },
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 3, type: "player" }]]
                },
                {
                    data: [[{ prefab: "WeaponItem_1", hp: 7, type: "weapon" }],
                        [{ prefab: "Sword_1", hp: 12, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 6, type: "monster" }, { prefab: "Sword_2", hp: 25, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 20, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 100, type: "monster" }, { prefab: "Sword_1", hp: 42, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 20, type: "monster" }, { prefab: "Sword_1", hp: 70, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 125, type: "item" }, { prefab: "Sword_1", hp: 155, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 135, type: "item" }, { prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 195, type: "monster" }],
                        [{ prefab: "T-rex", hp: 500, type: "monster", scale: 0.7 }, { prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" }, scale: 0.6 }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 23, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 11, type: "monster" }, { prefab: "WeaponItem_6", hp: 66, type: "weapon" }],
                        [{ prefab: "Sword_1", hp: 32, type: "monster" }],
                        [{ prefab: "Vampire_1", hp: 66, type: "monster" }]]
                },
                {
                    prefab: "Boss_5", hp: 150, type: "boss"
                },
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 20, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 16, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 42, type: "item" }, { prefab: "WeaponItem_7", hp: 60, type: "weapon" }],
                        [{ prefab: "WeaponItem_2", hp: 36, type: "weapon" }],
                        [{ prefab: "Sword_2", hp: 85, type: "monster" }, { prefab: "princess", hp: 50, type: "princess" }]]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 26, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 31, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 15, type: "monster" }],
                        [{ prefab: "WeaponItem_8", hp: 26, type: "weapon" }, { prefab: "Shield_1", hp: 85, type: "monster" }],
                        [{ prefab: "T-rex", hp: 99, type: "monster" }]]
                },
                {
                    prefab: "Boss_3", hp: 280, type: "boss"
                } // boss_1-6
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 28, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Sword_2", hp: 30, type: "monster" }],
                        [{ prefab: "WeaponItem_9", hp: 20, type: "weapon" }, { prefab: "Shield_1", hp: 5, type: "monster" }],
                        [{ prefab: "T-rex", hp: 70, type: "monster" }],
                        [{ prefab: "Vampire_1", hp: 94, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 24, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 97, type: "item" }, { prefab: "princess", hp: 50, type: "princess" }],
                        [{ prefab: "Sword_1", hp: 4, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 5, type: "monster" }, { prefab: "Vampire_2", hp: 45, type: "monster" }],
                        [{ prefab: "WeaponItem_5", hp: 20, type: "weapon" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 9, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 61, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 31, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 8, type: "monster" }, { prefab: "Sword_2", hp: 11, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 21, type: "item" }, { prefab: "WeaponItem_2", hp: 31, type: "weapon" }]
                    ]
                },
                {
                    prefab: "Boss_1", hp: 101, type: "boss"
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 1, type: "player" }]]
                },
                {
                    data: [[{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]]
                },
                {
                    data: [[{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]],
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 25, type: "player" }]]
                },
                {
                    data: [[{ prefab: "WeaponItem_9", hp: 21, type: "weapon" }],
                        [{ prefab: "Sword_1", hp: 5, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 47, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 10, type: "monster" }, { prefab: "Vampire_1", hp: 84, type: "monster" }, { prefab: "T-rex", hp: 150, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 29, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 70, type: "monster" }, { prefab: "WeaponItem_7", hp: 149, type: "weapon" }],
                        [{ prefab: "Sword_1", hp: 6, type: "monster" }, { prefab: "Sword_2", hp: 32, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 8, type: "item" }, { prefab: "Sword_2", hp: 20, type: "monster" }],
                        [{ prefab: "T-rex", hp: 295, type: "monster" }, { prefab: "princess", hp: 50, type: "princess" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 50, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 30, type: "item" }, { prefab: "Vampire_1", hp: 160, type: "monster" }],
                        [{ prefab: "Dragon_2head", hp: 301, type: "monster" }, { prefab: "princess", hp: 50, type: "princess" }],
                        [{ prefab: "WeaponItem_9", hp: 120, type: "weapon" }],
                        [{ prefab: "Sword_1", hp: 18, type: "monster" }, { prefab: "Shield_2", hp: 40, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 29, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 10, type: "monster" }, { prefab: "Vampire_1", hp: 48, type: "monster" }],
                        [{ prefab: "WeaponItem_4", hp: 40, type: "weapon" }],
                        [{ prefab: "Shield_2", hp: 24, type: "monster" }]
                    ]
                },
                {
                    prefab: "Boss_1", hp: 150, type: "boss"
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 24, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 20, type: "monster" }, { prefab: "WeaponItem_6", hp: 120, type: "weapon" }],
                        [{ prefab: "Shield_1", hp: 16, type: "monster" }, { prefab: "Shield_2", hp: 20, type: "monster" }],
                        [{ prefab: "Vampire_1", hp: 40, type: "monster" }],
                        [{ prefab: "T-rex", hp: 211, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 38, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 5, type: "monster" }, { prefab: "WeaponItem_7", hp: 55, type: "weapon" }],
                        [{ prefab: "Shield_1", hp: 12, type: "monster" }, { prefab: "Shield_2", hp: 80, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 30, type: "item" }, { prefab: "WeaponItem_8", hp: 70, type: "weapon" }],
                        [{ prefab: "Vampire_1", hp: 187, type: "monster" }],
                        [{ prefab: "T-rex", hp: 280, type: "monster" }]
                    ]
                },
                {
                    prefab: "Boss_3", hp: 687, type: "boss"
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 39, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 10, type: "monster" }, { prefab: "Shield_1", hp: 65, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 30, type: "monster" }, { prefab: "WeaponItem_6", hp: 25, type: "weapon" }],
                        [{ prefab: "T-rex", hp: 150, type: "monster" }, { prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]
                    ]
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 40, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 36, type: "monster" }, { prefab: "Sword_2", hp: 113, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 41, type: "monster" }, { prefab: "WeaponItem_4", hp: 60, type: "weapon" }],
                        [{ prefab: "Shield_1", hp: 73, type: "monster" }, { prefab: "Shield_1", hp: 58, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 93, type: "item" }, { prefab: "T-rex", hp: 220, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 315, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 285, type: "item" }, { prefab: "WeaponItem_5", hp: 778, type: "weapon" }],
                        [{ prefab: "T-rex", hp: 1555, type: "monster" }, { prefab: "princess", hp: 50, type: "princess" }]
                    ]
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 155, type: "player" }]]
                },
                {
                    data: [[{ prefab: "WeaponItem_7", hp: 20, type: "weapon" }, { prefab: "Shield_1", hp: 80, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 150, type: "monster" }],
                        [{ prefab: "WeaponItem_4", hp: 605, type: "weapon" }, { prefab: "T-rex", hp: 900, type: "monster" }],
                        [{ prefab: "LockTower", hp: 100, type: "lock" }, { prefab: "Shield_1", hp: 200, type: "monster" }]
                    ]
                },
                {
                    prefab: "Boss_5", hp: 2109, type: "boss"
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 50, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 54, type: "monster" }],
                        [{ prefab: "WeaponItem_3", hp: 150, type: "weapon" }],
                        [{ prefab: "T-rex", hp: 199, type: "monster" }],
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }]]
                },
                {
                    data: [[{ prefab: "WeaponItem_3", hp: 300, type: "weapon" }],
                        [{ prefab: "Shield_1", hp: 299, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 399, type: "item" }, { prefab: "Shield_2", hp: 249, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 199, type: "monster" }],
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 17, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 55, type: "monster" }, { prefab: "Shield_1", hp: 60, type: "monster" }],
                        [{ prefab: "WeaponItem_3", hp: 55, type: "weapon" }],
                        [{ prefab: "Shield_2", hp: 60, type: "monster" }],
                        [{ prefab: "T-rex", hp: 225, type: "monster" }, { prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 75, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 8, type: "monster" }],
                        [{ prefab: "T-rex", hp: 40, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 40, type: "monster" }, { prefab: "Vampire_2", hp: 30, type: "monster" }]]
                },
                {
                    prefab: "Boss_1", hp: 191, type: "boss"
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 1, type: "player" }]]
                },
                {
                    data: [[{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]]
                },
                {
                    data: [[{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]
                    ]
                },
                {
                    data: [[{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }],
                        [{ prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 10, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 5, type: "monster" }, { prefab: "Shield_2", hp: 10, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 30, type: "item" }, { prefab: "Shield_2", hp: 15, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 21, type: "monster" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 15, type: "monster" }, { prefab: "WeaponItem_3", hp: 15, type: "weapon" }],
                        [{ prefab: "Shield_1", hp: 20, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 21, type: "monster" }]]
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 31, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 35, type: "monster" }, { prefab: "WeaponItem_5", hp: 15, type: "weapon" }],
                        [{ prefab: "Shield_1", hp: 20, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 125, type: "item" }, { prefab: "Shield_3", hp: 5, type: "monster" }],
                        [{ prefab: "T-rex", hp: 65, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Vampire_1", hp: 45, type: "monster" }, { prefab: "WeaponItem_4", hp: 20, type: "weapon" }],
                        [{ prefab: "Vampire_2", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_6", hp: 200, type: "monster" }]]
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 51, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 76, type: "monster" }, { prefab: "Shield_6", hp: 444, type: "monster" }],
                        [{ prefab: "Shield_5", hp: 131, type: "monster" }],
                        [{ prefab: "Shield_4", hp: 211, type: "monster" }],
                        [{ prefab: "WeaponItem_7", hp: 152, type: "weapon" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 15, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_4", hp: 35, type: "monster" }],
                        [{ prefab: "Shield_4", hp: 12, type: "monster" }, { prefab: "Shield_5", hp: 18, type: "monster" }],
                        [{ prefab: "Shield_4", hp: 10, type: "monster" }, { prefab: "Shield_5", hp: 79, type: "monster" }],
                        [{ prefab: "Shield_6", hp: 120, type: "monster" }, { prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 5, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 1, type: "monster" }, { prefab: "Shield_4", hp: 28, type: "monster" }],
                        [{ prefab: "Shield_4", hp: 25, type: "monster" }],
                        [{ prefab: "WeaponItem_4", hp: 51, type: "weapon" }, { prefab: "Shield_1", hp: 17, type: "monster" }],
                        [{ prefab: "T-rex", hp: 55, type: "monster" }, { prefab: "Shield_6", hp: 161, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 181, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Item_Barrier1", hp: 50, type: "item" }, { prefab: "WeaponItem_3", hp: 100, type: "weapon" }],
                        [{ prefab: "Shield_6", hp: 60, type: "monster" }],
                        [{ prefab: "T-rex", hp: 250, type: "monster" }, { prefab: "WeaponItem_9", hp: 1080, type: "weapon" }],
                        [{ prefab: "LockTower", hp: 100, type: "lock" }, { prefab: "Shield_6", hp: 999, type: "monster" }]
                    ]
                },
                {
                    prefab: "Boss_5", hp: 2510, type: "boss"
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 12, type: "player" }]]
                },
                {
                    data: [[{ prefab: "Shield_4", hp: 14, type: "monster" }, { prefab: "Shield_4", hp: 10, type: "monster" }, { prefab: "Shield_5", hp: 22, type: "monster" }],
                        [{ prefab: "Shield_5", hp: 15, type: "monster" }, { prefab: "Shield_5", hp: 60, type: "monster" }, { prefab: "Shield_6", hp: 99, type: "monster" }],
                        [{ prefab: "Shield_5", hp: 5, type: "monster" }, { prefab: "Item_Barrier1", hp: 140, type: "item" }, { prefab: "Shield_5", hp: 5, type: "monster" }],
                    ]
                },
                {
                    data: [[{ prefab: "T-rex", hp: 140, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 59, type: "monster" }],
                        [{ prefab: "Item_Barrier1", hp: 100, type: "item" }, { prefab: "Vampire_3", hp: 85, type: "monster" }],
                        [{ prefab: "Goblin", hp: 10, type: "monster", data: { prefab: "WeaponItem_9", hp: 50, type: "weapon" } }],
                        [{ prefab: "Shield_6", hp: 300, type: "monster" }, { prefab: "TreasureBox1", hp: 50, type: "item", data: { prefab: "", count: 200, type: "glod" } }]
                    ]
                },
            ]
        },
        {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_4", hp: 250, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 50, type: "monster", data: { shield_hp: 50 } }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 250, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "Weapon_3", hp: 300, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Sword_2", hp: 1300, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 2600, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Weapon_4", hp: 1000, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1600, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 99, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 250, type: "monster", data: { shield_hp: 250 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Weapon_3", hp: 2000, type: "item" }],
                        [{ prefab: "Shield_3", hp: 4999, type: "monster", data: { shield_hp: 4999 } }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 90, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 610, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 600, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }, { prefab: "Priest", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 600, type: "monster" }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 110, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 120, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 450, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Weapon_4", hp: 400, type: "item" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 6000, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 120, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }],
                        [{ prefab: "T-rex", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 500, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Wizard", hp: 400, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 400, type: "monster", data: { shield_hp: 400 } }, { prefab: "Weapon_3", hp: 500, type: "item" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 500, type: "item" }]]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]
                    ]
                },
                {
                    data: [[{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 1200, type: "player" }],
                        [{}]]
                },
                {
                    data: [[{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 50, type: "monster", data: { shield_hp: 50 } }],
                        [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 } }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Wizard", hp: 250, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Items_Armor1", hp: 200, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 300, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Items_Armor1", hp: 1000, type: "item" }],
                        [{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 400, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Items_Armor1", hp: 500, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2800, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 400, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 9999, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Items_Armor1", hp: 2400, type: "item" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 75, type: "monster" }, { prefab: "Bow_1", hp: 75, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }, { prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster", }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 300, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Weapon_4", hp: 2000, type: "item" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Shield_3", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 195, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 550, type: "monster" }],
                        [{ prefab: "Wizard", hp: 190, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 2000, type: "monster" }, { prefab: "Wizard", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1100, type: "monster" }, { prefab: "Wizard", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 2500, type: "monster" }, { prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 500, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }],
                        [{ prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "T-rex", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 390, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 195, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 770, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 1800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1300, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1800, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 190, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 460, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 900, type: "monster", data: { shield_hp: 900 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1850, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 3000, type: "monster", data: { shield_hp: 3000 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 500, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1800, type: "monster" }, { prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 340, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 650, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1600, type: "monster" }, { prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 6000, type: "monster" }],
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 350, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 600, type: "monster" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 9000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Sword_2", hp: 500, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 500, type: "monster" }, { prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 190, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 420, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 190, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 380, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 } }, { prefab: "Wizard", hp: 300, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 0,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 } }],
                        [{ prefab: "Sword_1", hp: 190, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 360, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "Sword_2", hp: 4000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }, { prefab: "Shield_1", hp: 60, type: "monster", data: { shield_hp: 60 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 960, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1700, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 2000, type: "monster", data: { shield_hp: 2000 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 350, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }, { prefab: "T-rex", hp: 350, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 120, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_1", hp: 180, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_1", hp: 220, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 400, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 2500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "Sword_2", hp: 10000, type: "monster" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Priest", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 250, type: "monster", data: { shield_hp: 250 } }],
                        [{ prefab: "Wizard", hp: 200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 } }, { prefab: "Weapon_4", hp: 500, type: "item" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }],
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Wizard", hp: 400, type: "monster" }],
                        [{ prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "Items_Armor1", hp: 1000, type: "item" }]
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 200, type: "monster" }],
                        [{ prefab: "Items_Armor1", hp: 300, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Items_Armor1", hp: 500, type: "item" }],
                        [{ prefab: "Sword_1", hp: 180, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_1", hp: 220, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 400, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 1,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{ prefab: "Weapon_3", hp: 250, type: "item" }]]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 300, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 3000, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Sword_2", hp: 1200, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Sword_2", hp: 1700, type: "monster" }, { prefab: "Sword_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }, { prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 250, type: "monster", data: { shield_hp: 250 } }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Weapon_4", hp: 10000, type: "item" }],
                        [{ prefab: "Shield_2", hp: 4900, type: "monster", data: { shield_hp: 4900 } }, { prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 1000, type: "monster", data: { shield_hp: 1000 } }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Priest", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 4000, type: "monster", data: { shield_hp: 4000 } }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Weapon_4", hp: 1000, type: "item" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_3", hp: 800, type: "monster", data: { shield_hp: 800 } }],
                        [{ prefab: "Wizard", hp: 500, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 400, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3500, type: "monster" }],
                        [{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "Items_Armor1", hp: 500, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }, { prefab: "T-rex", hp: 800, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Items_Armor2", hp: 600, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 } }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Items_Armor2", hp: 800, type: "item" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Priest", hp: 100, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 1000, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Priest", hp: 200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 90, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 290, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 250, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 140, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 600, type: "item" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Priest", hp: 500, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 2000, type: "monster", data: { shield_hp: 2000 } }, { prefab: "Priest", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 200, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 300, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }, { prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Sword_1", hp: 300, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "Priest", hp: 150, type: "monster" }, { prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Weapon_4", hp: 1000, type: "item" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1900, type: "monster" }, { prefab: "Priest", hp: 50, type: "monster" }, { prefab: "Wizard", hp: 500, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }, { prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Wizard", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 1000, type: "item" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Wizard", hp: 800, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 110, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 220, type: "monster" }],
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 410, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 1500, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 9000, type: "monster" }],
                        [{ prefab: "Items_Armor2", hp: 1000, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "T-rex", hp: 1800, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 500, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        []]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 190, type: "monster" }],
                        [{ prefab: "Wizard", hp: 150, type: "monster" }],
                        [{ prefab: "Items_Armor1", hp: 400, type: "item" }],
                        [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 } }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Wizard", hp: 800, type: "monster" }, { prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Items_Armor1", hp: 600, type: "item" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 } }],
                        [{ prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Wizard", hp: 600, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_2", hp: 1800, type: "monster", data: { shield_hp: 1800 } }],
                    ]
                }
            ]
        }, {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],
                        [{}]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Priest", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Sword_2", hp: 1400, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1500, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 7000, type: "monster" }],
                        [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Priest", hp: 200, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }],
                        [{ prefab: "T-rex", hp: 1500, type: "monster" }, { prefab: "Priest", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 1200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        }, {
            bg: 3,
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],
                        [{}]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Egg", hp: 0, type: "item" }],
                        [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                    ]
                },
                {
                    data: [
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                        [{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                        [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                        [{ prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                        [{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                        [{ prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }
    ];
    LevelData = LevelData_1 = __decorate([
        ccclass
    ], LevelData);
    return LevelData;
}(cc.Component));
exports.default = LevelData;

cc._RF.pop();