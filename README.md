# CREATING SIMPLE REST API USING NODE AND EXPRESS JS
Node.js is an open-source, cross-platform JavaScript runtime environment and library used to run web applications outside the client's browser
## Lets Take A look at how we implement this
### Prequisites
1. Install Node JS
2. Run the Node.js installer. Accept the license agreement. You can leave other settings as default. The installer will install Node.js and prompt you to click on the finish button.
3. Verify that Node.js was properly installed by opening the command prompt and typing this command: node --version
## Lets Start
### Step One
* Create A folder for the project.Initialize the project in a text editor like **VS CODE**
* Open the terminal and enter ``` npm init ``` and press enter and your node js project will be initialized
* View the package.json file
* Your entry point will be index.js
### Step two
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
  Configure middleware using app.use():
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

