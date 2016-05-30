var http = require('http');
var cheerio = require('cheerio');
var url = require('url');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var Evento = new EventEmitter();		//event emmiter for parser

var total_count = 0;								//total number of items saved in article.txt


var main_url = '';
//example: 'http://www.hf168.net';
var starting_url = '';
//example: 'http://www.hf168.net/default.html';
var num_ent = 0;
//example: 10
var jquery = '';

//example: ./article

var map = {};	//in map object we define 0 to be a url not yet processed. 1 otherwise
var init = 1;	

var compare_domain = function(tgt, domain){
	if(tgt.length <= 1) return false;
	var dlength = domain.length - 1;
	if(tgt.substring(0,dlength) == domain.substring(0,dlength)){
		return true;
	}
	return false;
}

Evento.on('Writen', function(text){
	Evento.emit('queryFinished', 'Query Finished');
});

Evento.on('queryFinished', function(msg){
	console.log(msg);
	//console.log(JSON.stringify(map));
	process_map(map);
});

var process_map = function(map){
	if(total_count >= num_ent){
		console.log('\nSpider has completed all tasks!\n');
		process.exit();
	}
	else{
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
};

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
						Evento.emit('Writen', 'Writen');
					});

				});
				
			});
			Evento.emit('Writen', 'Writen');
			
		});
	}).on('error', function(e){
		console.log("[!]Got error: " + e.message); 
		map[input_url] = 1;
	});
	
};

exports.init = function(baseUrl, initialUrl, num, jq){
	main_url = baseUrl;
	starting_url = initialUrl;
	num_ent = num;
	jquery = jq;
	parse_page(starting_url);
};
