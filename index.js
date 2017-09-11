
var argv = process.argv;
var count = argv.length;

if(argv[2]=='--help'){
	console.log('This is a crawler program that helps you grab text information online. If you choose to grab text, your final results are in ./artical.txt.');
	console.log('If you choose to grab images, your results will be shown in directory /images');
	console.log('Usage: node ./index.js [domain] [url] [num of items needed] [jquery selector]');
	console.log('f save items as files');
    process.exit()
}

else if(count <= 5){
    console.log('Command Error.');
    console.log('Type --help for more info.')
    process.exit()
}
else{
	var fileMode = false
	var securityMode = false
	argv.forEach(function (t) {
		if(t == 'f'){
			fileMode = true
			argv.splice(argv.indexOf(t))
		}
	})

	console.log('MeinSpider Copyright (C) 2016 Songyu Li');
	var jquery = '';
	var i = 5;
	while(i<count){
		jquery += (' '+argv[i]);
		i++;
	}
	var Parser = require('./lib/parse.js').init(argv[2], argv[3], argv[4], jquery);
}
