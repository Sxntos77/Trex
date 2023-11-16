//variaveis
var canvas
var chao, chaoImg
var Trex, TrexRun
var chaoInv
var nuvem
var nuvemImg 
var Cactos
var img1,img2,img3,img4,img5,img6
var grupoNuvem,GrupoCactos
var play = 1
var end = 0
var gamestate = play
var score
var trexGameOver
var somPulo,somGameOver,somScore
var gameOver,GImg,restart,rImg
function preload(){
    TrexRun = loadAnimation("t1.png", "t2.png", "t3.png", "t4.png")
    chaoImg = loadImage("ground2.png")
    nuvemImg = loadImage ("cloud.png")
    img1 = loadImage ("obstacle1.png")
    img2 = loadImage ("obstacle2.png")
    img3 = loadImage ("obstacle3.png")
    img4 = loadImage ("obstacle4.png")
    img5 = loadImage ("obstacle5.png")
    img6 = loadImage ("obstacle6.png")
    trexGameOver = loadImage ("trex_collided.png")
    somPulo = loadSound ("jump.mp3")
    somGameOver = loadSound ("die.mp3")
    somScore = loadSound ("checkpoint.mp3")
    GImg = loadImage ("gameOver.png")
    rImg = loadImage ("restart.png")
}
function setup(){
canvas = createCanvas(800,300)
Trex = createSprite(150,200)
Trex.addAnimation("Run", TrexRun)
Trex.addAnimation("die", trexGameOver)
Trex.scale = 0.7
Trex.setCollider("circle",0,0)
chao = createSprite(400,250)
chao.addImage("chao",chaoImg)
chaoInv = createSprite (150,265,200,10)
chaoInv.visible = false;
grupoNuvem = createGroup()
GrupoCactos = createGroup()
gameOver = createSprite (width/2,100)
gameOver.addImage(GImg)
restart = createSprite(width/2,150)
restart.addImage(rImg)
score = 0
}
function draw(){
    background(170)
    drawSprites()
    fill("white")
    textSize(20)
    text("score: "+score,700,30)

    if (gamestate===play){
        LogicaTrex()
        logicaChao()
        gerarNuvens()
        gerarCactos()
        somaScore()
        if(score>0&&score%100===0){
            somScore.play()
        }
        gameOver.visible = false
        restart.visible = false
        if(GrupoCactos.isTouching(Trex)){
            console.log("morreu")
            gamestate = end
            Trex.changeAnimation("die")
            somGameOver.play()
        }

    }
    if (gamestate===end){
        chao.velocityX = 0
        gameOver.visible = true
        restart.visible = true
        Trex.velocityY = 0
        grupoNuvem.setVelocityXEach(0)
        GrupoCactos.setVelocityXEach(0)
        grupoNuvem.setLifetimeEach(-1)
        GrupoCactos.setLifetimeEach(-1)
        if(mousePressedOver(restart)){
            console.log("clicou")
            reset()
        }
    }
    
   
}
function reset(){
GrupoCactos.destroyEach()
grupoNuvem.destroyEach()
score=0
gamestate = play
Trex.changeAnimation("Run")
}
function LogicaTrex() {
    //simula a gravidade
    Trex.velocityY+= 0.8
    var noChao = Trex.collide(chaoInv)
    if(keyDown("space")&& noChao){
        Trex.velocityY= -14
        somPulo.play()
    }
    Trex.collide(chaoInv)
}
function logicaChao(){
chao.velocityX = -5
if (chao.x<0) {
    chao.x = chao.width/2
}
}
function gerarNuvens(){ 
    if (frameCount % 60===0) {
        nuvem = createSprite(850,50)
        nuvem.velocityX = -5
        nuvem.addImage(nuvemImg)
        nuvem.y = Math.floor(random(30,140))
        nuvem.lifetime = 1000
        nuvem.depth = -1
        grupoNuvem.add(nuvem)
    }
}

function gerarCactos() {
 if (frameCount% 80===0){
  Cactos = createSprite(900,230,10,40)
  Cactos.scale = 0.7
  Cactos.lifetime = 1000
  Cactos.velocityX = -5
  GrupoCactos.add(Cactos)
  var rand = Math.floor(random(1,7))
  console.log (rand)
 switch(rand){
    case 1: Cactos.addImage(img1)
    break 
    case 2: Cactos.addImage(img2)
    break 
    case 3: Cactos.addImage(img3)
    break 
    case 4: Cactos.addImage(img4)
    break 
    case 5: Cactos.addImage(img5)
    break 
    case 6: Cactos.addImage(img6)
    Cactos.scale = 0.55
    break 
 }
 }
}
function somaScore() {
    if (frameCount%10===0){
        score+=1
    }
}