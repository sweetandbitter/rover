var btn = document.getElementById("submitBtn");
btn.addEventListener("click", rover);

function rover(){
	var row = parseInt(document.getElementById("row").value);
	var column = parseInt(document.getElementById("column").value);
	var startRow = parseInt(document.getElementById("startRow").value);
	var startColumn = parseInt(document.getElementById("startColumn").value);
	var startDir = document.getElementById("startDirection").value;
	var path = document.getElementById("path").value;
	var obstacle = document.getElementById("obstacle").value;
	var grid = [row, column];
	var location = [startRow, startColumn];
	path = path.split("");
	obstacle = obstacle.split(",");
	var obstacleArr = [];
	for(var i = 0; i < Math.floor((obstacle.length) / 2); i++){
		obstacleArr[i] = [];
		obstacleArr[i].push(obstacle[2*i], obstacle[2*i+1]);
		//console.log(obstacleArr);
	}
	var myRover = new moveRover(grid, location, startDir, path, obstacleArr);
	document.getElementById("position").innerHTML = "Final Position is " + myRover.paths(path);
	document.getElementById("obstacleStatus").innerHTML = "You are " + myRover.status;
}

function moveRover(grid, location, direction, path, obstacles){
	self = this;
	this.location = location;
	this.direction = direction;
	this.directions = ['N', 'E', 'S', 'W'];
	this.grid = grid;
	this.obstacles = obstacles;
	this.status = "not obstacled";
	this.paths = function(path){
		for (var i = 0; i < path.length; i++){
			if (path[i] === "f" || path[i] === "b"){
				if (!straight(path[i])){
					break;
				}
			} else if (path[i] === "l" || path[i] === "r"){
				turn(path[i]);
			}
		}
		wrap();
		return this.location;
	}

	function straight(path){
		var x = 0, y = 0;
		if (self.direction === "N"){
			x = 1;
		} else if (self.direction === "S") {
			x = -1;
		} else if (self.direction === "E") {
			y = 1;
		} else if (self.direction === "W") {
			y = - 1;
		}
		var increase = (path === "f") ? [x, y] : [-x, -y];
		var newLocation = [self.location[0] + increase[0], self.location[1] + increase[1]];
		if(isObstacle(newLocation)) {
			return false;
		} 
		self.location = newLocation;
		return true;
	}

	function turn(path){
		var l = self.directions.length;
		var index = self.directions.indexOf(self.direction);  //index 0,1,2,3 means N,E,S,W
		if(path === "l"){
			index = (index - 1 + l) % l;
		} else {
			index = (index + 1) % l;
		}
		self.direction = self.directions[index];

	}

	function wrap(){
		self.location[0] = (self.location[0] + self.grid[0]) % self.grid[0];
		self.location[1] = (self.location[1] + self.grid[1]) % self.grid[1];
	}

	function isObstacle(newLocation){
		for(var i = 0; i < self.obstacles.length; i++){
			if(newLocation.toString() == self.obstacles[i].toString()){
				self.status = "obstacled";
				return true;
			}
		}
		return false;
	}

}