// const playerName = prompt("Skriv ditt namn: ")
const playerName = "HotmaleSlayer6000" // statiskt så vi slipper prompt varje körning
let playerHp = 100


function rollDice() {
    return Math.ceil(Math.random() * 20)  // Back to d6 (1-6)
}

const playButton = document.querySelector("#play-button")
const playerHpElement = document.querySelector("#player-hp")
const enemyHpElement = document.querySelector("#enemy-hp")
const combatLogElement = document.querySelector("#combat-log")

function log(msg, type) {
    const li = document.createElement("li")
    if (type) {
        li.classList.add(type)
    }
    li.textContent = msg
    combatLogElement.appendChild(li)
    if (combatLogElement.childNodes.length > 10) {
        combatLogElement.removeChild(combatLogElement.firstChild)
    }
}

const enemies = [
    {
        "name": "Goblin Grunt",
        "hp": 40,
        "appearMessage": "A wild, and frankly, quite smelly Goblin Grunt stumbles out!"
    },
    {
        "name": "Confused Tourist",
        "hp": 30,
        "appearMessage": "A Confused Tourist wanders in, map upside down. 'Is this the bathroom?'"
    },
    {
        "name": "Extremely Sarcastic Slime",
        "hp": 50,
        "appearMessage": "An Extremely Sarcastic Slime oozes into view. 'Oh, great. You. Just what I needed.'"
    },
    {
        "name": "Grumpy Dwarf",
        "hp": 80,
        "appearMessage": "A Grumpy Dwarf stomps in, muttering about 'kids these days.'"
    },
    {
        "name": "A Single, Very Angry Bee",
        "hp": 5,
        "appearMessage": "BZZZZZZ! A Single, Very Angry Bee appears! It's... just one bee? Oh no."
    },
    {
        "name": "Sentient Puddle of Mystery Ooze",
        "hp": 65,
        "appearMessage": "A Sentient Puddle of Mystery Ooze gurgles menacingly on the floor. Don't step in it."
    },
    {
        "name": "Possessed Garden Gnome",
        "hp": 45,
        "appearMessage": "A Possessed Garden Gnome materializes! Its eyes glow red and it's holding a tiny, sinister fishing rod."
    },
    {
        "name": "Three Raccoons in a Trench Coat",
        "hp": 90,
        "appearMessage": "A tall, lumpy figure appears. It's Three Raccoons in a Trench Coat! They're trying to buy beer."
    },
    {
        "name": "Unpaid Intern",
        "hp": 25,
        "appearMessage": "An Unpaid Intern shuffles in, clutching a stack of papers. 'Did... did someone say 'exposure'?'"
    },
    {
        "name": "Mannequin That Moves When You Don't Look",
        "hp": 70,
        "appearMessage": "You blink, and suddenly a Mannequin That Moves When You Don't Look is right in front of you."
    },
    {
        "name": "Agressive Toaster",
        "hp": 55,
        "appearMessage": "An Agressive Toaster springs into the fight, threatening to burn your breakfast!"
    },
    {
        "name": "The Concept of Mild Inconvenience",
        "hp": 100,
        "appearMessage": "You suddenly realize The Concept of Mild Inconvenience is here. Your shoelace is untied and you have an itch you can't reach."
    },
    {
        "name": "Chad, the T-Posing Knight",
        "hp": 120,
        "appearMessage": "Chad, the T-Posing Knight slides into view, asserting dominance. He hasn't even loaded properly!"
    },
    {
        "name": "Rogue, Self-Aware Wacky Waving Inflatable Tube Man",
        "hp": 85,
        "appearMessage": "A Rogue, Self-Aware Wacky Waving Inflatable Tube Man flails wildly into the area! The wind is not blowing."
    },
    {
        "name": "The 'Um, Actually' Gremlin",
        "hp": 40,
        "appearMessage": "A small creature appears. 'Um, actually,' it squeaks, 'your previous encounter was statistically suboptimal.' It's The 'Um, Actually' Gremlin!"
    },
    {
        "name": "Susan From Accounting",
        "hp": 150,
        "appearMessage": "Susan From Accounting appears! 'I'm just circling back on that expense report you never filed!'"
    },
    {
        "name": "Literal-Minded Golem",
        "hp": 200,
        "appearMessage": "You said you wanted a 'rock-hard' challenge. A Literal-Minded Golem appears."
    },
    {
        "name": "A Box With 'Definitely Not a Mimic' Painted On It",
        "hp": 75,
        "appearMessage": "A tempting... box appears? It's A Box With 'Definitely Not a Mimic' Painted On It! Or is it? (It is.)"
    },
    {
        "name": "Overly Caffeinated Squirrel",
        "hp": 35,
        "appearMessage": "ZIIIP! An Overly Caffeinated Squirrel twitches into existence, eyes wide, chittering at the speed of sound."
    },
    {
        "name": "A Chair. Just a Regular Chair.",
        "hp": 10,
        "appearMessage": "A Chair. Just a Regular Chair. appears. It just... sits there. Menacingly?"
    },
    {
        "name": "𝗧̘̚𝗵̘̚𝗲̘̚ 𝗘̘̚𝗿̘̚𝗿̘̚𝗼̘̚𝗿̘̚ 𝗜̘̚𝗻̘̚ 𝗧̘̚𝗵̘̚𝗲̘̚ 𝗖̘̚𝗼̘̚𝗱̘̚𝗲̘̚",
        "hp": 999,
        "appearMessage": "An ominous presence looms...█████ It's The ɆⱤⱤØ█████ in █████de! It looks confu█████ and slightly b̘͖ͤͦ̽ͩͭ_̴̢̥̓r̴̡͍̭͚̙͔̆ͪ́̓ͭͫͥͦo͌_͈́_͎_̶̴̥̟̫̹ͣ͗͗̎̌̌ͯ̈́̚͘͟͜͡k̛̬͉̘ͦͪͫ_̵̸̶̢͓̤̣̱̟̰̗͈̓̇̂ͬͭ̿̊̅͆͂͗̋͞e͖_̴̟̉n̶̡̧̻̭͍̳͖̝͖̝̙̭̻͐͒͆́̎̄͊͡........"
    }
]

const enemy = enemies[Math.floor(Math.random() * enemies.length)]

function gameRound() {
    const playerRoll = rollDice()
    const enemyRoll = rollDice()
    if (playerRoll > enemyRoll) {
        const damage = playerRoll - enemyRoll
const playerAttackMessages = [
            `${playerName} gave ${enemy.name} a solid BONK for ${damage} Damage!`,
            `${playerName} absolutely wrecked ${enemy.name}'s day for ${damage} Damage!`,
            `${playerName} served ${enemy.name} a knuckle sandwich, extra ${damage} Damage!`,
            `${playerName} politely *booped* ${enemy.name} on the snoot for ${damage} Damage.`,
            `${playerName} yelled "YEET!" and dealt ${damage} Damage!`,
            `${playerName} successfully subtracted ${damage} HP. Math is fun!`,
            `${playerName} delivered a certified THWACK for ${damage} Damage!`,
            `${playerName} sent ${enemy.name}'s ancestors a ${damage}-point message!`,
            `Ouch! ${playerName} just clocked ${enemy.name} for ${damage} Damage.`,
            `${playerName} administered a high-velocity ${damage}-point hug. To the face.`,
            `${enemy.name} was just minding its own business until ${playerName} showed up and did ${damage} Damage!`,
            `${playerName} hit ${enemy.name} for ${damage} Damage. This is gonna leave a mark.`,
            `${playerName} applied ${damage} Damage directly to ${enemy.name}'s "ouch" bits.`,
            `${playerName} gave ${enemy.name} ${damage} reasons to rethink its life choices.`
        ]
        log(playerAttackMessages[Math.floor(Math.random() * playerAttackMessages.length)], "player")
        enemy.hp -= damage
    } else if (enemyRoll > playerRoll) {
        const damage = enemyRoll - playerRoll
        log(`Ouch, You got hit and lost ${damage} hp!`, "enemy")
        playerHp -= damage
    } else {
        log("Nice parry, Now STRIKE!")
    }



    if (playerHp < 1 || enemy.hp < 1) {
        playButton.disabled = true;
        if (playerHp < 1) {
            log("GAME OVER - Enemy Won!")
        } else {
            log(`Congrats - ${playerName} Won!`)
        }
    } else if (playerHp < 30) {
        playerHpElement.classList.add("low-hp")
    }

    playerHpElement.textContent = playerHp
    enemyHpElement.textContent = enemy.hp
}
playerHpElement.textContent = playerHp
enemyHpElement.textContent = enemy.hp
log(`${enemy.appearMessage}`)
playButton.addEventListener("click", gameRound)