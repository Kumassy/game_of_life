// var pattern = "24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!";
var pattern = "11b2o5b4o$9b2ob2o3bo3bo$9b4o8bo$10b2o5bo2bob2$8bo13b$7b2o8b2o3b$6bo9bo2bo2b$7b5o4bo2bo2b$8b4o3b2ob2o2b$11bo4b2o4b4$18b4o$o2bo13bo3bo$4bo16bo$o3bo12bo2bob$b4o!";
var _pattern = pattern;

var result = [];
var line = "";
while(pattern.length > 0){
  var regexResult = pattern.match(/(\d*)([bo\$!])/);

  var consumed = regexResult[0];
  var length = regexResult[1];
  var type = regexResult[2];

  if(type === 'o'){
    line += "1".repeat(length || 1);
  }
  else if(type === 'b'){
    line += "0".repeat(length || 1);
  }
  else if(type === '$'){
    for(var i = length || 1; i > 0; i--){
      result.push(line);
      line = "";
    }
  }
  else if(type === '!'){
    result.push(line);
    break;
  }

  // console.log(regexResult);
  // console.log(pattern);
  // console.log(line);
  // console.log(result);
  // console.log("\n");

  pattern = pattern.substring(consumed.length);

}

console.log(result);


// old algorithm

// console.log(pattern);
// console.log(pattern.endsWith('!'));
// pattern = pattern.substring(0, pattern.length - 1);
//
// console.log(pattern.split("$"));
//
// var splited_pattern = pattern.split("$");
//
// splited_pattern = splited_pattern.map(function(p){
//   // p.match(/(\d)*[bo]/g); // [ '2o', '8b', 'o', '3b', 'o', 'b', '2o', '4b', 'o', 'b', 'o' ]
//
//   return p.match(/(\d)*[bo]/g).reduce(function(accumulator, current, index, array){
//     // current -> '2o', '8b'
//
//     var result = current.match(/(\d*)([bo])/);
//     // result[1] will have the length of result[2] ('o' or 'b'; whether the cell is alive or not)
//     // > var result = '12b'.match(/(\d*)([bo])/);
//     // > result
//     // [ '12b', '12', 'b', index: 0, input: '12b' ]
//
//     if(result[2] === 'o'){
//       return accumulator + "1".repeat(result[1] || 1);
//     }
//     else if(result[2] === 'b'){
//       return accumulator + "0".repeat(result[1] || 1);
//     }
//   },"");
// });
//
// console.log(splited_pattern);

var encode_1 = result.map(function(r){
  if(r === ''){
    return '$';
  }
  else{
    return r + '$';
  }
});
console.log('Phase 1');
console.log(encode_1);

var encode_2 = encode_1.join('').replace(/0/g, 'b').replace(/1/g, 'o');;
console.log('Phase 2');
console.log(encode_2);


var focusing = '';
var count = 0;
var encoded = '';
for(var stream = encode_2; stream.length > 0; stream = stream.substring(1)){
  if(stream[0] === focusing){
    count++;
  }
  else{
    if(count === 0){
      // corner case: will be execute on the very first character of the stream
      focusing = stream[0];
      count = 1;
    }
    else if(count === 1){
      encoded += '' + focusing;
      focusing = stream[0];
      count = 1;
    }
    else if(count > 1){
      encoded += '' + count + focusing;
      focusing = stream[0];
      count = 1;
    }
  }
}
encoded += '!';

console.log(encoded);
console.log(_pattern);
console.log(_pattern === encoded);
