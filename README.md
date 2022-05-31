# Team Notes

https://noteteams.netlify.app
<br/>



Team notes is the latest addition to the education and note taking tool belt. providing users with the ability to collaborate on notes for different classes they might be attending. our interactive board provides the user an easy navigation and interactive experience. Write move edit and delete notes as needed and then download a .txt file of the session that can be printed out and used for things like reviewing, creating note cards and highlighting.

<br/>

This Web App is the final project for our General Assembly Software Engineering Immersive Course.
Full-stack web application with Interactive UI, User/Sessions and RESTful API best practices. Designed to be experienced on a desktop or laptop but fully mobile responsive.

## Stack

- ReactJS                  UI
- Node / Express           Server, RESTFul API
- MySQL                    Database
- Sequelize                ORM
- deployed on              Heroku/Netifly

## Collaborators:

-   [JJ Eaton] (https://github.com/oldbettie)
-   [Pedro Vivas] (https://github.com/MrDrops)

### Test Login

A new user account can be created for a blank board. </br>
logging with the test user below will show a pre-set board with multiple users and several notes.

<pre>
Email: travis@ga.co
Password: chicken
</pre>


## Features

1. signup/login/logout

   Using safe best practices for login signup and server requests. Requiring an email, username and secure password.

2. Edit your profile.

   Able to edit your preferences including setting a custom note color via hex code.

3. Create Classrooms.
   All users are able to create, edit, delete and invite others to all the rooms they create with a simple invite URL.

4. Join Other Classrooms.
   Users can copy/paste an invite and automatically be redirected to the class if logged in or to the login/sign up page. After signup/login, user with be redirected to classroom, added to the classroom participants, and a link to the classroom will be added to their classrooms.

5. The Board
   The board is the main functionality of the application and allows all users to join contribute update and delete their own notes. the notes can be positioned to best fit the groups use the board is completely interactive. notes can be moved the board itself can be moved and you can zoom in and out as you please by holding ctrl and mouse wheel up or down or on a laptop holding ctrl and 2 finger slide up or down. this is best experienced on desktop but will work on mobile also but the zoom ratio is much less then the desktop experience.

6. Customisation and download.
   The download is a basic feature that allows the notes to be downloaded as a raw .txt document for later use or to be printed out later. you can change and modify a few preferences in the board itself like the note color ect. more features will be added over time.

## Bugs // issues

1. Issue regarding delay in loading server after being inactive for a while. This is due to Heroku's free hosting service nature.

2. Issue related to Notes starting in the same position on the board when generated.

3. Rare Issue regarding blank screen in case of overload due to requests exceeding capacity. Hard to replicate, estimated ocurrence, 1 in every 200 renders aproximately.

4. Issue related to session logic using app locally. Live version does not display the same behaviour.

## Updates

may 31st. 2022

1. patched requests to dismount should be much more responsive now.
2. finallised 1.0 styling
