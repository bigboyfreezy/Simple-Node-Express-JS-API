# CREATING SIMPLE REST API USING NODE AND EXPRESS JS
Node.js is an open-source, cross-platform JavaScript runtime environment and library used to run web applications outside the client's browser
## Lets Take A look at how we implement this
### Prequisites
1. Install Node JS
2. Run the Node.js installer. Accept the license agreement. You can leave other settings as default. The installer will install Node.js and prompt you to click on the finish button.
3. Verify that Node.js was properly installed by opening the command prompt and typing this command: node --version
## Lets Start
## Part One
* Create A folder for the project.Initialize the project in a text editor like **VS CODE**
* Open the terminal and enter ``` npm init ``` and press enter and your node js project will be initialized
* View the package.json file
* Your entry point will be index.js
## Part Two Index.JS
Lets break the code functionality of **Index.JS**
1. Import Dependancy
```
  const express = require('express');
  const path = require('path');
  const bodyparser = require('body-parser');
```
Import necessary modules: 
* **express** for creating the web server, 
* **path** for handling file paths
* **body-parser** for parsing incoming request bodies.
In the Terminal Add the following dependencies using the following command ``` npm install --save express path body-parser ```

2. **Create Instance of express application**
   
   ```
   const app = express();
   
   ```
3. **Use Middleware**
   ```
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));

   ```
* Configure middleware using app.use():
  * express.json(): Parses incoming JSON payloads.
  * express.urlencoded({ extended: false }): Parses incoming URL-encoded form data.
  * The { extended: false } option means the values can be of any type (not just strings or arrays).
    
4. **Define Route For API Endpoint**
  * Lets Create a folder Named **api** that is going to contain our routes.
  * Inside the folder create our **users** (a router file (users.js))
  ```
  app.use('/api/users', require('./routes/api/users'));

  ```
5. **Start The server**
   Start the server on port 3000 and log a message when the server is successfully started.
   ```
    app.listen(3000, () => {
    console.log("Start Server 3000");
    });

   ```

   **Additional Info**
   * **Middleware**:
    Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
    express.json() and express.urlencoded() are middleware functions provided by Express to parse incoming requests. express.json() parses incoming JSON payloads, and express.urlencoded() parses incoming URL-encoded form data.
    * **Router Module (./routes/api/users):**
    This assumes there's a router module for handling API endpoints related to users in the specified path (./routes/api/users). The router module is expected to handle routes like /api/users/....
    * **Listening on Port 3000:**
    The server is configured to listen on port 3000. You can access the server by navigating to http://localhost:3000 in a web browser.
    * **Logging Message:**
    A simple log message is displayed when the server starts, indicating that it's running on port 3000.
    * **Body-Parser:**
    The body-parser module is used for parsing incoming request bodies. However, in Express version 4.16.0 and above, the express.json() and express.urlencoded() methods are included with Express, making the body-parser package unnecessary for parsing JSON and URL-encoded data.

## Part Three: Simple In memory Data Store ( Users.Js)
  + Lets create a simple in-memory data store for user information in a Node.js application.
  + Right click and create a file in the main folder called Users.JS. Note The case.
  + We create an array that contains multiple user objects. Each user object represents a user with three properties: "id," "Name," and "Email."
  + Then We add **module.export** making it available for use in other parts of your Node.js application. 
  ```
  const users = [
    {
        "id": 1,
        "Name": "Yusuf",
        "Email": "yusuf@gmail.com"
    },
    {
        "id": 2,
        "Name": "Moha",
        "Email": "moha@gmail.com"
    },
    {
        "id": 3,
        "Name": "Jamal",
        "Email": "jamal@gmail.com"
    },
    {
        "id": 4,
        "Name": "Chris",
        "Email": "chris@gmail.com"
    }
  ];

  module.exports = users;

  ```

## Part Four: Simple REST API using express.js framework (users.JS)
* This code defines an Express.js router responsible for handling CRUD (Create, Read, Update, Delete) operations for a collection of users
1. **Import Dependencies**
   * Import required modules:
   * Express for creating the router
   * uuid for generating unique identifiers
   * users array (presumably containing user data).
   * Before writing the code ensure you install uuid from the terminal using ``` npm install --save uuid ```
  ```
  const express = require('express');
  const router = express.Router();
  const uuid = require('uuid');
  let users = require('../../Users');

  ```
2. **Define Route for HTTP GET USERS BY ID**
   * requests to retrieve all users.Responds with the entire users array in JSON format.
   ```
    // Filter by Id:
    router.get('/:id', (req, res) => {
        const found = users.some((user) => user.id === parseInt(req.params.id));
        if (found) {
            res.json(users.filter((user) => user.id === parseInt(req.params.id)));
        } else {
            res.json("Not Found");
        }
    });

   ```
   * This route is defined for HTTP GET requests with the path /:id. The :id is a route parameter, and it will capture the value provided in the URL.
   * It uses the some method to check if at least one user in the users array has the specified ID (req.params.id).parseInt(req.params.id) is used to convert the route parameter id to an integer.
   * If a user with the specified ID is found (found is true), it responds with a JSON array containing the user(s) matching the ID.
   * If no user is found, it responds with the string "Not Found."
     
3. **ADD USERS**
   * It creates a new user object with a unique identifier generated using uuid.v4().
   * The user object includes the Name and Email properties, which are obtained from the request body (req.body).
   * checks if the Name and Email properties are present in the new user object.
   * If either of them is missing, it returns a JSON response with the message "Error found."
   ```
    router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        Name: req.body.Name,
        Email: req.body.Email
    };

    if (!newUser.Name || !newUser.Email) {
        return res.json("Error found");
    }

    users.push(newUser);
    res.json("User Added Successfully: " + JSON.stringify(newUser));
    });

   ```
4. **UPDATE USERS**
   * This route is defined for HTTP PUT requests with the path /:id. The :id is a route parameter, capturing the value provided in the URL
   * It uses the some method to check if at least one user in the users array has the specified ID (req.params.id).
   * parseInt(req.params.id) is used to convert the route parameter id to an integer.
   * If a user with the specified ID is found (found is true), it updates the user's information based on the data provided in the request body (req.body).
   * It responds with a JSON object containing a message indicating the successful update and the updated user.
   * The ternary operators are used to check if updateUser.name and updateUser.email are provided in the request body. If provided, the user's Name and Email properties are updated; otherwise, the existing            values are retained.
   ```
    //update user
    router.put("/:id", (req, res) => {
        const found = users.some(user => user.id === parseInt(req.params.id));
        if (found) {
            const updateUser = req.body;
            users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.Name = updateUser.name ? updateUser.name : user.Name;
                user.Email = updateUser.email ? updateUser.email : user.Email;
                res.json({ msg: "User updated", user });
                }
            });
      
        } 
        else {
            res.sendStatus(400);
      
        }
      
      });
   ```
5. **DELETE USERS**
   * If a user with the specified ID is found (found is true), it removes the user from the users array using the filter method.
   * It responds with a JSON object containing a message indicating the successful deletion and the updated user list.
   * The updated user list is sent in the response for reference or further processing.
  ```
    //Delete User
  router.delete("/:id", (req, res) => {

    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id))
        res.json({msg: "User deleted",users});
    } 
    else {
        res.sendStatus(400);
        }
    });
  ```
   
