var isGameOver
var player
var playerImage
var enemy
var enemyImage
var backgroundImage
var dodgeCount

function preload() {
    playerImage = loadImage('https://cloud-9x4hvopq6-hack-club-bot.vercel.app/0N5uCbDu.png')
    enemyImage = loadImage('https://cloud-4lajub4te-hack-club-bot.vercel.app/0OdL0XPt.png')
    backgroundImage = loadImage('https://cloud-dptjloh1q-hack-club-bot.vercel.app/0aKQOg3G.png')
    dodgeCount = 0
}

function setup() {
    isGameOver = false
    createCanvas(250,250)
    player = createSprite(width / 2, height - (playerImage.height/2), 0, 0);
    player.addImage(playerImage)
    enemy = createSprite(random(5, width - 5), 0, 0, 0)
    enemy.addImage(enemyImage)
    enemy.rotationSpeed = 4.0
}

function draw() {
    if (isGameOver) {
        gameOver()
    } else {
        if (enemy.overlap(player)) {
            isGameOver = true
        }
    
        background(backgroundImage)
    
        if (keyDown(RIGHT_ARROW) && player.position.x < width - (playerImage.height/2)) {
            player.position.x = player.position.x + 5
        }
    
        if (keyDown(LEFT_ARROW) && player.position.x > (playerImage.height/2)) {
            player.position.x = player.position.x - 5
        }
    
        enemy.position.y = enemy.position.y + 6
    
        if (enemy.position.y > height) {
            enemy.position.y = 0
            enemy.position.x = random(5, width - 5)
            dodgeCount = dodgeCount + 1
        }
    
        drawSprites()
    }
    
}

function gameOver() {
    background(0)
    textAlign(CENTER)
    fill('white')
    text('Game Over!', width / 2, height / 2)
    if (dodgeCount == 1) {
        text('You dodged 1 asteroid.', width / 2, (5 * height) / 8)
    } else {
        text('You dodged ' + dodgeCount + ' asteroids.', width / 2, (5 * height) / 8)
    }
    text('Click anywhere to try again', width / 2, (3 * height) / 4)
}

function mouseClicked() {
    if (isGameOver) {
        isGameOver = false
        player.position.x = width / 2
        player.position.y = height - (playerImage.height/2)
        enemy.position.x = random(5, width - 5)
        enemy.position.y = 0
        dodgeCount = 0
    }
}