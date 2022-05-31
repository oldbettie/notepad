# Team Notes

https://noteteams.netlify.app
<br/>

Team notes is the latest addition to the education and note taking tool belt. providing users with the ability to colaborate on notes for different classes they might be attending. our interactive board provides the user an easy navigation and interactive experience. write move edit and delete notes as needed and then download a txt file of the session that you can print out and use for things like note cards and highlighting.

<br/>

this is the final project for our General Assembly Software Engineering Immersive Course.
This web application follow RESTful api best practices and utilizes React.js as the frontend and Express as the backend. the database we chose to use was mySQL with sequelizer. although the app is completely mobile responsive its best experienced on a desktop on laptop.

## Collaborators:

-   [JJ Eaton] (https://github.com/oldbettie)
-   [Pedro Vivas] (https://github.com/MrDrops)

### Test Login

you can creat your own account for a blank board or logging into the below user will show a basic example of a board with multiple users and several notes.

<pre>
Email: travis@ga.co
Password: chicken
</pre>

## Features

1. signup/login/logout
   Using safe best practices for login signup ect. requiring an email and username and secure password.

2. Edit your profile.

    Able to edit your preferences including setting a custom note color via hex code.

3. Create Classrooms.
   All users are able to create, edit, delete and invite others to all the rooms they like.

4. Join Other Classrooms.
   join your friends or peers in there classrooms and automatically adds it to your que so you can come back at any time.

5. The Board
   The board is the main functionality of the application and allows all users to join contribute update and delete their own notes. the notes can be positioned to best fit the groups use the board is completely interactive. notes can be moved the board itself can be moved and you can zoom in and out as you please by holding ctrl and mouse wheel up or down or on a laptop holding ctrl and 2 finger slide up or down. this is best experienced on desktop but will work on mobile also but the zoom ratio is much less then the desktop experience.

6. Customimation and download.
   the download is a very basic feature but allows the notes to be downloaded as a basic txt document for use later or to be printed out later. you can change and modify a few preferences in the board itself like the note color ect. more features will be added over time.

## Bugs

1. its more of an annoyance then a bug but the backend does go to sleep due to the free tier of heroku and i wasnt about to pay for it myself nice try heroku...

2. the notes all stick in the same position this again isnt a bug but more of an annoyance i may add some logic to place it center on the screen on submit but right now thats not a concern.

3. occasionally will drop to a blank screen on refresh if too many requests happen at once. its really hard to replicate to debug and is a work in progress. but its about once every 200 board renders.

4. the session logic sometimes has issues this should be fixed in the live version it appears to be a local issue.

## updates

may 31st. 2022

1. patched requests to dismount should be much more responsive now.
2. finallised 1.0 styling
