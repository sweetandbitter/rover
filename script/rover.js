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
}
