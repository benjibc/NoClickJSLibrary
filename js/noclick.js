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
      this.global_x = e.pageX;
      this.global_y = e.pageY;
      for(var i = 0; i < ElementList.length; i++)
      {
        if(absVal(e.pageY - ElementList[i].y_top) < 1 ){  
           console.log("came close!"); 
           ElementList[i].activationStage ++;
        } 
        else if(absVal(e.pageY - ElementList[i].y_bottom) < 1 ){
           ElementList[i].activationStage ++;
        }
        else if(absVal(e.pageX - ElementList[i].x_left) < 1) {
           ElementList[i].activationStage ++;
        }
        else if(absVal(e.pageX - ElementList[i].x_right < 1) {
           ElementList[i].activationStage ++;
        }

        if(ElementList[i].activationStage == 4){
          console.log("activated");
          ElementList[i].activationStage = 0;
        }
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
