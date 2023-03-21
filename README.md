# PetStore Backend
---

## Requirements

For development, you will only need Node.js, and a node global package manager, `npm` installed in your system.

- ### Node
- ### npm
- ### MongoDB
  Use MongoDB Compass or MongoDB Atlas & setup a cluster and database.
  
  After that get the connection string and put it in the `.env` file.
  
  Make sure to allow access from any ip is enabled.

---

## Setting up the project

    $ git clone https://github.com/ankitksh81/backend-assignment.git
    $ cd backend-assignment
    $ npm install

## Running the project

    $ npm run dev

    This will start the server on port 8001.

## Simple build for production

    $ npm run build

    This will build the project for production.

## Libraries used in the project

  - ### Express
    express is used to create the web server and handle the requests.

  - ### Mongoose
    mongoose is used to connect to the database, create schemas and models and perform operations.

  - ### Multer
    multer is used to handle the file uploads. It is used to upload excel files.

  - ### Read-excel-file
    read-excel-file is used to read excel files and parse the data into a json object which is then saved in the database.

  - ### Morgan
    morgan is used to log the requests and responses to the console.

  - ### Bunyan
    bunyan is used to log the application events.

---

## Testing the project

    - @GET: /api/pet/
    This route is used to get all the pets from the database.

    - @GET: /api/pet/:id
    This route is used to get a specific pet with id from the database.
    To try this route in postman, input a valid id in the url after /api/pet/.

    - @POST: /api/pet/
    This route is used to upload a xlsx file and save the data in the database.
    To try this route in postman, choose form-data and select the type as file and use pets as key name.
    Then upload a xlsx file with the required data in required format.

    - @DELETE: /api/pet/:id
    This route is used to delete a pet with id from the database.
    To try this route in postman, input a valid id in the url after /api/pet/.

    - @PATCH: /api/pet/:id
    This route is used to update a pet with specific changes.
    To try this route in postman, input a valid id in the url after /api/pet/ and then input the changes as json object.
