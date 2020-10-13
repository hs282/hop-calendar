# Software Requirements Specifications

## Problem Statement 

After COVID, there has been a significant increase in the use of online materials (Gradescope, Zoom, Blackboard, Piazza, Slack, etc.). However, because instructors use these online materials based on their personal preferences, students end up having to use and check multiple websites for their class materials. While talking to my friends, I realized that a lot of other students also found this process very inconvenient, so our group decided to come up with a platform that enables students to access and check the class materials and assignments that are separated among different platforms.

## Potential Clients
Current students, teaching staff & faculty member @ Hopkins

## Proposed Solution
Our app will be an assignment/deadline aggregator that helps students stay on top of their deadlines during online learning. Also, it will help teachers maintain student engagement through remote learning. Our deadline aggregator will be in the form of a monthly view calendar that has indicators for any upcoming deadlines and assignments. The indicators will also have distinguishing features so that the client will know which class it is for. This way, the client won't need to remember to manually input their assignments and deadlines from the syllabus and from various sources of annoucements. If instructors fully commit to using our app as their primary outlet to students, our app will be successful.
## Functional Requirements
### Must have
- Student can log in to the app
- Instructor can log in to the app
- Student can view all upcoming assignments in calendar view
- Student can distinguish upcoming assignments by class
- Student can expand an upcoming assignment object for more details
- Student can enroll in (subscribe to) an Instructor's class
- Student can delete (drop) a course
- Instructor can perform CRUD operations on their feed for both courses and tasks


### Nice to have
- Q&A board for each upcoming assignment object
- Search bar with filters where students can search for courses to add 
- Students can choose from monthly, weekly, and daily calendar views
- Students can mark tasks as being complete
- External links to Gradescope, Piazza, instructors' personal course websites
- Connections to SIS, Blackboard

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




## Wireframes
![Log-in Screen](https://www.dropbox.com/s/tjy4pxrmygoygi4/Screen%20Shot%202020-10-01%20at%204.15.06%20PM.png?dl=0&raw=1)

![Calendar View](https://www.dropbox.com/s/lcahuyiatj5nogh/Screen%20Shot%202020-10-13%20at%204.45.58%20PM.png?dl=0&raw=1)

