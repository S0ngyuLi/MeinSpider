# MeinSpider
<p><strong>A simple web crawler made with node.js and cheerio </strong></p>
<h2>Installation</h2>
<p>Linux/Ubuntu:<br><pre>git clone https://github.com/S0ngyuLi/MeinSpider</pre>
 You may need to install cheerio and other packages in the dependency list before compile this program.
</p>

<h2>Usage</h2>
<pre>Usage: node ./index.js [domain] [url] [num of entries needed] [jquery selector...]</pre>
<p>
Here is an example: <pre>node ./index.js blah.net blah.net/article 1000 .p article</pre>
Please make sure you enter correct jquery selector in the last few arguments, otherwise cheerio will throw errors.<br>
Check <a href = 'http://api.jquery.com/category/selectors/'>this page</a> to learn more about jquery selectors.<br>
Enter --help for more info</p>
<h2>Version</h2>
<p>Current version is 0.0.2.</p>
<h2>New Features in the future</h2>
<p>In the next version users are able to download images in the webpages crawled, and also sort and rename those images.</p>
<h2>License</h2>
MeinSpider: a free web crawler made with node.js<br>

```
Copyright (C) 2016  Songyu Li

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses.
```
