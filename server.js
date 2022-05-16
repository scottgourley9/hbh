const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = require('./config');

const expensesApi = require('./api/expenses');
const materialsApi = require('./api/materials');
const milestonesApi = require('./api/milestones');
const moodboardImagesApi = require('./api/moodboardImages');
const projectPhotosApi = require('./api/projectPhotos');
const projectsApi = require('./api/projects');
const resourcesApi = require('./api/resources');
const taskItemsApi = require('./api/taskItems');
const taskPhotosApi = require('./api/taskPhotos');
const taskSectionsApi = require('./api/taskSections');
const usersApi = require('./api/users');
const mediaApi = require('./api/media');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '20mb' }));

app.get('/health', (req, res) => {
    res.status(200).json('Healthy');
});

app.post('/expenses/create', expensesApi?.create);
app.get('/expenses/read/:id', expensesApi?.read);
app.put('/expenses/update/:id', expensesApi?.update);
app.delete('/expenses/delete/:id', expensesApi?.delete);

app.post('/materials/create', materialsApi?.create);
app.get('/materials/read/:id', materialsApi?.read);
app.put('/materials/update/:id', materialsApi?.update);
app.delete('/materials/delete/:id', materialsApi?.delete);

app.post('/milestones/create', milestonesApi?.create);
app.get('/milestones/read/:id', milestonesApi?.read);
app.put('/milestones/update/:id', milestonesApi?.update);
app.delete('/milestones/delete/:id', milestonesApi?.delete);

app.post('/moodboardImages/create', moodboardImagesApi?.create);
app.get('/moodboardImages/read/:id', moodboardImagesApi?.read);
app.put('/moodboardImages/update/:id', moodboardImagesApi?.update);
app.delete('/moodboardImages/delete/:id', moodboardImagesApi?.delete);

app.post('/projectPhotos/create', projectPhotosApi?.create);
app.get('/projectPhotos/read/:id', projectPhotosApi?.read);
app.put('/projectPhotos/update/:id', projectPhotosApi?.update);
app.delete('/projectPhotos/delete/:id', projectPhotosApi?.delete);

app.post('/projects/create', projectsApi?.create);
app.get('/projects/read/:id', projectsApi?.read);
app.put('/projects/update/:id', projectsApi?.update);
app.delete('/projects/delete/:id', projectsApi?.delete);

app.post('/resources/create', resourcesApi?.create);
app.get('/resources/read/:id', resourcesApi?.read);
app.put('/resources/update/:id', resourcesApi?.update);
app.delete('/resources/delete/:id', resourcesApi?.delete);

app.post('/taskItems/create', taskItemsApi?.create);
app.get('/taskItems/read/:id', taskItemsApi?.read);
app.put('/taskItems/update/:id', taskItemsApi?.update);
app.delete('/taskItems/delete/:id', taskItemsApi?.delete);

app.post('/taskPhotos/create', taskPhotosApi?.create);
app.get('/taskPhotos/read/:id', taskPhotosApi?.read);
app.put('/taskPhotos/update/:id', taskPhotosApi?.update);
app.delete('/taskPhotos/delete/:id', taskPhotosApi?.delete);

app.post('/taskSections/create', taskSectionsApi?.create);
app.get('/taskSections/read/:id', taskSectionsApi?.read);
app.put('/taskSections/update/:id', taskSectionsApi?.update);
app.delete('/taskSections/delete/:id', taskSectionsApi?.delete);

app.post('/users/create', usersApi?.create);
app.get('/users/read/:id', usersApi?.read);
app.put('/users/update/:id', usersApi?.update);
app.delete('/users/delete/:id', usersApi?.delete);

app.post('/media/create', mediaApi?.create);

app.listen(config?.port, function(){
    console.log('listening on port ' + config?.port);
});

// app.post('/auth/signup', function(req, res){
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//
//
//
//   db.create_new_user([req.body.business, req.body.first, req.body.last, req.body.phone, req.body.email, hash], function(err, user){
//     if(err){
//       res.json({message: 'already taken'})
//     }
//     else {
//       res.status(200).send({
//         token: createJWT(user[0])
//       })
//     }
//   })
//   })
// })
//
// app.post('/auth/login', function(req, res){
//   db.get_user([req.body.email], function(err, user){
//       if (err) return res.status(500)
//       if (!user[0]) {
//         return res.send({
//           message: 'Invalid email and/or password'
//         })
//       }
//       bcrypt.compare(req.body.password, user[0].password, function(err, resp) {
//         if(resp) {
//           res.send({
//             token: createJWT(user[0])
//           })
//         }
//         else {
//           res.send({
//             message: 'Invalid email and/or password'
//           })
//         }
//       })
//
//
//
//       })
//     })
//
// app.post('/api/customers', function(req, res){
//   db.find_customer([req.body.phone, req.body.userid], function(err, theUser){
//     console.log(theUser);
//     if(!theUser.length){
//       db.add_customer([req.body.first, req.body.last, req.body.phone, req.body.email, req.body.userid], function(err, success){
//         if(err){
//           res.status(500).json(err)
//         }
//         else {
//           res.status(200).json(success[0])
//         }
//
//       })
//     }
//     else {
//       res.json('customer already exists')
//     }
//   })
//
// })
//
// app.get('/api/customers/:userid', function(req, res){
//   db.get_customers([req.params.userid], function(err, customers){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(customers)
//     }
//   })
// })
//
// app.get('/api/customer/:userid/:phone', function(req, res){
//   db.get_customer([req.params.userid, req.params.phone], function(err, customer){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(customer)
//     }
//   })
// })
//
// app.delete('/api/customers/:id', function(req, res){
//   db.delete_customer([req.params.id], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// app.put('/api/customers/:id', function(req, res){
//   db.update_customer([req.params.id, req.body.first, req.body.last, req.body.phone, req.body.email], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// app.get('/api/user/:id', function(req, res){
//   console.log(req.body);
//   db.get_user_by_id([req.params.id], function(err, user){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(user)
//     }
//   })
// })
//
// // Links ENDPOINTS
// app.get('/api/links/:id', function(req, res){
//   db.get_links([req.params.id], function(err, links){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(links)
//     }
//   })
// })
//
// app.get('/api/link/:id', function(req, res){
//   db.get_link([req.params.id], function(err, link){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(link)
//     }
//   })
// })
//
// app.post('/api/links', function(req, res){
//   db.add_link([req.body.name, req.body.link, req.body.locationId], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// app.put('/api/links', function(req, res){
//   db.update_link([req.body.id, req.body.name, req.body.link], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// app.delete('/api/links/:id', function(req, res){
//   db.delete_link([req.params.id], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// // Message ENDPOINTS
//
// app.post('/api/messages', function(req, res){
//   db.add_message([req.body.senttime, req.body.message, req.body.linkid, req.body.userid, req.body.customerid, req.body.linktype], function(err, messageId){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(messageId[0])
//     }
//   })
// })
//
// app.get('/api/messages/:userId', function(req, res){
//   db.get_messages([req.params.userId], function(err, messages){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json(messages)
//     }
//   })
// })
//
// app.put('/api/positivemessage/:id', function(req, res){
//   db.positive_message([req.params.id], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// app.put('/api/negativemessage/:id', function(req, res){
//   db.negative_message([req.params.id], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
//
// app.put('/api/complaint/:id', function(req, res){
//   console.log(req.body);
//   db.complaint([req.params.id, req.body.complaint], function(err, success){
//     if(err){
//       res.status(500).json(err)
//     }
//     else {
//       res.status(200).json('success')
//     }
//   })
// })
