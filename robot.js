var count = 0;
var count1 = 0;
var coin = new Audio('audio/coin.mp3');
var wall = new Audio('audio/wall.mp3');
var move = new Audio('audio/Move.mp3');
var left = new Audio('audio/Left.mp3');
var right = new Audio('audio/Right.mp3');
var list = [];
var list1 = [];
var l = [];
var delay = 1000; 
var c = 3;
var model = {
    currentRobot: null,
    init: {
        x: 0,
        y: 0,
        f: "north"
    }
};
window.onkeydown = function(event){
   var x = event.keyCode;
   if(x==37)
      delay+=200;
   else if(x==39&&delay>0)
      delay-=200;
   else
     delay+=0;
  };
var controller = {
 init:function(){
    
   model.currentRobot = model.init;
   var file = document.getElementById("get_file").files[0];
    var reader= new FileReader();
    reader.readAsText(file, "UTF-8");
     reader.onload = function (evt)
     {
       var so = new Audio('audio/flight.mp3');
       so.play();
        var temp = evt.target.result
 //       alert(temp);
        var v = temp.split(/\r\n|\n/);
        var s = v[0].split(',');
        reportView.init();
        x = s[0];y=s[1];
   //    delay = parseInt(v[1]);
        canvasView.init(s[0],s[1]);
        var k = v[1].split(',');
        list1 = k;
        canvasView.setCoin(list1);
        canvasView.setWall(v[2]);
      var i = 3;
      myLoop(i);
    function myLoop(i){
       setTimeout(function(){
          controller.actions(v[i],v[2],list1);
         i++;
        console.log(delay);
          if(i < v.length-1)
               myLoop(i);
       },delay);
       }
     }
   },
        
   actions:function(str,w,list1){ 
        if(str=="move")
          {
             controller.move(w,list1);move.play();
          }
         else if(str=="right")
         { 
             controller.right();right.play();
         }
         else if(str=="left")
         { 
             controller.left();left.play();
         }
        else if(str.charAt(0)=='i')
         { 
             controller.movel(w,list1);move.play();
          }
        else 
           controller.printErrors("Invalid Command");   
   },

    getCurrentRobot: function () {
        return model.currentRobot;
    },
    setCurrentRobot: function (robot) {
        model.currentRobot = robot;
    },
    resetContents: function () {
        reportView.clear();
    },
  
    /* --------------------------------------------------- */
    /*         the following are command functions
     /* --------------------------------------------------- */
    movel: function(str,vi){
     var currentRobot = this.getCurrentRobot();
     F = currentRobot.f;
    switch(F){
      case "north":
       newX = currentRobot.x + 1;
       newY = currentRobot.y + 1;   
       if(canvasView.isCoin(newY,newX,vi))
       {
         count1++;
         list.unshift(newX);
         list.unshift(newY);
         controller.move(str,vi);
      controller.printErrors("Robot takes a coin!!");
       coin.play();
       }
       else
        if(!canvasView.isWall(newY,newX,str)&&count1 >0 && (0<=newX<x)&&(0<=newY<y))
        {
              list1.unshift(newX);list1.unshift(newY);
            count1--;
      controller.printErrors("Robot puts a coin!!");
        }
       else controller.printErrors("Robot can't have coin!!");

       break;
     case "east": 
       newX = currentRobot.x + 1;
       newY = currentRobot.y + 1;   
       if(canvasView.isCoin(newY-1,newX+1,vi))
       {
         count1++;
         list.unshift(newX+1);
         list.unshift(newY-1);
         controller.move(str,vi);
      controller.printErrors("Robot takes a coin!!");
       coin.play();
       }
       else
        if(!canvasView.isWall(newY,newX,str)&&count1 >0 && (0<=newX<x)&&(0<=newY<y))
        {
           list1.unshift(newY);list1.unshift(newX);
            count1--;
      controller.printErrors("Robot puts a coin!!");
        }
       else controller.printErrors("Robot can't have coin");
       
       break;
     case "west":
       newX = currentRobot.x - 1;
       newY = currentRobot.y - 1;   
       if(canvasView.isCoin(newY,newX,vi))
       {
         count1++;
         list.unshift(newX+1);
         list.unshift(newY+1);
         controller.move(str,vi);
      controller.printErrors("Robot takes a coin!!");
       coin.play();
       }
       else
        if(!canvasView.isWall(newY,newX,str)&&count1 >0 && (0<=newX<x)&&(0<=newY<y))
        {
           list1.unshift(newX+1);list1.unshift(newY+1);
           count1--;
      controller.printErrors("Robot puts a coin!!");
        }
       else controller.printErrors("Robot can't have coin");
       
       break;
      default:
           break;
    }
   },
 move: function (str,vi) {
      controller.printErrors("move");
   //   reportView.renderReport();
        var currentRobot = this.getCurrentRobot(),
            newRobot = {
                x: currentRobot.x,
                y: currentRobot.y,
                f: currentRobot.f
            };
        switch (currentRobot.f) {
            case "north":
                newY = currentRobot.y + 1;
                newX = currentRobot.x + 1;

              if(canvasView.isCoin(newY,newX,vi))
               {
                   count++;
               controller.printErrors("coin");
     //                  coin.play();
               }
              
              if(!canvasView.isWall(newY,newX,str))
               { 
                 if (canvasView.validateBound(newY, "maxY")) {
                    this.clearOriginalRobot();
                     newRobot.y = newY;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                    canvasView.setCoin(vi);
            //   controller.printErrors("emptyCell");
                 }
               }

                     break;
            case "south":
                newY = currentRobot.y - 1;
                newX = currentRobot.x + 1;
              if(canvasView.isCoin(newY,newX,vi))
               {
                     count++;
               controller.printErrors("coin");
       //      coin.play();
               }
                if(!canvasView.isWall(newY,newX,str)){
                  if (canvasView.validateBound(newY, "maxY")) {
                    this.clearOriginalRobot();
                    newRobot.y = newY;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                    canvasView.setCoin(vi);
            //   controller.printErrors("emptyCell");
                 }
              }

                break;
            case "east":
                newX = currentRobot.x + 1;
                newY = currentRobot.y + 1;

              if(canvasView.isCoin(newY-1,newX+1,vi))
               {
                     count++;
               controller.printErrors("coin");
       	 //      coin.play();
               }
                if(!canvasView.isWall(newY-1,newX+1,str))
                {
                  if (canvasView.validateBound(newX, "maxX")) {
                    this.clearOriginalRobot();
                    newRobot.x = newX;
                    this.setCurrentRobot(newRobot);
                    canvasView.renderRobot();
                    canvasView.setCoin(vi);
          //     controller.printErrors("emptyCell");
                  }
               }

                break;
            case "west":
                newX = currentRobot.x - 1;
                newY = currentRobot.y - 1;
               if(canvasView.isCoin(newY+1,newX+1,vi))
               {
                     count++;
               controller.printErrors("coin");
           //     coin.play();
               }
                if(!canvasView.isWall(newY+1,newX+1,str))
                {
                  
                    if (canvasView.validateBound(newX, "maxX")) { 
                        this.clearOriginalRobot();
                    newRobot.x = newX;
                     this.setCurrentRobot(newRobot);
                     canvasView.renderRobot();
                    canvasView.setCoin(vi);
            //   controller.printErrors("emptyCell");
                }
               }

               break;
            default:
                break;
        }
    //   alert("c"+count);
    },
    left: function () {
        this.rotate(false); // get the next from this.robotFacing array in anti-clockwise direction
      controller.printErrors("Left");
                 //   canvasView.setCoin(vi);
    },
    right: function () {
        this.rotate(true); // get the next from this.robotFacing array in clockwise direction
      controller.printErrors("Right");
    },
    report: function () {
        reportView.renderReport();
    },
    rotate: function (clockwise) {
        this.clearOriginalRobot();
        var currentRobot = this.getCurrentRobot(),
            originalFacing = currentRobot.f,
            originalFacingIndex = canvasView.robotFacing.indexOf(originalFacing),
            newFacingIndex,
            totalFacing = canvasView.robotFacing.length,
            newRobot = {
                x: currentRobot.x,
                y: currentRobot.y,
                f: currentRobot.f
            };

        if (clockwise) {
            if (originalFacingIndex === (totalFacing - 1)) {
                newFacingIndex = 0;
            } else {
                newFacingIndex = originalFacingIndex + 1;
            }
        } else {
            if (originalFacingIndex === 0) {
                newFacingIndex = totalFacing - 1;
            } else {
                newFacingIndex = originalFacingIndex - 1;
            }
        }
        newRobot.f = canvasView.robotFacing[newFacingIndex];
        this.setCurrentRobot(newRobot);
        canvasView.renderRobot();
    },
    clearOriginalRobot: function () {
        var origRobot = this.getCurrentRobot();
        canvasView.clearOriginalRobot(origRobot.x, origRobot.y); // clear the original robot first
    },
    /* --------------------------------------------------- */
    /*         end of command functions
     /* --------------------------------------------------- */
    printErrors: function (msg) {
        reportView.renderErrors(msg);
    },
    reset: function () {
        this.clearOriginalRobot();
        this.setCurrentRobot(model.init);
        canvasView.renderRobot();
     //   inputView.reset();
    }
};

var inputView = {
    reset: function () {
        this.commandBox.innerHTML = '';
    }
};

var canvasView = {
    init: function (x,y) {
        this.maxX = x; // x total
        this.maxY = y; // y total
        this.squareSize = 500/this.maxY; // all grids are equal width and height
        this.xStart = 500/(2*this.maxX); // axis x starts from 50px
        this.yStart = 500/(2*this.maxY); // axis y starts from 50px
        this.xEnd = this.xStart + this.squareSize * this.maxX; // axis x starts from 50px
        this.yEnd = this.yStart + this.squareSize * this.maxY; // axis y starts from 50px
        this.canvas = document.getElementById("c");
        this.context = this.canvas.getContext("2d");
        this.renderCanvas(); 

        this.robotFacing = ['north', 'east', 'south', 'west']; // clockwise
        this.robotSize = 225/this.maxX; // is the arrow size actually
        this.renderRobot();
        this.resetButton = document.getElementById('restart');
        this.renderControls();
     },
    renderControls: function () {
        var self = this;

        this.resetButton.addEventListener('click', function () {
            controller.reset();
            controller.init();
           list = [];
                      list1.unshift();list.unshift();
        });
    },
    renderCanvas: function () {
        for (var x = 0; x < (this.maxX + 1); x++) { // draw 6 lines
            var currentAxisX = this.xStart + x * this.squareSize;
            this.context.moveTo(currentAxisX, this.yStart);
            this.context.lineTo(currentAxisX, this.yEnd);

            this.context.strokeText(x, currentAxisX + 500/this.maxX, this.yEnd + 20); // mark x index
        }
        for (var y = 0; y < (this.maxY + 1); y++) {
            var currentAxisY = this.yStart + y * this.squareSize;
            this.context.moveTo(this.xStart, currentAxisY);
            this.context.lineTo(this.xEnd, currentAxisY);

            this.context.strokeText((this.maxY - 1 - y), this.xStart - 20, currentAxisY + 500/this.maxY); // mark y index
        }
        this.context.strokeStyle = "#000";
        this.context.stroke();
    },
    validateBound: function (input, toCheckAxis) {
        if (isNaN(input)) {
            controller.printErrors("Please enter a numeric coordinates!");
            return false;
        } else if (input < 0 || input > (this[toCheckAxis] - 1)) {
            controller.clearOriginalRobot();
            controller.printErrors("There is a wall!");
          wall.play();
            return false;
        } else {
            return true;
        }
    },
    validateFacing: function (face) {
        if (this.robotFacing.indexOf(face.toLowerCase()) < 0) {
            controller.printErrors("Wrong facing!");
            return false;
        } else {
            return true;
       }
    },
    clearOriginalRobot: function (origX, origY) {
        var axisX = origX * this.squareSize + ((this.squareSize/2)+1); // left most point of the current grid deduct stroke width
        var axisY = (this.maxY - origY) * this.squareSize - ((this.squareSize/2)-1); // top most point of the current grid deduct stroke width
        this.context.clearRect(axisX, axisY, this.squareSize-2, this.squareSize-2);
    },
   setCoin: function (value) {
    //      var value = str.split(',');
       var n = value.length;
       for(var i=1;i<=n;i+=2)
       {
         for(var j=i-1;j<i;j++)
         {
          var x = list[0];
            var y = list[1];
           if(value[j]!=x||value[i]!=y)
             this.rendercoin(value[j],value[i]);
         }
       }
    },
  rendercoin: function(y,x)
  {
        var robot1 = controller.getCurrentRobot(),
            robotAxisX1 = x * this.squareSize, // the center of the destination grid horizontally
            robotAxisY1 = (this.maxY - y) * this.squareSize; // the center of the destination grid vertically
           this.context.beginPath();
           this.context.arc(robotAxisX1,robotAxisY1,(125/this.maxX),0,2*Math.PI);
           this.context.stroke();
           this.context.fillStyle = "orangered";
           this.context.fill();
           controller.report();
    },
  isCoin: function(x,y,yk){
 //    var yk = str.split(',');
     var n = yk.length;
       for(var i=1;i<=n;i+=2)
       {   
         for(var j=i-1;j<i;j++)
         {
           if(yk[j]==x&&yk[i]==y)
           {
              return true;
                 break;
           }
       }
     }
      return false;
  },
   setWall: function(str){
       this.a = str.split(',');
        var n = this.a.length;
     //  this.rendercoin(this.a[0],this.a[1]);
       for(var i=1;i<=n;i+=2)
       {
         for(var j=i-1;j<i;j++)
         {
            this.renderWall(this.a[j],this.a[i]);
         }
       }
   },

   renderWall: function(x,y)
   {
       this.context.fillStyle = "sienna";
      this.context.fillRect(((500-this.xStart)-((this.maxX-y)*this.squareSize)),((500-this.xStart)-x*this.squareSize),this.squareSize,this.squareSize);
     
   },
 
  isWall: function(x,y,str)
  {
     var p = str.split(',');
     var n = p.length;
       for(var i=1;i<=n;i+=2)
       {   
         for(var j=i-1;j<i;j++)
         {
           if(p[j]==x&&p[i]==y)
           {
              return true;
                 break;
           }
       }
     }
      return false;
  },
   
    renderRobot: function () {
        var robot = controller.getCurrentRobot(),
            robotAxisX = (robot.x + 1) * this.squareSize, // the center of the destination grid horizontally
            robotAxisY = (this.maxY - robot.y) * this.squareSize; // the center of the destination grid vertically
        var path = new Path2D();
        this.context.beginPath();
        switch (robot.f) {
            case "north":
                 path.moveTo(robotAxisX, robotAxisY - this.robotSize);
                 path.lineTo(robotAxisX - this.robotSize, robotAxisY);
                 path.lineTo(robotAxisX + this.robotSize, robotAxisY);
                break;
            case "south":
                path.moveTo(robotAxisX, robotAxisY + this.robotSize);
                path.lineTo(robotAxisX - this.robotSize, robotAxisY);
                path.lineTo(robotAxisX + this.robotSize, robotAxisY);
                break;
            case "east":
                path.moveTo(robotAxisX + this.robotSize, robotAxisY);
                path.lineTo(robotAxisX, robotAxisY - this.robotSize);
                path.lineTo(robotAxisX, robotAxisY + this.robotSize);
                break;
            case "west":
                path.moveTo(robotAxisX - this.robotSize, robotAxisY);
                path.lineTo(robotAxisX, robotAxisY - this.robotSize);
                path.lineTo(robotAxisX, robotAxisY + this.robotSize);
                break;
            default:
                break;
        }
         
        this.context.closePath();
        this.context.fillStyle = "blue";
        this.context.fill(path);
       controller.report();
    }
};
var reportView = {
    init: function () {
        //        this.errorMessageEle = document.getElementById("error");
        this.reportMessageEle = document.getElementById("report");
    },
    renderReport: function () {
        var currentRobot = controller.getCurrentRobot();
        this.reportMessageEle.innerHTML = '<span>' + 'Axis X: ' + currentRobot.y + '</span>' +
            '<span>' + 'Axis Y: ' + currentRobot.x + '</span>' +
            '<span>' + 'Facing: ' + currentRobot.f + '</span>';
    },
    renderErrors: function (msg) {
        this.reportMessageEle.innerHTML = '<span id="error">' + msg + '</span>';
    },
    clear: function () {
        this.reportMessageEle.innerHTML = '';
    }
};
window.onload = function () {
    controller.init();
};
