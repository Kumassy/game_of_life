var pattern = "24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!";


console.log(pattern);
console.log(pattern.endsWith('!'));
pattern = pattern.substring(0, pattern.length - 1);

console.log(pattern.split("$"));

var splited_pattern = pattern.split("$");

splited_pattern = splited_pattern.map(function(p){
  // p.match(/(\d)*[bo]/g); // [ '2o', '8b', 'o', '3b', 'o', 'b', '2o', '4b', 'o', 'b', 'o' ]

  return p.match(/(\d)*[bo]/g).reduce(function(accumulator, current, index, array){
    // current -> '2o', '8b'

    var result = current.match(/(\d*)([bo])/);
    // result[1] will have the length of result[2] ('o' or 'b'; whether the cell is alive or not)
    // > var result = '12b'.match(/(\d*)([bo])/);
    // > result
    // [ '12b', '12', 'b', index: 0, input: '12b' ]

    if(result[2] === 'o'){
      return accumulator + "1".repeat(result[1] || 1);
    }
    else if(result[2] === 'b'){
      return accumulator + "0".repeat(result[1] || 1);
    }
  },"");
});

console.log(splited_pattern);
