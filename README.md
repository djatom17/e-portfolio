# Elite Flex e-portfolio
IT Project (COMP30022) Semester 2, 2020

## About this readme
This readme intends to document the development process to provide a good understanding of the web-app for modification purposes. It will explain how our front-end code, back-end code and database work together for our project.

## Table of Contents
* [Team Members](#team-members)
* [About the Artifact](#about-the-artifact)
* [Technology Stack](#technology-stack)
* [User Interface](#user-interface)
* [Website Structure](#website-structure)
* [Data Storage and Retrieval](#data-storage-and-retrieval)
* [Dependencies](#dependencies)

## Team Members

Name | Email | Student ID
---- | ----- | ----------
Aman Bhuyan | abhuyan@student.unimelb.edu.au | 946264
Anjali Manoj Ahuja | anjalimanoja@student.unimelb.edu.au | 978003
Chung Lin (Nicholas) Wong | chungw4@student.unimelb.edu.au | 926736
Jiseong (Daniel) Oh | jiseongo@student.unimelb.edu.au | 988193
Josh Sanon | jsanon@student.unimelb.edu.au | 936965


## About the Artifact

Check-me-out e-portfolio is an online portfolio hosting service.

Ideally, it should be able to:
  - Have multiple users
  - Display all the users
  - Provide multiple preset portfolio layouts to users
  
Each user should be able to:
  - Login and logout
  - Upload/edit basic biodata
  - Upload/delete profile pictures
  - Upload/edit Work and Education history
  - Upload/delete files such as certificates/academic papers etc.
  - Upload/delete social media links

## Technology Stack

(describe stack)
(possibly add diagram)

(additional technologies used)

## User Interface
 
 The web-app UI is built using React JS components. We have built custom CSS styles to control the overall aesthetic of our pages.
 ```
 .browse-outer {
  margin: auto;
  width: 100%;
  border: 2px solid #bbb;
  padding: 10px;
  overflow: auto;
}

.browse-profile-picture {
  width: 240px;
  height: 260px;
  padding: 10px;
  float: left;
  clear: left;
}
 ```
 
 The UI consists of two kinds of components:
 1. Site-wide components such as the navbar
 2. Specific JS pages
 The former can be found in *layout* and the later can be found in *auth*.
 
 <img src="readme_images/UI Directory.PNG" width='256'>
 
These components create all the pages the user can interact with:
- Home Page - our landing page which prompts the user to log in or find out more.
- Log in - allows a user to login to be able to edit their profile.
- Browse - where all our users' summaries are displayed for visitors to see.
- Profile - essentially the e-portfolio where a users' bio data, skills, work history and more are displayed in greater detail. 
- About - a page that displays information about our product.
 
We have implemented a 4 profile page **presets** (like the early prototypes shown below) for our clients to choose from. 
 <p>
  <img src="readme_images/Layout1.PNG" width='512'>
  </p>
  <p>
  <img src="readme_images/Layout2.PNG" width='512'>
 </p>


## Data Storage and Retrieval

front-end: (code snippet from profileData.js)
We use an API to retrieve data from other servers (MongoDB, S3). 
Node.js acts as the middle man between the app and other service. It is what delivers the app on Heroku.

```
// Get all profiles
mongorouter.get('/profiles', function(req, res, next) {
  //get all profile entries from MongoDB.profiles
  Profile.find().lean().exec((err, profiles) => {
    if (err) return res.send("[Mongoose] Error in fetching profiles.");

    console.log("[Mongoose] Fetched all profiles.");
    res.send(profiles);
  });
});
```

Mongoose API is used to communicate with MongoDB - Authentication, and to retrieve a profile.

(mongo db screenshot for one DUMMY profile)


image and document retrieval, s3
(add s3 code)

## Routing 
Any request made for a page on the deployment is processed through express and node js. It is being served by express (framework for node). Express handles request for pages based on URLs.
```
// Handle React routing, return all requests to React app
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});
```







## Dependencies
 
 
 
