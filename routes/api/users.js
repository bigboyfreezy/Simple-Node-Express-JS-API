const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let users = require('../../Users')

//get all users
router.get('/',(req,res) =>{
    res.json(users)
})

// Filter by Id:
router.get('/:id',(req,res) =>{
    const found = users.some((user) => user.id === parseInt(req.params.id))
    if(found){
        res.json(users.filter((user) =>user.id === parseInt(req.params.id)))
    }
    else{
        res.json("Not Found")
    }
} )

//create a new user 
// 318882491134.dkr.ecr.us-east-1.amazonaws.com/mb-repo sg-0821414ff384625d0 
// 318882491134.dkr.ecr.us-east-1.amazonaws.com/mb-users-repo / users
//318882491134.dkr.ecr.us-east-1.amazonaws.com/mb-threads-repo
// {
//     "family": "mb-users-task",
//     "containerDefinitions": [
//         {
//             "name": "mb-users-container",
//             "image": "318882491134.dkr.ecr.us-east-1.amazonaws.com/mb-users-repo",
//             "cpu": 0,
//             "portMappings": [
//                 {
//                     "containerPort": 3000,
//                     "hostPort": 3000,
//                     "protocol": "tcp"
//                 }
//             ],
//             "essential": true,
//             "entryPoint": [
//                 "sh",
//                 "-c"
//             ],
//             "command": [
//                 "/bin/sh -c \"echo '<html> <head> <title>Amazon ECS Sample App</title> <style>body {margin-top: 40px; background-color: #333;} </style> </head><body> <div style=color:white;text-align:center> <h1>Amazon ECS Sample App</h1> <h2>Congratulations!</h2> <p>Your application is now running on a container in Amazon ECS.</p> </div></body></html>' >  /usr/local/apache2/htdocs/index.html && httpd-foreground\""
//             ],
//             "environment": [],
//             "mountPoints": [],
//             "volumesFrom": []
//         }
//     ],
//     "networkMode": "awsvpc",
//     "requiresCompatibilities": [
//         "EC2"
//     ],
//     "cpu": "256",
//     "memory": "512"
// }
 router.post('/',(req,res) =>{
    const newUser = {
        id : uuid.v4(),
        Name : req.body.Name,
        Email : req.body.Email

    }
    if(!newUser.Name || !newUser.Email){
        return res.json("Error found")
    }

    users.push(newUser)
    res.json("User Added Successfully"+newUser)

 })

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

module.exports = router;