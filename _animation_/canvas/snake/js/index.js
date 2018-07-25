(function(context){
     
    //game config
    var config={
            width:600,
            height:600,
            unit:10
    };
     
    //game snake
    var snake={
            body:[],
            v:1,
            direction:"left",
             
            init:function(){
                this.body.push({x:config.width/config.unit/2,y:config.height/config.unit/2});
            },
            draw:function(){
                context.save();
                for(var i=0;i<this.body.length;i++){
                    context.fillRect(this.body[i].x*config.unit,this.body[i].y*config.unit,config.unit,config.unit);
                }
                context.restore();
            },
            move:function(direction){
                if(this.direction=="left"&&direction=="right") return;
                if(this.direction=="up"&&direction=="down") return;
                if(this.direction=="right"&&direction=="left") return;
                if(this.direction=="down"&&direction=="up") return;
                 
                this.direction=direction||this.direction;
                 
                var nextX=this.body[0].x;
                var nextY=this.body[0].y;
                if("left"==this.direction){
                    nextX-=this.v;
                }else if("up"==this.direction){
                    nextY-=this.v;
                }else if("right"==this.direction){
                    nextX+=this.v;
                }else if("down"==this.direction){
                    nextY+=this.v;
                }
                 
                this.body.pop(),
                this.body.unshift({x:nextX,y:nextY});
            },
            eatFood:function(food){
                this.body.push({x:food.x,y:food.y});
                environment.destroyFood(food);
            }
    };
     
    var environment={
            currEntifyId:0,
            entity:[],
             
            init:function(){
                 
            },
            nextEntifyId:function(){
                return this.currEntifyId++;
            },
            createFood:function(){
                this.entity.push({id:this.nextEntifyId(),x:parseInt(Math.random()*(config.width/config.unit)), y:parseInt(Math.random()*(config.height/config.unit)), type:"food"});
            },
            destroyFood:function(food){
                var newEntify=[];
                for(var i=0;i<this.entity.length;i++){
                    if(this.entity[i].id==food.id) continue;
                    newEntify.push(this.entity[i]);
                }
                this.entity=newEntify;
            },
            draw:function(){
                 
                context.save();
                var hasFood=false;
                for(var i=0;i<this.entity.length;i++){
                    if(this.entity[i].type=="food"){
                        hasFood=true;
                        context.fillRect(this.entity[i].x*config.unit,this.entity[i].y*config.unit,config.unit,config.unit);
                    }
                }
                context.restore();
                 
                if(!hasFood) this.createFood();
            }
    };
     
    //game event manager
    var gameEvent={
            onSnakeEatFood:function(snake,food){
                snake.eatFood(food);
            },
            onSnakeAgainstWall:function(){
                alert("game over!!!");
            },
            onSnakeEatSelf:function(){
                alert("game over!!!");
            }
    };
     
    //keybord event
    document.onkeydown=function(event){
        var key=event.keyCode;
        if(key==37){ //left
            snake.move("left");
        }else if(key==38){ //up
            snake.move("up");
        }else if(key==39){ //right
            snake.move("right");
        }else if(key==40){ //down
            snake.move("down");
        }
    };
     
    //init game
    environment.init();
    snake.init();
     
    //main game loop
    var currentFrame=0;
    (function gameLoop(){
         
        if(currentFrame%10==0){
            //clear canvas
            context.clearRect(0,0,config.width,config.height); 
             
            //check event
            if(snake.body[0].x<=0||snake.body[0].y<=0||
                    snake.body[0].x>=config.width/config.unit||snake.body[0].y>=config.height/config.unit){
                gameEvent.onSnakeAgainstWall();
            }
            for(var i=1;i<snake.body.length;i++){
                var dX2=Math.pow(snake.body[0].x-snake.body[i].x,2);
                var dY2=Math.pow(snake.body[0].y-snake.body[i].y,2);
                if((dX2+dY2)==0){
                    gameEvent.onSnakeEatSelf();
                }
            }
            for(var i=0;i<environment.entity.length;i++){
                var entifyX=environment.entity[i].x;
                var entifyY=environment.entity[i].y;
                var entifyType=environment.entity[i].type;
                 
                var dX2=Math.pow((snake.body[0].x-entifyX),2);
                var dY2=Math.pow((snake.body[0].y-entifyY),2);
                 
                if((dX2+dY2)==0){
                    gameEvent.onSnakeEatFood(snake,environment.entity[i]);
                }
            }
             
            //draw stage
            environment.draw();
            snake.move();
            snake.draw();
        }
         
        //next frame
        currentFrame++;
        requestAnimationFrame(gameLoop);
    })();
     
})(document.getElementById("gameCanvas").getContext("2d"));