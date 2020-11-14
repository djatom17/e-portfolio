# Elite Flex e-portfolio
IT Project (COMP30022) Semester 2, 2020

## About this readme
This readme intends to document the development process to provide a good understanding of the web-app for modification purposes. It will explain how our front-end code, back-end code and database work together for our project.

## Table of Contents
* [Team Members](#team-members)
* [About the Artifact](#about-the-artifact)
* [UI Guide](#ui-guide)


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



