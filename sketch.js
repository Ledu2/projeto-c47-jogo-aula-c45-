var balloon, cityBackground, restart, restartImg, obsTop1, obsTop2;
var balloon_img, cityBackground_Image, obsTop1_Image, obsTop2_Image;
var obstaclesGroup, gameOver, gameOver_Image;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
    cityBackground_Image = loadImage("assets/cityImage.png");
    balloon_img = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    obsTop1_Image = loadImage("assets/obsTop1.png");
    obsTop2_Image = loadImage("assets/obsTop2.png");
    restartImg = loadImage("assets/restart.png");
    gameOver_Image = loadImage("assets/fimdejogo.png");
}

function setup(){
    createCanvas(700, 560);

    /* imagem de fundo */
    cityBackground = createSprite(350, 280);
    cityBackground.addImage(cityBackground_Image);
    cityBackground.scale = 0.4;

    /* personagem */
    balloon = createSprite(100, 200, 20, 50);
    balloon.addAnimation("balloon", balloon_img);
    balloon.scale = 0.35;

    obstaclesGroup = new Group();

    gameOver = createSprite(350, 280);
    gameOver.addImage(gameOver_Image);
    gameOver.scale = 0.5;

    restart = createSprite(350, 320);
    restart.addImage(restartImg);
    restart.scale = 0.5;
}

function draw() {
    background("black");
    score = score + Math.round(frameCount/60);
    textFont("algerian");
    textSize(20);
    fill("black");
    text("Distância percorrida: " + score, 500, 100);

        if(gameState == PLAY){
        gameOver.visible = false;
        restart.visible = false;
        
        console.log(score);

        cityBackground.velocityX = -2;

        if(cityBackground.x < 200){
            cityBackground.x = cityBackground.width/2 - 750;
        }

        /* fazendo o balão de ar "pular" */
        if(keyDown("space")){
            balloon.velocityY = -5;
        }
        balloon.velocityY += 0.4;
        spawnObstacles()

        if(obstaclesGroup.isTouching(balloon)){
            gameState = END;
        }
        
    }

    

    if(gameState == END){
        gameOver.visible = true;
        restart.visible = true;

        balloon.velocityX = 0;
        balloon.velocityY = 0;

        cityBackground.velocityX = 0;

        obstaclesGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)){
            reset();
        }
    }

    //distanciaPercorrida();
    drawSprites()
}

function spawnObstacles(){
    
    if(frameCount%60 == 0){
        var obstacle = createSprite(650, 50, 40, 50);
        obstacle.velocityX = -4;
        obstacle.scale = 0.1;
        obstacle.y = Math.round(random(20,550));

        /* gerando os obstaculos aleatórios */
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1 : obstacle.addImage(obsTop1_Image);
            break;

            case 2 : obstacle.addImage(obsTop2_Image);
            break;

            default: break;
        }

        obstacle.lifetime = 250;
        obstaclesGroup.add(obstacle);
    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    cityBackground.velocityX = -2;
    score = 0;
}

/* function distanciaPercorrida(){

} */