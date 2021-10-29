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

tips = ["有一些房间有怪物。杀死怪物能获得经验值，经验值能让你变强。尽可能地让你变强！层数越高，怪物越强，升级所需的经验值越多。",
"攻击需要消耗能量，攻击太快会消耗大量的能量！如果没有能量的话，你需要等待一段时间才能恢复！",
"恭喜你杀死了怪物！使用蜂蜜或回到阶梯，能恢复你的血量。使用香草蜂蜜能在低能量时，恢复你的能量。在后面的房间中，会增加出现物品（包括但不限于蜂蜜和符文碎片）的概率。<br><br>符文碎片很有用，能获得临时性或永久性的加成。",
"如果你有困难，可以使用蜂蜜或回到阶梯来恢复血量和能量。你还能使用符文来获得一些增益！<br><br>或许你会发现，敌人第一次攻击的冷却时间是 3 秒，而不是 1.5 秒。利用这一点，可以达成先发制人。",
"临时性的符文能给你 45 秒的增益。请注意，这 45 秒是从拿到符文之后立刻开始计算的！打造相同的符文可以提高增益的持续时间。",
"或许你需要变得更强（或许要到 15 级），才能获得一些有用的一次性购买项目。记住，楼层越高，房间越往后，出现物品的概率越高。<br><br>49 层的门后面会有什么呢...?",
"你会在 49 层中找到一个很重要的物品，不过这一层可不容易...<br><br>然后你可以拿到很多的新东西了！",
"幸运戒指能让你在战斗中逃跑，不过有冷却时间。它还能让你爬得更高...",
"一开始，重置时只能拿到 1 个可可蜂蜜，但它在重置之后的作用非常明显。",
"恭喜你，完成了一次重置！你会很快回到重置之前的进度。<br><br>千万要注意了！购买祭坛上的这些升级，会消耗你的可可蜂蜜！",
"天哪，你太臭了。我在这都能闻到你的臭味。臭死了，恶心心，yue.",
"你换了很多次楼层，走了很多个房间才能走到这里。别忘了，按住 <i>回车键</i> 可以一直点击你上次点击的按钮。（译注：你也可以选择用快捷键）",
"你能用暗影戒指在阶梯中快速回满能量，暗影戒指能大幅减少逃跑的冷却时间，它还能让你爬得更高...<br><br>杀死 100 层以上的怪物，能获得蜜浆。继续往上爬，进入更高难度的楼层，获得蜜浆的概率越大。",
"可可砖块能大幅提高可可蜂蜜的获得量。要打败层级 4 的怪物，你可能需要好几个可可砖块。",
"恭喜获得黑暗球体！你会很快回到重置之前的进度。<br><br>每多获得一个黑暗球体，获得的加成更多，这一定值得！",
"黑暗砖块能让你在打败层级 5 的怪物后获得更多的经验。合成它们 <b>并不会消耗黑暗球体和可可砖块</b>。<br><br>你快要获得另一个黑暗球体了！看看 -1 层？",
"层级 6 的怪物血量太大了，必须要用 J 来表示。记住，字母 J 和前面的字母是不一样的！ （ Jx = 10{x}10 = 10^^^...^^^10, 合计 x 个箭头）",
"怪物之血大幅度提高经验获得量，你一定会觉得这玩意很有用的。1 级产血器生产怪物之血，下一级产血器生产上一级的产血器！<br><br>购买产血器不会消耗血之钻石。",
"干，这家伙拿到了格洛克",
"这把 MAC-10 微冲能让你往继续上爬 150 层！然而要经过一些考验才能到达 500 层...<br><br>层级 8 的怪物会掉落能增强攻击伤害的黄金蜂蜜。层级 8 的怪物，血量用 K 来表示，K 后面的数字表示 J 的个数 (1K5 = JJJJ10).",
"这只鳗鱼太厉害了！它的血量机制有所不同，你能在攻击伤害小于 K1e15 时，让这只鳗鱼失去一定比例的血量。",
"非常好！恭喜你打败了鳗鱼之弧。接下来可能会有更多的内容，请密切关注！"]

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