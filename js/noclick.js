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

$(document).ready(function() {
function MouseTracker ()
{
  ElementList = new Array();
  this.m_ElementList = ElementList;
  //simply loop through array to ensure maximum performance
  this.global_x = 0;
  this.global_y = 0;
  this.track();
}

MouseTracker.prototype.addElement = function(contentDivID){
  var Element_ID = 0;
  var content = $("#"+contentDivID).html();
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
      for(var i = 0; i < ElementList.length; i++)
      { 
        ElementList[i].activate(e.pageX, e.pageY);
      }
   }); 
}

MouseTracker.prototype.getElementCoord= function (ElementId)
{
  var position = $("#".ElementId).position();
  return curCoord;
}

var mouseTracker1 = new MouseTracker();
mouseTracker1.addElement("test_area");
});

        /*if(absVal(e.pageX - ElementList[i].x_center) < 5)
        {
          if(absVal(e.pageY - ElementList[i].y_top) < 5 ){  
             //console.log("came close top!"); 
             ElementList[i].activationStage ++;
             ElementList[i].activate(0);
          } 
          if(absVal(e.pageY - ElementList[i].y_bottom) < 5 ){
             //console.log("came close buttom!"); 
             ElementList[i].activationStage ++;
             ElementList[i].activate(2);
          }
        }

        if(absVal(e.pageY -ElementList[i].y_center) <5)
        {
          if(absVal(e.pageX - ElementList[i].x_left) < 5) {
             //console.log("came close left!"); 
             ElementList[i].activationStage ++;
             ElementList[i].activate(1);
          }
          if(absVal(e.pageX - ElementList[i].x_right) < 5) {
             //console.log("came close right!"); 
             ElementList[i].activationStage ++;
             ElementList[i].activate(3);
          }
        }

        if(ElementList[i].activationStage == 4){
          console.log("activated");
          ElementList[i].activationStage = 0;
          ElementList[i].callback();
        }*/
