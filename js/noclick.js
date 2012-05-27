//challenge of this problem is that it requires a queue that is first in and
//first out, so I will implement a queue into the library
//It will be activated on each element.
//If the distance comes close to the designated coordinate, the coordinate
//will be triggered.
//
//MouseTracker will be initalised with a ID for the div that you want to
//setup with noclick.

function MouseTracker ()
{
  ElementList = new Array();
  //master list that keeps all the item in an array
  this.m_ElementList = ElementList;
  this.track();
}

//mode: 0 means circle, 1 means cross
MouseTracker.prototype.addElement = function(topID, callback, just_self, mode){
  callback = typeof callback !== 'undefined' ? callback : null;
  mode = typeof mode !== 'undefined' ? mode : 0;
  just_self = typeof just_self !== 'undefined' ? 0 : 1;
  var Element_ID = ElementList.length;
  ElementList.push(new Element( $("#"+topID), Element_ID, callback, mode));
  Element_ID++;  
  if(!just_self)
  {
    $("#"+topID).find('*').each(function (){
      var kid = $(this);
      ElementList.push(new  Element(kid, Element_ID));
      Element_ID++;
    });
  }
  console.log(this.m_ElementList);
}

MouseTracker.prototype.track = function()
{
   $(document).mousemove(function(e){
     $("#debug_tracker").text(e.pageX +', '+ e.pageY);
     for(var i = 0; i < ElementList.length; i++){ 
       ElementList[i].activate(e.pageX, e.pageY);
     }
   }); 
}

function Element( curObject, ID, callback, mode)
{
  this.mode = mode;
  this.m_ID = ID;
  this.htmlID = curObject.attr('id');
  this.object = curObject;
  this.type = curObject[0].nodeName;
  position = curObject.position();
  this.width = curObject.outerWidth();
  this.height = curObject.outerHeight();
  this.y_top = position.top;
  this.y_bottom = position.top + this.height;
  this.y_center = position.top + (this.height /2);
  this.x_left = position.left;
  this.x_right = position.left + this.width;
  this.x_center = position.left + (this.width /2);
  this.activationStage = 0;
  this.prevPos = 0;
  if(callback == null)
  this.initialise();
  else
    this.callback = callback;
  this.x_tolerance= 8;
  this.y_tolerance= 8;
}
Element.prototype.trigger = function ()
{
  this.callback();
}
//counter clockwise orientation. 1 is top, 2 is left, 3 is bottom, 4 is right
Element.prototype.activate = function (x,y)
{
  //console.log(this.activationPosition(x,y));
  var curPos = this.activationPosition(x,y);
  switch(curPos)
  {
     case 0:
       break;
     case 1:  //activated. only 0(none) 2(left) and 4(right) is allowed
     case 3:  //activated. only 0(none) 2(left and 4(right) is allowed
  console.log(this.activationStage + " " + this.prevPos);
       if(this.prevPos == 0){
         this.activationStage++;
         this.prevPos = curPos
         break;
       }
       if(this.prevPos==2||this.prevPos==4){
         this.prevPos = curPos
         this.activationStage++;
       }
       break;
     case 2:  //activated. only 1(top) and 3(down) is allowed
     case 4:  //activated. only 1(top) and 3(down) is allowed
  console.log(this.activationStage + " " + this.prevPos);
       if(this.prevPos == 0){
         this.prevPos = curPos
         this.activationStage++;
         break;
       }
       if(this.prevPos % 2 == 1){
         this.prevPos = curPos
         this.activationStage++; 
       }
       break;
     default: //error. set to zero
       console.log("Element activation error");
  }

  if(this.activationStage == 4)
  {
    this.callback();
    this.activationStage = 0;
  }
}

//when mode = 0, i.e. circle
//counter clockwise orientation. 1 is top, 2 is left, 3 is bottom, 4 is right
//when mode = 1, i.e triangle
//1 is left_top, 2 is right_bottom, 3 is right_top, 4 is left_bottom
Element.prototype.activationPosition = function(x,y)
{
  if(this.mode == 0)
  {
    if(absVal(x - this.x_center) < this.x_tolerance){
      if(absVal(y - this.y_top)<this.y_tolerance)     return 1; 
      if(absVal(y - this.y_bottom )< this.y_tolerance)   return 3;
    }
    if (absVal(y - this.y_center) < this.x_tolerance){
      if(absVal(x-this.x_right) < this.y_tolerance)       return 4; 
      if(absVal(x-this.x_left) < this.y_tolerance)   return 2;
    }
  }
  else if (this.mode == 1)
  {
    if(absVal(y - this.y_top) < this.y_tolerance){
      if(absVal(x - this.x_left) < this.x_tolerance) return 1;
      if(absVal(x - this.x_right) < this.x_tolerance) return 3;
    }
    if(absVal(y - this.y_bottom) < this.y_tolerance){
      if(absVal(x - this.x_left) < this.x_tolerance) return 4;
      if(absVal(x - this.x_right) < this.x_tolerance) return 2;
    } 
    return 0;
  }
  //nowhere close to any element
  return 0;
}

Element.prototype.callback = function()
{
  alert("Callback not yet implemented");
} 

Element.prototype.initialise = function()
{
  if(this.type == "P" || this.type == "DIV")
    this.callback = function(){};
  if(this.type == "INPUT")
  {
    var inputType = this.object.attr('type');
    if(inputType == 'password')
      this.callback = function()
      {
        this.object.trigger('enter');
      };
    else if(inputType == 'submit')
      this.callback = function()
      {
        this.object.trigger('submit');
      }
    else
      this.callback = function()
      {
        this.object.trigger('click');
        return;
      }
  }
}

function absVal(val)
{
  return Math.abs(val);
}

