
var argv = process.argv;
if(argv[2]=='--help'){
	console.log('This is a spider program that helps you grab text information online. Your final results are in ./artical.txt.\nYou can enter your target website domain as the third argument, first webpage to parse as the forth argument, number of entries you need as your fifth argument, and feel free to add any jquery selector in the end, but please be aware that if your selector is wrong, you may end up with a empty article.txt.');
	process.exit();
}

if(count <= 5){
	console.log('Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector...]\nEnter --help for more info');
	process.exit(1);
}
console.log('MeinSpider Copyright (C) 2016 Songyu Li');

var count = argv.length;			
var jquery = '';
var i = 5;
while(i<count){
	jquery += (' '+argv[i]);
	i++;
}

var Parser = require('./lib/parse.js').init(argv[2], argv[3], argv[4], jquery);
