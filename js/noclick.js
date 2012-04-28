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
function MouseTracker (contentDivID)
{
	this.content = $("#"+contentDivID).html();
	//this.list_x = new CoordQueue(20);
	//this.list_y = new CoordQueue(20);
	//foreach element, obtain its ID
	 $("#"+contentDivID).find('*').each(function (){
	var kid = $(this);
	console.log(kid, kid.attr('id'), kid.attr('class'));
	});
}

MouseTracker.prototype.global_x = 0;
MouseTracker.prototype.global_y = 0;
MouseTracker.prototype.track = function()
{
   $(document).mousemove(function(e){
      $('#debug_tracker').html(e.pageX +', '+ e.pageY);
      this.global_x = e.pageX;
      this.global_y = e.pageY;
   }); 
}

MouseTracker.prototype.getElementCoord= function (ElementId)
{
	var position = $("#".ElementId).position();
	var curCoord = new Coord(position.x, position.y);
	return curCoord;
}
var mouseTracker1 = new MouseTracker("test_area");
mouseTracker1.track();

});