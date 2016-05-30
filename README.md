# MeinSpider
<p><strong>A simple web crawler made with node.js and cheerio </strong></p>
<h2>Installation</h2>
<p>Linux/Ubuntu:<br><pre>git clone https://github.com/S0ngyuLi/MeinSpider</pre><br>
 You may need to enter <br><pre>npm install cheerio</pre><br>
to install cheerio, which is what this app is built upon.
</p>
<h2>Usage</h2>

<pre>Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector...]</pre><br>
<p>
Here is an example: node ./index.js blah.net blah.net/article 1000 .p article<br>
Please make sure you enter correct jquery selector in the last few arguments, otherwise cheerio will throw errors.<br>
Check <a href = 'http://api.jquery.com/category/selectors/'>this page</a> to learn more about jquery selectors.<br> 
Enter --help for more info</p>
<h2>Version</h2>
<p>Current version is 0.0.2.</p>
<h2>New Features in the future</h2>
<p>In the next version users are able to download images in the webpages crawled, and also sort and rename those images.</p>
<h2>License</h2>
<p>MeinSpider: a free web crawler made with node.js<br>
    Copyright (C) 2016  Songyu Li<br>

    This program is free software: you can redistribute it and/or modify<br>
    it under the terms of the GNU General Public License as published by<br>
    the Free Software Foundation, either version 3 of the License, or<br>
    (at your option) any later version.<br>

    This program is distributed in the hope that it will be useful,<br>
    but WITHOUT ANY WARRANTY; without even the implied warranty of<br>
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the<br>
    GNU General Public License for more details.<br>

    You should have received a copy of the GNU General Public License<br>
    along with this program.  If not, see http://www.gnu.org/licenses.</p>
