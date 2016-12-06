var myGamePiece;
function startGame() {
    myGameArea.start();
    kigyo = new snake(2);
    kigyo.speed = 100;
}
var i = 100;
var b = false;
var isPressed = false;
function restart()
{
    kigyo.reset();
    b = false;
    i=100;
}
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.intervall = setInterval(updateGameArea, 1);
        window.addEventListener('touchstart', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, 600, 400);
    }
}

function snake(l) {
    this.x = 4;
    this.y = 4;
    this.xKaja = Math.floor(Math.random() * 47);
    this.yKaja = Math.floor(Math.random() * 26);
    this.l = l;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.g = myGameArea.context;
    this.xArr = new Array(3,2);
    this.yArr = new Array(4,4);
    this.speed = 100;
    this.draw = function () {
        this.g.fillStyle = "rgb(100,100,100)";
        this.redraw();
        this.g.fillRect(this.x*10,this.y*10,10,10);
        this.g.fillRect(this.xKaja*10,this.yKaja*10,10,10);
        for(i = 0 ; i < l ; i ++)
        {
            this.g.fillRect(this.xArr[i]*10+1,this.yArr[i]*10+1,10-2,10-2);
        }
        if(this.x == this.xKaja && this.y == this.yKaja)
        {
            this.pick();
            this.xKaja = Math.floor(Math.random() * 47);
            this.yKaja = Math.floor(Math.random() * 26);

        }
    }
    this.redraw = function () {
        for( i = l-1 ; i>0; i--)
        {
            this.xArr[i]=this.xArr[i-1];
            this.yArr[i]=this.yArr[i-1];
            if( this.x + (this.xSpeed) == this.xArr[i] && this.y + (this.ySpeed) == this.yArr[i])
            {
                b=true;
            }
        }
        this.xArr[0]=this.x;
        this.yArr[0]=this.y;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
        if(this.x == 48)
            this.x = 0;
        if(this.y == 27)
            this.y = 0;
        if(this.x == -1)
            this.x = 47;
        if(this.y == -1)
            this.y = 26;
    }
    this.pick = function () {
        l++;
        this.speed--;
    }
    this.setDirection = function (xSpeed,ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
    this.reset = function () {
        this.x = 4;
        this.y = 4;
        this.xArr[0]=3;
        this.xArr[1]=2;
        this.yArr[0]=4;
        this.yArr[1]=4;
        l=2;
        this.speed = 100;
        this.xSpeed = 1;
        this.ySpeed = 0;

    }
}

function updateGameArea() {
    if (i >= kigyo.speed&&!isPressed) {
        myGameArea.clear();
        kigyo.draw();
    }
    if (i >= 30)
    {
        isPressed = false;
    }
    if(!b)
    i++;
    else i=0;
    if (myGameArea.key && myGameArea.key == 27) {
        b=!b;
    }
    if (myGameArea.key && myGameArea.key == 37 && !b) {
        kigyo.setDirection(-1,0);
        if(!isPressed)
        {
            myGameArea.clear();
            kigyo.draw();
            isPressed = true;
            i=0;
        }
    }
    if (myGameArea.key && myGameArea.key == 39 && !b) {
        kigyo.setDirection(1,0);
        if(!isPressed)
        {
            myGameArea.clear();
            kigyo.draw();
            isPressed = true;i=0;
        }
    }
    if (myGameArea.key && myGameArea.key == 38 && !b) {
        kigyo.setDirection(0,-1);
        if(!isPressed)
        {
            myGameArea.clear();
            kigyo.draw();
            isPressed = true;i=0;
        }
    }
    if (myGameArea.key && myGameArea.key == 40 && !b) {
        kigyo.setDirection(0,1);
        if(!isPressed)
        {
            myGameArea.clear();
            kigyo.draw();
            isPressed = true;i=0;
        }
    }
    if(myGameArea.x >300 && myGameArea.y >200)
    {
        kigyo.setDirection(1,0);
        myGameArea.clear();
        kigyo.draw();
        isPressed = true;i=0;
    }
    if (myGameArea.key == false)
    {
        isPressed = false;
    }

}
function moveup() {
    if(!isPressed)
    {
        kigyo.setDirection(0,-1);
        myGameArea.clear();
        kigyo.draw();
        isPressed = true;i=0;
    }
}
function moveleft()
{
    if(!isPressed)
    {
        kigyo.setDirection(-1,0);
        myGameArea.clear();
        kigyo.draw();
        isPressed = true;i=0;
    }
}
function moveright()
{
    if(!isPressed)
    {
        kigyo.setDirection(1,0);
        myGameArea.clear();
        kigyo.draw();
        isPressed = true;i=0;
    }
}
function movedown()
{
    if(!isPressed)
    {
        kigyo.setDirection(0,1);
        myGameArea.clear();
        kigyo.draw();
        isPressed = true;i=0;
    }
}