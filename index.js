
var argv = process.argv;
if(argv[2]=='--help'){
	console.log('This is a spider program that helps you grab text information online. If you choose to grab text, your final results are in ./artical.txt.');
	console.log('If you choose to grab images, your results will be shown in directory /images');
	console.log('Text Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector] ...\nEnter --help for more info');
	console.log('Image Usage: node ./index.js --pic [domain] [url] [num of albums] [jquery selectors] ...\nEnter --help for more info');
	process.exit();
}

else if(argv[2]=='--pic'){
	//image crawler mode
	if(argv.length != 7){
		console.log('Usage: node ./index.js --pic [domain] [url] [num of albums] [jquery selectors] ...\nEnter --help for more info');
		process.exit();
	}
	//var Image_Parser = require('./lib/image.js').init(/*arguments*/);
}
else{
	if(count <= 5){
		console.log('Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector] ...\nEnter --help for more info');
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
}
