# MeinSpider
<p><strong>A simple web crawler made with node.js and cheerio </strong></p>
<h2>Installation</h2>
<p>Linux/Ubuntu:<br>git clone https://github.com/S0ngyuLi/MeinSpider<br>
 You may need to enter <br>npm install cheerio<br>
to install cheerio, which is what this app is built upon.
</p>
<h2>Usage</h2>
<p>Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector...]<br>
Here is an example: node ./index.js blah.net blah.net/article 1000 .p article<br>
Please make sure you enter correct jquery selector in the last few arguments, otherwise cheerio will throw errors.<br>
Check <a href = 'http://api.jquery.com/category/selectors/'>this page</a> to learn more about jquery selectors.<br> 
Enter --help for more info</p>
