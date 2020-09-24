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
 
 The web-app UI is built using React JS components. We have built custom CSS styles to control the overall aesthetic of our pages. Here is a snippet of our *App.css* defining 
 styles for our browse page.
 
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

In order to display the data on a profile: the front-end, back-end and data storage services have to interact with each other.

Starting from the back, this is how our infrastructure handles data storage and retrieval.
1. Profile data is stored in:
   - MongoDB if it is organised text data
   - S3 bucket if it is a file ( eg. profile picture, academic document)

2. Data is retrieved from the approiate storage using Node JS requests. *Mongoose API* is used to communicate with MongoDB - for authentication and retrieving specific profiles.
The code from *mongo.js* below shows an example interaction between the back-end and the database.

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

3. The retrieved data is then process in React JS to be displayed appropriately on the web-app. 
The code from *ProfileData.js* below shows an example of how functions are used to format the data.

```
export function getElements (lst)
{
    if(lst)
    {
        return lst.map((item, index) =>(
        <p>{item}</p>
        ));
    }
}
```

## Routing 

Any request made for a page on the web-app is processed and served using Node JS and express. Express is the server framework we are using that handles requests pages based on their URLs. The code below is a snippet of routing from *app.js*.

```
// Handle React routing, return all requests to React app
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});
```


## Dependencies
 
 
 
