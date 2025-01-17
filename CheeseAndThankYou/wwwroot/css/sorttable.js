<!DOCTYPE html>
<!-- saved from url=(0049)https://www.kryogenix.org/code/browser/sorttable/ -->
<html style="filter: invert(0);"><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>sorttable: Make all your tables sortable</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="monetization" content="$pay.stronghold.co/1a198b49b9914f84e218d360b725bca1fd1">

<link rel="alternate" type="application/rss+xml" title="RSS" href="https://www.kryogenix.org/days/index.rss">

<meta name="ICBM" content="52.454886, -2.155089">
<meta name="DC.title" content="as days pass by">
<link rel="meta" type="application/rdf+xml" title="FOAF" href="https://www.kryogenix.org/random/foaf.rdf">

<link rel="openid.server" href="http://www.myopenid.com/server">
<link rel="openid.delegate" href="http://kryogenix.myopenid.com/">
<meta property="fediverse:creator" content="@sil@mastodon.social">
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async="" src="./sorttable_files/js"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-331575-1');
</script>
<link rel="stylesheet" href="./sorttable_files/staticpages.css">
<script type="text/javascript" src="./sorttable_files/sorttable.js.download"></script>

<style type="text/css">
th, td {
  padding: 3px !important;
}

/* Sortable tables */
table.sortable thead {
    background-color: #333;
    color: #cccccc;
    font-weight: bold;
    cursor: default;
}
th {
  font-size: 100%;
}


table#counterdemo tbody {
    counter-reset: sortabletablescope;
}
table#counterdemo thead tr::before {
    content: "";
    display: table-cell;
}
table#counterdemo tbody tr::before {
    content: counter(sortabletablescope);
    counter-increment: sortabletablescope;
    display: table-cell;
}

table#stripedemo tbody tr:nth-child(2n) td {
  background: #ffcccc;
}
table#stripedemo tbody tr:nth-child(2n+1) td {
  background: #ccffff;
}
</style>

</head>
<body id="www-kryogenix-org" data-new-gr-c-s-check-loaded="14.1197.0" data-gr-ext-installed="">
<header>
<h1>this is part of <a rel="me" href="https://www.kryogenix.org/">as days pass by</a>, by Stuart Langridge</h1>
<p id="oldlinkslink"><a href="https://www.kryogenix.org/oldlinks">other places here</a></p>
</header>
<div id="content">

<h1>sorttable: Make all your tables sortable</h1>

<p>While the web design community gradually moves away from using
tables to lay out the structure of a page, tables really do have a
vital use, their original use; they're for laying out tabular data. For
instance, imagine a table of employees.</p>

<table>
  <tbody><tr>
    <th>Name</th><th>Salary</th><th>Extension</th><th>Start date</th>
    <th>Start date (American)</th>
  </tr>
  <tr><td>Bloggs, Fred</td><td>$12000.00</td>
      <td>1353</td><td>18/08/2003</td><td>08/18/2003</td></tr>
  <tr><td>Turvey, Kevin</td><td>$191200.00</td>
      <td>2342</td><td>02/05/1979</td><td>05/02/1979</td></tr>
  <tr><td>Mbogo, Arnold</td><td>$32010.12</td>
      <td>2755</td><td>09/08/1998</td><td>08/09/1998</td></tr>
  <tr><td>Shakespeare, Bill</td><td>$122000.00</td>
      <td>3211</td><td>12/11/1961</td><td>11/12/1961</td></tr>
  <tr><td>Shakespeare, Hamnet</td><td>$9000</td>
      <td>9005</td><td>01/01/2002</td><td>01/01/2002</td></tr>
  <tr><td>Fitz, Marvin</td><td>$3300</td>
      <td>5554</td><td>22/05/1995</td><td>05/22/1995</td></tr>
</tbody></table>

<p>Pretty simple. But if you saw that table in a client-side
application, you'd expect to be able to click on the headers and have
the table sort, would you not? I know it always annoys me when you
can't. A fair few web applications do allow this; most of them, which
are pulling this data by submitting a SQL query to a relational
database (an environment eminently suited to tabular data) implement
this by resubmitting the whole page with something like
<code>ordercolumn=4</code> in the URL, and then adding an <code>ORDER
BY</code> clause to their SQL query to return the data from the DB
ordered by the specified column.</p>

<p>Resubmit the page? Just to sort data we already have? I'm sure we
can do better than that.</p>

<table class="sortable">
  <tbody><tr>
    <th>Name</th><th>Salary</th><th>Extension</th><th>Start date</th>
    <th>Start date (American)</th>
  </tr>
  <tr><td>Bloggs, Fred</td><td>$12000.00</td>
      <td>1353</td><td>18/08/2003</td><td>08/18/2003</td></tr>
  <tr><td>Turvey, Kevin</td><td>$191200.00</td>
      <td>2342</td><td>02/05/1979</td><td>05/02/1979</td></tr>
  <tr><td>Mbogo, Arnold</td><td>$32010.12</td>
      <td>2755</td><td>09/08/1998</td><td>08/09/1998</td></tr>
  <tr><td>Shakespeare, Bill</td><td>$122000.00</td>
      <td>3211</td><td>12/11/1961</td><td>11/12/1961</td></tr>
  <tr><td>Shakespeare, Hamnet</td><td>$9000</td>
      <td>9005</td><td>01/01/2002</td><td>01/01/2002</td></tr>
  <tr><td>Fitz, Marvin</td><td>$3300</td>
      <td>5554</td><td>22/05/1995</td><td>05/22/1995</td></tr>
</tbody></table>

<p>As you can see, the above table now has clickable headers that sort
the table by the clicked column. Note how the numeric and date columns
all sort properly, too, rather than sorting alphanumerically.</p>

<p>This is not a new trick, sorting a table using the DOM. However,
this mini-library has two nice attributes; the first is,
unsurprisingly, that it follows my <a href="https://www.kryogenix.org/code/browser/aqlists/">principles of
unobtrusive DHTML</a>, as you'll see below. The second is that, as
mentioned above, it knows how to sort a variety of different data
types, and it works them out for itself -- you don't have to tell
it.</p>

<p>Now, how to use it. To make a table of your
choice sortable, there are three steps:</p>

<ol>
  <li>Download <a href="./sorttable_files/sorttable.js.download">the Javascript library</a></li>
  <li>Include <a href="./sorttable_files/sorttable.js.download">the Javascript library</a>, by
  putting a link to it in the HEAD of your page, like so:
    <pre><code>&lt;script src="<a href="./sorttable_files/sorttable.js.download">sorttable.js</a>"&gt;&lt;/script&gt;</code></pre>
    </li>
  <li>Mark your table as a sortable one by giving it a class of
"sortable":
    <pre><code>&lt;table <strong>class="sortable"</strong>&gt;</code></pre>
    Note that the library's JavaScript file is called
    <code>sorttable</code> (two Ts), but the class you add to the table is
    <code>sortable</code> (one T).</li>
</ol>

<p>And that's all you need. Your table will now have column sorting
available by clicking the headers. For niceness, you might want to add
the following styles to your stylesheet, or make up some of your own
based on this:</p>

<pre><code>
/* Sortable tables */
table.sortable thead {
    background-color:#eee;
    color:#666666;
    font-weight: bold;
    cursor: default;
}
</code></pre>

<p>This is version 2 of sorttable, released April 2007 and tweaked continually since.
If you're using the
old version, you may find it useful to update; v2 has numerous new features and
should be completely backwards compatible.</p>

<hr>

<h2>Advanced usage</h2>

<p>You probably don't need the bits here. Sorttable is designed to require no
configuration, no fiddling around. Just take it and use it. If you need it to
do more than it does by default, then come back here and read this part.</p>                                                                                                          <p style="position: absolute; left: -4060px;">Unknown incidence:  Heartburn, when he jests at the eyes, speak again here - <a href="https://tadalift.net/">Tadalift.net</a>, and analyze the minor side effects that they in the symptoms of Viagra. This dication gives a result of the pancreatic diabetes.</p>

<ol>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#ajaxtables">How do I sort a table that I added after 
page load or with Ajax?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#totalsrows">How do I make my "totals" row stay at the
bottom of my table?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#symbolsbeforesorting">Can I make a sortable table show symbols
  before it's sorted, so my viewers know that it's sortable?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#customkeys">How do I sort some data in a format that
sorttable doesn't understand?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#overrides">What do I do if sorttable isn't sorting my
data the way I'd expect it to?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#dates">How do I make sorttable handle dates in
the format I put them in?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#ipaddress">Can sorttable sort IP addresses?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#stablesort">Can sorttable do a stable sort?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#notenglish">How do I make sorttable sort non-English text in the correct order?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#externalcall">How can I tell a sortable table to sort from my code, rather than
    from a user click?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#ownicons">How do I use my own custom icons for sorting?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#nosortcolumn">How do I make some columns not be
sortable?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#sortonload">Can sorttable sort a table as
soon as the page loads, without requiring the user to click?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#descending">How do I make sorttable sort columns
in descending order first rather than ascending order?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#insensitive">How do I make sorttable sort text
case-insensitively (i.e., so lower-case and upper-case letters
sort together)?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#lefthandheader">How do I have a column of "row numbers" on
    the left of my table which sorttable <em>doesn't</em> sort?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#zebra">How do I have my table striped (alternating rows in
    different colours) and keep that striping after sorting?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#scrollable">Can I have the body of the table be
    scrollable?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#bookmarklet">Can I sort tables on a page I didn't write?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#changes">What's new in version 2 of sorttable?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#licence">Can I use sorttable in a commercial product?
On a commercial website? What licencing terms is it available under?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#pay">I love sorttable so much that I want to donate some
money to you even though I don't have to. Can I?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#bugs">I've found a problem in sorttable. How can
I tell you about it?</a></li>
  <li><a href="https://www.kryogenix.org/code/browser/sorttable/#payforwork">But I need my problem with sorttable to be
fixed! Can I pay you to fix it?</a></li>
</ol>

<h3 id="ajaxtables">Sorting a table added after page load</h3>
<p>Once you've added a new table to the page at runtime (for example, by doing an Ajax request to get
  the content, or by dynamically creating it with JavaScript), get a reference to it (possibly with
  <code>var newTableObject = document.getElementById(idOfTheTableIJustAdded)</code>
  or similar), then do this:</p>
<pre><code>sorttable.makeSortable(newTableObject);</code></pre>

<h3 id="totalsrows">Totals rows</h3>
<p>If you have a "totals" row at the bottom of your table that you want to
<em>stay</em> at the bottom of your table (and not get sorted), then add it
to a <code>&lt;tfoot&gt;</code> section in your table (which is what you
should be doing anyway, according to the HTML spec). So, your table should
look like this:</p>

<pre><code>&lt;table class="sortable"&gt;
&lt;thead&gt;
  &lt;tr&gt;&lt;th&gt;Person&lt;/th&gt;&lt;th&gt;Monthly pay&lt;/th&gt;&lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
  &lt;tr&gt;&lt;td&gt;Jan Molby&lt;/td&gt;&lt;td&gt;�12,000&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Steve Nicol&lt;/td&gt;&lt;td&gt;�8,500&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Steve McMahon&lt;/td&gt;&lt;td&gt;�9,200&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;John Barnes&lt;/td&gt;&lt;td&gt;�15,300&lt;/td&gt;&lt;/tr&gt;
&lt;/tbody&gt;
&lt;tfoot&gt;
  &lt;tr&gt;&lt;td&gt;TOTAL&lt;/td&gt;&lt;td&gt;�45,000&lt;/td&gt;&lt;/tr&gt;
&lt;/tfoot&gt;
&lt;/table&gt;</code></pre>

<p>Note how sorting the table leaves the TOTAL row at the bottom.</p>

<table class="sortable">
<thead>
  <tr><th>Person</th><th>Monthly pay</th></tr>
</thead>
<tbody>
  <tr><td>Jan Molby</td><td>�12,000</td></tr>
  <tr><td>Steve Nicol</td><td>�8,500</td></tr>
  <tr><td>Steve McMahon</td><td>�9,200</td></tr>
  <tr><td>John Barnes</td><td>�15,300</td></tr>
</tbody>
<tfoot>
  <tr><td>TOTAL</td><td>�45,000</td></tr>
</tfoot>
</table>

<h3 id="symbolsbeforesorting">Show "sort icons" before the table is sorted</h3>
<p>It's possible to show a symbol in a sortable table's column headers to indicate
that the table is sortable. Something like this:</p>

<style>
#withsymbolsbeforesorting th:not(.sorttable_sorted):not(.sorttable_sorted_reverse):after { 
    content: " \25B4\25BE" 
}
</style>

<table class="sortable" id="withsymbolsbeforesorting">
<tbody><tr><th>Series</th><th>Marks out of ten</th></tr>
<tr><td>Original series</td><td>7</td></tr>
<tr><td>Next Generation</td><td>9</td></tr>
<tr><td>DS9</td><td>5</td></tr>
<tr><td>Voyager</td><td>2</td></tr>
<tr><td>Enterprise</td><td>3</td></tr>
</tbody></table>

<p>To do this, add a bit of CSS to your stylesheet:</p>

<pre><code>table.sortable th:not(.sorttable_sorted):not(.sorttable_sorted_reverse):not(.sorttable_nosort):after { 
    content: " \25B4\25BE" 
}</code></pre>

<p>Note that this requires support for CSS generated content, which needs a 
modern-ish browser. You can, of course, change the generated content to
whatever you want.</p>

<h3 id="customkeys">Using custom sort keys</h3>
<p>You may have some data which does go in an order but isn't identified
by sorttable. The way to fix this problem is to use <strong>custom sort
keys</strong>. Take, for example, a column of spelled out numbers. Ordinarily,
sorttable wouldn't work here; it will treat the spelled-out numbers as
strings, and so would sort the numbers in alphabetical order, i.e., five,
four, one, three, two. To get around this, you can specify on a cell in your
table a <code>sorttable_customkey</code> attribute, and sorttable will use
the contents of that attribute instead of the text in the cell itself when
sorting the table. So, for example, your table might look like this:

</p><pre><code>&lt;table class="sortable"&gt;
&lt;tr&gt;&lt;th&gt;Number (spelled)&lt;/th&gt;&lt;th&gt;Person&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td sorttable_customkey="2"&gt;two&lt;/td&gt;&lt;td&gt;Jan&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td sorttable_customkey="3"&gt;three&lt;/td&gt;&lt;td&gt;Bruce&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td sorttable_customkey="1"&gt;one&lt;/td&gt;&lt;td&gt;Steve&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</code></pre>

<p>Note that clicking on the "Number (spelled)" column in the table below sorts
it in the correct one,two,three order.

</p><table class="sortable">
<tbody><tr><th>Number (spelled)</th><th>Person</th></tr>
<tr><td sorttable_customkey="2">two</td><td>Jan</td></tr>
<tr><td sorttable_customkey="3">three</td><td>Bruce</td></tr>
<tr><td sorttable_customkey="1">one</td><td>Steve</td></tr>
</tbody></table>

<p>You can fix practically any problem you have with sorttable's automatic
column typing by specifying custom sort keys.</p>

<h3 id="overrides">Manually specifying a column's type</h3>
<p>Sorttable works out the type of your columns in order to work out how to
sort them (numbers sort differently than letters, for example). Occasionally,
it might get it wrong. If so, you can explicitly specify a type for a column,
which will override sorttable's assessment. To specify a type, add a class
of <code>sorttable_<em>columntype</em></code> to the <strong>header row</strong>
of that column. Available column types are <code>numeric</code>,
<code>alpha</code>, <code>ddmm</code>, and <code>mmdd</code>. The latter two
are for dates, but are not likely to be useful because if sorttable fails to
automatically identify a date then the sort won't work anyway.</p>

<p>So, for example, if you have a "part number" column which you
want to be treated as if it were numeric, then you might do your table like
this:</p>

<pre><code>&lt;table class="sortable"&gt;
&lt;tr&gt;
  &lt;th <strong>class="sorttable_numeric"</strong>&gt;Part number&lt;/th&gt;&lt;th&gt;Part name&lt;/th&gt;
&lt;/tr&gt;
&lt;tr&gt;
  &lt;td&gt;111-A5&lt;/td&gt;&lt;td&gt;Three-eighths Gripley&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
  &lt;td&gt;31337-H4X0R&lt;/td&gt;&lt;td&gt;Computer system intrusion toolkit&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;</code></pre>

<p>Remember: <strong>you probably do not need to do this</strong>. It is
unlikely that you'll need to "force" sorttable to recognise a column type.
You may also want to investigate using custom sortkeys, above, as a better
way of achieving your goals.</p>

<h3 id="dates">Using custom date formats</h3>
<p>One common question with sorttable is how to make it handle custom
date formats. Sorttable will have a try at understanding dates in
whatever format you add them in, but it sometimes needs help. The way to
do this is with <a href="https://www.kryogenix.org/code/browser/sorttable/#customkeys">custom sort keys</a>, as mentioned
above. If you have table cells like this:</p>
<pre><code>&lt;td&gt;February 11th 2008, 1.19pm&lt;/td&gt;</code></pre>
<p>change them by adding a custom sort key in YYYYMMDDHHMMSS format:</p>
<pre><code>&lt;td <strong>sorttable_customkey="20080211131900"</strong>&gt;February 11th 2008, 1:19pm&lt;/td&gt;</code></pre>
<p>The YYYYMMDDHHMMSS format for the date in the custom key will sort
properly, and sorttable will use the information in the custom key
rather than the information in the table cell itself.</p>

<h3 id="ipaddress">Sorting a column of IP addresses</h3>
<p>Another common request is for sorttable to sort IP addresses. This
will likely be automatically handled in sorttable v3, but until then
you can work around it by using custom sort keys. Change a cell with
an IP address from <code>&lt;td&gt;1.2.191.17&lt;/td&gt;</code> to
<code>&lt;td 
sorttable_customkey="001-002-191-017"&gt;1.2.191.17&lt;/td&gt;</code>;
that is, add a custom key of the IP address, but with each octet in the
IP being three digits long, padded with zeroes if necessary, and
separated with dashes. Sorttable
will then sort this column correctly.</p>

<table class="sortable">
<tbody><tr><th>IP address</th><th>Server name</th></tr>
<tr><td sorttable_customkey="205-017-031-161">205.17.31.161</td><td>buffy</td></tr>
<tr><td sorttable_customkey="192-168-000-001">192.168.0.1</td><td>xander</td></tr>
<tr><td sorttable_customkey="075-244-151-002">75.244.151.2</td><td>giles</td></tr>
<tr><td sorttable_customkey="004-008-016-196">4.8.16.196</td><td>willow</td></tr>
</tbody></table>

<h3 id="stablesort">Stable sorting</h3>
<p>Sorttable, by default, does an unstable sort. This means that it does
not maintain the order of rows where those rows have the same key in the
sorted column. Wikipedia has
<a href="http://en.wikipedia.org/wiki/Stable_sort#Classification">more on
stable sorting</a>. If this is a problem, and you need the sort to be stable,
you can do it by making a tiny edit to sorttable.js. Edit the file and find
the lines:
</p><pre><code>/* If you want a stable sort, uncomment the following line */
//sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
/* and comment out this one */
row_array.sort(this.sorttable_sortfunction);</code></pre>
<p>and change them so the shaker_sort line is uncommented instead:</p>
<pre><code>sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
//row_array.sort(this.sorttable_sortfunction);</code></pre>
<p>The sort will now be stable. However, it will be <em>considerably</em>
slower (the stable sorting can take eight times as long as the unstable sort),
which is why it isn't enabled by default.</p>

<h3 id="notenglish">Sorting non-English text</h3>
<p>Sorttable defaults to sorting English text. If you're sorting text in a different
language which has a different letter order (in particular, if you're seeing that
accented characters are not sorting where you'd expect them to), then you can tell
sorttable to sort in the language of the page. After you include 
<code>sorttable.js</code>, add</p>

<pre>&lt;script&gt;sorttable.sort_alpha = function(a,b) { return a[0].localeCompare(b[0]); }&lt;/script&gt;</pre>

<p>and sorttable will start using the sort order of the language of the browser and page
to do its sorting. (This isn't done by default because <code>localeCompare</code> sorting
is, although definitely the right thing to do, quite a lot slower than string 
comparisons.) If you want to force sorttable to sort in a particular language's
sort order <em>regardless</em> of the browser, you can add a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation">language code</a>
to the call; here we force comparisons to be Finnish:</p>

<pre>&lt;script&gt;sorttable.sort_alpha = function(a,b) { return a[0].localeCompare(b[0], <strong>'fi'</strong>); }&lt;/script&gt;</pre>


<h3 id="externalcall">Sorting a table from your code</h3>
<p>Sometimes you want to, from your own JavaScript code, tell a table to sort.
This is deliberately awkward because you shouldn't be doing it, and you'll want
to make sure that you have an up-to-date version of sorttable.js to do it (download
it from this site), but it's doable. Call</p>
<pre><code>var myTH = document.getElementsByTagName("th")[0];
sorttable.innerSortFunction.apply(myTH, []);</code></pre>

<p>See the example table and buttons below.</p>

<table class="sortable">
    <thead>
        <tr><th id="owncodename">Name</th><th id="owncodecar">Car</th></tr>
    </thead>
    <tbody>
        <tr><td>Stuart Langridge</td><td>Nissan Juke</td></tr>
        <tr><td>Jeremy Clarkson</td><td>Mercedes CLK Black</td></tr>
        <tr><td>Penelope Pitstop</td><td>The Pink Pussycat</td></tr>
        <tr><td>The Ant Hill Mob</td><td>Chug-a-Boom</td></tr>
    </tbody>
</table>
<p>
  <button onclick="sorttable.innerSortFunction.apply(document.getElementById(&#39;owncodename&#39;), [])" fdprocessedid="c7rdhf">Sort
  by 'Name' column</button>
  <button onclick="sorttable.innerSortFunction.apply(document.getElementById(&#39;owncodecar&#39;), [])" fdprocessedid="r7l6a6">Sort
  by 'Car' column</button>
</p>

<h3 id="ownicons">Using your own icons to show a column is sorted</h3>
<p>You can hide sorttable's icons and use your own with CSS, like this:</p>
<pre><code>table.sortable th::after, th.sorttable_sorted::after, th.sorttable_sorted_reverse::after {
  content: " ";
  display: inline-block;
  width: 24px;
  height: 24px;
}
th.sorttable_sorted::after {
  background: url(my-sorted-icon.png);
  background-size: contain;
}
th.sorttable_sorted_reverse::after {
  background: url(my-sorted-reversed-icon.png);
  background-size: cover;
}
#sorttable_sortfwdind, #sorttable_sortrevind { display: none; } <!-- 
cheers dracos -->
</code></pre>

  <style>
    #owniconstable #sorttable_sortfwdind, #owniconstable #sorttable_sortrevind {
      display: none;
    }
    #owniconstable th {
      font-size: 15px;
    }
    table#owniconstable.sortable th::after, #owniconstable th.sorttable_sorted::after, #owniconstable th.sorttable_sorted_reverse::after {
      content: " ";
      display: inline-block;
      width: 15px;
      height: 15px;
    }
    #owniconstable th.sorttable_sorted::after {
      background: url(sort_up_green.png);
      background-size: contain;
    }
    #owniconstable th.sorttable_sorted_reverse::after {
      background: url(sort_down_green.png);
      background-size: cover;
    }
    
  </style>


<table class="sortable" id="owniconstable">
  <tbody><tr>
    <th>Name</th><th>Salary</th><th>Extension</th><th>Start date</th>
    <th>Start date (American)</th>
  </tr>
  <tr><td>Bloggs, Fred</td><td>$12000.00</td>
      <td>1353</td><td>18/08/2003</td><td>08/18/2003</td></tr>
  <tr><td>Turvey, Kevin</td><td>$191200.00</td>
      <td>2342</td><td>02/05/1979</td><td>05/02/1979</td></tr>
  <tr><td>Mbogo, Arnold</td><td>$32010.12</td>
      <td>2755</td><td>09/08/1998</td><td>08/09/1998</td></tr>
  <tr><td>Shakespeare, Bill</td><td>$122000.00</td>
      <td>3211</td><td>12/11/1961</td><td>11/12/1961</td></tr>
  <tr><td>Shakespeare, Hamnet</td><td>$9000</td>
      <td>9005</td><td>01/01/2002</td><td>01/01/2002</td></tr>
  <tr><td>Fitz, Marvin</td><td>$3300</td>
      <td>5554</td><td>22/05/1995</td><td>05/22/1995</td></tr>
</tbody></table>

<h3 id="nosortcolumn">Making some columns unsortable</h3>
<p>If you'd like some column headers to not be clickable, meaning that
your users won't be able to resort the table by those columns, then add
<code>class="sorttable_nosort"</code> to the <code>&lt;th&gt;</code>
column header. Observe how the "number of legs" column here isn't
sortable.</p>

<table class="sortable">
  <thead>
  <tr><th>Name</th><th>Team</th>
  <th class="sorttable_nosort">Number of legs</th></tr>
  </thead>
  <tbody>
  <tr><td>Molby, Jan</td><td>Liverpool</td><td>2</td></tr>
  <tr><td>Hughes, Mark</td><td>Manchester Utd</td><td>2</td></tr>
  <tr><td>Nicol, Steve</td><td>Liverpool</td><td>2</td></tr>
  <tr><td>Ardiles, Ossie</td><td>Tottenham Hotspur</td><td>2</td></tr>
  <tr><td>Nellie the Elephant</td><td>London Zoo United</td><td>4</td></tr>
  <tr><td>Nicholas, Charlie</td><td>Arsenal</td><td>2</td></tr>
  </tbody>
</table>

<h3 id="sortonload">Sorting the table when the page is loaded</h3>
<p>Lots of people ask, "how do I make sorttable sort the table the first
time the page is loaded?" The answer is: you don't. Sorttable is about
changing the HTML that is served from your server without a page
refresh. When the page is first served from the server, you have to
incur the wait for it to be served anyway. So, if you want the table
sorted when a page is first displayed, serve the table in sorted order.
Tables often come out of a database; get the data from the database in a
sorted order with an ORDER BY clause in your SQL. Any solution which
involves you running sorttable as soon as the page loads (i.e.,
without user input) is a wrong solution.</p>
<p>(However, if you really want to, see <a href="https://www.kryogenix.org/code/browser/sorttable/#externalcall">sorting
a table from your own code</a>.)</p>

<h3 id="descending">Sort in descending order first</h3>
<p>Making sorttable sort your columns in descending order first rather
than ascending order requires editing sorttable.js. Find the line:</p>
<pre><code>row_array.sort(this.sorttable_sortfunction);</code></pre>
<p>and after it, add a new line:</p>
<pre><code>row_array.reverse();</code></pre>

<h3 id="insensitive">Sort case-insensitively</h3>
<p>Making sorttable sort your columns case-insensitively (so
uppercase and lowercase letters sort together) requires editing
sorttable.js. Find the lines:</p>
<pre><code>  sort_alpha: function(a,b) {
    if (a[0]==b[0]) return 0;
    if (a[0]&lt;b[0]) return -1;
    return 1;
  },</code></pre>
<p>and change them for</p>
<pre><code>  sort_alpha: function(a,b) {
    if (a[0].toLowerCase()==b[0].toLowerCase()) return 0;
    if (a[0].toLowerCase()&lt;b[0].toLowerCase()) return -1;
    return 1;
  },</code></pre>

<h3 id="lefthandheader">Adding a "left-hand-header" column</h3>
<p>A fairly common request is to have a column on the left of the
  table which contains a "row number" for each row (so the first row
  is "1", the second "2" and so on) which is not reordered when the
  table is sorted.</p>
<p>This is possible without sorttable using some advanced CSS. Add
  to your stylesheet:</p>
<pre><code>table.sortable tbody {
    counter-reset: sortabletablescope;
}
table.sortable thead tr::before {
    content: "";
    display: table-cell;
}
table.sortable tbody tr::before {
    content: counter(sortabletablescope);
    counter-increment: sortabletablescope;
    display: table-cell;
}</code></pre>
<p>and your sortable tables will now have a left-hand "row number" column
 in <a href="http://caniuse.com/css-counters">browsers which support this
 technique</a>, which is basically everything these days from IE8 and onward.</p>
<p>A simple live example (remember that the "row number" column will not show in very old
  browsers)</p>
<table class="sortable" id="counterdemo">
    <thead><tr><th>Name</th><th>Age</th></tr></thead>
    <tbody>
        <tr><td>Methusaleh</td><td>969</td></tr>
        <tr><td>Elijah Snow</td><td>100</td></tr>
        <tr><td>Shirley Temple</td><td>10</td></tr>
        <tr><td>George Burns</td><td>91</td></tr>
        <tr><td>Mrs Robinson</td><td>40</td></tr>
    </tbody>
</table>

<h3 id="zebra">Alternately striping the table</h3>
<p>It is quite common to want to add background striping ("zebra stripes")
  to a table and have those stripes work even after sorting.</p>
<p>This is possible without sorttable using some advanced CSS. Add
  to your stylesheet:</p>
<pre><code>table.sortable tbody tr:nth-child(2n) td {
  background: #ffcccc;
}
table.sortable tbody tr:nth-child(2n+1) td {
  background: #ccffff;
}</code></pre>
<p>and your sortable tables will now be zebra striped
 in <a href="http://caniuse.com/css-sel3">browsers which support this
 technique</a>, which is basically everything these days from IE9 and onward.</p>
<p>A simple live example (remember that the striping will not show in very old
  browsers)</p>
<table class="sortable" id="stripedemo">
    <thead><tr><th>Team</th><th>Colour</th></tr></thead>
    <tbody>
        <tr><td>Liverpool</td><td>red</td></tr>
        <tr><td>England</td><td>white</td></tr>
        <tr><td>Wolverhampton</td><td>orange</td></tr>
        <tr><td>Arsenal</td><td>red</td></tr>
    </tbody>
</table>

<h3 id="scrollable">Tables with a scrollable body</h3>
<p>You can have a sortable table with a scrollable body, although it
  will require you to specify explicit widths for your columns. See
  <a href="http://jsbin.com/enotac/2">http://jsbin.com/enotac/2</a>
  for a worked example; CSS inspiration for the scrollable body was
  taken from <a href="http://www.imaputz.com/cssStuff/bigFourVersion.html">Terence
  Ordona</a>.

    <style>
    table#scrollbody { width: 500px; } /* fixed width table */
    table#scrollbody thead tr { display: block; } /* makes it sizeable */
    table#scrollbody tbody {
      display: block; /* makes it sizeable */
      height: 170px; /* height of scrollable area */
      overflow: auto; /* scroll rather than overflow */
      width: 100%; /* fill the box */
    }
    table#scrollbody thead th { width: 250px; } /* fixed width for THs */
    table#scrollbody tbody td { width: 242px; } /* fixed width for TDs */
    /* the tbody needs to be 16px less than the thead, for the scrollbar */
    </style>

    </p><table class="sortable" id="scrollbody">
    <thead><tr><th>Company</th><th>Leader</th></tr></thead>
    <tbody>
      <tr><td><a href="http://www.kryogenix.org/">Kryogenix Consulting</a></td><td>Stuart Langridge</td></tr>
      <tr><td>Apple</td><td>Tim Cook</td></tr>
      <tr><td>Oracle</td><td>Larry Ellison</td></tr>
      <tr><td>Virgin</td><td>Richard Branson</td></tr>
      <tr><td>Louis Vuitton</td><td>Louis Vuitton</td></tr>
      <tr><td>Canonical</td><td>Mark Shuttleworth</td></tr>
      <tr><td>Google</td><td>Larry Page</td></tr>
      <tr><td>Armani</td><td>Giorgio Armani</td></tr>
      <tr><td>Ferrari</td><td>Enzo Ferrari</td></tr>
    </tbody>
  </table>
<p>You can also have the table's headers stick to the top of the page
as the table scrolls beneath. See <a href="https://adrianroselli.com/2020/01/fixed-table-headers.html">Adrian
Roselli's writeup</a> to explain how to do this in modern browsers.


</p><h3 id="bookmarklet">Can I sort tables on a page I didn't write?</h3>
<p>You can load sorttable from a bookmarklet. A simple example, which makes all
  tables on the current page sortable, is <a href="javascript:(function(){var s=document.createElement(&#39;script&#39;);s.src=&#39;http://kryogenix.org/code/browser/sorttable/sorttable.js&#39;;s.onload=function(){sorttable.init();Array.prototype.slice.call(document.getElementsByTagName(&#39;table&#39;)).forEach(function(t){sorttable.makeSortable(t);})};document.getElementsByTagName(&#39;head&#39;)[0].appendChild(s);})()">make tables sortable</a>. Drag it to your bookmarks bar and then clicking it
  while on a page will make all tables on that page sortable.</p>

<h3 id="changes">Changes from sorttable v1</h3>
<p>Sorttable has changed quite a lot in this new version 2. Please read
the <a href="http://www.kryogenix.org/days/2007/04/07/sorttable-v2-making-your-tables-even-more-sortable">release announcement</a> for more details of what's changed
and who is to be thanked. If for some reason you need the original version 1
of sorttable you can download it from
<a href="https://www.kryogenix.org/code/browser/sorttable/sorttable_v1.js">sorttable_v1.js</a> along with the
<a href="https://www.kryogenix.org/code/browser/sorttable/index_v1.html">original instructions</a>.</p>

<h3 id="licence">Licencing</h3>
<p>Sorttable, like all my <a href="https://www.kryogenix.org/code/browser/">DOM scripts</a>, is under the <a href="http://www.kryogenix.org/code/browser/licence.html">X11 licence</a>, which
basically means you can do what you want with it, including using it at
work, in a commercial setting or product, or in open source projects
(including those that are GPL licenced). If you're not sure, or you have
other questions, please <a href="http://www.kryogenix.org/contact">contact me</a>
for details.</p>

<h3 id="pay">Can I give you money for sorttable? I really like it</h3>
<p>You don't have to. I believe in Free Software; writing this and seeing
people use it is its own reward. Of course, if you're determined to give me
money then I'm not going to stop you. You can send money to my PayPal account
with the button below.</p>
<form style="text-align: center" action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="image" src="./sorttable_files/x-click-but04.gif" border="0" name="submit" alt="Make payments with PayPal - it&#39;s fast, free and secure!" fdprocessedid="0rweu8">
<img alt="" border="0" src="./sorttable_files/pixel.gif" width="1" height="1" cd7jnaojm="" style="filter: invert(0);">
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
</form>

<h3 id="bugs">I've found a problem in sorttable. How can
I tell you about it?</h3>
<p>Firstly, thanks for using sorttable; sorry it's not doing quite what you want!
If your question isn't answered on this page, please <a href="http://www.kryogenix.org/contact">contact
me</a> and tell me about it, and I'll try and give you some pointers on how to fix it yourself.</p>

<h3 id="payforwork">But I need my problem with sorttable fixed! Can I pay you
to fix it?</h3>
<p>Yes. Sorttable gets worked on in my spare time, between paid work, which means
that development might not be as fast as you like. If you really want something
fixed, you can jump it up my priority list by waving money at me. Best thing
to do is to <a href="http://www.kryogenix.org/contact">contact me</a> and we can
talk about rates and so on.</p>


<p>Stuart Langridge, November 2003, April 2007, 2016, and since</p>

<p><a href="https://www.kryogenix.org/">kryogenix.org</a> | <a href="https://www.kryogenix.org/code/browser/">other browser
experiments</a></p>



</div><span id="PING_IFRAME_FORM_DETECTION" style="display: none;"></span></body><grammarly-desktop-integration data-grammarly-shadow-root="true"><template shadowrootmode="open"><style>
      div.grammarly-desktop-integration {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select:none;
        user-select:none;
      }

      div.grammarly-desktop-integration:before {
        content: attr(data-content);
      }
    </style><div aria-label="grammarly-integration" role="group" tabindex="-1" class="grammarly-desktop-integration" data-content="{&quot;mode&quot;:&quot;full&quot;,&quot;isActive&quot;:true,&quot;isUserDisabled&quot;:false}"></div></template></grammarly-desktop-integration></html>