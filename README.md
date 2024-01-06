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
