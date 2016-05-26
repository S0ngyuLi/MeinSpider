var http = require('http');
var cheerio = require('cheerio');
var url = require('url');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();	//event emmiter for parser

var argv = process.argv;
var count = argv.length;			//argc
var total_count = 0;					//total number of items saved in article.txt

if(argv[2]=='--help'){
	console.log('This is a spider program that helps you grab text information online. Your final results are in ./artical.txt.\nYou can enter your target website domain as the third argument, first webpage to parse as the forth argument, number of entries you need as your fifth argument, and feel free to add any jquery selector in the end, but please be aware that if your selector is wrong, you may end up with a empty article.txt.');
	process.exit();
}

if(count <= 5){
	console.log('Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector...]\nEnter --help for more info');
	process.exit(1);
}
console.log('MeinSpider Copyright (C) 2016 Songyu Li');
var main_url = argv[2];
//example: 'http://www.hf168.net';
var starting_url = argv[3];
//example: 'http://www.hf168.net/default.html';
var num_ent = argv[4];
//example: 10
var jquery = '';
var i = 5;
while(i<count){
	jquery += (' '+argv[i]);
	i++;
}
//example: ./article

var map = {};	//in map object we define 0 to be a url not yet processed. 1 otherwise
var init = 1;	

var compare_domain = function(tgt, domain){
	var dlength = domain.length - 1;
	if(tgt.substring(0,dlength) == domain.substring(0,dlength)){
		return true;
	}
	return false;
}

var parse_page = function(input_url){
	map[input_url] = 1;
	http.get(input_url, function(res){
		var file_ = '';
		res.on('data', function(chunks){
			file_ += chunks;
		});
		res.on('end', function(){
			console.log('Webpage successfully loaded.\n');
			//console.log(file_);
			$ = cheerio.load(file_);
			$('a').each(function(i, elem) {
				if($(this).attr('href')){
					var tmp = url.resolve(main_url, $(this).attr('href'));
					//console.log('[' + i + ']' + tmp );
					if(map[tmp] == undefined){
						if(compare_domain(tmp, main_url)){
							map[tmp] = 0;
							console.log('found new link: '+tmp);
						}
						else{
							console.log('bad luck: '+tmp);
							map[tmp] = 1;
						}
					}
				}
			});
			
			$(jquery).each(function(i, elem){
				var art = $(this).text();
				var fd = fs.open('./article.txt', 'a', function opened(err, fd){
					if (err) {throw err;}
					//console.log(art);
					var writeBuffer = new Buffer(art);
					var bufferPosition = 0;
					var bufferLength = writeBuffer.length; 
					var filePosition = null;
					fs.write( fd, writeBuffer, bufferPosition, bufferLength, filePosition, function wrote(err, written) {
						if (err) { throw err; }
						console.log('wrote ' + written + ' bytes');
						total_count ++;
					});

				});
				
			});
			ee.emit('queryFinished', 'Query Finished');
		});
	}).on('error', function(e){
		console.log("[!]Got error: " + e.message); 
		map[input_url] = 1;
	});
	
}

var process_map = function(map){
	if(total_count > num_ent){
		console.log('\nSpider has completed all tasks!\n');
		process.exit();
	}
	for(i in map){
		if(map[i] == 0){
			//console.log(i.substring(0,16));
			if(compare_domain(i, main_url)){
				console.log('Got one: '+i);
				parse_page(i);
				break;
			}
		}
	}
	
}
ee.on('queryFinished', function(msg){
	console.log(msg);
	//console.log(JSON.stringify(map));
	process_map(map);
});

parse_page(starting_url);
//process_map(map);
