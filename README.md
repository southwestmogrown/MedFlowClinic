# Welcome to MedFlow Clinic!

Medflow Clinic is a Stack Overflow clone that allows registered users to ask, answer, comment, and vote on medical based questions.

There are two classes of user on MedFlow Clinic, Professional and Regular.  

A regular user may only ask questions while a 
professional user may both ask and answer questions.  

All users can upvote and downvote both questions and answers. 

An unregistered user will see a list of the most popular questions on the home page. All other routes will direct an unregistered user to a login/signup page.

Upon login a registered user will be directed to a home page consisting of
questions they have asked, and if professional, a list of answers they have given.

Please review the [wiki](https://github.com/southwestmogrown/MedFlowClinic/wiki) for [API documentation](https://github.com/southwestmogrown/MedFlowClinic/wiki/API-Documentation), [user stories](https://github.com/southwestmogrown/MedFlowClinic/wiki/User-Stories), [MVP feature list](https://github.com/southwestmogrown/MedFlowClinic/wiki/MVP-Feature-List), [frontend routes](https://github.com/southwestmogrown/MedFlowClinic/wiki/Frontend-Routes), and [database schema](https://github.com/southwestmogrown/MedFlowClinic/wiki/Database-Schema).

## Hosting on Heroku

Navigate to [medflow-clinic.herokuapp.com](https://medflow-clinic.herokuapp.com/) and log in as a demo user to check out our features.

## Running locally

- Clone this [repository](https://github.com/southwestmogrown/MedFlowClinic.git)
- Run ```npm install``` to install dependencies
- Create a new Postgesql database using the variables provided in ```/.env.example```
- Run migrations and seeding using ```sequelize-cli```
- Run ```npm start``` to start the server
- Navigate to ```localhost:8080```
- Log in as demo user to access features
