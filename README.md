# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started
- This tweeter app is deployed on heroku. [https://glacial-lake-58852.herokuapp.com](https://glacial-lake-58852.herokuapp.com)
- To run locally, 
1. Clone this repo.
2. Install dependencies using the `npm install` command.
3. Config local ```MONGODB_URI``` and ```PORT``` in ```.env```file. At root directory, ```touch .env``` to create ```.env``` file, then add ```MONGODB_URI=mongodb://localhost:27017/tweeter&nbsp;
PORT=8080```.
4. Start the web server using the `npm start` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Dependencies
- body-parser
- chance
- express
- mongodb
- node 5.10.x or above
- md5
- dotenv

## Final Product
![Screenshot of tweet compose box](https://github.com/fei-gao/tweeter/blob/master/docs/tweet-box.png)
![Screenshot of tweets](https://github.com/fei-gao/tweeter/blob/master/docs/tweets.png)
![Screenshot of initial tweets](https://github.com/fei-gao/tweeter/blob/master/docs/initial-tweets.png)

