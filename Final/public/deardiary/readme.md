# Sketch Therapy:
The Sketch Therapy is a website that serves as a visual gallery of my daily random sketches and notes. The images are stored in a GitHub repo. The image URL and the rest of the data are stored in Amazon DynamoDB and queried using the aws-sdk module in Node.  The user can check different sketch categories by using the sort button. To make the query efficient, each page will only show the most recent images with the maximum number of ten. If I have more time, I will implement a timeline function to the website, as intended in my initial design sketch.


![Sketh Therapy Doc](https://github.com/BounceRan/data-structures/blob/master/Final/public/deardiary/doc/sketchtherapy.jpg)