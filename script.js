function reset() {
	game = {
    currentFloor: 0,
    floorsWithRooms: [[],[],[],[],[],[],[],[]],
    currentTip: 0,

    specialItemsAcquired: [false, false],

    roomsExplored: 0,
    roomsFromStairwell: 0,
    returningToStairwell: false,
    floorDifficulty: 0,
    totalDifficulty: ExpantaNum(0),
    roomType: 0,
    fightingMonster: false,
    monsterType: 0,
    monsterHealth: ExpantaNum(100),
    monsterMaxHealth: ExpantaNum(100),
    monsterAttackCooldown: 3,
    timeSinceAttack: 20,
    waitingForEnergy: false,

    monstersKilled: 0,

    health: ExpantaNum(100),
    maxHealth: ExpantaNum(100),
    energy: 100,
    attackDamage: ExpantaNum(10),
    level: ExpantaNum(1),
    xp: ExpantaNum(0),
    honey: ExpantaNum(0),
    vanillaHoney: ExpantaNum(0),

    fleeCooldown: 0,

    cocoaHoney: ExpantaNum(0),
    altarUpgradesBought: [false, false, false, false, false, false, false],

    honeyplasm: ExpantaNum(0),
    sharkUpgradesBought: [false, false, false, false, false, false, false, false, false, false],

    cocoaBars: 0,

    darkOrbs: 0,

    runeFragments: [0, 0, 0],
    smithFloor: 0,
    buffTimes: [0, 0, 0],
    deaths: 0,

    hyperplasm: ExpantaNum(0),
    combinatorUpgradesBought: [false, false, false, false, false, false, false, false, false, false],
    darkBars: 0,
    starBars: 0,
    combinatorUpgrades2Bought: [false, false, false, false, false, false, false, false, false, false, false],

    gemEelsBeaten: 0,
    bloodGems: 0,
    monsterBlood: ExpantaNum(0),
    //Blood producers (I can't make these an array due to limitations with how the game is loaded)
    t1bp: ExpantaNum(0),
    t2bp: ExpantaNum(0),
    t3bp: ExpantaNum(0),
    t4bp: ExpantaNum(0),
    t5bp: ExpantaNum(0),
    t6bp: ExpantaNum(0),
    t1ebp: ExpantaNum(0),
    t2ebp: ExpantaNum(0),
    t3ebp: ExpantaNum(0),
    t4ebp: ExpantaNum(0),
    t5ebp: ExpantaNum(0),
    bpMultiplier: 1,
    monsterBloodUpgradesBought: [false, false, false, false, false, false, false, false, false, false],

    sharkCutscenesViewed: 0,
    inSharkCutscene: false,
    jellyDefeated: false,
    currentSharkDialogue: 0,
    jellyFought: false,
    sharkUpgrades2Bought: [false, false, false, false, false, false, false],

    timePlayed: 0,

    goldenHoney: 0,
    goldenEelHealth: 1e15,
    goldenUpgradesBought: [false, false, false, false, false, false, false, false, false],
    goldenEelDefeated: false,

    finalTime: 0,

    redPermanentBought: 0,
    greenPermanentBought: 0,
    bluePermanentBought: 0
  }

  cocoaBoost = ExpantaNum(1)
  fillFloorsWithRooms()
}

function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    location.reload()
  }
}

function save() {
	if (game.fightingMonster == false) {localStorage.setItem("endlessStairwellSave", JSON.stringify(game))}
}

setInterval(save, 5000)

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function() {
    alert("Copied to clipboard!")
  }, function() {
    alert("Error copying to clipboard, try again...")
  });
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
    save()
  }
  else {
    alert("Invalid input.")
  }
}

function load() {
	reset()
	let loadgame = JSON.parse(localStorage.getItem("endlessStairwellSave"))
	if (loadgame != null) {
		loadGame(loadgame)
	}
}

load()

function loadGame(loadgame) {
  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  for (i=0; i<Object.keys(loadgame).length; i++) {
    if (loadgame[Object.keys(loadgame)[i]] != "undefined") {
      if (typeof loadgame[Object.keys(loadgame)[i]] == "string") {game[Object.keys(loadgame)[i]] = new ExpantaNum(loadgame[Object.keys(loadgame)[i]])}
      else {game[Object.keys(game)[i]] = loadgame[Object.keys(loadgame)[i]]}
    }
  }

  //Adds new sets of floors with rooms in case the player is coming from an older update
  if (game.smithFloor == 0) {
    x = Math.floor(Math.random() * 4 + 5)
    if (!game.floorsWithRooms[0].includes(x)) {game.smithFloor = x}
    else if (!game.floorsWithRooms[0].includes(x - 1)) {game.smithFloor = x - 1}
    else if (!game.floorsWithRooms[0].includes(x - 2)) {game.smithFloor = x - 2}
    else if (!game.floorsWithRooms[0].includes(x - 3)) {game.smithFloor = x - 3}
    else {game.smithFloor = x - 4}
    game.floorsWithRooms[0] = game.floorsWithRooms[0].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 2) {
    game.floorsWithRooms[1] = []
    if (game.floorsWithRooms[1].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 55)
        if (!game.floorsWithRooms[1].includes(x)) {game.floorsWithRooms[1].push(x)}
        else if (!game.floorsWithRooms[1].includes(x - 1)) {game.floorsWithRooms[1].push(x - 1)}
        else if (!game.floorsWithRooms[1].includes(x - 2)) {game.floorsWithRooms[1].push(x - 2)}
        else {game.floorsWithRooms[1].push(x - 3)}
      }
    }
    game.floorsWithRooms[1] = game.floorsWithRooms[1].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 3) {
    game.floorsWithRooms[2] = []
    if (game.floorsWithRooms[2].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 105)
        if (!game.floorsWithRooms[2].includes(x)) {game.floorsWithRooms[2].push(x)}
        else if (!game.floorsWithRooms[2].includes(x - 1)) {game.floorsWithRooms[2].push(x - 1)}
        else if (!game.floorsWithRooms[2].includes(x - 2)) {game.floorsWithRooms[2].push(x - 2)}
        else {game.floorsWithRooms[2].push(x - 3)}
      }
    }
    game.floorsWithRooms[2] = game.floorsWithRooms[2].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 4) {
    game.floorsWithRooms[3] = []
    if (game.floorsWithRooms[3].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 155)
        if (!game.floorsWithRooms[3].includes(x)) {game.floorsWithRooms[3].push(x)}
        else if (!game.floorsWithRooms[3].includes(x - 1)) {game.floorsWithRooms[3].push(x - 1)}
        else if (!game.floorsWithRooms[3].includes(x - 2)) {game.floorsWithRooms[3].push(x - 2)}
        else {game.floorsWithRooms[3].push(x - 3)}
      }
    }
    game.floorsWithRooms[3] = game.floorsWithRooms[3].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 5) {
    game.floorsWithRooms[4] = []
    if (game.floorsWithRooms[4].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 43 + 205)
        if (!game.floorsWithRooms[4].includes(x)) {game.floorsWithRooms[4].push(x)}
        else if (!game.floorsWithRooms[4].includes(x - 1)) {game.floorsWithRooms[4].push(x - 1)}
        else if (!game.floorsWithRooms[4].includes(x - 2)) {game.floorsWithRooms[4].push(x - 2)}
        else {game.floorsWithRooms[4].push(x - 3)}
      }
    }
    game.floorsWithRooms[4] = game.floorsWithRooms[4].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 6) {
    game.floorsWithRooms[5] = []
    if (game.floorsWithRooms[5].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 255)
        if (!game.floorsWithRooms[5].includes(x)) {game.floorsWithRooms[5].push(x)}
        else if (!game.floorsWithRooms[5].includes(x - 1)) {game.floorsWithRooms[5].push(x - 1)}
        else if (!game.floorsWithRooms[5].includes(x - 2)) {game.floorsWithRooms[5].push(x - 2)}
        else {game.floorsWithRooms[5].push(x - 3)}
      }
    }
    game.floorsWithRooms[5] = game.floorsWithRooms[5].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 7) {
    game.floorsWithRooms[6] = []
    if (game.floorsWithRooms[6].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 39 + 310)
        if (!game.floorsWithRooms[6].includes(x)) {game.floorsWithRooms[6].push(x)}
        else if (!game.floorsWithRooms[6].includes(x - 1)) {game.floorsWithRooms[6].push(x - 1)}
        else if (!game.floorsWithRooms[6].includes(x - 2)) {game.floorsWithRooms[6].push(x - 2)}
        else {game.floorsWithRooms[6].push(x - 3)}
      }
    }
    game.floorsWithRooms[6] = game.floorsWithRooms[6].sort(function (a, b) {return a - b})
  }
  if (game.floorsWithRooms.length < 8) {
    game.floorsWithRooms[7] = []
    if (game.floorsWithRooms[7].length == 0) {
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 355)
        if (!game.floorsWithRooms[7].includes(x)) {game.floorsWithRooms[7].push(x)}
        else if (!game.floorsWithRooms[7].includes(x - 1)) {game.floorsWithRooms[7].push(x - 1)}
        else if (!game.floorsWithRooms[7].includes(x - 2)) {game.floorsWithRooms[7].push(x - 2)}
        else {game.floorsWithRooms[7].push(x - 3)}
      }
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 405)
        if (!game.floorsWithRooms[7].includes(x)) {game.floorsWithRooms[7].push(x)}
        else if (!game.floorsWithRooms[7].includes(x - 1)) {game.floorsWithRooms[7].push(x - 1)}
        else if (!game.floorsWithRooms[7].includes(x - 2)) {game.floorsWithRooms[7].push(x - 2)}
        else {game.floorsWithRooms[7].push(x - 3)}
      }
      for (i=0;i<4;i++) {
        x = Math.floor(Math.random() * 44 + 455)
        if (!game.floorsWithRooms[7].includes(x)) {game.floorsWithRooms[7].push(x)}
        else if (!game.floorsWithRooms[7].includes(x - 1)) {game.floorsWithRooms[7].push(x - 1)}
        else if (!game.floorsWithRooms[7].includes(x - 2)) {game.floorsWithRooms[7].push(x - 2)}
        else {game.floorsWithRooms[7].push(x - 3)}
      }
    }
    game.floorsWithRooms[7] = game.floorsWithRooms[7].sort(function (a, b) {return a - b})
  }

  //Changes the state of the game based on game variables
  document.getElementById("monsterDiv").style.display = "none"
  document.getElementById("toStairwellButton").disabled = false
  if (game.returningToStairwell == false) {
    document.getElementById("newRoomButton").disabled = false
  }
  document.getElementById("newRoomButton").style.display = "none"
  document.getElementById("toStairwellButton").style.display = "none"
  document.getElementById("floorContentsInfo").style.display = "block"
  document.getElementById("floorUpButton").style.display = "block"
  document.getElementById("floorDownButton").style.display = "block"
  document.getElementById("enterFloorButton").style.display = "block"
  document.getElementById("toGroundFloorButton").style.display = "none"
  document.getElementById("toFloor49Button").style.display = "none"
  document.getElementById("toFloor99Button").style.display = "none"
  document.getElementById("toFloor149Button").style.display = "none"
  document.getElementById("toFloor248Button").style.display = "none"
  document.getElementById("toFloor299Button").style.display = "none"
  document.getElementById("toFloor351Button").style.display = "none"
  $("#roomInfo").html("")
  document.getElementById("ringIcon").style.display = "none"
  document.getElementById("ringIcon").src = "img/ring.png"
  document.getElementById("sapphireIcon").style.display = "none"
  document.getElementById("hyperGemIcon").style.display = "none"
  document.getElementById("hyperGemIcon").src = "img/hyperGem.png"
  document.getElementById("glockIcon").style.display = "none"
  document.getElementById("blueKeyIcon").style.display = "none"
  for (i=0; i<cbmRequirements.length; i++) {
    document.getElementsByClassName("cocoaBarMilestoneDiv")[i].style.backgroundColor = "#c0b070"
  }
  
  updateInfo()
  if (game.currentFloor >= 50 && game.specialItemsAcquired[1] == false) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 100 && game.altarUpgradesBought[6] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 150 && game.sharkUpgradesBought[9] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 200 && game.cocoaBars < 20) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 250 && game.combinatorUpgradesBought[9] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 300 && game.combinatorUpgrades2Bought[10] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 304 && game.monsterBloodUpgradesBought[9] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 350 && game.sharkUpgrades2Bought[6] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 499 && game.goldenEelDefeated != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 500) {document.getElementById("floorUpButton").disabled = true}
  else {document.getElementById("floorUpButton").disabled = false}
  if (game.currentFloor <= 0 && game.cocoaBars < 10 && game.darkOrbs == 0) {document.getElementById("floorDownButton").disabled = true}
  else if (game.currentFloor <= -1) {document.getElementById("floorDownButton").disabled = true}
  else {document.getElementById("floorDownButton").disabled = false}
  if (game.currentFloor == 0) {$("#currentFloor").html("the ground floor")}
  else {$("#currentFloor").html("floor " + game.currentFloor)}
  if (game.currentFloor == 500) {document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"}
  else if (game.currentFloor > 350) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c0a030"}
  else if (game.currentFloor > 304) {document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"}
  else if (game.currentFloor > 300) {document.getElementsByClassName("container")[1].style.backgroundColor = "#905050"}
  else if (game.currentFloor > 250) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c09080"}
  else if (game.currentFloor > 200) {document.getElementsByClassName("container")[1].style.backgroundColor = "#508850"}
  else if (game.currentFloor > 150) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c0b070"}
  else if (game.currentFloor > 100) {document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"}
  else if (game.currentFloor < 0) {document.getElementsByClassName("container")[1].style.backgroundColor = "#606060"}

  if (game.roomsExplored > 0 || game.monstersKilled > 0 || game.honey > 0 || game.vanillaHoney > 0 || game.cocoaHoney.gt(0) || game.darkOrbs > 0) {
    document.getElementsByClassName("container")[0].style.display = "block"
    document.getElementsByClassName("container")[2].style.display = "block"
    document.getElementById("extrasDiv").style.display = "block"
  }
  if (game.roomsExplored > 0) {
    document.getElementById("floorContentsInfo").style.display = "none"
    document.getElementById("floorUpButton").style.display = "none"
    document.getElementById("floorDownButton").style.display = "none"
    document.getElementById("enterFloorButton").style.display = "none"
    document.getElementById("newRoomButton").style.display = "block"
    document.getElementById("toStairwellButton").style.display = "block"
    if (game.currentFloor > 50) {tierMessage = ", tier 2"}
    else {tierMessage = ""}
    if (game.roomsExplored == 1) {$("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. They all contain the same beige carpet, and are sparingly littered with furniture. It feels like something's in here with you...<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")}
    else {$("#info").html("<b>Info</b><br>You are in an endless expanse of rooms.<br><br>You have explored " + game.roomsExplored + " rooms. You are " + game.roomsFromStairwell + " rooms away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")}
  }

  if (game.specialItemsAcquired[0] == true) {document.getElementById("blueKeyIcon").style.display = "block"}
  if (game.specialItemsAcquired[1] == true) {
    document.getElementById("ringIcon").style.display = "block"
    document.getElementById("prestigeHotkey").style.display = "block"
  }
  if (game.specialItemsAcquired[1] == true || game.altarUpgradesBought[1] == true) {
    document.getElementById("fleeButton").style.display = "block"
  }

  if (game.xp.gte(4980021) && game.sharkUpgradesBought[0] != true) {$("#XPSoftcap").html(" (softcapped)")}
  else {$("#XPSoftcap").html("")}

  if (game.buffTimes[0] > 0) setTimeout(buffDown1, 1000)
  if (game.buffTimes[1] > 0) setTimeout(buffDown2, 1000)
  if (game.buffTimes[2] > 0) setTimeout(buffDown3, 1000)
  $("#redPermanentBought").html(game.redPermanentBought)
  $("#redPermanentBoost").html(game.redPermanentBought * 5)
  $("#greenPermanentBought").html(game.greenPermanentBought)
  $("#greenPermanentBoost").html(game.greenPermanentBought * 5)
  $("#bluePermanentBought").html(game.bluePermanentBought)
  $("#bluePermanentBoost").html(game.bluePermanentBought * 10)

  if (game.cocoaHoney.gt(0) || JSON.stringify(game.altarUpgradesBought) != "[false,false,false,false,false,false,false]") {document.getElementById("cocoaDiv").style.display = "block"}
  for (i=0; i<game.altarUpgradesBought.length; i++) {
    if (game.altarUpgradesBought[i] == true) {document.getElementsByClassName("cocoaUpgrade")[i].disabled = true}
    else {document.getElementsByClassName("cocoaUpgrade")[i].disabled = false}
  }
  if (game.altarUpgradesBought[4] == true && game.roomsExplored == 0) {
    document.getElementById("toGroundFloorButton").style.display = "block"
    document.getElementById("toFloor49Button").style.display = "block"
    document.getElementById("toFloor99Button").style.display = "block"
  }
  if (game.altarUpgradesBought[6] == true) {
    document.getElementById("ringIcon").src = "img/ring2.png"
    document.getElementById("honey3").style.display = "block"
    document.getElementById("honeyText3").style.display = "block"
  }

  for (i=0; i<game.sharkUpgradesBought.length; i++) {
    if (game.sharkUpgradesBought[i] == true) {document.getElementsByClassName("sharkUpgrade")[i].disabled = true}
    else {document.getElementsByClassName("sharkUpgrade")[i].disabled = false}
  }
  if (game.sharkUpgradesBought[2] == true && game.roomsExplored == 0) {
    document.getElementById("toFloor149Button").style.display = "block"
  }
  if (game.sharkUpgradesBought[9] == true) {
    document.getElementById("sapphireIcon").style.display = "block"
    document.getElementById("cocoaBarIcon").style.display = "block"
    document.getElementById("cocoaBarText").style.display = "block"
  }
  
  for (i=0; i<cbmRequirements.length; i++) {
    if (game.cocoaBars >= cbmRequirements[i]) {document.getElementsByClassName("cocoaBarMilestoneDiv")[i].style.backgroundColor = "#40d040"}
    else {document.getElementsByClassName("cocoaBarMilestoneDiv")[i].style.backgroundColor = null}
  }
  if (game.cocoaBars >= 10) {
    document.getElementById("darkOrbIcon").style.display = "block"
    document.getElementById("darkOrbText").style.display = "block"
  }
  if (game.cocoaBars >= 20) {
    document.getElementById("ringIcon").src = "img/ring3.png"
    document.getElementById("hyperplasmIcon").style.display = "block"
    document.getElementById("hyperplasmText").style.display = "block"
    document.getElementById("darkBarIcon").style.display = "block"
    document.getElementById("darkBarText").style.display = "block"
    document.getElementById("starBarIcon").style.display = "block"
    document.getElementById("starBarText").style.display = "block"
  }
  else if (game.darkOrbs >= 3) {
    document.getElementById("hyperplasmIcon").style.display = "block"
    document.getElementById("hyperplasmText").style.display = "block"
    document.getElementById("darkBarIcon").style.display = "block"
    document.getElementById("darkBarText").style.display = "block"
    document.getElementById("starBarIcon").style.display = "block"
    document.getElementById("starBarText").style.display = "block"
  }

  $("#darkOrbBonuses").html(darkOrbBonuses[game.darkOrbs])
  if (game.darkOrbs >= 1) {
    document.getElementsByClassName("cocoaBarMilestoneDiv")[5].style.backgroundColor = "#40d040"
    document.getElementById("honey3").style.display = "block"
    document.getElementById("honeyText3").style.display = "block"
    document.getElementById("cocoaBarIcon").style.display = "block"
    document.getElementById("cocoaBarText").style.display = "block"
    document.getElementById("darkOrbIcon").style.display = "block"
    document.getElementById("darkOrbText").style.display = "block"
    document.getElementsByClassName("cocoaBarMilestoneDiv")[6].style.display = "inline-block"
    document.getElementsByClassName("cocoaBarMilestoneDiv")[7].style.display = "inline-block"
    document.getElementsByClassName("cocoaBarMilestoneDiv")[8].style.display = "inline-block"
  }
  if (game.darkOrbs >= 2) {
    document.getElementsByClassName("cocoaBarMilestoneDiv")[9].style.display = "inline-block"
    document.getElementsByClassName("cocoaBarMilestoneDiv")[10].style.display = "inline-block"
    document.getElementsByClassName("cocoaBarMilestoneDiv")[11].style.display = "inline-block"
  }
  if (game.darkOrbs >= 3) {
    document.getElementsByClassName("cocoaBarMilestoneDiv")[3].style.backgroundColor = "#40d040"
  }
  if (game.darkOrbs >= 4) {
    document.getElementById("getCocoaBarsButton").disabled = true
    setInterval(autoCocoaBars, 100)
    document.getElementsByClassName("cocoaBarMilestoneDiv")[12].style.display = "inline-block"
    document.getElementsByClassName("cocoaBarMilestoneDiv")[13].style.display = "inline-block"
  }

  for (i=0; i<game.combinatorUpgradesBought.length; i++) {
    if (game.combinatorUpgradesBought[i] == true) {document.getElementsByClassName("combinatorUpgrade")[i].disabled = true}
    else {document.getElementsByClassName("combinatorUpgrade")[i].disabled = false}
  }
  if (game.combinatorUpgradesBought.length == 4) game.combinatorUpgradesBought = [false, false, false, false, false, false, false, false, false, false]
  if (game.combinatorUpgradesBought[0] == true) {
    document.getElementsByClassName("combinatorButton")[0].disabled = false
    document.getElementsByClassName("combinatorText")[0].innerHTML = "Hyperplasm"
  }
  if (game.combinatorUpgradesBought[2] == true && game.roomsExplored == 0) {
    document.getElementById("toFloor248Button").style.display = "block"
  }
  if (game.combinatorUpgradesBought[3] == true) {
    document.getElementsByClassName("combinatorButton")[1].disabled = false
    document.getElementsByClassName("combinatorText")[1].innerHTML = "Dark bar"
  }
  if (game.combinatorUpgradesBought[4] == true) {
    document.getElementsByClassName("combinatorButton")[2].disabled = false
    document.getElementsByClassName("combinatorText")[2].innerHTML = "Star bar"
  }
  if (game.combinatorUpgradesBought[9] == true) {
    document.getElementById("hyperGemIcon").style.display = "block"
  }

  for (i=0; i<game.combinatorUpgrades2Bought.length; i++) {
    if (game.combinatorUpgrades2Bought[i] == true) {document.getElementsByClassName("combinatorUpgrade2")[i].disabled = true}
    else {document.getElementsByClassName("combinatorUpgrade2")[i].disabled = false}
  }
  if (game.combinatorUpgrades2Bought[4] == true && game.roomsExplored == 0) {
    document.getElementById("toFloor299Button").style.display = "block"
  }
  if (game.combinatorUpgrades2Bought[10] == true) {
    document.getElementById("hyperGemIcon").src = "img/starGem.png"
    document.getElementById("bloodGemIcon").style.display = "block"
    document.getElementById("bloodGemText").style.display = "block"
  }

  bloodProductionUpdate()
  for (i=0; i<game.monsterBloodUpgradesBought.length; i++) {
    if (game.monsterBloodUpgradesBought[i] == true) {document.getElementsByClassName("monsterBloodUpgrade")[i].disabled = true}
    else {document.getElementsByClassName("monsterBloodUpgrade")[i].disabled = false}
  }
  if (game.monsterBloodUpgradesBought[9] == true) {
    document.getElementById("hyperGemIcon").src = "img/superBloodGem.png"
  }

  if (game.sharkCutscenesViewed >= 2) {
    document.getElementById("glockIcon").style.display = "block"
  }
  if (game.sharkCutscenesViewed == 3) {
    for (i=0; i<game.sharkUpgrades2Bought.length; i++) document.getElementsByClassName("sharkUpgrade2")[i].style.display = "inline-block"
  }
  else {
    for (i=0; i<game.sharkUpgrades2Bought.length; i++) document.getElementsByClassName("sharkUpgrade2")[i].style.display = "none"
  }

  for (i=0; i<game.sharkUpgrades2Bought.length; i++) {
    if (game.sharkUpgrades2Bought[i] == true) {document.getElementsByClassName("sharkUpgrade2")[i].disabled = true}
    else {document.getElementsByClassName("sharkUpgrade2")[i].disabled = false}
  }
  if (game.sharkUpgrades2Bought[6] == true) {
    document.getElementById("macIcon").style.display = "block"
    document.getElementById("goldenHoneyIcon").style.display = "block"
    document.getElementById("goldenHoneyText").style.display = "block"
  }

  for (i=0; i<game.goldenUpgradesBought.length; i++) {
    if (game.goldenUpgradesBought[i] == true) {document.getElementsByClassName("goldenUpgrade")[i].disabled = true}
    else {document.getElementsByClassName("goldenUpgrade")[i].disabled = false}
  }
  if (game.goldenUpgradesBought[0] == true && game.roomsExplored == 0) {
    document.getElementById("toFloor351Button").style.display = "block"
  }

  if (game.finalTime > 0) {
    finalTimePlayedHours = Math.floor(game.finalTime / 3600)
    finalTimePlayedMinutes = Math.floor(game.finalTime / 60) % 60
    finalTimePlayedSeconds = game.finalTime % 60
    finalTimeString = (finalTimePlayedHours + ":" + ((finalTimePlayedMinutes < 10 ? '0' : '') + finalTimePlayedMinutes) + ":" + ((finalTimePlayedSeconds < 10 ? '0' : '') + finalTimePlayedSeconds))
    $("#finalTime").html("Final time: " + finalTimeString)
  }
}

//Gets the time
function getTheTime() {
	var d = new Date()
	var e = d.getMinutes()
	if (d.getHours() > 12 && d.getHours() < 24) {
		theTime = (d.getHours() - 12) + ":" + ((e < 10 ? '0' : '') + e) + " PM"
	}
	else if (d.getHours() == 12) {
		theTime = d.getHours()  + ":" + ((e < 10 ? '0' : '') + e) + " PM"
	}
	else if (d.getHours() == 24) {
		theTime = (d.getHours() - 12)  + ":" + ((e < 10 ? '0' : '') + e) + " AM"
	}
	else {
		theTime = d.getHours() + ":" + ((e < 10 ? '0' : '') + e) + " AM"
	}
	document.getElementById("theFuckingTime").innerHTML = theTime
}

getTheTime()

setInterval(getTheTime, 1000)

function timePlayedUp() {
  game.timePlayed++
  timePlayedHours = Math.floor(game.timePlayed / 3600)
  timePlayedMinutes = Math.floor(game.timePlayed / 60) % 60
  timePlayedSeconds = game.timePlayed % 60
  timeString = (timePlayedHours + ":" + ((timePlayedMinutes < 10 ? '0' : '') + timePlayedMinutes) + ":" + ((timePlayedSeconds < 10 ? '0' : '') + timePlayedSeconds))
  $("#timePlayed").html(timeString)
}

setInterval(timePlayedUp, 1000)






//Update to run every frame (15ms)
function updateSmall() {
  game.level = game.xp.div(20).pow(0.5).add(1).floor()
  $("#level").html(format(game.level, 0))
  if (game.level.gte(1e9)) {
    xpToNextLevel = ExpantaNum(0)
    document.getElementById("nextLevelText").style.display = "none"
  }
  else {
    xpToNextLevel = game.xp.sub(game.level.sub(1).pow(2).mul(20))
    document.getElementById("nextLevelText").style.display = "block"
  }
  levelDist = (game.level.pow(2).mul(20)).sub(game.level.sub(1).pow(2).mul(20))
  if (game.level.gte(1e9)) {levelDist = ExpantaNum(1)}
  $("#xpToNextLevel").html(format(xpToNextLevel.div(levelDist).mul(100), 0))
  $("#totalXP").html(format(game.xp, 0))

  game.maxHealth = ExpantaNum(100).mul(ExpantaNum(1.1).pow(game.level.sub(1))).floor()
  if (game.health.gt(game.maxHealth)) game.health = game.maxHealth
  if (game.health.gt("10^^10")) {$("#healthBarText").html(format(game.health, 0))}
  else {$("#healthBarText").html(format(game.health, 0) + "/" + format(game.maxHealth, 0))}
  document.getElementById("healthBarInner").style.width = game.health.div(game.maxHealth).mul(100).toNumber() + "%"
  $("#energyBarText").html(Math.floor(game.energy) + "%")
  document.getElementById("energyBarInner").style.width = game.energy + "%"

  if (game.goldenHoney == 0) {game.attackDamage = ExpantaNum(10).mul(ExpantaNum(1.1).pow(game.level.sub(1))).floor()}
  else {game.attackDamage = ExpantaNum.expansion(11,game.goldenHoney + 5)}
  if (game.buffTimes[0] > 0) game.attackDamage = game.attackDamage.mul(1.75)
  $("#attackDamage").html(format(game.attackDamage, 0))
  $("#monstersKilled").html(format(game.monstersKilled, 0))

  $("#honey").html(format(game.honey, 0))
  $("#vanillaHoney").html(format(game.vanillaHoney, 0))
  if (game.honey.eq(0)) {document.getElementById("honeyButton1").disabled = true}
  else {document.getElementById("honeyButton1").disabled = false}
  if (game.vanillaHoney.eq(0)) {document.getElementById("honeyButton2").disabled = true}
  else {document.getElementById("honeyButton2").disabled = false}

  $("#currentTip").html(tips[game.currentTip])

  $("#fragment1Text").html(game.runeFragments[0])
  $("#fragment2Text").html(game.runeFragments[1])
  $("#fragment3Text").html(game.runeFragments[2])

  if (game.buffTimes[0] > 0) {document.getElementById("buff1").style.opacity = "1"}
  else {document.getElementById("buff1").style.opacity = "0.5"}
  document.getElementsByClassName("buffText")[0].innerHTML = game.buffTimes[0]
  if (game.buffTimes[1] > 0) {document.getElementById("buff2").style.opacity = "1"}
  else {document.getElementById("buff2").style.opacity = "0.5"}
  document.getElementsByClassName("buffText")[1].innerHTML = game.buffTimes[1]
  if (game.buffTimes[2] > 0) {document.getElementById("buff3").style.opacity = "1"}
  else {document.getElementById("buff3").style.opacity = "0.5"}
  document.getElementsByClassName("buffText")[2].innerHTML = game.buffTimes[2]

  $("#fleeCooldown").html(game.fleeCooldown)
  if (game.specialItemsAcquired[1] == true) $("#fleeCooldownInfo").html("Flee cooldown: " + game.fleeCooldown + "s")
  if (game.energy == 100) {document.getElementById("fleeButton").disabled = false}
  else {document.getElementById("fleeButton").disabled = true}

  cocoaHoneyToGet = game.level.div(125).log().div(Math.log(2)).sub(1).floor()
  if (cocoaHoneyToGet.lt(0)) cocoaHoneyToGet = ExpantaNum(0)
  nextCocoaHoneyRequirement = ExpantaNum(500).mul(ExpantaNum(2).pow(cocoaHoneyToGet))
  $("#nextCocoaHoneyRequirement").html(format(nextCocoaHoneyRequirement, 0))
  if (game.altarUpgradesBought[2] == true) cocoaHoneyToGet = cocoaHoneyToGet.mul(game.vanillaHoney.add(1))
  if (game.sharkUpgradesBought[1] == true) cocoaHoneyToGet = cocoaHoneyToGet.mul(2)
  if (game.sharkUpgradesBought[5] == true) cocoaHoneyToGet = cocoaHoneyToGet.mul(2)
  if (game.darkOrbs >= 2) {
    if (game.cocoaBars >= 4) {cocoaHoneyToGet = cocoaHoneyToGet.pow(game.cocoaBars * 500 + 1)}
    else {cocoaHoneyToGet = cocoaHoneyToGet.pow(game.cocoaBars * 100 + 1)}
  }
  else {
    if (game.cocoaBars >= 4) {cocoaHoneyToGet = cocoaHoneyToGet.pow(game.cocoaBars * 10 + 1)}
    else {cocoaHoneyToGet = cocoaHoneyToGet.pow(game.cocoaBars * 2 + 1)}
  }
  if (game.cocoaBars >= 9) cocoaHoneyToGet = cocoaHoneyToGet.mul(ExpantaNum("10^^10"))
  if (game.darkOrbs >= 4) cocoaHoneyToGet = cocoaHoneyToGet.mul(1e10)
  else if (game.darkOrbs >= 3) cocoaHoneyToGet = cocoaHoneyToGet.mul(10000)
  else if (game.darkOrbs >= 2) cocoaHoneyToGet = cocoaHoneyToGet.mul(100)
  else if (game.darkOrbs >= 1) cocoaHoneyToGet = cocoaHoneyToGet.mul(10)
  if (game.cocoaBars >= 19) cocoaHoneyToGet = cocoaHoneyToGet.pent(2)
  $("#cocoaHoneyToGet").html(format(cocoaHoneyToGet, 0))

  $("#cocoaHoney").html(format(game.cocoaHoney, 0))
  cocoaBoost = ExpantaNum(4).pow(game.cocoaHoney.pow(0.8))
  $("#cocoaBoost").html(format(cocoaBoost, 1))

  $("#honeyplasm").html(format(game.honeyplasm, 0))
  if (game.honey.gte(20) && game.honeyplasm.gte(1)) {document.getElementById("sharkTrade").disabled = false}
  else {document.getElementById("sharkTrade").disabled = true}

  if (game.cocoaBars >= 10 + game.darkOrbs * 5) {cocoaBarRequirement = ExpantaNum("Infinity")}
  else {cocoaBarRequirement = cocoaBarRequirements[game.cocoaBars]}
  $("#cocoaBarRequirement").html(format(cocoaBarRequirement, 0))
  $("#cocoaBars").html(game.cocoaBars)

  $("#darkOrbs").html(game.darkOrbs)
  $("#darkOrbRequirement").html(format(darkOrbRequirements[game.darkOrbs], 0))

  $("#hyperplasm").html(format(game.hyperplasm, 0))
  if (game.combinatorUpgradesBought[5] == true) {
    hyperplasmCost = ExpantaNum(10).pow(ExpantaNum(10).pow(ExpantaNum(2).pow(game.hyperplasm.div(1000).add(1).tetr(1.2))))
    $("#hyperplasmGain").html("1,000")
  }
  else {
    hyperplasmCost = ExpantaNum(10).pow(ExpantaNum(10).pow(game.hyperplasm.add(1).tetr(1.2)))
    $("#hyperplasmGain").html("1")
  }
  $("#hyperplasmCost1").html(format(hyperplasmCost, 0))
  $("#hyperplasmCost2").html(format(hyperplasmCost, 0))
  $("#darkBars").html(game.darkBars)
  darkBarCost1 = 10 + (5 * game.darkBars)
  darkBarCost2 = game.darkBars
  $("#darkBarCost1").html(darkBarCost1)
  $("#darkBarCost2").html(darkBarCost2)
  $("#starBars").html(game.starBars)
  if (game.combinatorUpgradesBought[7] == true) {starBarCost = 1 + game.starBars}
  else {starBarCost = 4 + game.starBars}
  $("#starBarCost").html(starBarCost)

  $("#goldenHoney").html(format(game.goldenHoney, 0))

  $("#goldenEelBarText").html("K" + format(game.goldenEelHealth, 0) + "/K1.000e15")
  document.getElementById("goldenEelBarInner").style.width = game.goldenEelHealth / 1e15 * 100 + "%"
  $("#goldenEelAttackCooldown").html(format(game.monsterAttackCooldown, 1))
}

setInterval(updateSmall, 15)

//Update for floor/room info
function updateInfo() {
  if (game.roomsExplored == 0) {
    if (game.currentFloor == 0) {
      if (game.cocoaBars >= 10 || game.darkOrbs > 0) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairs are carpeted in beige, and the walls are warm and bright. The landings are lit by continuous windows with nothing but white on the other side.<br><br>The stairs below are now open to you.")}
      else {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairs are carpeted in beige, and the walls are warm and bright. The landings are lit by continuous windows with nothing but white on the other side.<br><br>You feel safe to go up, but a paralyzing fear sets in when you try to go below the ground floor.")}
    }
    else if (game.currentFloor == 50 && game.specialItemsAcquired[1] == false) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 50. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 50 && game.specialItemsAcquired[1] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairs above appear cold and grey, like an old office.")}
    else if (game.currentFloor == 100 && game.altarUpgradesBought[6] != true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 100. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 100 && game.altarUpgradesBought[6] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The landings above are indented and filled ankle-deep with water. The walls are covered in tiles.")}
    else if (game.currentFloor == 150 && game.sharkUpgradesBought[9] != true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 150. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 150 && game.sharkUpgradesBought[9] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairs above are lined with plush carpet, with warm lighting giving the stairwell a comforting atmosphere.")}
    else if (game.currentFloor == 200 && game.cocoaBars < 20) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 200. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 200 && game.cocoaBars >= 20) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairs above are a loose dark wood, with weak bulbs hanging above. A cold breeze fills the atmosphere.")}
    else if (game.currentFloor == 250 && game.combinatorUpgradesBought[9] != true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 250. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 250 && game.combinatorUpgradesBought[9] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairwell above appears high-class, with detailed wooden walls and smooth marble floors.")}
    else if (game.currentFloor == 300 && game.combinatorUpgrades2Bought[10] != true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 300. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 300 && game.combinatorUpgrades2Bought[10] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The walls above are a dark stone, dripping with mysterious blood. The air is humid and everything smells nasty.")}
    else if (game.currentFloor == 304 && game.monsterBloodUpgradesBought[9] != true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 304. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 304 && game.monsterBloodUpgradesBought[9] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The landings above are indented and filled ankle-deep with water, just like back in Shark's area. The walls are covered in tiles.")}
    else if (game.currentFloor == 350 && game.sharkUpgrades2Bought[6] != true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. Going any higher leads you right back to floor 350. You may have to do something to be able to travel further...")}
    else if (game.currentFloor == 350 && game.sharkUpgrades2Bought[6] == true) {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell. The stairwell above is entirely covered in glistening gold.")}
    else if (game.currentFloor == 500) {$("#info").html("<b>Info</b><br>You are at the top of a non-endless stairwell.<br><br>You step out of the doorway into a large, uninhabited forest. Mountains stretch into the distance, and the air smells fresher than anywhere in the stairwell. The long journey is over.")}
    else {$("#info").html("<b>Info</b><br>You are in a seemingly endless stairwell.")}
  
    //Smith floor
    if (game.currentFloor == game.smithFloor) {
      $("#floorContentsInfo").html("This floor has some kind of smithing area. Maybe you'll<br>be able to find some runes to use at it?")
      document.getElementById("enterFloorButton").style.display = "none"
      if (game.currentTip == 2 || game.currentTip == 3) game.currentTip = 4
    }
    //Smith 2 floor
    else if (game.currentFloor == game.smithFloor + 1) {
      $("#floorContentsInfo").html("This floor has some kind of smithing area. Maybe you'll<br>be able to find some runes to use at it?")
      document.getElementById("enterFloorButton").style.display = "none"
      if (game.currentTip == 2 || game.currentTip == 3) game.currentTip = 4
    }
    //Blue door floor
    else if (game.currentFloor == 49) {
      document.getElementById("enterFloorButton").style.display = "block"
      if (game.specialItemsAcquired[0]) {
        document.getElementById("enterFloorButton").disabled = false
        $("#floorContentsInfo").html("This floor has a <span style='color: #303090'>blue door</span> with a keyhole. It seems you have the key for it.")
      }
      else {
        document.getElementById("enterFloorButton").disabled = true
        $("#floorContentsInfo").html("This floor has a <span style='color: #303090'>blue door</span> with a keyhole. It is locked. Maybe if you become stronger you'll be able to gain the key?")
      }
    }
    //Altar floor
    else if (game.currentFloor == 99) {
      $("#floorContentsInfo").html("This floor has some kind of sacrificial altar.")
      document.getElementById("enterFloorButton").style.display = "none"
      document.getElementById("prestigeHotkey").style.display = "block"
      if (game.currentTip == 7) game.currentTip = 8
    }
    //Shark shop floor
    else if (game.currentFloor == 149) {
      $("#floorContentsInfo").html("This floor has some kind of upgrade shop.")
      if (game.sharkCutscenesViewed == 3) {
        $("#sharkText").html("*Dead noises*")
        document.getElementById("shark").src = "img/sharkDead.png"
        document.getElementById("enterFloorButton").style.display = "none"
      }
      else {
        $("#sharkText").html("Woah-oah my GOD, a CUSTOMER! Welcome, welcome! I have things! PLEASE BUY SOMETHING!!!!!!!")
        document.getElementById("shark").src = "img/shark.png"
        document.getElementById("enterFloorButton").style.display = "none"
      }
    }
    //Cocoa bar floor
    else if (game.currentFloor == 151) {
      $("#floorContentsInfo").html("This floor has some kind of ingot forge.")
      document.getElementById("enterFloorButton").style.display = "none"
      if (game.currentTip == 12) game.currentTip = 13
    }
    //Combinator upgrade floor
    else if (game.currentFloor == 151) {
      $("#floorContentsInfo").html("This floor has some kind of ingot forge.")
      document.getElementById("enterFloorButton").style.display = "none"
      if (game.currentTip == 12) game.currentTip = 13
    }
    //Gem eel boss floor
    else if (game.currentFloor == 303) {
      document.getElementById("enterFloorButton").style.display = "block"
      $("#floorContentsInfo").html("This floor has a massive door leading to a large boss room.")
    }
    //Shark 2 floor
    else if (game.currentFloor == 305) {
      $("#floorContentsInfo").html("This floor has some kind of upgrade shop.")
      document.getElementById("enterFloorButton").style.display = "none"
      if (game.sharkCutscenesViewed == 0) {
        document.getElementById("continueButton").style.display = "block"
        document.getElementById("floorUpButton").disabled = true
        document.getElementById("floorDownButton").disabled = true
        document.getElementById("toGroundFloorButton").disabled = true
        document.getElementById("toFloor49Button").disabled = true
        document.getElementById("toFloor99Button").disabled = true
        document.getElementById("toFloor149Button").disabled = true
        document.getElementById("toFloor248Button").disabled = true
        document.getElementById("toFloor299Button").disabled = true
        document.getElementById("toFloor351Button").disabled = true
        $("#sharkText2").html(sharkDialogue1[0])
        game.currentSharkDialogue = 0
        game.inSharkCutscene = true
      }
      else if (game.sharkCutscenesViewed == 1 && game.jellyFought != true) {
        $("#sharkText2").html("I'll be waiting here until you can defeat Jelly!")
        document.getElementById("continueButton").style.display = "none"
      }
      else if (game.sharkCutscenesViewed == 1 && game.jellyFought == true) {
        document.getElementById("continueButton").style.display = "block"
        document.getElementById("floorUpButton").disabled = true
        document.getElementById("floorDownButton").disabled = true
        document.getElementById("toGroundFloorButton").disabled = true
        document.getElementById("toFloor49Button").disabled = true
        document.getElementById("toFloor99Button").disabled = true
        document.getElementById("toFloor149Button").disabled = true
        document.getElementById("toFloor248Button").disabled = true
        document.getElementById("toFloor299Button").disabled = true
        document.getElementById("toFloor351Button").disabled = true
        $("#sharkText2").html(sharkDialogue2[0])
        game.currentSharkDialogue = 0
        game.inSharkCutscene = true
      }
      else if (game.sharkCutscenesViewed == 2 && game.jellyDefeated != true) {
        $("#sharkText2").html("I'll be waiting here until you can defeat Jelly!")
        document.getElementById("continueButton").style.display = "none"
      }
      else if (game.sharkCutscenesViewed == 2 && game.jellyDefeated == true) {
        document.getElementById("continueButton").style.display = "block"
        document.getElementById("floorUpButton").disabled = true
        document.getElementById("floorDownButton").disabled = true
        document.getElementById("toGroundFloorButton").disabled = true
        document.getElementById("toFloor49Button").disabled = true
        document.getElementById("toFloor99Button").disabled = true
        document.getElementById("toFloor149Button").disabled = true
        document.getElementById("toFloor248Button").disabled = true
        document.getElementById("toFloor299Button").disabled = true
        $("#sharkText2").html(sharkDialogue3[0])
        game.currentSharkDialogue = 0
        game.inSharkCutscene = true
      }
      else if (game.sharkCutscenesViewed == 3) {
        $("#sharkText2").html("*Dead noises*")
        document.getElementById("shark2").src = "img/sharkDead.png"
        document.getElementById("continueButton").style.display = "none"
      }
    }
    //Jelly boss floor
    else if (game.currentFloor == 349) {
      if (game.jellyDefeated == true) {document.getElementById("enterFloorButton").style.display = "none"}
      else {document.getElementById("enterFloorButton").style.display = "block"}
      if (game.jellyDefeated == true) {$("#floorContentsInfo").html("This floor has a door leading to an expansive shop. There's no point taking any items, they're all pretty terrible.")}
      else {$("#floorContentsInfo").html("This floor has a door leading to an expansive shop. You can hear some kind of asshole shopkeeper through the door.")}
    }
    //Dark orb floor
    else if (game.currentFloor == -1) {
      $("#floorContentsInfo").html("This floor has an enormous dark room, dimly lit with candles all around. In the middle sits a large, unknown machine.")
      document.getElementById("enterFloorButton").style.display = "none"
    }
    else if (game.floorsWithRooms[0].includes(game.currentFloor) || game.floorsWithRooms[1].includes(game.currentFloor) || game.floorsWithRooms[2].includes(game.currentFloor) || game.floorsWithRooms[3].includes(game.currentFloor) || game.floorsWithRooms[4].includes(game.currentFloor) || game.floorsWithRooms[5].includes(game.currentFloor) || game.floorsWithRooms[6].includes(game.currentFloor) || game.floorsWithRooms[7].includes(game.currentFloor)) {
      document.getElementById("enterFloorButton").disabled = false
      $("#floorContentsInfo").html("This floor has a door leading to a variety of rooms.")
      document.getElementById("enterFloorButton").style.display = "block"
    }
    else {
      $("#floorContentsInfo").html("")
      document.getElementById("enterFloorButton").style.display = "none"
    }
    if (game.currentFloor == game.smithFloor) {document.getElementsByClassName("smithDiv")[0].style.display = "block"}
    else {document.getElementsByClassName("smithDiv")[0].style.display = "none"}
    if (game.currentFloor == game.smithFloor + 1) {document.getElementsByClassName("smithDiv")[1].style.display = "block"}
    else {document.getElementsByClassName("smithDiv")[1].style.display = "none"}
    if (game.currentFloor == 99) {document.getElementById("altarDiv").style.display = "block"}
    else {document.getElementById("altarDiv").style.display = "none"}
    if (game.currentFloor == 149) {document.getElementById("sharkShopDiv").style.display = "block"}
    else {document.getElementById("sharkShopDiv").style.display = "none"}
    if (game.currentFloor == 151) {document.getElementById("cocoaBarDiv").style.display = "block"}
    else {document.getElementById("cocoaBarDiv").style.display = "none"}
    if (game.currentFloor == 248) {document.getElementById("combinatorDiv").style.display = "block"}
    else {document.getElementById("combinatorDiv").style.display = "none"}
    if (game.currentFloor == 249) {document.getElementById("combinatorUpgradeDiv").style.display = "block"}
    else {document.getElementById("combinatorUpgradeDiv").style.display = "none"}
    if (game.currentFloor == 299) {document.getElementById("combinatorUpgrade2Div").style.display = "block"}
    else {document.getElementById("combinatorUpgrade2Div").style.display = "none"}
    if (game.currentFloor == 301) {
      document.getElementById("monsterBloodDiv").style.display = "block"
      if (game.currentTip == 16) game.currentTip = 17
    }
    else {document.getElementById("monsterBloodDiv").style.display = "none"}
    if (game.currentFloor == 302) {document.getElementById("monsterBloodUpgradeDiv").style.display = "block"}
    else {document.getElementById("monsterBloodUpgradeDiv").style.display = "none"}
    if (game.currentFloor == 305) {document.getElementById("shark2Div").style.display = "block"}
    else {document.getElementById("shark2Div").style.display = "none"}
    if (game.currentFloor == 351) {document.getElementById("goldenUpgradeDiv").style.display = "block"}
    else {document.getElementById("goldenUpgradeDiv").style.display = "none"}
    if (game.currentFloor == 499) {
      document.getElementById("goldenEelDiv").style.display = "block"
      if (game.currentTip == 19) game.currentTip = 20
      if (game.goldenEelDefeated == false) {
        game.fightingMonster = true
        game.monsterAttackCooldown = 30
        game.goldenEelHealth = 1e15
      }
      else {
        game.fightingMonster = false
        document.getElementById("goldenEel").src = "img/enemy37dead.png"
        document.getElementById("goldenEelBar").style.display = "none"
        document.getElementById("goldenEelAttackInfo").style.display = "none"
        document.getElementById("goldenEelAttackButton").style.display = "none"
        game.goldenEelHealth = 0
      }
    }
    else {
      document.getElementById("goldenEelDiv").style.display = "none"
      game.fightingMonster = false
    }
    if (game.currentFloor == 500) {
      document.getElementById("endingDiv").style.display = "block"
      if (game.currentTip == 20) game.currentTip = 21
      if (game.finalTime < 10) {
        game.finalTime = game.timePlayed
        timePlayedHours = Math.floor(game.timePlayed / 3600)
        timePlayedMinutes = Math.floor(game.timePlayed / 60) % 60
        timePlayedSeconds = game.timePlayed % 60
        timeString = (timePlayedHours + ":" + ((timePlayedMinutes < 10 ? '0' : '') + timePlayedMinutes) + ":" + ((timePlayedSeconds < 10 ? '0' : '') + timePlayedSeconds))
        $("#finalTime").html("Final time: " + timeString)
      }
    }
    else {document.getElementById("endingDiv").style.display = "none"}
    if (game.currentFloor == -1) {document.getElementById("darkOrbDiv").style.display = "block"}
    else {document.getElementById("darkOrbDiv").style.display = "none"}
  }
}

function openTipHistory() {
  if (document.getElementById("tipHistoryDiv").style.display != "block") {
    document.getElementById("tipHistoryDiv").style.display = "block"
    fillTipHistory()
  }
}

function fillTipHistory() {
  for (i=0; i <= game.currentTip; i++) {
    if (i != 10) {
      if (i < 10) {$("#tipHistory").html(document.getElementById("tipHistory").innerHTML + "<b>" + (i + 1) + ". </b>" + tips[i] + "<br><br><br><br>")}
      else {$("#tipHistory").html(document.getElementById("tipHistory").innerHTML + "<b>" + i + ". </b>" + tips[i] + "<br><br><br><br>")}
    }
  }
}

function closeTipHistory() {
  document.getElementById("tipHistoryDiv").style.display = "none"
  $("#tipHistory").html("")
}

function floorUp() {
  game.currentFloor++
  document.getElementById("floorDownButton").disabled = false
  if (game.currentFloor == 500) {document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"}
  else if (game.currentFloor > 350) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c0a030"}
  else if (game.currentFloor > 304) {document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"}
  else if (game.currentFloor > 300) {document.getElementsByClassName("container")[1].style.backgroundColor = "#905050"}
  else if (game.currentFloor > 250) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c09080"}
  else if (game.currentFloor > 200) {document.getElementsByClassName("container")[1].style.backgroundColor = "#508850"}
  else if (game.currentFloor > 150) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c0b070"}
  else if (game.currentFloor > 100) {document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"}
  else if (game.currentFloor >= 0) {document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"}
  if (game.currentFloor == 50 && game.specialItemsAcquired[1] == false) document.getElementById("floorUpButton").disabled = true
  else if (game.currentFloor >= 100 && game.altarUpgradesBought[6] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 150 && game.sharkUpgradesBought[9] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 200 && game.cocoaBars < 20) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 250 && game.combinatorUpgradesBought[9] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 300 && game.combinatorUpgrades2Bought[10] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 304 && game.monsterBloodUpgradesBought[9] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 350 && game.sharkUpgrades2Bought[6] != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 499 && game.goldenEelDefeated != true) {document.getElementById("floorUpButton").disabled = true}
  else if (game.currentFloor >= 500) {document.getElementById("floorUpButton").disabled = true}
  if (game.currentFloor == 0) {$("#currentFloor").html("the ground floor")}
  else {$("#currentFloor").html("floor " + game.currentFloor)}
  updateInfo()
}

function floorDown() {
  game.currentFloor--
  document.getElementById("floorUpButton").disabled = false
  if (game.currentFloor < 0) {document.getElementsByClassName("container")[1].style.backgroundColor = "#606060"}
  else if (game.currentFloor <= 100) {document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"}
  else if (game.currentFloor <= 150) {document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"}
  else if (game.currentFloor <= 200) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c0b070"}
  else if (game.currentFloor <= 250) {document.getElementsByClassName("container")[1].style.backgroundColor = "#508850"}
  else if (game.currentFloor <= 300) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c09080"}
  else if (game.currentFloor <= 304) {document.getElementsByClassName("container")[1].style.backgroundColor = "#905050"}
  else if (game.currentFloor <= 350) {document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"}
  else if (game.currentFloor < 500) {document.getElementsByClassName("container")[1].style.backgroundColor = "#c0a030"}
  if (game.currentFloor <= 0 && game.cocoaBars < 10 && game.darkOrbs == 0) document.getElementById("floorDownButton").disabled = true
  else if (game.currentFloor <= -1) document.getElementById("floorDownButton").disabled = true
  if (game.currentFloor == 0) {$("#currentFloor").html("the ground floor")}
  else {$("#currentFloor").html("floor " + game.currentFloor)}
  updateInfo()
}

Mousetrap.bind('up', function() {
  if (document.getElementById("floorUpButton").disabled == false) floorUp()
})
Mousetrap.bind('down', function() {
  if (document.getElementById("floorDownButton").disabled == false) floorDown()
})

function enterFloor() {
  document.getElementById("floorContentsInfo").style.display = "none"
  document.getElementById("floorUpButton").style.display = "none"
  document.getElementById("floorDownButton").style.display = "none"
  document.getElementById("enterFloorButton").style.display = "none"
  document.getElementById("newRoomButton").style.display = "block"
  document.getElementById("toStairwellButton").style.display = "block"
  document.getElementsByClassName("container")[0].style.display = "block"
  document.getElementsByClassName("container")[2].style.display = "block"
  document.getElementById("extrasDiv").style.display = "block"

  document.getElementById("toGroundFloorButton").style.display = "none"
  document.getElementById("toFloor49Button").style.display = "none"
  document.getElementById("toFloor99Button").style.display = "none"
  document.getElementById("toFloor149Button").style.display = "none"
  document.getElementById("toFloor248Button").style.display = "none"
  document.getElementById("toFloor299Button").style.display = "none"
  document.getElementById("toFloor351Button").style.display = "none"

  //Sets the floor difficulty based on which floor the player enters
  if (game.currentFloor == 49) {game.floorDifficulty = 6}
  else if (game.currentFloor == 303) {
    game.floorDifficulty = 1
    $("#roomInfo").html("This room has a boss!")
    document.getElementById("roomInfo").style.color = "#800000"
    monsterEncounter()
  }
  else if (game.currentFloor == 349) {
    game.floorDifficulty = 1
    $("#roomInfo").html("This room has a boss!")
    document.getElementById("roomInfo").style.color = "#800000"
    monsterEncounter()
  }
  else {
    for (j=0; j<game.floorsWithRooms.length; j++) {
      for (i=0; i<game.floorsWithRooms[j].length; i++) {
        if (game.currentFloor == game.floorsWithRooms[j][i]) {game.floorDifficulty = i + 1}
      }
    }
  }
  game.roomsExplored++
  game.roomsFromStairwell++
  game.totalDifficulty = ExpantaNum(game.floorDifficulty).add(game.roomsExplored / 100)
  
  if (game.currentFloor > 350) {
    tierMessage = ", tier 8"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. The rooms are completely covered in gold, to the point that it hurts your eyes.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else if (game.currentFloor == 349) {
    tierMessage = ", tier 7.5"
    $("#info").html("<b>Info</b><br>You are in an expansive shop.") 
  }
  else if (game.currentFloor > 304) {
    tierMessage = ", tier 7"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. Every room contains knee-deep water with stairs to the doors, and blue tiled walls.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else if (game.currentFloor == 303) {
    tierMessage = ", tier 6.5"
    $("#info").html("<b>Info</b><br>You are in a large and menacing room.") 
  }
  else if (game.currentFloor > 250) {
    tierMessage = ", tier 6"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. These rooms are beautifully decorated, with rich dark wooden walls and smooth marble floors. Various seats, tables and carpets line the spaces.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else if (game.currentFloor > 200) {
    tierMessage = ", tier 5"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. Instead of rooms, the stairwell's doors open up to a field and paths at night, dotted with street lights and filled with a thick fog. Trees create circles around fields resembling the rooms of the floors below.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else if (game.currentFloor > 150) {
    tierMessage = ", tier 4"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. The place resembles an empty apartment, with various scattered windows giving a view high above some vast city at night. The windows are seemingly unbreakable.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else if (game.currentFloor > 100) {
    tierMessage = ", tier 3"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. Every room contains knee-deep water with stairs to the doors, and blue tiled walls.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else if (game.currentFloor > 50) {
    tierMessage = ", tier 2"
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. They contain a variety of office furniture, with some bland paintings on the walls.<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")
  }
  else {
    tierMessage = ""
    $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms. They all contain the same beige carpet, and are sparingly littered with furniture. It feels like something's in here with you...<br><br>You have explored 1 room. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".") 
  }
}

function newRoom() {
  game.roomsExplored++
  if (Math.floor(Math.random() * Math.min(game.roomsExplored - 1, 30)) == 0) {game.roomsFromStairwell++}
  game.totalDifficulty = ExpantaNum(game.floorDifficulty).add(game.roomsExplored / 100)
  if (game.currentFloor > 250 && game.currentFloor <= 300 && game.totalDifficulty.gt(5) && game.combinatorUpgrades2Bought[5] != true) game.totalDifficulty = ExpantaNum(5)
  $("#info").html("<b>Info</b><br>You are in an endless expanse of rooms.<br><br>You have explored " + game.roomsExplored + " rooms. You are " + game.roomsFromStairwell + " rooms away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")

  roomCheck()
}

function toStairwell() {
  if (game.roomsFromStairwell <= 1) {
    game.roomsExplored = 0
    game.roomsFromStairwell = 0
    game.returningToStairwell = false
    game.health = game.maxHealth
    game.timeSinceAttack = 20
    $("#roomInfo").html("")
    if (game.altarUpgradesBought[6] == true) {
      game.energy = 100
      game.waitingForEnergy = false
    }
    else if (game.waitingForEnergy == true) {
      game.energy = 1
      game.waitingForEnergy = false
    }
    updateInfo()
    document.getElementById("newRoomButton").style.display = "none"
    document.getElementById("newRoomButton").disabled = false
    document.getElementById("toStairwellButton").style.display = "none"
    document.getElementById("floorContentsInfo").style.display = "block"
    document.getElementById("floorUpButton").style.display = "block"
    document.getElementById("floorDownButton").style.display = "block"
    if (game.currentFloor == 349 && game.jellyDefeated == true) {document.getElementById("enterFloorButton").style.display = "none"}
    else {document.getElementById("enterFloorButton").style.display = "block"}

    if (game.altarUpgradesBought[4] == true) {
      document.getElementById("toGroundFloorButton").style.display = "block"
      document.getElementById("toFloor49Button").style.display = "block"
      document.getElementById("toFloor99Button").style.display = "block"
    }
    if (game.sharkUpgradesBought[2] == true) {
      document.getElementById("toFloor149Button").style.display = "block"
    }
    if (game.combinatorUpgradesBought[2] == true) {
      document.getElementById("toFloor248Button").style.display = "block"
    }
    if (game.combinatorUpgrades2Bought[4] == true) {
      document.getElementById("toFloor299Button").style.display = "block"
    }
    if (game.goldenUpgradesBought[0] == true) {
      document.getElementById("toFloor351Button").style.display = "block"
    }
  }
  else {
    game.roomsFromStairwell--
    game.returningToStairwell = true
    document.getElementById("newRoomButton").disabled = true
    if (game.roomsFromStairwell != 1) {$("#info").html("<b>Info</b><br>You are in an endless expanse of rooms.<br><br>You have explored " + game.roomsExplored + " rooms. You are " + game.roomsFromStairwell + " rooms away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")}
    else {$("#info").html("<b>Info</b><br>You are in an endless expanse of rooms.<br><br>You have explored " + game.roomsExplored + " rooms. You are 1 room away from the stairwell. This floor's difficulty is " + game.floorDifficulty + tierMessage + ".")}
  
    roomCheck()
  }
}

function roomCheck() {
  if (Math.floor(Math.random() * 100) >= 92) {
    $("#roomInfo").html("This room has a monster!")
    document.getElementById("roomInfo").style.color = "#800000"
    monsterEncounter()
  }
  else if (Math.floor(Math.random() * 100) >= (Math.min(8 + (8 * Math.floor(game.roomsExplored / 100)), 32) + (game.greenPermanentBought * 5)) * (1 + (game.buffTimes[1] > 0) * 0.4)) {
    $("#roomInfo").html("")
    document.getElementById("roomInfo").style.color = "black"
  }
  else {
    $("#roomInfo").html("This room contains an item!")
    document.getElementById("roomInfo").style.color = "#006000"
    randomItem()
  }
}

function monsterEncounter() {
  document.getElementById("newRoomButton").disabled = true
  document.getElementById("toStairwellButton").disabled = true

  if (game.currentTip == 0) game.currentTip = 1

  //Monster type
  game.fightingMonster = true
  if (game.monstersKilled == 0 && game.currentFloor <= 50) {monsterType = 1}
  else if (game.currentFloor <= 50) {monsterType = Math.ceil(Math.random() * 4)}
  else if (game.currentFloor <= 100) {monsterType = Math.ceil(Math.random() * 4) + 4}
  else if (game.currentFloor <= 150) {monsterType = Math.ceil(Math.random() * 4) + 8}
  else if (game.currentFloor <= 200) {monsterType = Math.ceil(Math.random() * 4) + 12}
  else if (game.currentFloor <= 250) {monsterType = Math.ceil(Math.random() * 4) + 16}
  else if (game.currentFloor <= 300) {monsterType = Math.ceil(Math.random() * 4) + 20}
  else if (game.currentFloor == 303) {monsterType = 25}
  else if (game.currentFloor <= 348) {monsterType = Math.ceil(Math.random() * 4) + 25}
  else if (game.currentFloor == 349) {monsterType = 30}
  else if (game.currentFloor <= 498) {monsterType = Math.ceil(Math.random() * 6) + 30}
  document.getElementById("monsterIcon").src = "img/enemy" + monsterType + ".png"
  document.getElementById("monsterName").innerHTML = monsters[monsterType - 1].name

  //Monster health
  if (game.currentFloor > 350) {game.monsterMaxHealth = ExpantaNum.expansion(11,Math.ceil(10 ** (game.totalDifficulty - 1) * (Math.random() + 1)))}
  else if (game.currentFloor == 349) {
    game.monsterMaxHealth = ExpantaNum("JJ10000")
    game.jellyFought = true
  }
  else if (game.currentFloor > 304) {game.monsterMaxHealth = ExpantaNum("J" + ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.6)).sub(2).floor())(10,(Math.random() * 8 + 2)))}
  else if (game.currentFloor == 303) {game.monsterMaxHealth = ExpantaNum(gemEelLevels[game.gemEelsBeaten])}
  else if (game.currentFloor > 250) {game.monsterMaxHealth = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.7)).floor())(10,(Math.random() * 8 + 2)).mul("10^^10")}
  else if (game.currentFloor > 200) {game.monsterMaxHealth = ExpantaNum(10).pent(ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1.3))))}
  else if (game.currentFloor > 150) {game.monsterMaxHealth = ExpantaNum(10).tetr(ExpantaNum(monsters[monsterType - 1].health).mul(Math.random() * 0.2 + 0.8).mul(game.totalDifficulty).sub(6))}
  else if (game.currentFloor > 100) {game.monsterMaxHealth = ExpantaNum(10).pow(ExpantaNum(10).pow(monsters[monsterType - 1].health ** (ExpantaNum(Math.random()).mul(0.25).sub(0.2).add(game.totalDifficulty))))}
  else if (game.currentFloor > 50) {game.monsterMaxHealth = monsters[monsterType - 1].health.mul(ExpantaNum(1.5).pow(game.totalDifficulty.mul(3).sub(1))).floor()}
  else {game.monsterMaxHealth = monsters[monsterType - 1].health.mul(ExpantaNum(1.5).pow(game.totalDifficulty.sub(1))).floor()}
  game.monsterHealth = game.monsterMaxHealth
  if (game.currentFloor > 100) {$("#monsterHealthBarText").html(format(game.monsterHealth, 0))}
  else {$("#monsterHealthBarText").html(format(game.monsterHealth, 0) + "/" + format(game.monsterMaxHealth, 0))}
  document.getElementById("monsterHealthBarInner").style.width = format(game.monsterHealth.div(game.monsterMaxHealth).mul(100), 1) + "%"
  
  //Monster damage
  if (game.currentFloor > 100) {$("#monsterDamage").html(format(game.monsterMaxHealth), 0)}
  else if (game.currentFloor > 50) {$("#monsterDamage").html(format((monsters[monsterType - 1].damage.mul(ExpantaNum(1.2).pow(game.totalDifficulty.mul(3).sub(1))).floor()), 0))}
  else {$("#monsterDamage").html(format((monsters[monsterType - 1].damage.mul(ExpantaNum(1.3).pow(game.totalDifficulty.sub(1))).floor()), 0))}
  if (game.altarUpgradesBought[3] == true) {game.monsterAttackCooldown = 4.5}
  else {game.monsterAttackCooldown = 3}

  document.getElementById("monsterDiv").style.display = "block"
}

function randomItem() {
  if (Math.floor(Math.random() * 100) >= 25) {
    if (Math.floor(Math.random() * 3) == 0) {
      game.runeFragments[0]++
      $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: #b00000'>+1 red rune fragment</span>")
    }
    else if (Math.floor(Math.random() * 2) == 0) {
      game.runeFragments[1]++
      $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: #00b000'>+1 green rune fragment</span>")
    }
    else {
      game.runeFragments[2]++
      $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: #0000b0'>+1 blue rune fragment</span>")
    }
  }
  else if (Math.floor(Math.random() * 100) >= 40) {
    if (game.darkOrbs >= 4) {game.honey = game.honey.add(1e10 * 2 ** game.cocoaBars)}
    else if (game.darkOrbs >= 3) {game.honey = game.honey.add(10000 * 2 ** game.cocoaBars)}
    else if (game.darkOrbs >= 2) {game.honey = game.honey.add(100 * 2 ** game.cocoaBars)}
    else if (game.darkOrbs >= 1) {game.honey = game.honey.add(10 * 2 ** game.cocoaBars)}
    else {game.honey = game.honey.add(1)}
    $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: #e8a830'>+1 honey</span>")
    $("#honey").html(format(game.honey, 0))
  }
  else {
    if (game.currentFloor == 49 && game.specialItemsAcquired[1] != true) {
      game.specialItemsAcquired[1] = true
      document.getElementById("ringIcon").style.display = "block"
      document.getElementById("fleeButton").style.display = "block"
      $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: gold'>+1 lucky ring</span>")
      if (game.currentTip == 6) game.currentTip = 7
    }
    else if (game.level.gte(15) && game.specialItemsAcquired[0] != true) {
      game.specialItemsAcquired[0] = true
      document.getElementById("blueKeyIcon").style.display = "block"
      $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: #303090'>+1 blue key</span>")
      if (game.currentTip == 5) game.currentTip = 6
    }    
    else {
      if (game.darkOrbs >= 4) {game.vanillaHoney = game.vanillaHoney.add(1e10 * 2 ** game.cocoaBars)}
      else if (game.darkOrbs >= 3) {game.vanillaHoney = game.vanillaHoney.add(10000 * 2 ** game.cocoaBars)}
      else if (game.darkOrbs >= 2) {game.vanillaHoney = game.vanillaHoney.add(100 * 2 ** game.cocoaBars)}
      else if (game.darkOrbs >= 1) {game.vanillaHoney = game.vanillaHoney.add(10 * 2 ** game.cocoaBars)}
      else {game.vanillaHoney = game.vanillaHoney.add(1)}
      $("#roomInfo").html(document.getElementById("roomInfo").innerHTML + "<br><span style='color: #e8c070'>+1 vanilla honey</span>")
      $("#vanillaHoney").html(format(game.vanillaHoney, 0))
    }
  }
}

function attack() {
  if (game.energy > 0) {
    game.energy = Math.max(Math.round(game.energy - (4 + 20 / game.timeSinceAttack)), 0)
    game.timeSinceAttack = 1
    if (game.currentFloor == 349 && game.sharkCutscenesViewed == 2) {game.monsterHealth = ExpantaNum(0)}
    else {game.monsterHealth = game.monsterHealth.sub(game.attackDamage)}
    if (game.monsterHealth.lt(0)) game.monsterHealth = ExpantaNum(0)
    if (game.currentFloor > 100) {$("#monsterHealthBarText").html(format(game.monsterHealth, 0))}
    else {$("#monsterHealthBarText").html(format(game.monsterHealth, 0) + "/" + format(game.monsterMaxHealth, 0))}
    document.getElementById("monsterHealthBarInner").style.width = format(game.monsterHealth.div(game.monsterMaxHealth).mul(100), 1) + "%"
    if (game.monsterHealth.lte(0)) battleWin()
  }
}

function attackTimeIncrease() {
  if (game.fightingMonster == true) {
    if (game.timeSinceAttack < 20) game.timeSinceAttack += 0.2
    if (game.timeSinceAttack > 20) game.timeSinceAttack = 20
  }
}

setInterval(attackTimeIncrease, 100)

function energyUp() {
  if (game.waitingForEnergy == false) {
    if (game.energy < 100 && game.energy > 0) {
      if (game.roomsExplored == 0) {game.energy += 1.6 * (1 + (game.buffTimes[2] > 0) * 0.75) * (1 + (game.bluePermanentBought * 0.1))}
      else {game.energy = game.energy + 0.8 * (1 + (game.buffTimes[2] > 0) * 0.75) * (1 + (game.bluePermanentBought * 0.1)) * 0.99 ** Math.max(game.roomsExplored - 100, 0)}
      if (game.energy > 100) game.energy = 100
    }
    else if (game.energy == 0) {
      game.waitingForEnergy = true
      setTimeout(function() {if (game.energy == 0) {game.energy = 1; game.waitingForEnergy = false}}, (2000 * 1.005 ** Math.max(game.roomsExplored - 100, 0)))
    }
  }
}

setInterval(energyUp, 100)

function monsterAttack() {
  if (game.fightingMonster == true) {
    if (game.monsterAttackCooldown >= 0.1) {
      game.monsterAttackCooldown = Math.max(game.monsterAttackCooldown - 0.1, 0)
    }
    else {
      if (game.currentFloor == 499) {
        floorDown()
        battleLose()
      }
      else {
        game.monsterAttackCooldown = 1.5
        if (game.currentFloor > 100) {game.health = game.health.sub(game.monsterMaxHealth).floor()}
        else if (game.currentFloor > 50) {game.health = game.health.sub(monsters[monsterType - 1].damage.mul(ExpantaNum(1.2).pow(game.totalDifficulty.mul(3).sub(1))).floor())}
        else {game.health = game.health.sub(monsters[monsterType - 1].damage.mul(ExpantaNum(1.3).pow(game.totalDifficulty.sub(1))).floor())}
        if (game.health.lt(0)) game.health = ExpantaNum(0)
        if (game.health.eq(0)) battleLose()
      }
    }
    $("#monsterAttackCooldown").html(game.monsterAttackCooldown.toFixed(1))
  }
}

setInterval(monsterAttack, 100)

//Winning the battle
function battleWin() {
  if (game.currentFloor <= 100) {xpToGet = game.monsterMaxHealth.div(10).pow(1.3).mul(cocoaBoost)}
  else if (game.currentFloor <= 150) {xpToGet = game.monsterMaxHealth.log().pow(0.4).mul(cocoaBoost)}
  else if (game.currentFloor <= 200) {
    if (game.cocoaBars >= 15) {xpToGet = game.monsterMaxHealth.tetr(ExpantaNum(500).mul(game.totalDifficulty.div(2).add(0.5)))}
    else if (game.cocoaBars >= 13) {xpToGet = game.monsterMaxHealth.tetr(ExpantaNum(100).mul(game.totalDifficulty.div(2).add(0.5)))}
    else if (game.cocoaBars >= 11) {xpToGet = game.monsterMaxHealth.tetr(ExpantaNum(25).mul(game.totalDifficulty.div(2).add(0.5)))}
    else {xpToGet = game.monsterMaxHealth.tetr(ExpantaNum(6).mul(game.totalDifficulty.div(2).add(0.5)))}
    if (game.darkOrbs >= 2) xpToGet = xpToGet.tetr(game.totalDifficulty.mul(15))
    if (game.cocoaBars >= 16) xpToGet = xpToGet.tetr(game.totalDifficulty.mul(20 ** (game.cocoaBars - 13)))
  }
  else if (game.currentFloor <= 250) {
    xpToGet = game.monsterMaxHealth.pent((ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1)).mul(1.2).mul(game.darkBars * 0.1 + 1))).ceil())
    if (game.darkOrbs >= 4) xpToGet = xpToGet.pent((ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1)).mul(0.8))).ceil())
  }
  else if (game.currentFloor <= 300) {
    if (game.combinatorUpgrades2Bought[9] == true) {xpToGet = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(25).mul(1 + (game.cocoaBars >= 26) * 0.2).mul(1 + (game.cocoaBars >= 30) * 1000).mul(game.starBars).mul(game.monsterBlood.add(1)).pow(game.darkOrbs).floor())(10,(Math.random() * 8 + 2))}
    else if (game.combinatorUpgrades2Bought[7] == true) {xpToGet = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(25).mul(1 + (game.cocoaBars >= 26) * 0.2).mul(1 + (game.cocoaBars >= 30) * 1000).mul(game.starBars).floor())(10,(Math.random() * 8 + 2))}
    else if (game.combinatorUpgrades2Bought[3] == true) {xpToGet = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(25).mul(1 + (game.cocoaBars >= 26) * 0.2).mul(1 + (game.cocoaBars >= 30) * 1000).floor())(10,(Math.random() * 8 + 2))}
    else if (game.combinatorUpgrades2Bought[2] == true) {xpToGet = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(5).mul(1 + (game.cocoaBars >= 26) * 0.2).mul(1 + (game.cocoaBars >= 30) * 1000).floor())(10,(Math.random() * 8 + 2))}
    else if (game.combinatorUpgrades2Bought[1] == true) {xpToGet = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(2).mul(1 + (game.cocoaBars >= 26) * 0.2).mul(1 + (game.cocoaBars >= 30) * 1000).floor())(10,(Math.random() * 8 + 2))}
    else {xpToGet = ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(1 + (game.cocoaBars >= 26) * 0.2).mul(1 + (game.cocoaBars >= 30) * 1000).floor())(10,(Math.random() * 8 + 2))}
  }
  else if (game.currentFloor == 303) {xpToGet = ExpantaNum(0)}
  else if (game.currentFloor > 304 && game.currentFloor <= 348) {
    if (game.sharkUpgrades2Bought[5] == true) {xpToGet = ExpantaNum("JJ" + ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(game.bloodGems ** 2).floor())(10,(Math.random() * 8 + 2)))}
    else if (game.sharkUpgrades2Bought[4] == true) {xpToGet = ExpantaNum("JJ" + ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).mul(game.bloodGems).floor())(10,(Math.random() * 8 + 2)))}
    else if (game.sharkUpgrades2Bought[3] == true) {xpToGet = ExpantaNum("JJ" + ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).floor())(10,(Math.random() * 8 + 2)))}
    else if (game.sharkUpgrades2Bought[2] == true) {xpToGet = ExpantaNum("J" + ExpantaNum.hyper(ExpantaNum(10).pent(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).floor()))(10,(Math.random() * 8 + 2)))}
    else if (game.sharkUpgrades2Bought[1] == true) {xpToGet = ExpantaNum("J" + ExpantaNum.hyper(ExpantaNum(10).tetr(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).floor()))(10,(Math.random() * 8 + 2)))}
    else {xpToGet = ExpantaNum("J" + ExpantaNum.hyper(monsters[monsterType - 1].health.mul(game.totalDifficulty.sub(0.3)).floor())(10,(Math.random() * 8 + 2)).mul(game.monsterBlood))}
  }
  else if (game.currentFloor == 349) {xpToGet = ExpantaNum(0)}
  else if (game.currentFloor > 350) {xpToGet = game.monsterMaxHealth}

  xpToGet = xpToGet.mul(1 + (game.redPermanentBought * 0.05))
  if (game.level.lte(10) && (game.cocoaHoney.eq(0) || game.altarUpgradesBought[0] == true)) xpToGet = xpToGet.mul(ExpantaNum(1).add(ExpantaNum(10).sub(game.level).mul(0.05)))
  if (game.buffTimes[0] > 0) xpToGet = xpToGet.mul(1.75)
  if (game.darkOrbs >= 4) xpToGet = xpToGet.mul(5000)
  else if (game.darkOrbs >= 3) xpToGet = xpToGet.mul(500)
  else if (game.darkOrbs >= 2) xpToGet = xpToGet.mul(100)
  else if (game.darkOrbs >= 1) xpToGet = xpToGet.mul(25)
  if (game.xp.add(xpToGet).gte(4980021) && game.sharkUpgradesBought[0] != true) {
    xpToGet = xpToGet.pow(0.9).div(5)
    $("#XPSoftcap").html(" (softcapped)")
  }
  else {
    $("#XPSoftcap").html("")
  }
  game.xp = game.xp.add(xpToGet).ceil()
  game.level = game.xp.div(20).pow(0.5).add(1).floor()

  game.maxHealth = ExpantaNum(100).mul(ExpantaNum(1.1).pow(game.level.sub(1))).floor()
  if (game.health.gt(game.maxHealth)) game.health = game.maxHealth
  $("#healthBarText").html(format(game.health, 0) + "/" + format(game.maxHealth, 0))
  document.getElementById("healthBarInner").style.width = game.health.div(game.maxHealth).mul(100).toNumber() + "%"
  if (game.sharkUpgradesBought[8] == true) game.health = game.maxHealth

  if (game.level.gte(10) && (game.currentTip == 2 || game.currentTip == 3 || game.currentTip == 4)) game.currentTip = 5

  honeyplasmToGet = ExpantaNum(1)
  if (game.sharkUpgradesBought[3] == true) honeyplasmToGet = honeyplasmToGet.mul(game.vanillaHoney.add(1))
  if (game.darkOrbs >= 4) honeyplasmToGet = honeyplasmToGet.mul(1e10)
  else if (game.darkOrbs >= 3) honeyplasmToGet = honeyplasmToGet.mul(10000)
  else if (game.darkOrbs >= 2) honeyplasmToGet = honeyplasmToGet.mul(100)
  else if (game.darkOrbs >= 1) honeyplasmToGet = honeyplasmToGet.mul(10)
  if (game.currentFloor > 100 && Math.floor(Math.random() * 100) < Math.min(15 + (Math.floor(game.roomsExplored / 20)), 40) * (game.floorDifficulty / 4 + 0.75)) game.honeyplasm = game.honeyplasm.add(honeyplasmToGet)

  if (game.currentFloor > 100 && game.sharkUpgradesBought[4] == true) {
    if (game.darkOrbs >= 4) {game.honey = game.honey.add(1e10 * 2 ** game.cocoaBars)}
    else if (game.darkOrbs >= 3) {game.honey = game.honey.add(10000 * 2 ** game.cocoaBars)}
    else if (game.darkOrbs >= 2) {game.honey = game.honey.add(100 * 2 ** game.cocoaBars)}
    else if (game.darkOrbs >= 1) {game.honey = game.honey.add(10 * 2 ** game.cocoaBars)}
    else {game.honey = game.honey.add(1)}
  }

  if (game.combinatorUpgradesBought[1] == true && game.currentFloor > 200 && game.currentFloor <= 250) {
    if (game.combinatorUpgradesBought[6] == true) {
      game.honey = game.honey.add(ExpantaNum(10).pow(ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1)).pow(game.starBars + 1))))
      game.honeyplasm = game.honeyplasm.add(ExpantaNum(10).pow(ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1)).pow(game.starBars + 1))))
    }
    else {
      game.honey = game.honey.add(ExpantaNum(10).pow(ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1)))))
      game.honeyplasm = game.honeyplasm.add(ExpantaNum(10).pow(ExpantaNum(20).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1)))))
    }
  }
  if (game.combinatorUpgrades2Bought[0] == true && game.currentFloor > 250 && game.currentFloor <= 300) {
    game.hyperplasm = game.hyperplasm.add(game.monsterMaxHealth)
  }
  else if (game.combinatorUpgradesBought[8] == true && game.currentFloor > 200 && game.currentFloor <= 250) {
    game.hyperplasm = game.hyperplasm.add(ExpantaNum(1.01).pow(monsters[monsterType - 1].health.pow(game.totalDifficulty.sub(1))))
  }

  if (game.combinatorUpgrades2Bought[8] == true && game.currentFloor > 250 && game.currentFloor <= 300 && Math.floor(Math.random() * 10) == 0) {game.darkBars += Math.ceil(Math.random() * 3)}
  else if (game.combinatorUpgrades2Bought[6] == true && game.currentFloor > 250 && game.currentFloor <= 300 && Math.floor(Math.random() * 10) == 0) {game.darkBars++}

  if (game.currentFloor > 350 && (Math.floor(Math.random() * 8) == 0 || game.goldenUpgradesBought[4] == true)) {
    if (game.goldenUpgradesBought[8] == true) {game.goldenHoney += Math.floor(200000 * Math.log(game.goldenHoney) * game.bloodGems * game.floorDifficulty)}
    else if (game.goldenUpgradesBought[7] == true) {game.goldenHoney += Math.floor(8 * Math.log(game.goldenHoney) * game.bloodGems * game.floorDifficulty)}
    else if (game.goldenUpgradesBought[6] == true) {game.goldenHoney += Math.floor(8 * Math.log(game.goldenHoney) * game.bloodGems)}
    else if (game.goldenUpgradesBought[5] == true) {game.goldenHoney += Math.floor(8 * Math.log(game.goldenHoney))}
    else if (game.goldenUpgradesBought[3] == true) {game.goldenHoney += 8}
    else if (game.goldenUpgradesBought[2] == true) {game.goldenHoney += 4}
    else if (game.goldenUpgradesBought[1] == true) {game.goldenHoney += 2}
    else {game.goldenHoney++}
  }
  if (game.goldenHoney > 1e14) game.goldenHoney = 1e14

  game.fightingMonster = false
  game.monsterAttackCooldown = 3
  game.monstersKilled++
  $("#roomInfo").html("")
  if (game.currentTip == 1) game.currentTip = 2

  document.getElementById("monsterDiv").style.display = "none"
  document.getElementById("toStairwellButton").disabled = false
  if (game.returningToStairwell == false) {
    document.getElementById("newRoomButton").disabled = false
  }
  if (game.currentFloor == 349) {
    game.jellyDefeated = true
    toStairwell()
  }
  else if (game.currentFloor == 303) {
    toStairwell()
    game.gemEelsBeaten++
    game.bloodGems += game.gemEelsBeaten
  }
}

//Losing the battle
function battleLose() {
  game.deaths++
  if (game.deaths > 1) {
    if (game.currentFloor > 100) {game.xp = game.xp.pow(0.5).ceil()}
    else if (game.currentFloor > 50) {game.xp = game.xp.div(2.5).ceil()}
    else {game.xp = game.xp.div(1.5).ceil()}
  }
  if (game.deaths == 1) {$("#deathInfo").html("Since this is your first time, you won't be punished. But next time you'll lose XP, so be careful!")}
  else {$("#deathInfo").html("You've lost some of your XP.<br>This box is way too big for this message.")}

  game.fightingMonster = false
  game.monsterAttackCooldown = 3
  game.roomsExplored = 0
  game.roomsFromStairwell = 0
  game.returningToStairwell = false
  game.health = game.maxHealth
  $("#roomInfo").html("")
  if (game.altarUpgradesBought[6] == true) {
    game.energy = 100
    game.waitingForEnergy = false
  }
  else if (game.waitingForEnergy == true) {
    game.energy = 1
    game.waitingForEnergy = false
  }
  updateInfo()
  if (game.currentTip == 1) game.currentTip = 3
  document.getElementById("monsterDiv").style.display = "none"
  document.getElementById("newRoomButton").style.display = "none"
  document.getElementById("newRoomButton").disabled = false
  document.getElementById("toStairwellButton").style.display = "none"
  document.getElementById("toStairwellButton").disabled = false
  document.getElementById("floorContentsInfo").style.display = "block"
  document.getElementById("floorUpButton").style.display = "block"
  document.getElementById("floorDownButton").style.display = "block"
  if (game.currentFloor != 498) document.getElementById("enterFloorButton").style.display = "block"
  document.getElementById("deathDiv").style.display = "block"

  if (game.altarUpgradesBought[4] == true) {
    document.getElementById("toGroundFloorButton").style.display = "block"
    document.getElementById("toFloor49Button").style.display = "block"
    document.getElementById("toFloor99Button").style.display = "block"
  }
  if (game.sharkUpgradesBought[2] == true) {
    document.getElementById("toFloor149Button").style.display = "block"
  }
  if (game.combinatorUpgradesBought[2] == true) {
    document.getElementById("toFloor248Button").style.display = "block"
  }
  if (game.combinatorUpgrades2Bought[4] == true) {
    document.getElementById("toFloor299Button").style.display = "block"
  }
  if (game.goldenUpgradesBought[0] == true) {
    document.getElementById("toFloor351Button").style.display = "block"
  }
}

function flee() {
  if (game.fleeCooldown == 0) {
    if (game.altarUpgradesBought[6] != true) {game.fleeCooldown = 30}
    else {game.fleeCooldown = 4}
    game.fightingMonster = false
    game.monsterAttackCooldown = 3
    $("#roomInfo").html("")

    document.getElementById("monsterDiv").style.display = "none"
    document.getElementById("toStairwellButton").disabled = false
    if (game.returningToStairwell == false) {
      document.getElementById("newRoomButton").disabled = false
    }
    if (game.currentFloor == 303 || game.currentFloor == 349) {
      toStairwell()
    }
  }
}

setInterval(function() {if (game.fleeCooldown > 0) game.fleeCooldown--}, 1000)

function deathClose () {document.getElementById("deathDiv").style.display = "none"}

function consumeHoney(x) {
  if (x == 1 && game.honey.gt(0) && game.health.lt(game.maxHealth)) {
    game.honey = game.honey.sub(1)
    game.health = game.health.add(game.maxHealth.div(4)).ceil()
    if (game.health.gt(game.maxHealth)) game.health = game.maxHealth
  }
  else if (x == 2 && game.vanillaHoney.gt(0) && game.energy < 100) {
    game.vanillaHoney = game.vanillaHoney.sub(1)
    game.waitingForEnergy = false
    game.energy = Math.ceil(game.energy + (50 * 0.99 ** Math.max(game.roomsExplored - 100, 0)))
    if (game.energy > 100) game.energy = 100
  }
}

function cocoaPrestige() {
  if (cocoaHoneyToGet.gt(0)) {
    if (cocoaHoneyToGet.gte(100) || confirm("Are you sure you want to reset all your progress?")) {
      game.cocoaHoney = game.cocoaHoney.add(cocoaHoneyToGet)
      cocoaReset()
    }
  }
}

function smithRune(x) {
  if (x==1 && game.runeFragments[0] >= 3 && game.runeFragments[1] >= 1 && game.honey.gte(1)) {
    game.runeFragments[0] -= 3
    game.runeFragments[1] -= 1
    game.honey = game.honey.sub(1)
    if (game.buffTimes[0] == 0) setTimeout(buffDown1, 1000)
    game.buffTimes[0] = Math.min(game.buffTimes[0] + 45, 300)
  }
  else if (x==2 && game.runeFragments[1] >= 3 && game.runeFragments[2] >= 1 && game.honey.gte(1)) {
    game.runeFragments[1] -= 3
    game.runeFragments[2] -= 1
    game.honey = game.honey.sub(1)
    if (game.buffTimes[1] == 0) setTimeout(buffDown2, 1000)
    game.buffTimes[1] = Math.min(game.buffTimes[1] + 45, 300)
  }
  else if (x==3 && game.runeFragments[2] >= 3 && game.runeFragments[0] >= 1 && game.honey.gte(1)) {
    game.runeFragments[2] -= 3
    game.runeFragments[0] -= 1
    game.honey = game.honey.sub(1)
    if (game.buffTimes[2] == 0) setTimeout(buffDown3, 1000)
    game.buffTimes[2] = Math.min(game.buffTimes[2] + 45, 300)
  }
}

function smithPermaRune(x) {
  if (x==1 && game.runeFragments[0] >= 4 && game.honey.gte(1) && game.redPermanentBought < 10) {
    game.runeFragments[0] -= 4
    game.honey = game.honey.sub(1)
    game.redPermanentBought++
    $("#redPermanentBought").html(game.redPermanentBought)
    $("#redPermanentBoost").html(game.redPermanentBought * 5)
  }
  else if (x==2 && game.runeFragments[1] >= 4 && game.honey.gte(1) && game.greenPermanentBought < 5) {
    game.runeFragments[1] -= 4
    game.honey = game.honey.sub(1)
    game.greenPermanentBought++
    $("#greenPermanentBought").html(game.greenPermanentBought)
    $("#greenPermanentBoost").html(game.greenPermanentBought * 5)
  }
  else if (x==3 && game.runeFragments[2] >= 4 && game.honey.gte(1) && game.bluePermanentBought < 5) {
    game.runeFragments[2] -= 4
    game.honey = game.honey.sub(1)
    game.bluePermanentBought++
    $("#bluePermanentBought").html(game.bluePermanentBought)
    $("#bluePermanentBoost").html(game.bluePermanentBought * 10)
  }
}

function buffDown1() {
  if (game.buffTimes[0] > 0) {
    game.buffTimes[0]--
    setTimeout(buffDown1, 1000)
  }
}

function buffDown2() {
  if (game.buffTimes[1] > 0) {
    game.buffTimes[1]--
    setTimeout(buffDown2, 1000)
  }
}

function buffDown3() {
  if (game.buffTimes[2] > 0) {
    game.buffTimes[2]--
    setTimeout(buffDown3, 1000)
  }
}

function cocoaReset() {
  document.getElementById("cocoaDiv").style.display = "block"
  if (game.cocoaHoney.gte(5) && (game.currentTip == 9 || game.currentTip == 10)) game.currentTip = 11
  if (game.currentTip == 8) {
    if (Math.floor(Math.random() * 100) == 0) {game.currentTip = 10}
    else {game.currentTip = 9}
  }
  cocoaBoost = ExpantaNum(4).pow(game.cocoaHoney.pow(0.8))
  document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"

  game.currentFloor = 0

  if (game.altarUpgradesBought[5] != true) game.specialItemsAcquired = [false, false]

  game.roomsExplored = 0
  game.roomsFromStairwell = 0
  game.returningToStairwell = false
  game.floorDifficulty = 0
  game.totalDifficulty = ExpantaNum(0)
  game.fightingMonster = false
  game.monsterType = 0
  game.monsterHealth = ExpantaNum(100)
  game.monsterMaxHealth = ExpantaNum(100)
  game.monsterAttackCooldown = 3
  game.timeSinceAttack = 20
  game.waitingForEnergy = false

  game.monstersKilled = 0

  if (game.cocoaBars >= 5 || game.darkOrbs >= 3) {game.xp = cocoaBoost}
  else if (game.cocoaBars >= 2) {game.xp = ExpantaNum(10000000)}
  else if (game.cocoaBars >= 1) {game.xp = ExpantaNum(500000)}
  else if (game.altarUpgradesBought[0] == true) {game.xp = ExpantaNum(5000)}
  else {game.xp = ExpantaNum(0)}

  game.level = game.xp.div(20).pow(0.5).add(1).floor()
  game.maxHealth = ExpantaNum(100).mul(ExpantaNum(1.1).pow(game.level.sub(1))).floor()
  game.health = game.maxHealth
  game.energy = 100
  game.attackDamage = ExpantaNum(10)
  if (game.sharkUpgradesBought[6] != true) game.honey = ExpantaNum(0)
  if (game.sharkUpgradesBought[7] != true) game.vanillaHoney = ExpantaNum(0)

  game.fleeCooldown = 0
  if (game.altarUpgradesBought[1] != true && game.altarUpgradesBought[5] != true) document.getElementById("fleeButton").style.display = "none"

  game.runeFragments = [0, 0, 0]
  game.smithFloor = 0
  game.buffTimes = [0, 0, 0]

  fillFloorsWithRooms()

  updateInfo()
  if (game.cocoaBars < 10 && game.darkOrbs == 0) document.getElementById("floorDownButton").disabled = true
  else {document.getElementById("floorDownButton").disabled = false}
  $("#currentFloor").html("the ground floor")
  if (game.altarUpgradesBought[5] != true) {
    document.getElementById("blueKeyIcon").style.display = "none"
    document.getElementById("ringIcon").style.display = "none"
  }
  $("#XPSoftcap").html("")
}

function fillFloorsWithRooms() {
  game.floorsWithRooms = [[],[],[],[],[],[],[],[]]
  if (game.floorsWithRooms[0].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 38 + 10)
      if (!game.floorsWithRooms[0].includes(x)) {game.floorsWithRooms[0].push(x)}
      else if (!game.floorsWithRooms[0].includes(x - 1)) {game.floorsWithRooms[0].push(x - 1)}
      else if (!game.floorsWithRooms[0].includes(x - 2)) {game.floorsWithRooms[0].push(x - 2)}
      else {game.floorsWithRooms[0].push(x - 3)}
    }
  }
  if (game.smithFloor == 0) {
    x = Math.floor(Math.random() * 4 + 5)
    if (!game.floorsWithRooms[0].includes(x)) {game.smithFloor = x}
    else if (!game.floorsWithRooms[0].includes(x - 1)) {game.smithFloor = x - 1}
    else if (!game.floorsWithRooms[0].includes(x - 2)) {game.smithFloor = x - 2}
    else if (!game.floorsWithRooms[0].includes(x - 3)) {game.smithFloor = x - 3}
    else {game.smithFloor = x - 4}
    game.floorsWithRooms[0] = game.floorsWithRooms[0].sort(function (a, b) {return a - b})
  }
  game.floorsWithRooms[0] = game.floorsWithRooms[0].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[1].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 55)
      if (!game.floorsWithRooms[1].includes(x)) {game.floorsWithRooms[1].push(x)}
      else if (!game.floorsWithRooms[1].includes(x - 1)) {game.floorsWithRooms[1].push(x - 1)}
      else if (!game.floorsWithRooms[1].includes(x - 2)) {game.floorsWithRooms[1].push(x - 2)}
      else {game.floorsWithRooms[1].push(x - 3)}
    }
  }
  game.floorsWithRooms[1] = game.floorsWithRooms[1].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[2].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 105)
      if (!game.floorsWithRooms[2].includes(x)) {game.floorsWithRooms[2].push(x)}
      else if (!game.floorsWithRooms[2].includes(x - 1)) {game.floorsWithRooms[2].push(x - 1)}
      else if (!game.floorsWithRooms[2].includes(x - 2)) {game.floorsWithRooms[2].push(x - 2)}
      else {game.floorsWithRooms[2].push(x - 3)}
    }
  }
  game.floorsWithRooms[2] = game.floorsWithRooms[2].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[3].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 155)
      if (!game.floorsWithRooms[3].includes(x)) {game.floorsWithRooms[3].push(x)}
      else if (!game.floorsWithRooms[3].includes(x - 1)) {game.floorsWithRooms[3].push(x - 1)}
      else if (!game.floorsWithRooms[3].includes(x - 2)) {game.floorsWithRooms[3].push(x - 2)}
      else {game.floorsWithRooms[3].push(x - 3)}
    }
  }
  game.floorsWithRooms[3] = game.floorsWithRooms[3].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[4].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 43 + 205)
      if (!game.floorsWithRooms[4].includes(x)) {game.floorsWithRooms[4].push(x)}
      else if (!game.floorsWithRooms[4].includes(x - 1)) {game.floorsWithRooms[4].push(x - 1)}
      else if (!game.floorsWithRooms[4].includes(x - 2)) {game.floorsWithRooms[4].push(x - 2)}
      else {game.floorsWithRooms[4].push(x - 3)}
    }
  }
  game.floorsWithRooms[4] = game.floorsWithRooms[4].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[5].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 255)
      if (!game.floorsWithRooms[5].includes(x)) {game.floorsWithRooms[5].push(x)}
      else if (!game.floorsWithRooms[5].includes(x - 1)) {game.floorsWithRooms[5].push(x - 1)}
      else if (!game.floorsWithRooms[5].includes(x - 2)) {game.floorsWithRooms[5].push(x - 2)}
      else {game.floorsWithRooms[5].push(x - 3)}
    }
  }
  game.floorsWithRooms[5] = game.floorsWithRooms[5].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[6].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 39 + 310)
      if (!game.floorsWithRooms[6].includes(x)) {game.floorsWithRooms[6].push(x)}
      else if (!game.floorsWithRooms[6].includes(x - 1)) {game.floorsWithRooms[6].push(x - 1)}
      else if (!game.floorsWithRooms[6].includes(x - 2)) {game.floorsWithRooms[6].push(x - 2)}
      else {game.floorsWithRooms[6].push(x - 3)}
    }
  }
  game.floorsWithRooms[6] = game.floorsWithRooms[6].sort(function (a, b) {return a - b})
  if (game.floorsWithRooms[7].length == 0) {
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 355)
      if (!game.floorsWithRooms[7].includes(x)) {game.floorsWithRooms[7].push(x)}
      else if (!game.floorsWithRooms[7].includes(x - 1)) {game.floorsWithRooms[7].push(x - 1)}
      else if (!game.floorsWithRooms[7].includes(x - 2)) {game.floorsWithRooms[7].push(x - 2)}
      else {game.floorsWithRooms[7].push(x - 3)}
    }
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 405)
      if (!game.floorsWithRooms[7].includes(x)) {game.floorsWithRooms[7].push(x)}
      else if (!game.floorsWithRooms[7].includes(x - 1)) {game.floorsWithRooms[7].push(x - 1)}
      else if (!game.floorsWithRooms[7].includes(x - 2)) {game.floorsWithRooms[7].push(x - 2)}
      else {game.floorsWithRooms[7].push(x - 3)}
    }
    for (i=0;i<4;i++) {
      x = Math.floor(Math.random() * 44 + 455)
      if (!game.floorsWithRooms[7].includes(x)) {game.floorsWithRooms[7].push(x)}
      else if (!game.floorsWithRooms[7].includes(x - 1)) {game.floorsWithRooms[7].push(x - 1)}
      else if (!game.floorsWithRooms[7].includes(x - 2)) {game.floorsWithRooms[7].push(x - 2)}
      else {game.floorsWithRooms[7].push(x - 3)}
    }
  }
  game.floorsWithRooms[7] = game.floorsWithRooms[7].sort(function (a, b) {return a - b})
}

function buyAltarUpgrade(x) {
  if (x==1 && game.cocoaHoney.gte(2) && game.altarUpgradesBought[0] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(2)
    game.altarUpgradesBought[0] = true
    document.getElementsByClassName("cocoaUpgrade")[0].disabled = true
  }
  else if (x==2 && game.cocoaHoney.gte(2) && game.altarUpgradesBought[1] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(2)
    game.altarUpgradesBought[1] = true
    document.getElementsByClassName("cocoaUpgrade")[1].disabled = true
  }
  else if (x==3 && game.cocoaHoney.gte(4) && game.altarUpgradesBought[2] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(4)
    game.altarUpgradesBought[2] = true
    document.getElementsByClassName("cocoaUpgrade")[2].disabled = true
  }
  else if (x==4 && game.cocoaHoney.gte(35) && game.altarUpgradesBought[3] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(35)
    game.altarUpgradesBought[3] = true
    document.getElementsByClassName("cocoaUpgrade")[3].disabled = true
  }
  else if (x==5 && game.cocoaHoney.gte(100) && game.altarUpgradesBought[4] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(100)
    game.altarUpgradesBought[4] = true
    document.getElementsByClassName("cocoaUpgrade")[4].disabled = true
    document.getElementById("toGroundFloorButton").style.display = "block"
    document.getElementById("toFloor49Button").style.display = "block"
    document.getElementById("toFloor99Button").style.display = "block"
  }
  else if (x==6 && game.cocoaHoney.gte(500) && game.altarUpgradesBought[5] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(500)
    game.altarUpgradesBought[5] = true
    document.getElementsByClassName("cocoaUpgrade")[5].disabled = true
  }
  else if (x==7 && game.cocoaHoney.gte(2000) && game.altarUpgradesBought[6] != true) {
    game.cocoaHoney = game.cocoaHoney.sub(2000)
    game.altarUpgradesBought[6] = true
    document.getElementsByClassName("cocoaUpgrade")[6].disabled = true
    document.getElementById("honey3").style.display = "block"
    document.getElementById("honeyText3").style.display = "block"
    document.getElementById("ringIcon").src = "img/ring2.png"
    if (game.currentTip == 11) game.currentTip = 12
  }
}

function toGroundFloor() {
  game.currentFloor = 0
  $("#currentFloor").html("the ground floor")
  document.getElementById("enterFloorButton").style.display = "none"
  if (game.cocoaBars < 10 && game.darkOrbs == 0) {document.getElementById("floorDownButton").disabled = true}
  else {document.getElementById("floorDownButton").disabled = false}
  document.getElementById("floorUpButton").disabled = false
  document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"
  updateInfo()
}

function toFloor49() {
  game.currentFloor = 49
  $("#currentFloor").html("floor " + game.currentFloor)
  document.getElementById("enterFloorButton").style.display = "block"
  document.getElementById("floorDownButton").disabled = false
  document.getElementById("floorUpButton").disabled = false
  document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"
  updateInfo()
}

function toFloor99() {
  if (game.specialItemsAcquired[1] == true) {
    game.currentFloor = 99
    $("#currentFloor").html("floor " + game.currentFloor)
    document.getElementById("enterFloorButton").style.display = "none"
    document.getElementById("floorDownButton").disabled = false
    document.getElementById("floorUpButton").disabled = false
    document.getElementsByClassName("container")[1].style.backgroundColor = "#808080"
    updateInfo()
  }
}

function toFloor149() {
  if (game.specialItemsAcquired[1] == true) {
    game.currentFloor = 149
    $("#currentFloor").html("floor " + game.currentFloor)
    document.getElementById("enterFloorButton").style.display = "none"
    document.getElementById("floorDownButton").disabled = false
    document.getElementById("floorUpButton").disabled = false
    document.getElementsByClassName("container")[1].style.backgroundColor = "#7090b0"
    updateInfo()
  }
}

function toFloor248() {
  if (game.specialItemsAcquired[1] == true) {
    game.currentFloor = 248
    $("#currentFloor").html("floor " + game.currentFloor)
    document.getElementById("enterFloorButton").style.display = "none"
    document.getElementById("floorDownButton").disabled = false
    document.getElementById("floorUpButton").disabled = false
    document.getElementsByClassName("container")[1].style.backgroundColor = "#508850"
    updateInfo()
  }
}

function toFloor299() {
  if (game.specialItemsAcquired[1] == true) {
    game.currentFloor = 299
    $("#currentFloor").html("floor " + game.currentFloor)
    document.getElementById("enterFloorButton").style.display = "none"
    document.getElementById("floorDownButton").disabled = false
    document.getElementById("floorUpButton").disabled = false
    document.getElementsByClassName("container")[1].style.backgroundColor = "#c09080"
    updateInfo()
  }
}

function toFloor351() {
  if (game.specialItemsAcquired[1] == true) {
    game.currentFloor = 351
    $("#currentFloor").html("floor " + game.currentFloor)
    document.getElementById("enterFloorButton").style.display = "none"
    document.getElementById("floorDownButton").disabled = false
    document.getElementById("floorUpButton").disabled = false
    document.getElementsByClassName("container")[1].style.backgroundColor = "#c0a030"
    updateInfo()
  }
}

function buySharkUpgrade(x) {
  if (x==1 && game.honey.gte(20) && game.honeyplasm.gte(1)) {
    game.honey = game.honey.sub(20)
    game.honeyplasm = game.honeyplasm.sub(1)
    game.vanillaHoney = game.vanillaHoney.add(1)
    randomSharkMessage()
  }
  if (x==2 && game.honeyplasm.gte(2) && game.sharkUpgradesBought[0] != true) {
    game.honeyplasm = game.honeyplasm.sub(2)
    game.sharkUpgradesBought[0] = true
    document.getElementsByClassName("sharkUpgrade")[0].disabled = true
    $("#XPSoftcap").html("")
    randomSharkMessage()
  }
  if (x==3 && game.honeyplasm.gte(2) && game.sharkUpgradesBought[1] != true) {
    game.honeyplasm = game.honeyplasm.sub(2)
    game.sharkUpgradesBought[1] = true
    document.getElementsByClassName("sharkUpgrade")[1].disabled = true
    randomSharkMessage()
  }
  if (x==4 && game.honeyplasm.gte(3) && game.sharkUpgradesBought[2] != true) {
    game.honeyplasm = game.honeyplasm.sub(3)
    game.sharkUpgradesBought[2] = true
    document.getElementsByClassName("sharkUpgrade")[2].disabled = true
    document.getElementById("toFloor149Button").style.display = "block"
    randomSharkMessage()
  }
  if (x==5 && game.honeyplasm.gte(5) && game.sharkUpgradesBought[3] != true) {
    game.honeyplasm = game.honeyplasm.sub(5)
    game.sharkUpgradesBought[3] = true
    document.getElementsByClassName("sharkUpgrade")[3].disabled = true
    randomSharkMessage()
  }
  if (x==6 && game.honeyplasm.gte(25) && game.sharkUpgradesBought[4] != true) {
    game.honeyplasm = game.honeyplasm.sub(25)
    game.sharkUpgradesBought[4] = true
    document.getElementsByClassName("sharkUpgrade")[4].disabled = true
    randomSharkMessage()
  }
  if (x==7 && game.honeyplasm.gte(30) && game.sharkUpgradesBought[5] != true) {
    game.honeyplasm = game.honeyplasm.sub(30)
    game.sharkUpgradesBought[5] = true
    document.getElementsByClassName("sharkUpgrade")[5].disabled = true
    randomSharkMessage()
  }
  if (x==8 && game.honeyplasm.gte(35) && game.sharkUpgradesBought[6] != true) {
    game.honeyplasm = game.honeyplasm.sub(35)
    game.sharkUpgradesBought[6] = true
    document.getElementsByClassName("sharkUpgrade")[6].disabled = true
    randomSharkMessage()
  }
  if (x==9 && game.honeyplasm.gte(60) && game.sharkUpgradesBought[7] != true) {
    game.honeyplasm = game.honeyplasm.sub(60)
    game.sharkUpgradesBought[7] = true
    document.getElementsByClassName("sharkUpgrade")[7].disabled = true
    randomSharkMessage()
  }
  if (x==10 && game.honeyplasm.gte(75) && game.sharkUpgradesBought[8] != true) {
    game.honeyplasm = game.honeyplasm.sub(75)
    game.sharkUpgradesBought[8] = true
    document.getElementsByClassName("sharkUpgrade")[8].disabled = true
    randomSharkMessage()
  }
  if (x==11 && game.honeyplasm.gte(150) && game.sharkUpgradesBought[9] != true) {
    game.honeyplasm = game.honeyplasm.sub(150)
    game.sharkUpgradesBought[9] = true
    document.getElementsByClassName("sharkUpgrade")[9].disabled = true
    document.getElementById("sapphireIcon").style.display = "block"
    document.getElementById("cocoaBarIcon").style.display = "block"
    document.getElementById("cocoaBarText").style.display = "block"
    randomSharkMessage()
  }
}

function randomSharkMessage() {
  if (game.sharkCutscenesViewed < 3) {
    if (Math.floor(Math.random * 420) == 0) {$("#sharkText").html("YEAH, I BET YOU WANNA BE A [[Big Shark]]! AHAHAHAHA!!!")}
    else {$("#sharkText").html(sharkQuotes[Math.floor(Math.random() * sharkQuotes.length)])}
  }
}

function gainCocoaBars() {
  if (game.cocoaHoney.gte(cocoaBarRequirement)) {
    if (confirm("Are you sure you want to do this? You will lose all of your cocoa honey!")) {
      game.cocoaBars++
      cocoaReset()
      game.cocoaHoney = ExpantaNum(0)
      if (game.cocoaBars >= 10) {
        document.getElementById("darkOrbIcon").style.display = "block"
        document.getElementById("darkOrbText").style.display = "block"
      }
      for (i=0; i<cbmRequirements.length; i++) {
        if (game.cocoaBars >= cbmRequirements[i]) document.getElementsByClassName("cocoaBarMilestoneDiv")[i].style.backgroundColor = "#40d040"
      }
      if (game.cocoaBars >= 20) {
        document.getElementById("ringIcon").src = "img/ring3.png"
        document.getElementById("hyperplasmIcon").style.display = "block"
        document.getElementById("hyperplasmText").style.display = "block"
        document.getElementById("darkBarIcon").style.display = "block"
        document.getElementById("darkBarText").style.display = "block"
        document.getElementById("starBarIcon").style.display = "block"
        document.getElementById("starBarText").style.display = "block"
      }
    }
  }
}

function autoCocoaBars() {
  if (game.cocoaHoney.gte(cocoaBarRequirement)) {
    game.cocoaBars++
    if (game.cocoaBars >= 10) {
      document.getElementById("darkOrbIcon").style.display = "block"
      document.getElementById("darkOrbText").style.display = "block"
    }
    for (i=0; i<cbmRequirements.length; i++) {
      if (game.cocoaBars >= cbmRequirements[i]) document.getElementsByClassName("cocoaBarMilestoneDiv")[i].style.backgroundColor = "#40d040"
    }
    if (game.cocoaBars >= 20) {
      document.getElementById("ringIcon").src = "img/ring3.png"
      document.getElementById("hyperplasmIcon").style.display = "block"
      document.getElementById("hyperplasmText").style.display = "block"
      document.getElementById("darkBarIcon").style.display = "block"
      document.getElementById("darkBarText").style.display = "block"
      document.getElementById("starBarIcon").style.display = "block"
      document.getElementById("starBarText").style.display = "block"
    }
  }
}

function displayCBM(x) {
  document.getElementById("cocoaBarMilestoneInfo").style.display = "block"
  if (x==1) {$("#cocoaBarMilestoneText").html("<span  style='font-size: 33px; line-height: 42px;'>1 cocoa bar</span><br>Keep 500,000 XP on reset")}
  else if (x==2) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>2 cocoa bars</span><br>Keep 10,000,000 XP on reset")}
  else if (x==3) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>4 cocoa bars</span><br>Cocoa bar effect is much stronger")}
  else if (x==4) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>5 cocoa bars</span><br>XP is set to cocoa boost amount on cocoa honey resets and cocoa bar resets")}
  else if (x==5) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>9 cocoa bars</span><br>Multiply cocoa honey gain by 1.000F10<br>Try killing some weak tier 4 enemies to get to the 10th cocoa bar!")}
  else if (x==6) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>10 cocoa bars</span><br>Gain access to <b>floor -1</b>")}
  else if (x==7) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>11 cocoa bars</span><br>Enemies above floor 150 drop more XP (1/3)")}
  else if (x==8) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>13 cocoa bars</span><br>Enemies above floor 150 drop more XP (2/3)")}
  else if (x==9) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>15 cocoa bars</span><br>Enemies above floor 150 drop more XP (3/3)")}
  else if (x==10) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>16 cocoa bars</span><br>Enemies above floor 150 drop more XP based on cocoa bars")}
  else if (x==11) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>19 cocoa bars</span><br>Cocoa honey gain is pentated by 2")}
  else if (x==12) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>20 cocoa bars</span><br>Forge your shadow ring into a cobalt ring")}
  else if (x==13) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>26 cocoa bars</span><br>Tier 6 enemies drop slightly more XP")}
  else if (x==14) {$("#cocoaBarMilestoneText").html("<span style='font-size: 33px; line-height: 42px;'>30 cocoa bars</span><br>Tier 6 enemies drop far more XP")}
  
}

function hideCBM() {
  document.getElementById("cocoaBarMilestoneInfo").style.display = "none"
}

function darkOrbPrestige() {
  if (game.cocoaHoney.gte(darkOrbRequirements[game.darkOrbs])) {
    if (confirm("Are you sure you want to reset EVERYTHING for a dark orb?")) {
      game.darkOrbs++
      darkOrbReset()
      $("#darkOrbBonuses").html(darkOrbBonuses[game.darkOrbs])
      if (game.darkOrbs >= 1) {
        document.getElementsByClassName("cocoaBarMilestoneDiv")[6].style.display = "inline-block"
        document.getElementsByClassName("cocoaBarMilestoneDiv")[7].style.display = "inline-block"
        document.getElementsByClassName("cocoaBarMilestoneDiv")[8].style.display = "inline-block"
      }
      if (game.darkOrbs >= 2) {
        document.getElementsByClassName("cocoaBarMilestoneDiv")[9].style.display = "inline-block"
        document.getElementsByClassName("cocoaBarMilestoneDiv")[10].style.display = "inline-block"
        document.getElementsByClassName("cocoaBarMilestoneDiv")[11].style.display = "inline-block"
      }
      if (game.darkOrbs >= 4) {
        document.getElementById("getCocoaBarsButton").disabled = true
        setInterval(autoCocoaBars, 100)
        document.getElementsByClassName("cocoaBarMilestoneDiv")[12].style.display = "inline-block"
        document.getElementsByClassName("cocoaBarMilestoneDiv")[13].style.display = "inline-block"
      }
    }
  }
}

function darkOrbReset() {
  fillFloorsWithRooms()
  if (game.currentTip == 13) game.currentTip = 14

  if (game.darkOrbs < 3) game.specialItemsAcquired = [false, false]

  game.roomsExplored = 0
  game.roomsFromStairwell = 0
  game.returningToStairwell = false
  game.floorDifficulty = 0
  game.totalDifficulty = ExpantaNum(0)
  game.fightingMonster = false
  game.monsterType = 0
  game.monsterHealth = ExpantaNum(100)
  game.monsterMaxHealth = ExpantaNum(100)
  game.monsterAttackCooldown = 3
  game.timeSinceAttack = 20
  game.waitingForEnergy = false

  game.monstersKilled = 0

  game.health = ExpantaNum(100)
  game.maxHealth = ExpantaNum(100)
  game.energy = 100
  game.attackDamage = ExpantaNum(10)
  game.level = ExpantaNum(1)
  game.xp = ExpantaNum(0)
  game.honey = ExpantaNum(0)
  game.vanillaHoney = ExpantaNum(0)

  game.fleeCooldown = 0

  game.cocoaHoney = ExpantaNum(0)
  if (game.darkOrbs >= 3) {game.altarUpgradesBought = [false, false, false, false, false, true, false]}
  else {game.altarUpgradesBought = [false, false, false, false, false, false, false]}

  game.honeyplasm = ExpantaNum(0)
  game.sharkUpgradesBought = [false, false, false, false, false, false, false, false, false, false]

  game.cocoaBars = 0

  game.runeFragments = [0, 0, 0]
  game.buffTimes = [0, 0, 0]

  game.hyperplasm = ExpantaNum(0)
  game.combinatorUpgradesBought = [false, false, false, false, false, false, false, false, false, false]
  game.darkBars = 0
  game.starBars = 0
  document.getElementsByClassName("combinatorButton")[0].disabled = true
  document.getElementsByClassName("combinatorText")[0].innerHTML = "Hyperplasm (not unlocked)"
  document.getElementsByClassName("combinatorButton")[1].disabled = true
  document.getElementsByClassName("combinatorText")[1].innerHTML = "Dark bar (not unlocked)"
  document.getElementsByClassName("combinatorButton")[2].disabled = true
  document.getElementsByClassName("combinatorText")[2].innerHTML = "Star bar (not unlocked)"

  game.combinatorUpgrades2Bought = [false, false, false, false, false, false, false, false, false, false, false]

  game.redPermanentBought = 0
  game.greenPermanentBought = 0
  game.bluePermanentBought = 0
  $("#redPermanentBought").html(game.redPermanentBought)
  $("#redPermanentBoost").html(game.redPermanentBought * 5)
  $("#greenPermanentBought").html(game.greenPermanentBought)
  $("#greenPermanentBoost").html(game.greenPermanentBought * 5)
  $("#bluePermanentBought").html(game.bluePermanentBought)
  $("#bluePermanentBoost").html(game.bluePermanentBought * 10)

  for (i=0; i<game.altarUpgradesBought.length; i++) {
    document.getElementsByClassName("cocoaUpgrade")[i].disabled = false
  }
  if (game.darkOrbs >= 3) document.getElementsByClassName("cocoaUpgrade")[5].disabled = true
  for (i=0; i<game.sharkUpgradesBought.length; i++) {
    document.getElementsByClassName("sharkUpgrade")[i].disabled = false
  }

  for (i=0; i<cbmRequirements.length; i++) {
    document.getElementsByClassName("cocoaBarMilestoneDiv")[i].style.backgroundColor = "#c0b070"
  }
  document.getElementsByClassName("cocoaBarMilestoneDiv")[5].style.backgroundColor = "#40d040"
  if (game.darkOrbs >= 3) document.getElementsByClassName("cocoaBarMilestoneDiv")[3].style.backgroundColor = "#40d040"

  for (i=0; i<game.combinatorUpgradesBought.length; i++) {
    document.getElementsByClassName("combinatorUpgrade")[i].disabled = false
  }
  for (i=0; i<game.combinatorUpgrades2Bought.length; i++) {
    document.getElementsByClassName("combinatorUpgrade2")[i].disabled = false
  }

  document.getElementById("prestigeHotkey").style.display = "none"
  document.getElementById("toGroundFloorButton").style.display = "none"
  document.getElementById("toFloor49Button").style.display = "none"
  document.getElementById("toFloor99Button").style.display = "none"
  document.getElementById("toFloor149Button").style.display = "none"
  document.getElementById("toFloor248Button").style.display = "none"
  document.getElementById("toFloor299Button").style.display = "none"
  document.getElementById("toFloor351Button").style.display = "none"
  document.getElementById("ringIcon").src = "img/ring.png"
  document.getElementById("sapphireIcon").style.display = "none"
  document.getElementById("hyperGemIcon").style.display = "none"
  document.getElementById("glockIcon").style.display = "none"
  if (game.darkOrbs < 3) {
    document.getElementById("blueKeyIcon").style.display = "none"
    document.getElementById("ringIcon").style.display = "none"
  }
}

function combinate(x) {
  if (x==1 && game.honey.gte(hyperplasmCost) && game.honeyplasm.gte(hyperplasmCost)) {
    game.honey = game.honey.sub(hyperplasmCost)
    game.honeyplasm = game.honeyplasm.sub(hyperplasmCost)
    if (game.combinatorUpgradesBought[5] == true) {game.hyperplasm = game.hyperplasm.add(1000)}
    else {game.hyperplasm = game.hyperplasm.add(1)}
  }
  else if (x==2 && game.cocoaBars >= darkBarCost1 && game.darkOrbs >= darkBarCost2) {
    game.darkBars++
  }
  else if (x==3 && game.darkBars >= starBarCost && game.hyperplasm.gte(20)) {
    game.starBars++
  }
}

function buyCombinatorUpgrade(x) {
  if (x==1 && game.cocoaHoney.gte("10^^^2000") && game.combinatorUpgradesBought[0] != true) {
    game.combinatorUpgradesBought[0] = true
    document.getElementsByClassName("combinatorUpgrade")[0].disabled = true
    document.getElementsByClassName("combinatorButton")[0].disabled = false
    document.getElementsByClassName("combinatorText")[0].innerHTML = "Hyperplasm"
  }
  else if (x==2 && game.hyperplasm.gte(1) && game.combinatorUpgradesBought[1] != true) {
    game.combinatorUpgradesBought[1] = true
    document.getElementsByClassName("combinatorUpgrade")[1].disabled = true
  }
  else if (x==3 && game.hyperplasm.gte(3) && game.combinatorUpgradesBought[2] != true) {
    game.combinatorUpgradesBought[2] = true
    document.getElementsByClassName("combinatorUpgrade")[2].disabled = true
    document.getElementById("toFloor248Button").style.display = "block"
  }
  else if (x==4 && game.hyperplasm.gte(4) && game.combinatorUpgradesBought[3] != true) {
    game.combinatorUpgradesBought[3] = true
    document.getElementsByClassName("combinatorUpgrade")[3].disabled = true
    document.getElementsByClassName("combinatorButton")[1].disabled = false
    document.getElementsByClassName("combinatorText")[1].innerHTML = "Dark bar"
    if (game.currentTip == 14) game.currentTip = 15
  }
  else if (x==5 && game.hyperplasm.gte(100) && game.combinatorUpgradesBought[4] != true) {
    game.combinatorUpgradesBought[4] = true
    document.getElementsByClassName("combinatorUpgrade")[4].disabled = true
    document.getElementsByClassName("combinatorButton")[2].disabled = false
    document.getElementsByClassName("combinatorText")[2].innerHTML = "Star bar"
  }
  else if (x==6 && game.starBars >= 1 && game.combinatorUpgradesBought[5] != true) {
    game.combinatorUpgradesBought[5] = true
    document.getElementsByClassName("combinatorUpgrade")[5].disabled = true
    game.hyperplasm = ExpantaNum(0)
  }
  else if (x==7 && game.hyperplasm.gte(6000) && game.combinatorUpgradesBought[6] != true) {
    game.combinatorUpgradesBought[6] = true
    document.getElementsByClassName("combinatorUpgrade")[6].disabled = true
  }
  else if (x==8 && game.hyperplasm.gte(9000) && game.combinatorUpgradesBought[7] != true) {
    game.combinatorUpgradesBought[7] = true
    document.getElementsByClassName("combinatorUpgrade")[7].disabled = true
  }
  else if (x==9 && game.hyperplasm.gte(13000) && game.combinatorUpgradesBought[8] != true) {
    game.combinatorUpgradesBought[8] = true
    document.getElementsByClassName("combinatorUpgrade")[8].disabled = true
  }
  else if (x==10 && game.hyperplasm.gte(1e100) && game.combinatorUpgradesBought[9] != true) {
    game.combinatorUpgradesBought[9] = true
    document.getElementsByClassName("combinatorUpgrade")[9].disabled = true
    document.getElementById("hyperGemIcon").style.display = "block"
    if (game.currentTip == 15) game.currentTip = 16
  }
}

function buyCombinatorUpgrade2(x) {
  if (x==1 && game.hyperplasm.gte(1e200) && game.combinatorUpgrades2Bought[0] != true) {
    game.combinatorUpgrades2Bought[0] = true
    document.getElementsByClassName("combinatorUpgrade2")[0].disabled = true
  }
  else if (x==2 && game.hyperplasm.gte("J50") && game.combinatorUpgrades2Bought[1] != true) {
    game.combinatorUpgrades2Bought[1] = true
    document.getElementsByClassName("combinatorUpgrade2")[1].disabled = true
  }
  else if (x==3 && game.cocoaHoney.gte("J110") && game.combinatorUpgrades2Bought[2] != true) {
    game.combinatorUpgrades2Bought[2] = true
    document.getElementsByClassName("combinatorUpgrade2")[2].disabled = true
  }
  else if (x==4 && game.cocoaHoney.gte("J300") && game.combinatorUpgrades2Bought[3] != true) {
    game.combinatorUpgrades2Bought[3] = true
    document.getElementsByClassName("combinatorUpgrade2")[3].disabled = true
  }
  else if (x==5 && game.cocoaHoney.gte("J1000") && game.combinatorUpgrades2Bought[4] != true) {
    game.combinatorUpgrades2Bought[4] = true
    document.getElementsByClassName("combinatorUpgrade2")[4].disabled = true
    document.getElementById("toFloor299Button").style.display = "block"
  }
  else if (x==6 && game.cocoaHoney.gte("J1500") && game.combinatorUpgrades2Bought[5] != true) {
    game.combinatorUpgrades2Bought[5] = true
    document.getElementsByClassName("combinatorUpgrade2")[5].disabled = true
  }
  else if (x==7 && game.cocoaHoney.gte("J2000") && game.combinatorUpgrades2Bought[6] != true) {
    game.combinatorUpgrades2Bought[6] = true
    document.getElementsByClassName("combinatorUpgrade2")[6].disabled = true
  }
  else if (x==8 && game.starBars >= 8 && game.combinatorUpgrades2Bought[7] != true) {
    game.combinatorUpgrades2Bought[7] = true
    document.getElementsByClassName("combinatorUpgrade2")[7].disabled = true
  }
  else if (x==9 && game.cocoaHoney.gte("J40000") && game.combinatorUpgrades2Bought[8] != true) {
    game.combinatorUpgrades2Bought[8] = true
    document.getElementsByClassName("combinatorUpgrade2")[8].disabled = true
  }
  else if (x==10 && game.cocoaHoney.gte("J100000") && game.combinatorUpgrades2Bought[9] != true) {
    game.combinatorUpgrades2Bought[9] = true
    document.getElementsByClassName("combinatorUpgrade2")[9].disabled = true
  }
  else if (x==11 && game.cocoaHoney.gte("J1e29") && game.darkOrbs >= 4 && game.combinatorUpgrades2Bought[10] != true) {
    game.combinatorUpgrades2Bought[10] = true
    document.getElementsByClassName("combinatorUpgrade2")[10].disabled = true
    document.getElementById("hyperGemIcon").src = "img/starGem.png"
    document.getElementById("bloodGemIcon").style.display = "block"
    document.getElementById("bloodGemText").style.display = "block"
  }
}

function buyBloodProducer(x) {
  if (game.sharkUpgrades2Bought[0] == true) {
    if (x==1 && ExpantaNum(game.bloodGems).gte(game.t1bp.mul(1000))) {
      game.t1bp = game.t1bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==2 && ExpantaNum(game.bloodGems).gte(game.t2bp.mul(1000).add(590))) {
      game.t2bp = game.t2bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==3 && ExpantaNum(game.bloodGems).gte(game.t3bp.mul(1000).add(650))) {
      game.t3bp = game.t3bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==4 && ExpantaNum(game.bloodGems).gte(game.t4bp.mul(1000).add(740))) {
      game.t4bp = game.t4bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==5 && ExpantaNum(game.bloodGems).gte(game.t5bp.mul(1000).add(800))) {
      game.t5bp = game.t5bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==6 && ExpantaNum(game.bloodGems).gte(game.t6bp.mul(1000).add(900))) {
      game.t6bp = game.t6bp.add(1)
      bloodProductionUpdate()
    }
  }
  else if (game.monsterBloodUpgradesBought[8] == true) {
    if (x==1 && ExpantaNum(game.bloodGems).gte(game.t1bp.mul(1000))) {
      game.t1bp = game.t1bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==2 && ExpantaNum(game.bloodGems).gte(game.t2bp.mul(1000).add(230))) {
      game.t2bp = game.t2bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==3 && ExpantaNum(game.bloodGems).gte(game.t3bp.mul(1000).add(270))) {
      game.t3bp = game.t3bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==4 && ExpantaNum(game.bloodGems).gte(game.t4bp.mul(1000).add(350))) {
      game.t4bp = game.t4bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==5 && ExpantaNum(game.bloodGems).gte(game.t5bp.mul(1000).add(400))) {
      game.t5bp = game.t5bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==6 && ExpantaNum(game.bloodGems).gte(game.t6bp.mul(1000).add(450))) {
      game.t6bp = game.t6bp.add(1)
      bloodProductionUpdate()
    }
  }
  else {
    if (x==1 && ExpantaNum(game.bloodGems).gte(game.t1bp.add(1))) {
      game.t1bp = game.t1bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==2 && ExpantaNum(game.bloodGems).gte(game.t2bp.mul(3).add(6))) {
      game.t2bp = game.t2bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==3 && ExpantaNum(game.bloodGems).gte(game.t3bp.mul(10).add(15))) {
      game.t3bp = game.t3bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==4 && ExpantaNum(game.bloodGems).gte(game.t4bp.mul(18).add(36))) {
      game.t4bp = game.t4bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==5 && ExpantaNum(game.bloodGems).gte(game.t5bp.mul(30).add(66))) {
      game.t5bp = game.t5bp.add(1)
      bloodProductionUpdate()
    }
    else if (x==6 && ExpantaNum(game.bloodGems).gte(game.t6bp.mul(50).add(136))) {
      game.t6bp = game.t6bp.add(1)
      bloodProductionUpdate()
    }
  }
}

function bloodProduction() {
  if (game.sharkUpgrades2Bought[0] == true) {game.monsterBlood = game.monsterBlood.add(ExpantaNum("J" + game.t1bp.add(game.t1ebp).mul(game.bpMultiplier).pow(1 + (game.monsterBloodUpgradesBought[5] == true)).pow(1 + (game.monsterBloodUpgradesBought[6] == true))))}
  else if (game.monsterBloodUpgradesBought[5] == true) {game.monsterBlood = game.monsterBlood.add(game.t1bp.add(game.t1ebp).mul(game.bpMultiplier).pow(1 + (game.monsterBloodUpgradesBought[5] == true)).pow(1 + (game.monsterBloodUpgradesBought[6] == true)).tetr(1 + (game.monsterBloodUpgradesBought[7] == true)).pent(1 + (game.monsterBloodUpgradesBought[8] == true)))}
  else {game.monsterBlood = game.monsterBlood.add(game.t1bp.add(game.t1ebp).mul(game.bpMultiplier).pow(1 + (game.monsterBloodUpgradesBought[5] == true)).pow(1 + (game.monsterBloodUpgradesBought[6] == true)))}
  game.t1ebp = game.t1ebp.add(game.t2bp.add(game.t2ebp).mul(game.bpMultiplier))
  game.t2ebp = game.t2ebp.add(game.t3bp.add(game.t3ebp).mul(game.bpMultiplier))
  game.t3ebp = game.t3ebp.add(game.t4bp.add(game.t4ebp).mul(game.bpMultiplier))
  game.t4ebp = game.t4ebp.add(game.t5bp.add(game.t5ebp).mul(game.bpMultiplier))
  game.t5ebp = game.t5ebp.add(game.t6bp.mul(game.bpMultiplier))
  bloodProductionUpdate()
}

function bloodProductionUpdate() {
  $("#monsterBlood").html(format(game.monsterBlood, 0))
  $("#gemEelsBeaten").html(format(game.gemEelsBeaten, 0))
  $("#bloodGems").html(format(game.bloodGems, 0))
  $("#bloodGems2").html(format(game.bloodGems, 0))
  $("#t1bp").html(format(game.t1bp, 0))
  $("#t2bp").html(format(game.t2bp, 0))
  $("#t3bp").html(format(game.t3bp, 0))
  $("#t4bp").html(format(game.t4bp, 0))
  $("#t5bp").html(format(game.t5bp, 0))
  $("#t6bp").html(format(game.t6bp, 0))
  $("#t1ebp").html(format(game.t1ebp, 0))
  $("#t2ebp").html(format(game.t2ebp, 0))
  $("#t3ebp").html(format(game.t3ebp, 0))
  $("#t4ebp").html(format(game.t4ebp, 0))
  $("#t5ebp").html(format(game.t5ebp, 0))
  if (game.sharkUpgrades2Bought[0] == true) {
    $("#t1bpCost").html(format(game.t1bp.mul(1000), 0))
    $("#t2bpCost").html(format(game.t2bp.mul(1000).add(590), 0))
    $("#t3bpCost").html(format(game.t3bp.mul(1000).add(650), 0))
    $("#t4bpCost").html(format(game.t4bp.mul(1000).add(740), 0))
    $("#t5bpCost").html(format(game.t5bp.mul(1000).add(800), 0))
    $("#t6bpCost").html(format(game.t6bp.mul(1000).add(900), 0))
  }
  else if (game.monsterBloodUpgradesBought[8] == true) {
    $("#t1bpCost").html(format(game.t1bp.mul(1000), 0))
    $("#t2bpCost").html(format(game.t2bp.mul(1000).add(230), 0))
    $("#t3bpCost").html(format(game.t3bp.mul(1000).add(270), 0))
    $("#t4bpCost").html(format(game.t4bp.mul(1000).add(350), 0))
    $("#t5bpCost").html(format(game.t5bp.mul(1000).add(400), 0))
    $("#t6bpCost").html(format(game.t6bp.mul(1000).add(450), 0))
  }
  else {
    $("#t1bpCost").html(format(game.t1bp.add(1), 0))
    $("#t2bpCost").html(format(game.t2bp.mul(3).add(6), 0))
    $("#t3bpCost").html(format(game.t3bp.mul(10).add(15), 0))
    $("#t4bpCost").html(format(game.t4bp.mul(18).add(36), 0))
    $("#t5bpCost").html(format(game.t5bp.mul(30).add(66), 0))
    $("#t6bpCost").html(format(game.t6bp.mul(50).add(136), 0))
  }
}

setInterval(bloodProduction, 1000)

function buyMonsterBloodUpgrade(x) {
  if (x==1 && game.cocoaHoney.gte("J1e44") && game.monsterBloodUpgradesBought[0] != true) {
    game.monsterBloodUpgradesBought[0] = true
    document.getElementsByClassName("monsterBloodUpgrade")[0].disabled = true
    game.bpMultiplier = game.bpMultiplier * 2
  }
  else if (x==2 && game.cocoaHoney.gte("J1e55") && game.monsterBloodUpgradesBought[1] != true) {
    game.monsterBloodUpgradesBought[1] = true
    document.getElementsByClassName("monsterBloodUpgrade")[1].disabled = true
    game.bpMultiplier = game.bpMultiplier * 3
  }
  else if (x==3 && game.cocoaHoney.gte("J1e69") && game.monsterBloodUpgradesBought[2] != true) {
    game.monsterBloodUpgradesBought[2] = true
    document.getElementsByClassName("monsterBloodUpgrade")[2].disabled = true
    game.bpMultiplier = game.bpMultiplier * game.darkOrbs
  }
  else if (x==4 && game.cocoaHoney.gte("J1e87") && game.monsterBloodUpgradesBought[3] != true) {
    game.monsterBloodUpgradesBought[3] = true
    document.getElementsByClassName("monsterBloodUpgrade")[3].disabled = true
    game.t5ebp = game.t5ebp.add(100)
    bloodProductionUpdate()
  }
  else if (x==5 && game.cocoaHoney.gte("J1e100") && game.monsterBloodUpgradesBought[4] != true) {
    game.monsterBloodUpgradesBought[4] = true
    document.getElementsByClassName("monsterBloodUpgrade")[4].disabled = true
    game.bpMultiplier = game.bpMultiplier * 10
  }
  else if (x==6 && game.cocoaHoney.gte("J1e122") && game.monsterBloodUpgradesBought[5] != true) {
    game.monsterBloodUpgradesBought[5] = true
    document.getElementsByClassName("monsterBloodUpgrade")[5].disabled = true
  }
  else if (x==7 && game.cocoaHoney.gte("J1e222") && game.monsterBloodUpgradesBought[6] != true) {
    game.monsterBloodUpgradesBought[6] = true
    document.getElementsByClassName("monsterBloodUpgrade")[6].disabled = true
  }
  else if (x==8 && game.cocoaHoney.gte("J1e420") && game.monsterBloodUpgradesBought[7] != true) {
    game.monsterBloodUpgradesBought[7] = true
    document.getElementsByClassName("monsterBloodUpgrade")[7].disabled = true
  }
  else if (x==9 && game.cocoaHoney.gte("J1e1e100") && game.monsterBloodUpgradesBought[8] != true) {
    game.monsterBloodUpgradesBought[8] = true
    document.getElementsByClassName("monsterBloodUpgrade")[8].disabled = true
    game.t1bp = ExpantaNum(1)
    game.t2bp = ExpantaNum(0)
    game.t3bp = ExpantaNum(0)
    game.t4bp = ExpantaNum(0)
    game.t5bp = ExpantaNum(0)
    game.t6bp = ExpantaNum(0)
    game.t1ebp = ExpantaNum(0)
    game.t2ebp = ExpantaNum(0)
    game.t3ebp = ExpantaNum(0)
    game.t4ebp = ExpantaNum(0)
    game.t5ebp = ExpantaNum(0)
    bloodProductionUpdate()
  }
  else if (x==10 && game.bloodGems >= 561 && game.monsterBloodUpgradesBought[9] != true) {
    game.monsterBloodUpgradesBought[9] = true
    document.getElementsByClassName("monsterBloodUpgrade")[9].disabled = true
    document.getElementById("hyperGemIcon").src = "img/superBloodGem.png"
  }
}

function sharkDialogueContinue() {
  if (game.sharkCutscenesViewed == 0) {
    if (game.currentSharkDialogue < 7) {
      game.currentSharkDialogue++
      $("#sharkText2").html(sharkDialogue1[game.currentSharkDialogue])
    }
    else {
      $("#sharkText2").html("I'll be waiting here until you can defeat Jelly!")
      game.sharkCutscenesViewed = 1
      document.getElementById("floorUpButton").disabled = false
      document.getElementById("floorDownButton").disabled = false
      document.getElementById("toGroundFloorButton").disabled = false
      document.getElementById("toFloor49Button").disabled = false
      document.getElementById("toFloor99Button").disabled = false
      document.getElementById("toFloor149Button").disabled = false
      document.getElementById("toFloor248Button").disabled = false
      document.getElementById("toFloor299Button").disabled = false
      document.getElementById("toFloor351Button").disabled = false
      document.getElementById("continueButton").style.display = "none"
      game.inSharkCutscene = false
    }
  }
  else if (game.sharkCutscenesViewed == 1) {
    if (game.currentSharkDialogue < 4) {
      game.currentSharkDialogue++
      $("#sharkText2").html(sharkDialogue2[game.currentSharkDialogue])
    }
    else {
      $("#sharkText2").html("I'll be waiting here until you can defeat Jelly!")
      game.sharkCutscenesViewed = 2
      document.getElementById("floorUpButton").disabled = false
      document.getElementById("floorDownButton").disabled = false
      document.getElementById("toGroundFloorButton").disabled = false
      document.getElementById("toFloor49Button").disabled = false
      document.getElementById("toFloor99Button").disabled = false
      document.getElementById("toFloor149Button").disabled = false
      document.getElementById("toFloor248Button").disabled = false
      document.getElementById("toFloor299Button").disabled = false
      document.getElementById("toFloor351Button").disabled = false
      document.getElementById("continueButton").style.display = "none"
      game.inSharkCutscene = false
      document.getElementById("glockGetDiv").style.display = "block"
      document.getElementById("glockIcon").style.display = "block"
      if (game.currentTip == 17) game.currentTip = 18
    }
  }
  else if (game.sharkCutscenesViewed == 2) {
    if (game.currentSharkDialogue < 4) {
      game.currentSharkDialogue++
      $("#sharkText2").html(sharkDialogue3[game.currentSharkDialogue])
      
    }
    else {
      $("#sharkText2").html("*Dead noises*")
      game.sharkCutscenesViewed = 3
      document.getElementById("floorUpButton").disabled = false
      document.getElementById("floorDownButton").disabled = false
      document.getElementById("toGroundFloorButton").disabled = false
      document.getElementById("toFloor49Button").disabled = false
      document.getElementById("toFloor99Button").disabled = false
      document.getElementById("toFloor149Button").disabled = false
      document.getElementById("toFloor248Button").disabled = false
      document.getElementById("toFloor299Button").disabled = false
      document.getElementById("toFloor351Button").disabled = false
      document.getElementById("continueButton").style.display = "none"
      game.inSharkCutscene = false
      document.getElementById("shark2").src = "img/sharkDead.png"
      for (i=0; i<game.sharkUpgrades2Bought.length; i++) document.getElementsByClassName("sharkUpgrade2")[i].style.display = "inline-block"
    }
  }
}

glockEffectPoint = 0
function glockEffects() {
  glockEffectPoint += 0.2
  document.getElementById("shine").style.transform = "translate(-50%, -50%) rotate(" + glockEffectPoint + "deg)"
}

setInterval(glockEffects, 10)

document.addEventListener('mousemove', logKey);

function logKey(e) {
  document.getElementById("glock").style.left = (45 + (e.clientX / window.innerWidth * 10)) + "%"
  document.getElementById("glock").style.top = (45 + (e.clientY / window.innerWidth * 10)) + "%"
}

function closeGlockDiv() {document.getElementById("glockGetDiv").style.display = "none"}

function buySharkUpgrade2(x) {
  if (x==1 && game.cocoaHoney.gte("JJ50") && game.sharkUpgrades2Bought[0] != true) {
    game.sharkUpgrades2Bought[0] = true
    document.getElementsByClassName("sharkUpgrade2")[0].disabled = true
    game.t1bp = ExpantaNum(1)
    game.t2bp = ExpantaNum(0)
    game.t3bp = ExpantaNum(0)
    game.t4bp = ExpantaNum(0)
    game.t5bp = ExpantaNum(0)
    game.t6bp = ExpantaNum(0)
    game.t1ebp = ExpantaNum(0)
    game.t2ebp = ExpantaNum(0)
    game.t3ebp = ExpantaNum(0)
    game.t4ebp = ExpantaNum(0)
    game.t5ebp = ExpantaNum(0)
    bloodProductionUpdate()
  }
  else if (x==2 && game.cocoaHoney.gte("JJ1e80") && game.sharkUpgrades2Bought[1] != true) {
    game.sharkUpgrades2Bought[1] = true
    document.getElementsByClassName("sharkUpgrade2")[1].disabled = true
  }
  else if (x==3 && game.cocoaHoney.gte("JJ10^^60") && game.sharkUpgrades2Bought[2] != true) {
    game.sharkUpgrades2Bought[2] = true
    document.getElementsByClassName("sharkUpgrade2")[2].disabled = true
  }
  else if (x==4 && game.cocoaHoney.gte("JJ10^^^60") && game.sharkUpgrades2Bought[3] != true) {
    game.sharkUpgrades2Bought[3] = true
    document.getElementsByClassName("sharkUpgrade2")[3].disabled = true
  }
  else if (x==5 && game.bloodGems >= 1000 && game.sharkUpgrades2Bought[4] != true) {
    game.sharkUpgrades2Bought[4] = true
    document.getElementsByClassName("sharkUpgrade2")[4].disabled = true
  }
  else if (x==6 && game.bloodGems >= 1500 && game.sharkUpgrades2Bought[5] != true) {
    game.sharkUpgrades2Bought[5] = true
    document.getElementsByClassName("sharkUpgrade2")[5].disabled = true
  }
  else if (x==7 && game.bloodGems >= 1711 && game.sharkUpgrades2Bought[6] != true) {
    game.sharkUpgrades2Bought[6] = true
    document.getElementsByClassName("sharkUpgrade2")[6].disabled = true
    document.getElementById("macIcon").style.display = "block"
    document.getElementById("goldenHoneyIcon").style.display = "block"
    document.getElementById("goldenHoneyText").style.display = "block"
    if (game.currentTip == 18) game.currentTip = 19
  }
}

function buyGoldenUpgrade(x) {
  if (x==1 && game.cocoaHoney.gte(ExpantaNum.expansion(10,10)) && game.goldenUpgradesBought[0] != true) {
    game.goldenUpgradesBought[0] = true
    document.getElementsByClassName("goldenUpgrade")[0].disabled = true
    document.getElementById("toFloor351Button").style.display = "block"
  }
  else if (x==2 && game.cocoaHoney.gte(ExpantaNum.expansion(10,15)) && game.goldenUpgradesBought[1] != true) {
    game.goldenUpgradesBought[1] = true
    document.getElementsByClassName("goldenUpgrade")[1].disabled = true
  }
  else if (x==3 && game.cocoaHoney.gte(ExpantaNum.expansion(10,25)) && game.goldenUpgradesBought[2] != true) {
    game.goldenUpgradesBought[2] = true
    document.getElementsByClassName("goldenUpgrade")[2].disabled = true
  }
  else if (x==4 && game.cocoaHoney.gte(ExpantaNum.expansion(10,50)) && game.goldenUpgradesBought[3] != true) {
    game.goldenUpgradesBought[3] = true
    document.getElementsByClassName("goldenUpgrade")[3].disabled = true
  }
  else if (x==5 && game.cocoaHoney.gte(ExpantaNum.expansion(10,100)) && game.goldenUpgradesBought[4] != true) {
    game.goldenUpgradesBought[4] = true
    document.getElementsByClassName("goldenUpgrade")[4].disabled = true
  }
  else if (x==6 && game.cocoaHoney.gte(ExpantaNum.expansion(10,500)) && game.goldenUpgradesBought[5] != true) {
    game.goldenUpgradesBought[5] = true
    document.getElementsByClassName("goldenUpgrade")[5].disabled = true
  }
  else if (x==7 && game.cocoaHoney.gte(ExpantaNum.expansion(10,5000)) && game.goldenUpgradesBought[6] != true) {
    game.goldenUpgradesBought[6] = true
    document.getElementsByClassName("goldenUpgrade")[6].disabled = true
  }
  else if (x==8 && game.cocoaHoney.gte(ExpantaNum.expansion(10,15000000)) && game.goldenUpgradesBought[7] != true) {
    game.goldenUpgradesBought[7] = true
    document.getElementsByClassName("goldenUpgrade")[7].disabled = true
  }
  else if (x==9 && game.cocoaHoney.gte(ExpantaNum.expansion(10,1e8)) && game.goldenUpgradesBought[8] != true) {
    game.goldenUpgradesBought[8] = true
    document.getElementsByClassName("goldenUpgrade")[8].disabled = true
  }
}

function goldenEelAttack() {
  if (game.energy > 0) {
    game.energy = Math.max(Math.round(game.energy - (4 + 20 / game.timeSinceAttack)), 0)
    game.timeSinceAttack = 1
    game.goldenEelHealth -= game.goldenHoney
    if (game.goldenEelHealth < 0) {
      game.goldenEelHealth = 0
      game.goldenEelDefeated = true
      game.fightingMonster = false
      document.getElementById("goldenEel").src = "img/enemy37dead.png"
      document.getElementById("goldenEelBar").style.display = "none"
      document.getElementById("goldenEelAttackInfo").style.display = "none"
      document.getElementById("goldenEelAttackButton").style.display = "none"
      document.getElementById("floorUpButton").disabled = false
    }
  }
}