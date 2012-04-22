/* This class will be a queue that keep track of all the information necessary
 * to resolve the shape of the function. This is a special queue that will have
 * a special property: it will have a set length; therefore, there is no need 
 * to solve the problem with an array that constantly needs to be sliced; there
 * will be two arrays that replaces each other
 */

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
	
	this.array1 = [length];
	this.array2 = [length];
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
}
