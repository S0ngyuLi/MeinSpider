var request = null
var cheerio = require('cheerio')
const url = require('url')
var fs = require('fs')
var EventEmitter = require('events').EventEmitter
var EventEmitterInstance = new EventEmitter()		//event emmiter for parser
var total_count = 0									//total number of items saved in article.txt

var main_url = ''
//example: 'http://www.hf168.net'

var starting_url = ''
//example: 'http://www.hf168.net/default.html'

var num_ent = 0
//example: 10

var jquery = ''

/*
 * Constructor of the parser class.
 * It takes first argument as string for domain URL, from which all materials must be crawled
 * Second Param is the initial URL to begin crawling with.
 * Num is the number of items we want to collect.
 * JQ is the JQuery Specifier we use to crawl items.
*/

exports.init = function(baseUrl, initialUrl, num, jq){
    main_url = baseUrl
    main_url_instance = url.parse(main_url)
	if(main_url_instance.protocol == 'https:'){
    	request = require('https')
	}
	else {
		request = require('http')
	}
    starting_url = initialUrl
	num_ent = num
    jquery = jq
    parse_page(starting_url)
}

/**
 *
 * compare_domain checks if the target url is under the domain.
 *
 * It returns a bool
 *
 * */

var compare_domain = function(targetURL, domain){
    if(targetURL.length <= 1) return false
    var dlength = domain.length - 1
    if(targetURL.substring(0,dlength) == domain.substring(0,dlength)){
        return true
    }
    return false
}

/*
 * map is a pool for us to store all URL's to be processed.
 * In order to maintain a proper order of the pool,
 * we use event driven programming tricks on it.
 *
 */
var map = {}

/* *
 * Set up event emitter so that we know when a query finishes
 * */
EventEmitterInstance.on('Written', function(text){
	EventEmitterInstance.emit('queryFinished', 'Query Finished')
})

EventEmitterInstance.on('queryFinished', function(msg){
	console.log(msg)
	process_map(map)
})

/**
 *
 * process_map checks if our pool of urls is empty. If not, fetch a new URL from the pool,
 * and run a search on the url.
 *
 * **/

var process_map = function(map){
	if(total_count >= num_ent){
		console.log('\nMeinSpider has completed all tasks!\n')
		process.exit()
	}
	else{
		for(i in map){
			if(map[i] == 0){
				//console.log(i.substring(0,16));
				if(compare_domain(i, main_url)){
					parse_page(i)
					break
				}
			}
		}
	}
}

/* *
 *
 * parse_page parses the web page for more URLs as well as our targets.
 *
 * */

var parse_page = function(input_url){
	map[input_url] = 1
	request.get(input_url, function(res){
		var file_ = ''
		res.on('data', function(chunks){
			file_ += chunks
		})
		res.on('end', function(){
			// console.log('Web Page successfully loaded.\n')
			//console.log(file_)
			$ = cheerio.load(file_)
			$('a').each(function(i, elem) {
				if($(this).attr('href')){
					var tmp = url.resolve(main_url, $(this).attr('href'))
					//console.log('[' + i + ']' + tmp )
					if(map[tmp] == undefined){
						if(compare_domain(tmp, main_url)){
							map[tmp] = 0
							// console.log('found new link: ' + tmp)
						}
						else{
							// console.log('bad luck: ' + tmp)
							map[tmp] = 1
						}
					}
				}
			})
			
			$(jquery).each(function(i, elem){
				var art = $(this).text()
				var fd = fs.open('./article.txt', 'a', function opened(err, fd){
					if (err) {throw err}
					//console.log(art);
					var writeBuffer = new Buffer(art)
					var bufferPosition = 0
					var bufferLength = writeBuffer.length
					var filePosition = null
					fs.write( fd, writeBuffer, bufferPosition, bufferLength, filePosition, function wrote(err, written) {
						if (err) { throw err }
						console.log('wrote ' + written + ' bytes')
						total_count ++
						EventEmitterInstance.emit('Written', 'Written')
					})

				})
				
			})
			EventEmitterInstance.emit('Written', 'Written')
			
		})
	}).on('error', function(e){
		console.log("[!]Got error: " + e.message)
		map[input_url] = 1
	})
	
}
