//challenge of this problem is that it requires a queue that is first in and
//first out, so I will implement a queue into the library
//It will be activated on each element.
//If the distance comes close to the designated coordinate, the coordinate
//will be triggered.
//
//MouseTracker will be initalised with a ID for the div that you want to
//setup with noclick.
//To increase the efficiency, we will not be calculating the distance using
//sqrt here. we will be calculating the

function MouseTracker ()
{
  ElementList = new Array();
  //master list that keeps all the item in an array
  this.m_ElementList = ElementList;
  this.track();
}

MouseTracker.prototype.addElement = function(contentDivID, callback){
  callback = typeof callback !== 'undefined' ? callback : null;
  var Element_ID = ElementList.length;
  ElementList.push(new Element( $("#"+contentDivID), Element_ID, 
  contentDivID, callback));
  Element_ID++;  
  $("#"+contentDivID).find('*').each(function (){
    var kid = $(this);
    ElementList.push(new  Element(kid, Element_ID,
    kid.attr('id')));
    Element_ID++;
  });
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

function Element( curObject, ID, htmlID, callback)
{
  this.m_ID = ID;
  this.htmlID = htmlID;
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
  this.tolerance= 8;
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

//counter clockwise orientation. 1 is top, 2 is left, 3 is bottom, 4 is right
Element.prototype.activationPosition = function(x,y)
{
  if((absVal(y - this.y_top)<this.tolerance) && 
     (absVal(x - this.x_center) < this.tolerance)){
     return 1; 
  }
  else if(absVal(y - this.y_bottom )< this.tolerance && 
          absVal(x - this.x_center) < this.tolerance){
    return 3;    
  }
  
  if(absVal(x-this.x_right) < this.tolerance 
     && absVal(y - this.y_center) < this.tolerance){
      return 4; 
  }
  else if(absVal(x-this.x_left) < this.tolerance && 
          absVal(y - this.y_center) < this.tolerance){
    return 2;
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

