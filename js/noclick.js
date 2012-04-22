//challenge of this problem is that it requires a queue that is first in and
//first out, so I will implement a queue into the library


function MouseTracker()
{
	this.list_x = new CoordQueue();
	this.list_y = new CoordQueue();
	
}
MouseTracker.prototype.global_x = 0;
MouseTracker.prototype.global_y = 0;
MouseTracker.prototype.track = function()
{
   $(document).mousemove(function(e){
      //$('#status').html(e.pageX +', '+ e.pageY);
      this.global_x = e.pageX;
      this.global_y = e.pageY;
   }); 
}


var mouseTracker1 = new MouseTracker();




