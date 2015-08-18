var test1 = "2 8\nxxxxxxxx\nx      x";
var test2 = "3 9\nxxxx xxxx\n    x    \n   xx    ";

$(document).ready(function() {
  $("#input").val(test2);

  $("#start").click(function() {
    var result = countChains( $("#input").val() );
    $("#output").val(result);
  });
});

function countChains(input) {
  var lines = input.split('\n');
  var dimensions = lines[0].split(/\s+/);
  var rows = dimensions[0];
  var columns = dimensions[1];
  var array = [];
  for(var i = 0; i < rows; i++) {
    array[i] = [];
    for(var j = 0; j < columns; j++)
      array[i][j] = lines[i+1].charAt(j);
  }

  var counter = 0;
  var coordinates = findX(array);
  while(coordinates) {
    dfs(0, array, coordinates[0], coordinates[1]);
    counter++;
    coordinates = findX(array);
    console.log(JSON.stringify(array));
  }

  return counter;
}

function dfs(count, array, y, x) {
  array[y][x] = count;
  //left
  if(x-1 >= 0 && array[y][x-1] == 'x')
    count = dfs(count+1, array, y, x-1);
  //top
  if(y-1 >= 0 && array[y-1][x] == 'x')
    count = dfs(count+1, array, y-1, x);
  //right
  if(x+1 <= array[0].length-1 && array[y][x+1] == 'x')
    count = dfs(count+1, array, y, x+1);
  //bottom
  if(y+1 <= array.length-1 && array[y+1][x] == 'x')
    count = dfs(count+1, array, y+1, x);
  return count;
}

function findX(array) {
  for(var i = 0; i < array.length; i++)
    for(var j = 0; j < array[0].length; j++)
      if(array[i][j] == 'x')
        return [i, j];
  return null;
}
