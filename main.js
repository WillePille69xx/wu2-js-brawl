// const playerName = prompt("Skriv ditt namn: ")
const playerName = "HotmaleSlayer6000" // statiskt så vi slipper prompt varje körning
let playerHp = 100
let enemyHp = 100

function rollDice() {
    return Math.ceil(Math.random() * 20)
}

const playButton = document.querySelector("#play-button")
const playerHpElement = document.querySelector("#player-hp")
const enemyHpElement = document.querySelector("#enemy-hp")
const combatLogElement = document.querySelector("#combat-log")

function log(msg) {
    const li = document.createElement("li")
    li.textContent = msg
    combatLogElement.appendChild(li)
    if (combatLogElement.childNodes.length > 10) {
        combatLogElement.removeChild(combatLogElement.firstChild)
    }
}

function gameRound() {
    const playerRoll = rollDice()
    const enemyRoll = rollDice()
    if (playerRoll > enemyRoll) {
        const damage = playerRoll - enemyRoll
        log(`You hit the enemy for ${damage}!`)
        enemyHp -= damage
    } else if (enemyRoll > playerRoll) {
        const damage = enemyRoll - playerRoll
        log(`Ouch, You got hit and lost ${damage} hp!`)
        playerHp -= damage
    } else {
        log("Nice parry, Now STRIKE!")
    }


    if (playerHp < 1 || enemyHp < 1) {
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
    enemyHpElement.textContent = enemyHp
}
playerHpElement.textContent = playerHp
enemyHpElement.textContent = enemyHp
playButton.addEventListener("click", gameRound)