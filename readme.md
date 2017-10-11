# Assessment 2: Cleaning data and adding interaction 📊

This assessment is all about grabbing a 'dirty' dataset and making it interactive.

## Background

[The assessment](https://github.com/cmda-fe3/course-17-18/tree/master/assessment-2) is part of the course 'Front-end development 3', which is part of the study 'Communication and Multimedia Design'. The course is focused on teaching the students how to visualize data with d3.js, this assessment is one of the things that the student will be judged on.

Dirty data has to be visualized. 'Dirty' data is data that cannot instantly be interpreted by d3. D3 can understand 'clean' TSV/CSV/JSON, datasets that aren't laid out in this format have to be adjusted in order to be used. This could of course be done by hand, but if you'd like to use a different dataset from the same source you'd have to do the work all over. By doing this 'adjusting' in the .js file, you can simply drop in a new dataset and it will work straight away. 'Adjusting' in JavaScript also helps with bigger datasets, manually adjusting 10000 entries will take longer than getting JavaScript to do it for you.

## Process

This section of the readme will show you how my final code came to be.

* The first step of the process was picking the data. This took a little while, since the data had to be 'dirty' enough. The assessment lists some [recommended sources](https://github.com/cmda-fe3/course-17-18/blob/master/assessment-1/readme.md#other-data) of data. I really liked some of the datasets by 'fivethirtyeight', unfortunately these were too clean for me to use. After doing some digging, I ended up using www.cbs.nl, since this website also offers some nice functionality regarding selecting data from a dataset. [This](http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLEN&PA=7052eng&D1=0-1,7,30-31,34,38,42,49,56,62-63,66,69-71,75,79,92&D2=0&D3=0&D4=0,10,20,30,40,50,60,(l-1)-l&HD=171011-2135&LA=EN&HDR=G1,G2,G3&STB=T) is the dataset I picked, I selected some of the fields that I wanted and continued. 

* The second stap was 'cleaning' the data. I knew this was a big task, it was my first time cleaning a dataset from a source we hadn't used before, so I made sure to do this first. It took me quite a while, but to make a long story short, I ended up managing by combining code from assignment [clean](https://github.com/cmda-fe3/course-17-18/blob/master/class-3.md#clean) with mine. Of course some changes had to be made from the original - the original used a .txt file to load data in, where I used a .csv file this time. I was able to figure out how to make it work by trial and error, and help from fellow students and the teacher (@DesleyAalderink and @wooorm). Some of my time-consuming challenges were chopping off the footer of the code, and making the data load in at all (.csv file instead of .txt file). Anyhow, at the end, the console was logging the correct data and I could move onto the visualisation.

* I decided to use my bar chart from the [interactivity](https://github.com/cmda-fe3/course-17-18/blob/master/class-4.md#interactivity) assignment. Both because I wanted to use a bar chart for my visualisation, and because I knew how to make the interaction work. The bar chart was starting to show data very quickly, but it actually took a while to make it show the data correctly. I had some issues with getting the correct values on the y-axis - it turned out I forgot turning my 'amount' values into `Number()`s. Another problem I had was my x-axis labels not transitioning - it turned out that I forgot adjusting a class name. That was my biggest struggle with this step, simple and little mistakes that soak up time. After getting rid of those issues, my code worked!

## Sources and help

* [@wooorm](https://github.com/wooorm) - Help with many different things, including reminding me to ask my 🦆 more questions.
* [@DesleyAalderink](https://github.com/DesleyAalderink) - Help with getting rid of footer in data.
* [D3 Gallery: Bar Chart](https://bl.ocks.org/mbostock/3885304) - Used to create the bar chart.
* [Class 3 slides](https://docs.google.com/presentation/d/1TpoPilc1qVIQU07u_IdPeNqSZcbgliPaLF0zZUWGvWE) - For cleaning data.
* [Sort functionality](https://github.com/cmda-fe3/course-17-18/blob/master/site/class-4/sort/index.js)

## License

Released under the GNU General Public License, version 3. (from [D3 Gallery: Bar Chart](https://bl.ocks.org/mbostock/3885304))
