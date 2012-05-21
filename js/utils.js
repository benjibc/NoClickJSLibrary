/* This class will be a queue that keep track of all the information necessary
 * to resolve the shape of the function. This is a special queue that will have
 * a special property: it will have a set length; therefore, there is no need 
 * to solve the problem with an array that constantly needs to be sliced; there
 * will be two arrays that replaces each other
 */
/*function Coord (x, y)
{
  this.x = x;
  this.y = y;
}

function CoordQueue (length){
  try{
    if(isNaN(length))
      throw "NotANumber";
    else if (length <= 0)
      throw "NotPos"
  }
  catch(err){
    if(err == "NotANumber"){
      document.write("Error! Coord queue initalised with a length that is not a number!");
    }
    if(err == "NotPos"){
      alert("CoordQueue initialised with a negative number!");
    }
  }
  this.length = length;
  this.position = 0;
  this.curArr = 1;
  //basically, we fill the first array until it is totally
  //filled; then we start filling in the second array
  //so it looks like we are constantly removing the first element
  //in the array and adding some element after the array
  
  this.array1 = new Array (length);
  this.array2 = new Array (length);
  for(var i = 0 ; i < length; i ++)
  {
    this.array1[0] = 0;
    this.array2[0] = 0;
  }
}

CoordQueue.prototype.element = function(pos)
{
  if(this.position + pos >= this.length)
  {
    if(this.curArr == 1)
      this.curArr = 2;
    else
      this.curArr = 1;
    pos = this.position + pos - length;
  }
  if(this.curArr == 1)
    return this.array1[pos];
  else
    return this.array2[pos];  

}

CoordQueue.prototype.insert = function(val)
{
  if(this.curArr == 1)
  {
    if( this.position < this.length)
    {
      this.array1[this.position] = val;
    }
    else{
      this.curArr = 2;
      this.position = 0;
      this.array2[0] = val;
    }
    position ++;
  }
  else //this.curArr = 2
  {
    if(this.position < this.length)
      this.array2[this.position] = val;
    else{
      this.curArr = 1;
      this.position = 0;
      this.array1[0] = val;
    }
  }
}*/

function Element( curObject, ID, htmlID)
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
  this.initialise();
}
Element.prototype.trigger = function ()
{
  this.callback();
}
//counter clockwise orientation. 0 is top, 1 is left, 2 is bottom, 3 is right
Element.prototype.activate = function (val)
{
  switch(this.activationStage)
  {
    case 0:
      this.activationStage++;
      break;

  }
}
Element.prototype.callback = function()
{
  alert("old callback");
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
      }
  }
  //this.trigger();
}

function absVal(val)
{
  return Math.abs(val);
}

