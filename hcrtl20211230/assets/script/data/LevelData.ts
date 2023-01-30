// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelData extends cc.Component {




    public static curLevel = 1;


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

    public static guideData = [
        {
            bg: 0,//引导剧情
            towerData: [
                {
                    data:[]
                },

                {

                }
            ]
        }
    ];


    public static levelData = [

        {
            bg: 0,//level 0
            towerData: [//第一栋
                {
                    data: [[{ prefab: "LVL_1", hp: 50, type: "player" }],
                        [{ prefab: "princess", hp: 50, type: "princess" }]]
                },//第二栋

                {
                    data: [[{ prefab: "Sword_1", hp: 30, type: "monster" }, { prefab: "GuidanceRow", hp: 100, type: "guidance" }],
                    [{ prefab: "Sword_1", hp: 60, type: "monster" }]]
                }
            ]
        },

        {
            bg: 0,//level 1
            towerData: [//第一栋
                {
                    data: [[{ prefab: "LVL_1", hp: 50, type: "player" }],
                    [{ prefab: "Weapon_3", hp: 50, type: "item" }]]
                },//第二栋

                {
                    data: [[{ prefab: "Sword_1", hp: 90, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 300, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,//level 2
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 80, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 90, type: "monster" }, { prefab: "Bow_1", hp: 20, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 260, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,//level 3
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 90, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 90, type: "monster" }, { prefab: "Bow_1", hp: 20, type: "monster" }]]
                },
                
                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 300, type: "monster" }, { prefab: "Sword_2", hp: 1400, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2000, type: "monster" }]]
                }
            ]
        },
        {
            bg: 0,//level 4
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 900, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 300, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Goblin", hp: 200, type: "monster", data: { prefab: "Weapon_3", hp: 200, type: "item" } }]]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 8000, type: "monster" }]]
                },
            ]
        },
        {
            bg: 0,//level 5
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                    [{ prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 200, type: "item" } }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1400, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1800, type: "monster" }, { prefab: "Goblin", hp: 50, type: "monster", data: { prefab: "Weapon_4", hp: 1000, type: "item" } }],
                    [{ prefab: "Sword_2", hp: 5000, type: "monster" }, { prefab: "LockTower", hp: 100, type: "lock" }]]
                }
            ]
        },
        {
            bg: 1,//level 6
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }],
                    [{ prefab: "Sword_1", hp: 90, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 150, type: "monster" }]]
                }
            ]
        },
        {
            bg: 1,//level 7
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 170, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]]
                },
            ]
        },
        {
            bg: 1,//level 8
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                    [{ prefab: "Wizard", hp: 150, type: "monster" }, { prefab: "Weapon_4", hp: 300, type: "item" }],
                    [{ prefab: "Shield_1", hp: 300, type: "monster", data: { shield_hp: 300 } }],]
                },

                {
                    data: [[{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                    [{ prefab: "Sword_1", hp: 600, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2500, type: "monster" }],
                    [{ prefab: "Wizard", hp: 300, type: "monster" }],]
                }
            ]
        },
        {
            bg: 1,//level 9
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Weapon_4", hp: 300, type: "item" }],
                    [{ prefab: "Sword_2", hp: 700, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 900, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 400, type: "monster", data: { shield_hp: 400 } }, { prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]]
                }
            ]
        },
        {
            bg: 1,//level 10
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 350, type: "monster", data: { shield_hp: 350 } }],
                    [{ prefab: "Sword_2", hp: 400, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 5000, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Shield_3", hp: 4000, type: "monster", data: { shield_hp: 4000 } }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "T-rex", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,//level 11
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 400, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }, { prefab: "Weapon_4", hp: 300, type: "item" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }],
                    [{ prefab: "Wizard", hp: 200, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 2500, type: "monster", data: { shield_hp: 2500 } }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1800, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,//level 12
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 500, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                    [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 } }, { prefab: "Bow_1", hp: 50, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2000, type: "monster" }]
                    ]
                },

                {
                    data: [[{ prefab: "Shield_3", hp: 5000, type: "monster", data: { shield_hp: 5000 } }],
                    [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Bow_1", hp: 30, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 400, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        }, {
            bg: 2,//level 13
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{ prefab: "Weapon_3", hp: 150, type: "item" }]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } }]
                    ]
                },

                {
                    data: [[{ prefab: "Shield_1", hp: 300, type: "monster", data: { shield_hp: 300 } }, { prefab: "Sword_1", hp: 300, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 700, type: "monster" }]
                    ]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 400, type: "item" } }],
                    [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 } }],
                    [{ prefab: "Shield_1", hp: 50, type: "monster", data: { shield_hp: 50 } }, { prefab: "Wizard", hp: 100, type: "monster" }]
                    ]
                }
            ]
        }, {
            bg: 2,//level 14
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{}]]
                },//第二层

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
            bg: 2,//level 15
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 120, type: "player" }],// 第一层
                    [{}]]
                },//第二层

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
            bg: 3,//level 16
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }],
                    [{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Sword_1", hp: 200, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Shield_1", hp: 2000, type: "monster", data: { shield_hp: 2000 } }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 400, type: "monster" }, { prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "Bow_1", hp: 15, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1100, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 500, type: "monster" }, { prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1200, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Sword_2", hp: 6400, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 10000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }, { prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "Wizard", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,//level 17
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 700, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 200, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 120, type: "monster" }, { prefab: "Sword_1", hp: 350, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_2", hp: 500, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1100, type: "monster" }],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 1500, type: "monster" }],
                    [{ prefab: "Shield_3", hp: 2500, type: "monster", data: { shield_hp: 2500 } }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,//level 18
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 200, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 100, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 } }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 600, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1100, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 400, type: "monster" }, { prefab: "Bow_1", hp: 100, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "Sword_2", hp: 900, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "Weapon_4", hp: 4000, type: "item" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Shield_3", hp: 2500, type: "monster", data: { shield_hp: 2500 } }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 3,//level 19
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 150, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 50, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 25, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }, { prefab: "Sword_1", hp: 300, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 500, type: "monster" }, { prefab: "Sword_1", hp: 500, type: "monster" }]
                    ]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 900, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 250, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,//level 20
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 400, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Sword_1", hp: 150, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 600, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 800, type: "monster" }, { prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Shield_3", hp: 2000, type: "monster", data: { shield_hp: 2000 } }],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 50, type: "monster" }, { prefab: "Goblin", hp: 100, type: "monster", data: { prefab: "Weapon_4", hp: 1000, type: "item" } }]
                    ]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 12000, type: "monster" }],
                    [{ prefab: "T-rex", hp: 1000, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 5000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 1000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 150, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 0,//level 22
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_1", hp: 200, type: "monster" }, { prefab: "Sword_2", hp: 600, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 300, type: "monster" }]]
                },

                {
                    data: [[{ prefab: "Sword_2", hp: 400, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }],
                    [{ prefab: "Wizard", hp: 300, type: "monster" }, { prefab: "Wizard", hp: 200, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,//level 22
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{ prefab: "Weapon_4", hp: 1000, type: "item" }]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 2000, type: "monster" }],
                    [{ prefab: "Shield_3", hp: 2000, type: "monster", data: { shield_hp: 2000 } }],
                    [{ prefab: "T-rex", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster" }],
                    [{ prefab: "Shield_3", hp: 1500, type: "monster", data: { shield_hp: 1500 } }],
                    [{ prefab: "Shield_3", hp: 2500, type: "monster", data: { shield_hp: 2500 } }, { prefab: "T-rex", hp: 1500, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,//level 23
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 100, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 280, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }, { prefab: "Sword_2", hp: 800, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 700, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_1", hp: 150, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 1200, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2800, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }, { prefab: "Wizard", hp: 700, type: "monster" }]
                    ]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 9000, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 0,//level 24
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_1", hp: 300, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 550, type: "monster" }],
                    [{ prefab: "Sword_1", hp: 150, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster" }, { prefab: "Bow_1", hp: 25, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Sword_2", hp: 3000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 7000, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2200, type: "monster" }, { prefab: "T-rex", hp: 900, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 6000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 700, type: "monster" }, { prefab: "Sword_2", hp: 20000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 6000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "T-rex", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 0,//level 25
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{ prefab: "Weapon_4", hp: 250, type: "item" }]]
                },//第二层

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
            bg: 1,//level 26
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{}]]
                },//第二层

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
            bg: 1,//level 27
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

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
            bg: 1,//level 28
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]]
                },//第二层

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
            bg: 1,//level 29
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 110, type: "player" }],// 第一层
                    [{}]]
                },//第二层

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
                    [{ prefab: "Sword_2", hp: 1500, type: "monster" },{ prefab: "T-rex", hp: 500, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 1,//level 30
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 500, type: "player" }],// 第一层
                    [{}]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 700, type: "monster" }],
                    [{ prefab: "Wizard", hp: 400, type: "monster" }]
                    ]
                },
                {
                    data: [[{ prefab: "Shield_1", hp: 150, type: "monster" , data: { shield_hp: 150 }}, { prefab: "Bow_1", hp: 50, type: "monster" }],
                    [{ prefab: "Wizard", hp: 100, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 25, type: "monster" }],
                    [{ prefab: "Shield_2", hp: 400, type: "monster"  , data: { shield_hp: 400 }}, { prefab: "Weapon_3", hp: 500, type: "item" }],
                    [{ prefab: "Sword_2", hp: 2000, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 2,//level 31
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{ prefab: "Weapon_3", hp: 500, type: "item" }]]
                },//第二层

                {
                    data: [[{ prefab: "Sword_2", hp: 600, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 150, type: "monster" , data: { shield_hp: 150 }}]
                    ]
                },
                {
                    data: [[ { prefab: "Bow_1", hp: 100, type: "monster" }],
                    [{ prefab: "Shield_2", hp: 500, type: "monster" , data: { shield_hp: 500 }}],
                    [ { prefab: "Sword_2", hp: 600, type: "monster" },{ prefab: "Bow_1", hp: 50, type: "monster" }]
                    ]
                },
                {
                    data: [[ { prefab: "Sword_2", hp: 1000, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 100, type: "monster" }],
                    [{ prefab: "Bow_1", hp: 50, type: "monster" }],
                    [ { prefab: "Sword_2", hp: 1000, type: "monster" },{ prefab: "Bow_1", hp: 100, type: "monster" }]
                    ]
                }
            ]
        },
        {
            bg: 2,//level 32
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 1200, type: "player" }],// 第一层
                    [{ }]]
                },//第二层

                {
                    data: [[{ prefab: "Wizard", hp: 400, type: "monster" },{ prefab: "Wizard", hp: 400, type: "monster" },{ prefab: "Wizard", hp: 300, type: "monster" }],
                    [{ prefab: "Shield_1", hp: 50, type: "monster" , data: { shield_hp: 50 }}],
                    [ { prefab: "Shield_2", hp: 350, type: "monster" , data: { shield_hp: 350 }}],
                    [{ prefab: "Wizard", hp: 200, type: "monster"}],
                    [ { prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 } }, { prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Wizard", hp: 250, type: "monster" },{ prefab: "Wizard", hp: 100, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,//level 33
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{ prefab: "Items_Armor1", hp: 200, type: "item" }]]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"}],
                    [ { prefab: "Sword_1", hp: 200, type: "monster"}]]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_2", hp: 300, type: "monster"},{ prefab: "Items_Armor1", hp: 500, type: "item" }],
                    [ { prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 } }],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 } }],
                    [ { prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 } }, { prefab: "Items_Armor1", hp: 1000, type: "item" }],
                    [{ prefab: "Wizard", hp: 400, type: "monster" },{ prefab: "Wizard", hp: 400, type: "monster" }, { prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,//level 34
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{ prefab: "Weapon_3", hp: 400, type: "item" }]]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}],
                    [ { prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Items_Armor1", hp: 500, type: "item" }]]
                },//第二层

                {
                    data: [
                    [ { prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 } },{ prefab: "Items_Armor1", hp: 500, type: "item" }],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"}],
                    [ { prefab: "Sword_1", hp: 1200, type: "monster" }],
                    [{ prefab: "Sword_2", hp: 2800, type: "monster"}],
                    [ { prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Wizard", hp: 400, type: "monster" }]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 9999, type: "monster"}],
                    [ { prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 } }, { prefab: "Items_Armor1", hp: 2400, type: "item" }],
                    [{ prefab: "Sword_2", hp: 700, type: "monster" },{ prefab: "Bow_1", hp: 75, type: "monster"},{ prefab: "Bow_1", hp: 75, type: "monster"}],
                    [ { prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }, { prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 } }],
                    [{ prefab: "Sword_2", hp: 900, type: "monster" },{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 }  },{ prefab: "Wizard", hp: 500, type: "monster" },{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster", },{ prefab: "Wizard", hp: 600, type: "monster" },{ prefab: "Wizard", hp: 600, type: "monster" },{ prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 2,//level 35
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    [{ prefab: "Weapon_3", hp: 300, type: "item" }]]
                },//第二层

                {
                    data: [
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{ prefab: "Bow_1", hp: 50, type: "monster"}]
                ]
                },//第二层

                {
                    data: [
                    [{ prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 }},{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [ { prefab: "Shield_1", hp: 100, type: "monster", data: { shield_hp: 100 }}]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Weapon_4", hp: 2000, type: "item" }],
                    [ { prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "Shield_3", hp: 1000, type: "monster", data: { shield_hp: 1000 }}],
                    [ { prefab: "Bow_1", hp: 50, type: "monster"}]
                    ]
                }
            ]
        },
        {
            bg: 2,//level 36
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 195, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 550, type: "monster"}],
                    [{ prefab: "Wizard", hp: 190, type: "monster"}],
                    ]
                },//第二层
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 600, type: "monster"}],
                    [ { prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{prefab: "Wizard", hp: 200, type: "monster"},{prefab: "Wizard", hp: 200, type: "monster"},{prefab: "Wizard", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 600, type: "monster"},{prefab: "Wizard", hp: 100, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 2000, type: "monster"},{prefab: "Wizard", hp: 50, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"},{prefab: "Wizard", hp: 200, type: "monster"}],
                    [ { prefab: "Sword_1", hp: 100, type: "monster"},{prefab: "Wizard", hp: 300, type: "monster"},{prefab: "Wizard", hp: 400, type: "monster"}],
                    [{prefab: "Wizard", hp: 100, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1100, type: "monster"},{prefab: "Wizard", hp: 150, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_1", hp: 600, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 2500, type: "monster"},{prefab: "Wizard", hp: 400, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,//level 37
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{ prefab: "Weapon_3", hp: 500, type: "item" }]]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 700, type: "monster"}]
                    ]
                },//第二层
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [ { prefab: "Sword_2", hp: 1800, type: "monster"}],
                    [{prefab: "Sword_2", hp: 600, type: "monster"}] 
                ]
                },
                {
                    data: [
                    [ { prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}],
                    [ { prefab: "Sword_2", hp: 1200, type: "monster"},{prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"},{prefab: "T-rex", hp: 500, type: "monster"}],
                    [{prefab: "T-rex", hp: 500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 }},{prefab: "T-rex", hp: 400, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,//level 38
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 390, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 195, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 770, type: "monster"}]
                    ]
                },//第二层
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 1600, type: "monster"}],
                    [ { prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{prefab: "Sword_2", hp: 800, type: "monster"},{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [ { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}],
                    [ { prefab: "Sword_2", hp: 1500, type: "monster"},{prefab: "T-rex", hp: 1800, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                },
                {
                    data: [
                    [ { prefab: "Sword_1", hp: 100, type: "monster"}],
                    [ { prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}],
                    [ { prefab: "Sword_2", hp: 1400, type: "monster"}],
                    [ { prefab: "Sword_1", hp: 50, type: "monster"}],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{prefab: "T-rex", hp: 500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{prefab: "T-rex", hp: 1300, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Sword_2", hp: 2000, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Sword_2", hp: 1800, type: "monster"}, { prefab: "Sword_1", hp: 150, type: "monster"},{prefab: "T-rex", hp: 1200, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                    ]
                }
            ]
        },
        {
            bg: 3,//level 39
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 190, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 900, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 460, type: "monster"}],//Bow_1
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [ { prefab: "Shield_1", hp: 900, type: "monster", data: { shield_hp: 900 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                },//第二层
                {
                    data: [
                    [ { prefab: "Sword_1", hp: 500, type: "monster"}],
                    [ { prefab: "Sword_2", hp: 1850, type: "monster"}],
                    [ { prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }},{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [ { prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Shield_2", hp: 3000, type: "monster", data: { shield_hp: 3000 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "T-rex", hp: 1800, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "Bow_1", hp: 500, type: "monster"},{prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [ { prefab: "T-rex", hp: 1800, type: "monster"},{prefab: "T-rex", hp: 1200, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    ]
                }
            ]
        },
        {
            bg: 3,//level 40
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 340, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 650, type: "monster"}]
                    ]
                },//第二层
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 1200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 2000, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 800, type: "monster"},{prefab: "Wizard", hp: 300, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1600, type: "monster"},{prefab: "Wizard", hp: 100, type: "monster"},{prefab: "Wizard", hp: 300, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                },
                {
                    data: [
                    [ { prefab: "Sword_2", hp: 6000, type: "monster"}],
                   
                    ]
                }
            ]
        },{
            bg: 0,//level 41
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                        [{ prefab: "Sword_1", hp: 350, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 150, type: "monster"},{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}]
                    ]
                },//第三层
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 800, type: "monster"},{ prefab: "Sword_2", hp: 4000, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "Priest", hp: 100, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 800, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 50, type: "monster"},{prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1600, type: "monster", data: { shield_hp: 1600 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 500, type: "monster"}],
                    [{ prefab: "Wizard", hp: 600, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 200, type: "monster"},{ prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 }},{prefab: "Wizard", hp: 600, type: "monster"},{prefab: "Wizard", hp: 600, type: "monster"}],
                    [{prefab: "Wizard", hp: 600, type: "monster"},{prefab: "Wizard", hp: 600, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{prefab: "Sword_2", hp: 9000, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 0,//level 42
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                        [{ prefab: "Sword_2", hp: 200, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Items_Armor1", hp: 500, type: "item"}]
                    ]
                },//第三层
                {
                    data: [
                    [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 }},{ prefab: "Sword_2", hp: 500, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1400, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 }},{prefab: "Wizard", hp: 400, type: "monster"}],
                    [{prefab: "Sword_2", hp: 500, type: "monster"},{prefab: "Wizard", hp: 300, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                }
            ]
        },{
            bg: 0,//level 43
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                        [{ prefab: "Wizard", hp: 190, type: "monster"},{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}]
                    ]
                },//第三层
                {
                    data: [
                    [{ prefab: "Wizard", hp: 420, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 }}],
                    [{ prefab: "Bow_1", hp: 50, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Wizard", hp: 800, type: "monster"},{ prefab: "Wizard", hp: 700, type: "monster"},{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }}],
                    [{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                }
            ]
        },{
            bg: 0,//level 44
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                        [{ prefab: "Sword_1", hp: 190, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 380, type: "monster"}]
                    ]
                },//第三层
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 700, type: "monster"}],
                    [{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 500, type: "monster"}],
                    [{ prefab: "Wizard", hp: 100, type: "monster"}],
                    [{ prefab: "Wizard", hp: 200, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 }},{ prefab: "Wizard", hp: 300, type: "monster"}]
                ]
                }
            ]
        },{
            bg: 0,//level 45
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 }}],
                    [{ prefab: "Sword_1", hp: 190, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 360, type: "monster"},{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Sword_1", hp: 600, type: "monster"},{ prefab: "Sword_2", hp: 4000, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}],
                    [{ prefab: "Sword_2", hp: 1200, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "Sword_1", hp: 500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "T-rex", hp: 1500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 1,//level 46
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 200, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 200, type: "monster"},{ prefab: "Priest", hp: 50, type: "monster"},{ prefab: "Shield_1", hp: 60, type: "monster", data: { shield_hp: 60 }}]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 960, type: "monster"},{ prefab: "Priest", hp: 100, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 800, type: "monster"},{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{ prefab: "Priest", hp: 100, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{ prefab: "T-rex", hp: 800, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"},{ prefab: "Bow_1", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1700, type: "monster"},{ prefab: "Priest", hp: 100, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 2000, type: "monster", data: { shield_hp: 2000 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Sword_2", hp: 1400, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "T-rex", hp: 350, type: "monster"},{ prefab: "Priest", hp: 50, type: "monster"},{ prefab: "T-rex", hp: 350, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                 
                ]
                }
            ]
        },{
            bg: 1,//level 47
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_2", hp: 150, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 120, type: "monster"}]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}],
                    [{ prefab: "Sword_1", hp: 180, type: "monster"},{ prefab: "Sword_1", hp: 200, type: "monster"},{ prefab: "Sword_1", hp: 220, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 400, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 }},{ prefab: "Priest", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"},{ prefab: "Priest", hp: 200, type: "monster"}],
                 
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 2500, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 900, type: "monster"},{ prefab: "Sword_2", hp: 10000, type: "monster"}],
                    [{ prefab: "Wizard", hp: 600, type: "monster"},{ prefab: "Priest", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster"},{ prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }},{ prefab: "Priest", hp: 200, type: "monster"},{ prefab: "Wizard", hp: 200, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                 
                ]
                }
            ]
        },{
            bg: 1,//level 48
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 250, type: "player" }],// 第一层
                    []]
                },//第二层

                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{ prefab: "Wizard", hp: 200, type: "monster"}]
                    ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 250, type: "monster", data: { shield_hp: 250 }}],
                    [{ prefab: "Wizard", hp: 200, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"},{ prefab: "Wizard", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 350, type: "monster", data: { shield_hp: 350 }},{ prefab: "Weapon_4", hp: 500, type: "item"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 }}],
                    [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 }},{ prefab: "Wizard", hp: 400, type: "monster"}],
                    [{ prefab: "Wizard", hp: 100, type: "monster"},{ prefab: "Items_Armor1", hp: 1000, type: "item"}]
                ]
                }
            ]
        },{
            bg: 1,//level 49
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 200, type: "monster"}],
                    [{ prefab: "Items_Armor1", hp: 300, type: "item"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{ prefab: "Items_Armor1", hp: 500, type: "item"}],
                    [{ prefab: "Sword_1", hp: 180, type: "monster"},{ prefab: "Sword_1", hp: 200, type: "monster"},{ prefab: "Sword_1", hp: 220, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }}],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 400, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 }},{ prefab: "Bow_1", hp: 100, type: "monster"}]
                ]
                }
            ]
        },{
            bg: 1,//level 50
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{ prefab: "Weapon_3", hp: 250, type: "item" }]]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 300, type: "monster"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Shield_1", hp: 500, type: "monster", data: { shield_hp: 500 }}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 3000, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"}],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }},{ prefab: "Sword_2", hp: 1200, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "Sword_2", hp: 1700, type: "monster"},{ prefab: "Sword_1", hp: 50, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 7000, type: "monster"},{ prefab: "Sword_2", hp: 800, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 700, type: "monster"},{ prefab: "T-rex", hp: 1500, type: "monster"},{ prefab: "T-rex", hp: 1500, type: "monster"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Shield_1", hp: 250, type: "monster", data: { shield_hp: 250 }},{ prefab: "Bow_1", hp: 50, type: "monster"},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }},{ prefab: "Weapon_4", hp: 10000, type: "item"}],
                    [{ prefab: "Shield_2", hp: 4900, type: "monster", data: { shield_hp: 4900 }},{ prefab: "T-rex", hp: 1500, type: "monster"},{ prefab: "T-rex", hp: 2000, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 2,//level 51
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"},{ prefab: "Items_Armor1", hp: 500, type: "item"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Shield_2", hp: 600, type: "monster", data: { shield_hp: 600 }}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "Priest", hp: 200, type: "monster"}],
                    [{ prefab: "Shield_3", hp: 1000, type: "monster", data: { shield_hp: 1000 }}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"},{ prefab: "Priest", hp: 500, type: "monster"}],
                    [{ prefab: "Shield_3", hp: 4000, type: "monster", data: { shield_hp: 4000 }}],
                    [{ prefab: "Sword_2", hp: 4000, type: "monster"},{ prefab: "Priest", hp: 200, type: "monster"}],
                ]
                }
            ]
        },{
            bg: 2,//level 52
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Weapon_4", hp: 1000, type: "item"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"},{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Shield_3", hp: 800, type: "monster", data: { shield_hp: 800 }}],
                    [{ prefab: "Wizard", hp: 500, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 50, type: "monster"}, {prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"},{ prefab: "Sword_2", hp: 1500, type: "monster"},{ prefab: "Priest", hp: 400, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 3500, type: "monster"}],
                    [{ prefab: "Wizard", hp: 400, type: "monster"},{ prefab: "Items_Armor1", hp: 500, type: "item"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "T-rex", hp: 1200, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Wizard", hp: 800, type: "monster"},{ prefab: "Wizard", hp: 700, type: "monster"},{ prefab: "T-rex", hp: 800, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 2,//level 53
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}],
                    [{ prefab: "Items_Armor2", hp: 600, type: "item"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Shield_2", hp: 200, type: "monster", data: { shield_hp: 200 }}, {prefab: "Priest", hp: 200, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 500, type: "monster", data: { shield_hp: 500 }}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                },
                {
                    data: [
                    [{ prefab: "Items_Armor2", hp: 800, type: "item"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}, {prefab: "Priest", hp: 100, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Items_Armor2", hp: 1000, type: "item"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}, {prefab: "Priest", hp: 200, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 2,//level 54
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 90, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 290, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 300, type: "monster"}, {prefab: "Priest", hp: 50, type: "monster"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 250, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 140, type: "monster"}],
                    [{ prefab: "Items_Armor2", hp: 600, type: "item"}],
                    [ {prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 700, type: "item"}],
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 500, type: "monster"}],
                    [ {prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}, {prefab: "Priest", hp: 500, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 2000, type: "monster", data: { shield_hp: 2000 }}, {prefab: "Priest", hp: 100, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 2,//level 55
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 150, type: "monster"}],
                    [{prefab: "Shield_1", hp: 200, type: "monster", data: { shield_hp: 200 }}],
                    [{ prefab: "Sword_1", hp: 300, type: "monster"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 1200, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}, {prefab: "Priest", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 200, type: "monster"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 1500, type: "monster"}, {prefab: "Priest", hp: 300, type: "monster"}, {prefab: "Sword_2", hp: 1500, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster"}, {prefab: "Sword_1", hp: 300, type: "monster"}, {prefab: "Sword_1", hp: 300, type: "monster"}],
                    [ {prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }}, {prefab: "Priest", hp: 150, type: "monster"},{prefab: "Shield_2", hp: 1500, type: "monster", data: { shield_hp: 1500 }}],
                    
                ]
                }
            ]
        },{
            bg: 2,//level 56
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 100, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Weapon_4", hp: 1000, type: "item"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}, {prefab: "Wizard", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}, {prefab: "Bow_1", hp: 100, type: "monster"}, {prefab: "Bow_1", hp: 50, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 700, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [ {prefab: "Sword_2", hp: 1900, type: "monster"}, {prefab: "Priest", hp: 50, type: "monster"},{prefab: "Wizard", hp: 500, type: "monster"}],   
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 3000, type: "monster"},{prefab: "Wizard", hp: 800, type: "monster"},{prefab: "Wizard", hp: 800, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster"}],
                    [ {prefab: "Items_Armor2", hp: 1000, type: "item"}],  
                    [ {prefab: "Bow_1", hp: 100, type: "monster"},{prefab: "Wizard", hp: 800, type: "monster"}],  
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 7000, type: "monster"}]
                ]
                }
            ]
        },{
            bg: 2,//level 57
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 110, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 220, type: "monster"}],
                    [{ prefab: "Egg", hp: 0, type: "item"}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 410, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 800, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 800, type: "monster"}, {prefab: "Priest", hp: 100, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster"}],
                    [ {prefab: "T-rex", hp: 1000, type: "monster"}, {prefab: "T-rex", hp: 1500, type: "monster"}],   
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 9000, type: "monster"}],
                    [{ prefab: "Items_Armor2", hp: 1000, type: "item"}],
                    [ {prefab: "Sword_2", hp: 1000, type: "monster"}],  
                    [ {prefab: "Sword_2", hp: 4000, type: "monster"},{prefab: "T-rex", hp: 1800, type: "monster"}],  
                    [ {prefab: "T-rex", hp: 1500, type: "monster"},{prefab: "Priest", hp: 500, type: "monster"},{prefab: "T-rex", hp: 2000, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                }
            ]
        },{
            bg: 2,//level 58
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    []]
                },
                {
                    data: [
                    [{ prefab: "Wizard", hp: 190, type: "monster"}],
                    [{ prefab: "Wizard", hp: 150, type: "monster"}],
                    [{ prefab: "Items_Armor1", hp: 400, type: "item"}],
                    [{prefab: "Shield_2", hp: 300, type: "monster", data: { shield_hp: 300 }}],
                ]
                },
                {
                    data: [
                    [{ prefab: "Wizard", hp: 800, type: "monster"}, {prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Items_Armor1", hp: 600, type: "item"}],
                    [{prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}],
                    [{prefab: "Shield_2", hp: 900, type: "monster", data: { shield_hp: 900 }}],
                    [{ prefab: "Wizard", hp: 500, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Wizard", hp: 600, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                },
                {
                    data: [
                        [{prefab: "Shield_2", hp: 1800, type: "monster", data: { shield_hp: 1800 }}],  
                ]
                }
            ]
        },{
            bg: 3,//level 59
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 150, type: "player" }],// 第一层
                    [{}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 100, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_1", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_1", hp: 300, type: "monster"},{prefab: "Priest", hp: 100, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 700, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"},{prefab: "Priest", hp: 200, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 1000, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Sword_2", hp: 1400, type: "monster"}],
                    [{prefab: "T-rex", hp: 1000, type: "monster"}],
                    [{prefab: "T-rex", hp: 1500, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Sword_2", hp: 2000, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 3000, type: "monster"}],
                    [{prefab: "Sword_2", hp: 7000, type: "monster"}],
                    [{prefab: "Sword_1", hp: 500, type: "monster"},{prefab: "Priest", hp: 200, type: "monster"},{prefab: "T-rex", hp: 1000, type: "monster"}],
                    [{prefab: "T-rex", hp: 1500, type: "monster"},{prefab: "Priest", hp: 150, type: "monster"},{prefab: "T-rex", hp: 1200, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                ]
                }
            ]
        },{
            bg: 3,//level 60
            towerData: [
                {
                    data: [[{ prefab: "LVL_1", hp: 200, type: "player" }],// 第一层
                    [{}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Egg", hp: 0, type: "item"}],
                    [{ prefab: "Bow_1", hp: 25, type: "monster"}],
                ]
                },
                {
                    data: [
                    [{prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}], 
                    [{ prefab: "Sword_2", hp: 600, type: "monster"}],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{prefab: "Shield_1", hp: 150, type: "monster", data: { shield_hp: 150 }}], 
                    [{ prefab: "Bow_1", hp: 50, type: "monster"}]
                ]
                },
                {
                    data: [
                    [{ prefab: "Bow_1", hp: 100, type: "monster"}],
                    [{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }}],
                    [{ prefab: "Shield_2", hp: 700, type: "monster", data: { shield_hp: 700 }},{ prefab: "Bow_1", hp: 50, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 700, type: "monster"}],
                    [{ prefab: "Sword_2", hp: 800, type: "monster"},{ prefab: "Bow_1", hp: 25, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }],
                    [{ prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "Shield_2", hp: 1000, type: "monster", data: { shield_hp: 1000 }},{ prefab: "Bow_1", hp: 100, type: "monster"},{ prefab: "LockTower", hp: 50, type: "lock" }]
                ]
                }
            ]
        }
    ];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    public static saveLevel() {
        console.log("============save level: " + LevelData.curLevel);

        localStorage.setItem("level", LevelData.curLevel + "");
    }

    public static getLevel() {
        let level = localStorage.getItem("level");
        if (level == null) {
            level = "1";
        }
        LevelData.curLevel = 2//Number(level);
        console.log("============get level: " + LevelData.curLevel);
    }

    // update (dt) {}
}
