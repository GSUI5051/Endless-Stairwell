Mousetrap.bind('up', function() {
  if (game.roomsExplored == 0 && game.inSharkCutscene != true) {
    if (game.currentFloor < 500 && game.goldenEelDefeated == true) floorUp()
    else if (game.currentFloor < 499 && game.sharkUpgrades2Bought[6] == true) floorUp()
    else if (game.currentFloor < 350 && game.monsterBloodUpgradesBought[9] == true) floorUp()
    else if (game.currentFloor < 304 && game.combinatorUpgrades2Bought[10] == true) floorUp()
    else if (game.currentFloor < 300 && game.combinatorUpgradesBought[9] == true) floorUp()
    else if (game.currentFloor < 250 && game.cocoaBars >= 20) floorUp()
    else if (game.currentFloor < 200 && game.sharkUpgradesBought[9] == true) floorUp()
    else if (game.currentFloor < 150 && game.altarUpgradesBought[6] == true) floorUp()
    else if (game.currentFloor < 100 && game.specialItemsAcquired[1] == true) floorUp()
    else if (game.currentFloor < 50) floorUp()
  }
})

Mousetrap.bind('down', function() {
  if (game.roomsExplored == 0 && game.inSharkCutscene != true) {
    if (game.currentFloor > -1 && (game.cocoaBars >= 10 || game.darkOrbs > 0)) floorDown()
    else if (game.currentFloor > 0) floorDown()
  }
})

Mousetrap.bind('right', function() {
  if (game.roomsExplored == 0 && document.getElementById("enterFloorButton").style.display == "block" && document.getElementById("enterFloorButton").disabled == false) enterFloor()
  else if (game.roomsExplored > 0 && game.fightingMonster == false && game.returningToStairwell == false) newRoom()
})

Mousetrap.bind('left', function() {
  if (game.roomsExplored > 0 && game.fightingMonster == false) toStairwell()
})

Mousetrap.bind('a', function() {
  if (game.currentFloor == 499) {goldenEelAttack()}
  else if (game.roomsExplored > 0 && game.fightingMonster == true && game.energy > 0) {attack()}
})

Mousetrap.bind('f', function() {
  if ((game.specialItemsAcquired[1] == true || game.altarUpgradesBought[1] == true) &&game.roomsExplored > 0 && game.fightingMonster == true && game.fleeCooldown == 0 && game.energy == 100) flee()
})

Mousetrap.bind('1', function() {consumeHoney(1)})

Mousetrap.bind('2', function() {consumeHoney(2)})

Mousetrap.bind('p', function() {
  if (game.roomsExplored == 0) cocoaPrestige()
})

bigShotPlaying = false
Mousetrap.bind('shift+s', function() {
  if (!bigShotPlaying) {
    console.log("[[BIG SHOT]] TIME, MOTHERFUCKERS!!!")
    nowsYourChance = new Audio("img/BIG SHOT.mp3")
    nowsYourChance.load()
    nowsYourChance.volume = 0.2
    nowsYourChance.loop = true
    nowsYourChance.play()
    bigShotPlaying = true
  }
  else {
    nowsYourChance.pause()
    nowsYourChance.currentTime = 0
    bigShotPlaying = false
  }
})