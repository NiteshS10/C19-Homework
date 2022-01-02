var play = 1
var end = 0
var gameState = play;

var CHARACTER, character;
var groundImg, ground;

var GameoverImg, Gameover;

var cloudsGroup, clouds;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score = 0;

var geometrydashSound;
var invisibleGround;


function preload() {
    geometrydashSound = loadSound("Mario.mp3");

    groundImg = loadImage("ground.jpg");
    character = loadImage("character.jpg");

    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    clouds = loadImage("clouds.jpeg");

    GameoverImg = loadImage("Gameover.jpg");
}


function setup() {
    createCanvas(500, 500);

    CHARACTER = createSprite(50, 180, 20, 50)
    CHARACTER.scale = 0.04;
    CHARACTER.addImage("character", character);

    Ground = createSprite(200, 180, 400, 20);
    Ground.scale = 1.1;
    Ground.addImage("ground", groundImg);


    Gameover = createSprite(300, 100);
    Gameover.scale = 0.2;

    invisibleGround = createSprite(-450, -475, 400, 10);
    invisibleGround.x = Ground.x;
    invisibleGround.visible = false;

    cloudsGroup = createGroup();
    obstaclesGroup = createGroup();

    CHARACTER.setCollider("rectangle", 0, 0, CHARACTER.width, CHARACTER.height);
    CHARACTER.debug = false;

    score = 0;
}


function draw() {
    background(180);

    geometrydashSound.loop();

    text("Score" + score, 500, 50);

    if (gameState === play) {
        Gameover.visible = false;
        CHARACTER.velocityX = 3;
        Ground.velocityX = -(4 + 3 * score / 100);
        score = score + Math.round(getFrameRate() / 60);

        if (Ground.x < 0) {
            Ground.x = 500;
        }

        if (keyDown("space") && trex.y >= 161.5) {
            CHARACTER.velocityY = -12;
        }

        CHARACTER.velocityY = CHARACTER.velocityY + 0.8;

        spawnClouds();
        spawnObstacles();

        if (obstaclesGroup.isTouching(CHARACTER)) {
            gameState === end;
        }
    }

    else if (gameState === end) {
        GameoverImg.visible = true;

        geometrydashSound.stop();

        ground.velocityX = 0;
        CHARACTER.velocityY = 0;
        CHARACTER.velocityX = 0;

        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);

        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

        if (mousePressedOver(Gameover)) {
            reset();
        }
    }
    CHARACTER.collide(invisibleGround);

    drawSprites();
}


function reset() {
    gameState === play;
    Gameover.visible = false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score = 0;
}


function spawnObstacles() {
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(600, 165, 10, 40);
        obstacle.velocityX = -(6 + score / 100);
        var rand = Math.round(random(1, 3));
        switch (rand) {
            case 1: obstacle.addImage(obstacle1);
                break;
            case 2: obstacle.addImage(obstacle2);
                break;
            case 3: obstacle.addImage(obstacle3);
            default: break;
        }
        obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
    }
}

function spawnClouds() {
    if (frameCount % 60 === 0) {
        var cloud = createSprite(600, 120, 40, 10);
        cloud.y = Math.round(random(80, 120));
        cloud.addImage("clouds.jpeg");
        cloud.scale = 0.2;
        cloud.velocityX = -3;
        cloud.lifetime = 200;
        cloud.depth = CHARACTER.depth;
        CHARACTER.depth = CHARACTER.depth + 1;
        cloudsGroup.add(clouds);
    }

}