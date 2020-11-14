# Elite Flex e-portfolio
IT Project (COMP30022) Semester 2, 2020

## About this readme
This readme intends to document the development process to provide a good understanding of the web-app for modification purposes. It will explain how our front-end code, back-end code and database work together for our project.

## Table of Contents
* [Team Members](#team-members)
* [About the Artifact](#about-the-artifact)
* [UI Guide](#ui-guide)
* [Architecture](#architecture)


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
  - Bonus: Register for an account
  
## UI Guide

### Browse

#### Search Bar
Search Bar -> Textbox -> OnClick -> Becomes focused and allows the user to type.  
Search Bar -> Textbox -> OnBlur -> Becomes out of focus while retaining any text input.  
Search Bar -> Search Button -> OnClick -> Executes the search query in text box.  
Search Bar -> Advanced Search Button -> OnClick -> Pops open the advanced search modal.  

#### Advanced Search Modal
Search Bar -> Textbox -> OnClick -> Becomes focused and allows the user to type.  
Search Bar -> Textbox -> OnBlur -> Becomes out of focus while retaining any text input.  
Search Bar -> Search Button -> OnClick -> Executes the search query in text box.  
Search Bar -> Advanced Search Button -> OnClick -> Pops open the advanced search modal.  

#### Profile Card
Search Bar -> Textbox -> OnClick -> Becomes focused and allows the user to type.  
Search Bar -> Textbox -> OnBlur -> Becomes out of focus while retaining any text input.  
Search Bar -> Search Button -> OnClick -> Executes the search query in text box.  
Search Bar -> Advanced Search Button -> OnClick -> Pops open the advanced search modal.  

### Profile

#### Profile Picture
Search Bar -> Textbox -> OnClick -> Becomes focused and allows the user to type.  
Search Bar -> Textbox -> OnBlur -> Becomes out of focus while retaining any text input.  
Search Bar -> Search Button -> OnClick -> Executes the search query in text box.  
Search Bar -> Advanced Search Button -> OnClick -> Pops open the advanced search modal.  

#### About Text
About Text -> Edit Icon -> onClick -> Convert text to textbox.  
About Text -> Textbox -> onBlur -> Keep changes.  
About Text -> Textbox -> onPressEnter -> Keep changes.  

#### Social Media Bar
Social Media Checkbox -> Determines whether given social media is displayed on profile. 
Social Media Icon -> onDoubleClick -> Open textbox to edit url of social media.  
Textbox -> onPressEnter -> Keep changes.  

#### Achievements
Achievement Item -> OnDoubleClick -> Convert text to textbox.  
Achievement Item -> Textbox -> onBlur -> Keep changes.  
Achievement Item -> Textbox -> onPressEnter -> Keep changes.  
Achievement Item -> Delete button -> onClick -> Remove achievement.  
Add Button -> Add a new textbox for the user to add a new achievement.  

#### Skills 
Skill Item -> OnDoubleClick -> Convert text to textbox.  
Skill Item -> Textbox -> onBlur -> Keep changes.  
Skill Item -> Textbox -> onPressEnter -> Keep changes.  
Skill Item -> X button -> onClick -> Remove skill.  
Add Button -> Add a new textbox for the user to add a new skill.  

#### Card
Edit Icon -> Convert card to editable form.  
Delete Icon -> Remove card.  
Form -> Save Icon -> Keep changes.  

## Architecture

#### Architectural Model

#### Architecture Descrption
Before we began our first sprint, we agreed on a technology stack that consisted of React JS for front-end, Node JS for back-end,   MongoDB for the database layer and Heroku for deployment. We chose React and Node as they both are highly scalable and widely  supported. With Node JS, the Express framework is used for routing. MongoDB was chosen because of the heterogeneity of data going to be hosted on our e-portfolio service. It was also chosen because of its high availability and scalability. Heroku was chosen for  deployment because it is easy to use and fully managed, allowing us to to focus on the development itself. After discussing  requirements with our clients, we decided to include an Amazon S3 bucket in our architecture to store files such as images and  documents. This was again chosen because of its high scalability and availability.This variation of the MERN stack was chosen because  of the highly-documented and convenient APIs between each layer.Towards the end of sprint 2, we began our automated testing using  GitHub actions. Jest was chosen front-end testing because of its ability to run tests in parallel and only test the areas of our code  changed. Mocha and Chai were chosen because they enable asynchronoustesting for the back-end and have lots of examples available. 

## Description of Key Functionalities

#### Login

The login page presents the user a form in which they can input their login credentials. The form prompts the user if any fields have been left empty. Once the user clicks the login button the form is submitted and the form data is then gathered into an object which is compared against the database entries to verify whether the email and password are correct. If correct, the user is logged in and receives editing privileges for their profile. Otherwise, nothing happens.

#### Sign Up (Bonus Feature)

Sign up was not originally part of our agreed goals. It was brought up later in the semester by clients and so we decided to allow a few extra days to implement this feature. The sign up page presents the user a form in which they can input their basic details. Once the user clicks the sign up button the form is submitted and the form data is then gathered into an object to create a profile for the user. The user is then redirected to their new profile. For successful registration, it is important that the user enters their first and last name separated by space. If the email entered already exists, the user will be notified and the account will not be created.

#### Browse

The browse page maps through the profiles of all accounts that have registered and displays key details of their profile in a form of a card. On clicking on this card, Users will be directed to the selected profile page. As part of the key details that are displayed, their email (Click to copy!) and social links (Click to be redirected!) are shown as well as their key skills. These key skills are also used in the Advanced Search functionality- users are able to search for portfolios based on whether or not they have particular skills (Described in further details below). 

#### Search/Advanced Search

The browse page has a feature to search through all the profiles on the website. The search bar on the browse page searches a user by name. There is also an Advanced Search feature that allows searching of persons who possess a certain skill (e.g., Python, Java, etc.). The Advanced Search modal can be accessed via the small text below the main search bar on the browse page. Any number of skills can be searched together to give narrower results. Searching via skills can also be combined with searching by name in the Advanced Search panel. Furthermore, specific skills can also be searched for on the browse page by clicking on them.
These search functionalities are enabled by MongoDB Atlas’ Search Indexes, which are based on the standard Lucene string analyser.

#### Editing

When a user is logged in to their accounts, on their profile page an edit button will become visible. On clicking the button, the profile enters an editable state, where beside each section of  the editable data edit/delete buttons show up performing their respective tasks on clicking. When the profile enters edit mode, the previously labelled “Edit “ button is then labelled “Save”. When the user is satisfied with their new edited profile, clicking the button will save the changes made. Note: the user must click on save if they wish to keep the edited profile.

#### Uploading

Uploading of documents is done via a Dragger upload component from the external library we are using- Ant Design. When a user enters an editable state, they are given the opportunity to upload relevant documents pertaining to the projects the user has taken a part in or Certificates the user has earned. When attempting to upload a document, a modal pops up allowing the user to enter the Project/Certificate name and description along with a box where the user can drag and drop their document. These Projects/Certificates are displayed in the form of Cards, which are handled by the ProjectManager component. This component receives a Boolean value which indicates whether a card falls under the Projects category or Certificates. The actual upload is done via a post request.
The entire process is handled through Busboy pipelining, which takes in the file as a Blob, and posts it to the relevant route in the backend. The backend then uploads this to the S3 bucket using the AWS SDK and updates the user’s files on MongoDB.

#### Settings

When a user is logged in, their account name is shown in the navbar. This is a dropdown with 2 buttons- Logout and Settings. On selecting settings, the users are redirected to their profile page and a Settings modal pops up. Here the user can make changes relative to their profile and account. There are options to change layouts, themes, email, password, account name and URL.

#### Layouts

There are 4 different preset layouts that a user is able to choose from. The options are available in the Settings. Each account stores a value representing the layout that has been chosen for its profile. When a profile page is loaded it refers to this value and loads the corresponding layout component. Upon changing the layout and clicking “save”, This value will change and hence the corresponding layout will change as well.

#### Themes

There are 5 different preset colour themes available for the user to further customise their profiles. This option can also be found in Settings and works similar to the Layouts feature. Each theme is mapped to a different combination of 2 colours- primary and secondary. Primary and secondary colours correspond to the colouring of different sections in the layout. While selecting themes, a small preview is displayed showing the 2 colours.

## Description of essential classes (code)

### Profile Classes

The Profile classes (Profile.js, Profile2.js, Profile3.js , Profile5.js) are all profile layout components. For the design of these layouts, we have utilised various components from the Ant Design  library to give each of the layouts a unique feel. They all share the same functionality and showcasing of data via the generalised components in the “profileDisplays” folder. They receive an account’s data as props as well as authentication information indicating whether or not the current user is the account owner.

#### Programming Standards

When creating new profile layout templates, ensure that:
 - Render method is returning HTML containers instead of rendering the profile layout directly.
 - Check for user authorisation (if the viewer the owner) in componentDidMount() and set the state appropriately.
 - A mapStateToProps() method is declared and used to store Redux states into props to be used in the class.
 - Correct props are passed into custom components/managers, if any.
 - Correctly using the functions provided in ProfileData.js.
 - Should have all components under UI Functionality Guide - Profile (Edit Mode), exclusions should be justified appropriately.

#### Known Issues

 - Not correctly fetching Redux states and storing them would result in being unable to get profile data.

### MyProfile.js

This class is responsible for taking the user to their own profile page. Here the user has the ability to customise and edit their portfolio. They are also able to change layouts, themes, and account details in the Settings modal present in the class. The class gets the data of the user’s profile via an axios get-request. It then checks for whether the user is in fact the owner of the account, and redirects them accordingly to either their profile page or the login page(if the user is not authorized). The redirecting to their profile page is done via the PlaceholderProfile class which is described below.


#### Programming Standards

 - render() method should have all/most HTML containers handled via placeholderProfile.js.
 - On mount, the profile for a logged in user should be fetched correctly via axios. If the user is not logged in, should not render personal settings.
 - Users should be redirected to the login page if they are not logged in/ authenticated.


#### Known Issues

 - Not including a catch block when fetching user profiles by axios would result in undefined behaviour.
 - Not correctly fetching Redux states and storing them would result in being unable to get profile data.

### PlaceholderProfile.js

When a profile page is to be rendered, this class gets all the data from the profile via an axios get-request based on the url being visited. It then checks for which layout this profile uses and passes on the information to the corresponding Profile class. Furthermore, this class also handles the redirecting to “MyProfile”  if the profile which is trying to be visited is self-profile. 

#### Programming Standards

When adding new layout templates, ensure:
 - New profile is imported and listed under components.
 - Render method is correctly appended with the new, unique layout code, consistent with the declared string in components.

#### Known Issues

 - Calling a state or prop object without checking for its existence explicitly (including its accessed data field) would result in undefined behaviour.
 - Adding new profile templates/ changing profile template name, without updating components or changing arguments for React.createElement in render(), will result in the profile template not being displayed/undefined.

## Description of database structures and routes

Full description of documentation can be found on https://app.swaggerhub.com/apis/ctrl-alt-elite/E-Portfolio/1#/

### MongoDB

The database used for storing user information is hosted on MongoDB for free. The main database is named cae_users. Mongoose is used to link backends to the database. In the database, four collections are used to store the information required by the system in their respective structures.


Note:
It is sometimes important to include a $exists keyword in the mongoose query to the database when querying an element that does not have the ‘required’ field set to true.
Ensure connection to MongoDB has been established before performing database operations. If connection failed, check database credentials, internet connection and IP address whitelist on the database itself.


These four collections are:  
<u>users</u>  
Stores a User model onto the database. A User model is used to store the login credentials and key user information.   
Structure consists of:

| Element  | Datatype | Description                    | Required? | Default (if any) |
|----------|----------|--------------------------------|-----------|------------------|
| _id      | ObjectID | Unique document ID             | Yes       | MongoDB auto     |
| name     | String   | Name of account user           | Yes       | -                |
| email    | String   | Email used for login           | Yes       | -                |
| password | String   | Salted hash of user’s password | Yes       | -                |
| date     | DateTime | Timestamp of account creation  | No        | Date.now()       |



<u>users_to_profiles</u>  
Maps the ID of a user account to their respective profile ID, consistent with the _id in profiles. This collection is used to provide abstraction from storing login credentials with profile-related data.  
Structure consists of:

| Element | Datatype | Description        | Required? | Default (if any) |
|---------|----------|--------------------|-----------|------------------|
| _id     | ObjectID | Unique document ID | Yes       | MongoDB auto     |
| uid     | String   | ID in users        | Yes       | -                |
| pid     | String   | ID in profiles     | Yes       | -                |

<u>profiles</u> 

All profile-related information of each user is stored in this collection. 
 Structure consists of:

| Element         | Datatype           | Description                                           | Required? | Default (if any)                            |
|-----------------|--------------------|-------------------------------------------------------|-----------|---------------------------------------------|
| _id             | ObjectID           | Unique document ID                                    | Yes       | MongoDB auto                                |
| firstName       | String             | First name of profile user                            | Yes       | -                                           |
| lastName        | String             | Last name of profile user                             | Yes       | -                                           |
| contact         | Contact            | Contact details of user                               | No        | -                                           |
| keySkills       | Array of String    | Key skills defined by users                           | No        | -                                           |
| education       | Array of School    | Education background of user                          | No        | -                                           |
| workHistory     | Array of Work      | Professional background of user                       | No        | -                                           |
| image           | String             | Path to profile picture stored on S3                  | No        | “default.png”                               |
| linkToProfile   | String             | User-defined path to profile’s web page               | Yes       | Profile ID                                  |
| social          | Social             | Information of user’s 3rd party social media accounts | No        | -                                           |
| reference       | Array of Reference | Referrals of user                                     | No        | -                                           |
| about           | String             | Description given by user                             | No        | “I am cool.”                                |
| primaryColour   | String             | Colour code of primary background chosen by user      | No        | “#ffffff”                                   |
| secondaryColour | String             | Colour code of secondary background chosen by user    | No        | “#e5e5e5”                                   |
| filesAndDocs    | Array of File      | Uploaded user documents stored in S3                  | No        | -                                           |
| certificates    | Array of File      | Uploaded user certificates stored in S3               | No        | -                                           |
| achievements    | Array of String    | User-given description of achievements                | No        | -                                           |
| subtitle        | String             | User-defined short quote                              | No        | “Flex it!”                                  |
| specialty       | String             | User’s specialty displayed                            | No        | “Software Engineering and Computer Systems” |
| timezone        | String             | Working timezone of user                              | No        | “GMT +8”                                    |
| layout          | String             | Layout design code chosen by user                     | No        | “3”                                         |
| isNewUser       | Boolean            | Allows user to not display profile publicly           | No        | false                                       |


Additional models used: 

Contact

| Element | Datatype | Description            | Required? | Default (if any) |
|---------|----------|------------------------|-----------|------------------|
| _id     | ObjectID | Unique document ID     | Yes       | MongoDB auto     |
| email   | String   | Email address of user  | Yes       | -                |
| phone   | String   | Phone number of user   | Yes       | -                |
| address | String   | Home address of user   | Yes       | -                |

School

| Element     | Datatype | Description                    | Required? | Default (if any)        |
|-------------|----------|--------------------------------|-----------|-------------------------|
| _id         | ObjectID | Unique document ID             | Yes       | MongoDB auto            |
| institution | String   | Place of education             | Yes       | University of Melbourne |
| name        | String   | Name of course undertaken      | Yes       | Bachelor of Science     |
| level       | String   | Educational level of course    | Yes       | Degree                  |
| major       | String   | Major of course, if applicable | No        | -                       |
| description | String   | User description of education  | No        | -                       |
| from        | DateTime | Timestamp of commencement      | Yes       | Date.now()              |
| to          | DateTime | Timestamp of completion        | No        | -                       |

Work

| Element     | Datatype | Description                    | Required? | Default (if any) |
|-------------|----------|--------------------------------|-----------|------------------|
| _id         | ObjectID | Unique document ID             | Yes       | MongoDB auto     |
| role        | String   | Job title of user              | Yes       | -                |
| workplace   | String   | Company name of employment     | Yes       | -                |
| description | String   | User description of employment | No        | -                |
| from        | DateTime | Timestamp of commencement      | Yes       | Date.now()       |
| to          | DateTime | Timestamp of completion        | No        | -                |


Platform

| Element   | Datatype | Description                                                            | Required? | Default (if any) |
|-----------|----------|------------------------------------------------------------------------|-----------|------------------|
| link      | String   | Hyperlink to social media                                              | No        | -                |
| isEnabled | Boolean  | True if user wants to display this information publicly on the profile | Yes       | true             |


Social

| Element  | Datatype          | Description                         | Required? | Default (if any) |
|----------|-------------------|-------------------------------------|-----------|------------------|
| github   | Platform          | GitHub link                         | No        | -                |
| facebook | Platform          | Facebook link                       | No        | -                |
| linkedin | Platform          | LinkedIn link                       | No        | -                |
| twitter  | Platform          | Twitter link                        | No        | -                |
| others   | Array of Platform | Other social media links to display | No        | -                |


Reference 

| Element  | Datatype          | Description                         | Required? | Default (if any) |
|----------|-------------------|-------------------------------------|-----------|------------------|
| github   | Platform          | GitHub link                         | No        | -                |
| facebook | Platform          | Facebook link                       | No        | -                |
| linkedin | Platform          | LinkedIn link                       | No        | -                |
| twitter  | Platform          | Twitter link                        | No        | -                |
| others   | Array of Platform | Other social media links to display | No        | -                |

File

| Element     | Datatype | Description                           | Required? | Default (if any) |
|-------------|----------|---------------------------------------|-----------|------------------|
| _id         | ObjectID | Unique document ID                    | Yes       | MongoDB auto     |
| name        | String   | User-defined filename to be displayed | Yes       | -                |
| filename    | String   | Filename in file data                 | Yes       | -                |
| description | String   | User description of file              | No        | -                |
| url         | String   | Path to stored file on S3             | No        | -                |
| date        | DateTime | Timestamp of upload                   | No        | Date.now()       |


### Routes

All backend routing is handled via Express and calls to backend routes must be made via axios. The following describes each action and the respective routes taken:

#### Known Issues

Error in proxy routing should mean routing in server/app.js has not been correctly defined.

Normal success codes involve 30x which redirects, which is common and perfectly fine.

A status code of 5xx usually means MongoDB error. Check connection to database or any modified entry is correctly set up in MongoDB.

New functions/operations not performing as it should. Ensure core operations are synchronous or binded as a Promise.

Function fetchProfileByUID has to be used with care. The 2nd argument (isRaw) must be carefully considered as misuse of the function could corrupt the data entry on MongoDB.

Performing operations to a corrupted data entry in any collections will crash the system.

Ensure calls to S3 are synchronous to prevent delayed update of information.

Function calls to postUpload and postDelete in server/routes/api/mongo.js should be called following the corresponding upload and delete route for S3. Calling postDelete after failing to delete the actual file entry in S3 will create an unobtainable file on S3 instead. Calling postUpload without following a successful S3 upload route would have undefined behaviour.

#### MongoDB Routes

Routes to profile or MongoDB are stored in server/routes/api/mongo.js. 

#### My Profile Routes

#### User Routes

## Deployment Guidelines

## Product Changelog

## License