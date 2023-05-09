# CampusShare - A Social Media App for Students

CampusShare is a social media platform designed specifically for students to connect, collaborate, and share their educational experiences. This app is built using React, Node.js, MySQL, and Socket IO, providing a seamless and interactive experience for users.

## Table of contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
- [My Folder Structure](#my-folder-structure)
- [Author](#author)
- [Contributing](#contributing)
- [Contact](#contact)


## Technologies

Project is built with:

* MySQL 
* ReactJS
* JavaScript 
* ExpressJS
* JQuery
* SocketIO
* Node.js

## Getting Started:

`Before you get started, ensure that you have the following software installed on your local machine:`

- Node.js v14.0.0 or higher
- npm v6.14.0 or higher
- MySQL v5.7 or higher
- IDE (for better navigation)
- MySQL Workbench v5.7 or higher

### Installation:

### 1. Clone the repository
    git clone https://github.com/elsheikhmohamed/final-year-project.git

### 2. Change to the product directory

    cd product

### 3. Install the dependencies for the backend and frontend

    cd api && npm install

    cd ../client && npm install

### 4. Set up the MySQL database by running the provided SQL scripts (found in the product folder).

    - Import mysql database file to your localhost database software (MySQL Workbench)
    - Make sure the name of the database stays the same as provided.

***Make sure these information is right***

``` 
host:"localhost",
user:"root",
password:"password",
database:"campus_share"
```

### 5. Start the backend server
    cd ../api && npm start

### 6. In a separate terminal, start the frontend development server

    cd client && npm start

> The app should now be running on http://localhost:3000 for frontend and http://localhost:8800 for backend. 

**If you encounter an error please make sure that the server is up and running and not in use by other applications.**

## Folder Structure:

The folder structure consists of an `api` folder for the backend and a `client` folder for the frontend.

In the `api` folder, you'll find the `controllers`, `routes`, `index.js`, `connect.js`, and `package.json` files.

The `client` folder contains the `public` folder with `index.html` and `upload` directories. Inside the `src` folder, you'll find `assets`, `components`, `context`, `hooks`, `pages`, `App.js`, `index.js`, `axios.js`, `style.scss`, and `package.json` files.

> This folder structure organises the codebase and separates the backend and frontend components, making it easier to manage and maintain the project.

### Test Users

***Please login with username test1 as it follows all users and and test all features better if you are logged in with this username.***

    username: test1 password: test1
    username: test2 password: test2
    username: test3 password: test3
    username: test4 password: test4

## Author

- Name - **Mohamed El Sheikh**
- LinkedIn - [@Mohamed El Sheikh](https://www.linkedin.com/in/mohamed-el-sheikh-b3854a196/)


## Contributing:

Contributions are NOT welcomed at the moment! If you'd like to improve the app or fix any issues, please get in touch first as this is a university project.


## Contact:

If you have any questions or need support, please contact the app creator (Mohamed El Sheikh) at ***`elsheikhmoha@gmail.com`***


### test 