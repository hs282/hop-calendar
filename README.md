Our app will be an assignment/deadline aggregator that helps students stay on top of their deadlines during online learning. 
Also, it will help teachers maintain student engagement through remote learning. Our deadline aggregator will be in the form of a monthly view calendar that has indicators for any upcoming deadlines and assignments. 
The indicators will also have distinguishing features so that the client will know which class it is for. This way, the client won't need to remember to manually input their assignments and deadlines from the syllabus and from various sources of announcements.
If instructors fully commit to using our app as their primary outlet to students, our app will be successful.
FRONTEND: npm start (localhost:8080)
BACKEND: npm start (localhost:3000)

### DEPLOYMENT
Site can be accessed at https://fervent-leakey-a2a33e.netlify.app/#/ which is the frontend deployment on netlify platform. Backend and database are deployed on Heroku. 

CI/CD hasn't been set up yet but will be soon.

### LOGIN INFO
Current dummy data login is student: janedoe, hellokitty; and instructor: oose, computer. These fields should be automatically be filled in on the login page to make it easier for instructor grading. 

Locally, please run 'node db.js' in the /project/backend/ directory to instantiate PSQL tables as well as dummy data. This has already been done on the deploy. 

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
