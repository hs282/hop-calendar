# Software Requirements Specifications

## Problem Statement 

After COVID, there has been a significant increase in the use of online materials (Gradescope, Zoom, Blackboard, Piazza, Slack, etc.). However, because instructors use these online materials based on their personal preferences, students end up having to use and check multiple websites for their class materials. While talking to my friends, I realized that a lot of other students also found this process very inconvenient, so our group decided to come up with a platform that enables students to access and check the class materials and assignments that are separated among different platforms.

## Potential Clients
Current students, teaching staff & faculty member @ Hopkins

## Proposed Solution
Our app will be an assignment/deadline aggregator that helps students stay on top of their deadlines during online learning. Also, it will help teachers maintain student engagement through remote learning. Our deadline aggregator will be in the form of a monthly view calendar that has indicators for any upcoming deadlines and assignments. The indicators will also have distinguishing features so that the client will know which class it is for. This way, the client won't need to remember to manually input their assignments and deadlines from the syllabus and from various sources of annoucements. If instructors fully commit to using our app as their primary outlet to students, our app will be successful.
## Functional Requirements
### Must have
- Student can create an account (COMPLETED)
- Instructor can create an account (COMPLETED)
- Student can log in to the app (COMPLETED)
- Instructor can log in to the app (COMPLETED)
- Student can view all upcoming assignments in calendar view (COMPLETED)
- Student can distinguish upcoming assignments by class (COMPLETED)
- Student can expand an upcoming assignment object for more details (COMPLETED)
- Student can enroll in (subscribe to) an Instructor's class (COMPLETED)
- Student can delete (drop) a course (COMPLETED)
- Instructor can perform CRUD operations on their feed for both courses and task (COMPLETED)


### Nice to have
- Q&A board for each upcoming assignment object
- Search bar with filters where students can search for courses to add 
- Students can choose from monthly, weekly, and daily calendar views (COMPLETED)
- Student can view tasks by class in list view on the My Courses page (COMPLETED)
- Students can mark tasks as being complete
- External links to Gradescope, Piazza, instructors' personal course websites
- Connections to SIS, Blackboard
- Course info is scraped and loaded into database from SIS, Blackboard, etc so that instructors don't have to make an account for this app
- Students can view list of tasks in order of priority

## Software Architecture
This application will only be for Web (browser) based users, although it will be responsive to mobile browser aspect ratios. 
  The application will conform to traditional Client-Server architecture with a database store.


## User Stories
- AS A: Hopkins student using the app
    - I WANT: to be able to see and manage all deadlines for assignments, quizzes, exams, etc.
    - SO THAT: I can meet my academic requirements on time even in a 100% online learning environment
  
- AS A: member of the teaching staff at Hopkins using the app
    - I WANT: to have a main hub where I can post all academic deadlines and manage them at once
    - SO THAT: I can see how the workload is separated and communicate better with my students regarding academic work and workload
  
- AS A: first-year Hopkins student using the app
    - I WANT: a calendar that tells me which assignments/quizzes/exams are coming up
    - SO THAT: I can adjust better to the college academic setting and online learning
    (COMPLETED)



## Wireframes
![Log-in Screen](https://www.dropbox.com/s/x50i39zafliot4v/Screen%20Shot%202020-11-20%20at%209.24.01%20PM.png?dl=0&raw=1)

![CreateAccount] (https://www.dropbox.com/s/06pycua01h63jxn/Screen%20Shot%202020-11-20%20at%209.25.54%20PM.png?dl=0&raw=1)

![CalendarView] (https://www.dropbox.com/s/x4o58jr1jeywwhw/Screen%20Shot%202020-11-20%20at%209.30.39%20PM.png?dl=0&raw=1)

![AddCourse] (https://www.dropbox.com/s/hc171kx5xxk2eo8/Screen%20Shot%202020-11-20%20at%2010.06.20%20PM.png?dl=0&raw=1)

![DropCourse] (https://www.dropbox.com/s/hqx1f8767dgg5sq/Screen%20Shot%202020-11-20%20at%209.59.32%20PM.png?dl=0&raw=1)

![MyCoursesPage] (https://www.dropbox.com/s/rk8jplfk304qhkg/Screen%20Shot%202020-11-20%20at%209.15.47%20PM.png?dl=0&raw=1)

![InstructorPage] (https://www.dropbox.com/s/fqx2ackck1ldwej/Screen%20Shot%202020-11-20%20at%209.52.44%20PM.png?dl=0&raw=1)





