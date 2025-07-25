HopCalendar is an assignment/deadline aggregator that would help students stay on top of their deadlines during online learning and help teachers maintain student engagement as well. Our deadline aggregator will be in the form of a monthly view calendar that has indicators for any upcoming deadlines and assignments. 
The indicators will also have distinguishing features so that the user will know which class it is for. This way, the user won't need to remember to manually input their assignments and deadlines from the syllabus and from various sources of announcements.
Instructors would have to fully commit to using our app as their primary outlet to students in order for HopCalendar to be successful.

FRONTEND: npm start (localhost:8080)

BACKEND: npm start (localhost:3000)

### DEPLOYMENT
Site can be accessed at https://hopcalendar.netlify.app/#/ which is the frontend deployment on the Netlify platform. Backend and database are deployed on Heroku. 

### LOGIN INFO
Current dummy data login for a student role is `janedoe@jhu.edu` as the email and `hellokitty` as the password, and for an instructor it is `darvish@jhu.edu` and `computer`. These fields should be automatically be filled in on the login page to make it easier for instructor grading. To log in as Admin, enter `abc` for both email and password. 

Locally, please run `node db.js` in the /project/backend/ directory to instantiate PSQL tables as well as dummy data. This has already been done on the deploy. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### To push Heroku
git add . 
git commit -m
git subtree push --prefix project/backend heroku main
heroku logs --tail (to see console logs)
heroku run bash (run remote terminal to run db.js)
