/auth: Login and authentication endpoints defined in auth.controller.js and auth.routes.js.

/clubs: Endpoints for club management via club.controller.js.

/contacts: Endpoints to manage contact data.

/events: Event-related CRUD actions in event.controller.js.

/uploads: File upload handling (upload.controller.js and upload.route.js).

/homepage: Homepage dynamic content.

/users: Managed through user.routes.js

Endpoint  |  Method  |  Description                           
----------+----------+----------------------------------------
/login    |  GET     |  Renders the login page                
/login    |  POST    |  Handles user login (credential submit)
/logout   |  GET     |  Logs out the user                     

/            |  GET     |  Welcome message                         
/home        |  GET     |  Fetches homepage data                   
/club/:name  |  GET     |  Gets club data by name (dynamic param)  
/event:id    |  GET     |  Gets event details by id (dynamic param)
/contacts    |  GET     |  Returns contact information             
/allClubs    |  GET     |  Returns all club data                   
/allevents   |  GET     |  Returns all event data                  

/                  |  GET     |  Renders upload page              
/                  |  POST    |  Accepts file upload (with multer)
/delete/:filename  |  GET     |  Deletes file by filename         