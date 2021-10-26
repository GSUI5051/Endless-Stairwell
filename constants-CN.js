monsters = [
  {name: "大蜘蛛", health: ExpantaNum(75), damage: ExpantaNum(10)},
  {name: "骷髅", health: ExpantaNum(100), damage: ExpantaNum(8)},
  {name: "暗影怪", health: ExpantaNum(120), damage: ExpantaNum(12)},
  {name: "飞鳗", health: ExpantaNum(150), damage: ExpantaNum(12)},
  {name: "恶魔之眼", health: ExpantaNum(600), damage: ExpantaNum(45)},
  {name: "巨蚁", health: ExpantaNum(1000), damage: ExpantaNum(80)},
  {name: "沙漠之蛇", health: ExpantaNum(1500), damage: ExpantaNum(140)},
  {name: "藤曼怪", health: ExpantaNum(1800), damage: ExpantaNum(220)},
  {name: "乌龟", health: ExpantaNum(80), damage: ExpantaNum(80)},
  {name: "土狼", health: ExpantaNum(100), damage: ExpantaNum(100)},
  {name: "绯红式神", health: ExpantaNum(120), damage: ExpantaNum(120)},
  {name: "奥术鳗鱼", health: ExpantaNum(130), damage: ExpantaNum(130)},
  {name: "金色飞龙", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "寒冰飞龙", health: ExpantaNum(12), damage: ExpantaNum(12)},
  {name: "沼泽飞龙", health: ExpantaNum(16), damage: ExpantaNum(16)},
  {name: "黑暗飞龙", health: ExpantaNum(18), damage: ExpantaNum(18)},
  {name: "闪光飞蛾", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "翼魔", health: ExpantaNum(11), damage: ExpantaNum(11)},
  {name: "火眼", health: ExpantaNum(12), damage: ExpantaNum(12)},
  {name: "超级塞亚鳗", health: ExpantaNum(13), damage: ExpantaNum(13)},
  {name: "死神", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黏液蠕虫", health: ExpantaNum(11), damage: ExpantaNum(11)},
  {name: "阿努比斯", health: ExpantaNum(12), damage: ExpantaNum(12)},
  {name: "神级塞亚鳗", health: ExpantaNum(13), damage: ExpantaNum(13)},
  {name: "宝石鳗鱼（BOSS）", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "水之球体", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "恶鬼刀圣", health: ExpantaNum(11), damage: ExpantaNum(11)},
  {name: "幽深之神", health: ExpantaNum(12), damage: ExpantaNum(12)},
  {name: "巫蚁", health: ExpantaNum(13), damage: ExpantaNum(13)},
  {name: "水母（BOSS）", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黄金蜘蛛", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黄金蚂蚁", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黄金乌龟", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黄金飞蛾", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黄金死神", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "幽深金神", health: ExpantaNum(10), damage: ExpantaNum(10)},
  {name: "黄金鳗鱼（BOSS）", health: ExpantaNum(1e15), damage: ExpantaNum(1e15)}
]

tips = ["It seems these rooms have monsters in them. Killing them will give you XP, which will make you stronger. Try to get as strong as possible! If you travel further, the monsters will become tougher and it'll take longer to get back.",
"Attacking uses your energy. Attacking too fast uses lots of energy! If it hits 0 you'll have to wait to recover it!",
"Congrats on winning the battle! You can heal by consuming honey or returning to the stairwell. If you're low on energy, try a vanilla honey. Items like honey and rune fragments are more common further out.<br><br>Your rune fragments will be very useful, for both temporary and permanent boosts.",
"if you're having trouble, you can heal any time by consuming honey or returning to the stairwell. Also try using some rune buffs to your advantage!<br><br>You may notice enemies take 3 seconds for their first attack, instead of their usual 1.5. Use that to get more hits in.",
"The temporary runes will give you some helpful 45-second buffs. Watch out, they go into effect immediately! Crafting the same rune again stacks the total time.",
"It seems you'll need some more strength (maybe... level 15?) before you can get access to a helpful one-time item. Keep in mind that all items are more common further out from the stairwell.<br><br>What could be behind that door on floor 49...?",
"Something important may drop on floor 49, but it's not an easy floor...<br><br>Soon you'll have access to a wide variety of new things!",
"This lucky ring allows you to flee battles, with a cooldown. It also allows access to something new...",
"Even gaining just 1 cocoa honey will make a big difference after you reset.",
"Congrats on resetting! You'll get back to where you were in no time.<br><br>Those altar upgrades do take away your cocoa honey! Beware of that!",
"God, you stink. Seriously, I can smell you from here. You are RANCID. DISGUSTING. Bleh.",
"You're doing a lot of floor switching and room exploring there. In case you don't know, you can hold <i>enter</i> to repeat a button you've just pressed.",
"The shadow ring allows you instantly regain energy in the stairwell, as well as greatly reducing the flee cooldown. It also allows access to even higher floors...<br><br>You can gain honeyplasm by killing enemies above floor 100. Going further out and entering more difficult floors gives you a higher chance.",
"Cocoa bars give a massive boost to your cocoa honey gain. You'll need multiple if you hope to defeat any of the tier 4 enemies.",
"Congrats on gaining a dark orb! You'll get back to where you were in no time.<br><br>Every extra dark orb adds more bonuses, so it's always worth it!",
"Dark bars give a boost to XP from tier 5 enemies. Combinating them <b>does not use your dark orbs or cocoa bars</b>.<br><br>Check floor -1, you're close to getting another dark orb!",
"The tier 6 enemies have health so large it uses 'J'. Keep in mind that J works differently than the previous letters! (Jx = 10{x}10 = 10^^^...^^^10, with x arrows)",
"Monster blood increases your XP gain considerably, you'll find it of great use. Tier 1 blood producers produce it, and tiers past tier 1 produce the previous tier!<br><br>Buying blood producers does not take away your blood gems.",
"Damn, he got the glock",
"The MAC gives you access to a whopping 150 new floors! But it seems something's in the way of you reaching floor 500...<br><br>Tier 8 enemies drop golden honey, which increases attack damage. Tier 8 enemies also use 'K', which represents a repeated number of Js (1K5 = JJJJ10).",
"这只鳗鱼太厉害了！它的血量机制有所不同，你能在攻击伤害小于 K1e15 时，让这只鳗鱼失去一定比例的血量。",
"非常好！恭喜你打败了鳗鱼弧。接下来可能会有更多的内容，请密切关注！"]

sharkQuotes = ["谢谢！我还不起债了 ;)",
"我- （咳嗽） （咳嗽） - 嘶哈 - （咳嗽） ... *咳 咳 咳 咳* - 嘶哈 - （咳嗽） ... ... （咳嗽）",
"小伙子，选得真不错。呵呵呵呵",
"你太善良了，兄弟。",
"年轻的探险家，旅途愉快！",
"我曾经很酷，直到我的脑袋被砖头砸了，然后我就来到了这里！",
"谢谢！",
"哇呜-哇呜！谢谢你的钱！",
"蟹蟹！",
"希望你觉得我是你的好朋友，其他在这的那些都是鳗鱼！！！",
"我将统治这个阶梯！",
"完全基于 <img src='img/sharkDoobie.png' style='image-rendering: pixelated'>"]

cocoaBarRequirements = [ExpantaNum("1e10"), ExpantaNum("1e1e6"), ExpantaNum("1e5e7"), ExpantaNum("1e5e8"), ExpantaNum("1e1e14"), ExpantaNum("1e1e32"), ExpantaNum("1e1e50"), ExpantaNum("1e1e80"), ExpantaNum("1e1e100"), ExpantaNum("10^^100"), ExpantaNum("10^^120"), ExpantaNum("10^^140"), ExpantaNum("10^^170"), ExpantaNum("10^^400"), ExpantaNum("10^^450"), ExpantaNum("10^^2000"), ExpantaNum("10^^40000"), ExpantaNum("10^^800000"), ExpantaNum("10^^20000000"), ExpantaNum("10^^^25"), ExpantaNum("10^^^10^6"), ExpantaNum("10^^^10^10"), ExpantaNum("10^^^10^100"), ExpantaNum("10^^^10^1000"), ExpantaNum("10^^^10^10000"), ExpantaNum("J10"), ExpantaNum("J1e6"), ExpantaNum("J1e9"), ExpantaNum("J1e12"), ExpantaNum("J1e16"), ExpantaNum("Infinity")]

cbmRequirements = [1, 2, 4, 5, 9, 10, 11, 13, 15, 16, 19, 20, 26, 30]

gemEelLevels = ["J1e29", "J1e35", "J1e38", "J1e41", "J1e46", "J1e49", "J1e51", "J1e59", "J1e63", "J1e65", "J1e76", "J1e79", "J1e82", "J1e91", "J1e95", "J1e108", "J1e113", "J1e118", "J1e215", "J1e414", "J10^^1e3e10", "J10^^1e1e25", "J10^^1e1e27", "J10^^1e1e37", "J10^^1e1e40", "J10^^1e1e42", "J10^^1e1e50", "J10^^1e1e54", "J10^^1e1e64", "J10^^1e1e68", "J10^^1e1e80", "J10^^1e1e85", "J10^^1e1e88", "JJ3e9", "JJ1e22", "JJ1e24", "JJ1e35", "JJ1e40", "JJ1e46", "JJ1e52", "JJ1e60", "JJ1e65", "JJJ25", "JJJ45", "JJJ65", "JJJ10000", "JJJ20000", "JJJ30000", "JJJ40000", "JJJ50000", "JJJ60000", "JJJ70000", "JJJ80000", "JJJ90000", "JJJ1e5", "JJJ5e7", "JJJ1e8", "JJJ2e8", "Infinity"]

sharkDialogue1 = ["哇呜噫！你好呀，我的老朋友！",
"我作为鲨鱼，能在 1 英里之外闻到你的气味，然后就知道你要来了！你要知道，鲨鱼可是有这个能力的哦！",
"要问我在这干啥？哪有活、哪有水，我就在哪！",
"不过有一个小问题。",
"我的一个竞争对手就在这里，他就一蠢货！他的名字叫水母。",
"我不能卖东西给你，如果我这么做的话，他会过来把我的店给砸了！！！",
"如果你鲨了那只水母的话，我又能卖东西给你了！",
"去吧，兄弟！他在 349 层，谢了！"]

sharkDialogue2 = ["怎么了？水母太强了，你鲨不死他？",
"嗯…………",
"嗯……………………",
"有办法了！我给你一把超级武器，把那只水母鲨了！",
"试一下它，回来告诉我你做了什么！"]

sharkDialogue3 = ["干，你还真用这把格洛克把那只水母鲨了！",
"传奇的 <img src='img/sharkDoobie.png' style='image-rendering: pixelated'>",
"很好，我又能卖东西给你了！随便看看吧，然后",
"哎呀，糟了，等下，等我一分钟。",
"等我亿分钟…… 我…… 只是……"]

darkOrbRequirements = [ExpantaNum("10^^100"), ExpantaNum("10^^1800"), ExpantaNum("10^^^10^10000"), ExpantaNum("J5e15"), ExpantaNum("Infinity")]

darkOrbBonuses = ["目前加成：<br>无",
"目前加成：<br>获得 25 倍的经验<br>获得 10 倍的所有蜂蜜<br>可可砖块增加蜂蜜和香草蜂蜜的获得量<br>可可砖块的上限提高 5 倍",
"目前加成：<br>获得 100 倍的经验<br>获得 100 倍的所有蜂蜜<br>可可砖块增加蜂蜜和香草蜂蜜的获得量<br>可可砖块的上限提高 10 倍<br>增强可可砖块的效果<br>层级 4 的怪物掉落更多的经验",
"目前加成：<br>获得 500 倍的经验<br>获得 10,000 倍的所有蜂蜜<br>黑暗球体重置时保留一些东西<br>可可砖块增加蜂蜜和香草蜂蜜的获得量<br>可可砖块的上限提高 15 倍<br>增强可可砖块的效果<br>层级 4 的怪物掉落更多的经验<br>通过重置获得可可蜂蜜和可可砖块时，经验值等于可可蜂蜜的加成倍数",
"目前加成：<br>获得 5000 倍的经验<br>获得 1e10 倍的所有蜂蜜<br>黑暗球体重置时保留一些东西<br>可可砖块增加蜂蜜和香草蜂蜜的获得量<br>可可砖块的上限提高 20 倍<br>增强可可砖块的效果<br>层级 4 和 5 的怪物掉落更多的经验<br>通过重置获得可可蜂蜜和可可砖块时，经验值等于可可蜂蜜的加成倍数<br>自动获得可可砖块，获得可可砖块时什么都不会重置"]