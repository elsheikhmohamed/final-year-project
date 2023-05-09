# CampusShare - A Social Media App for Students

CampusShare is a social media platform designed specifically for students to connect, collaborate, and share their educational experiences. This app is built using React, Node.js, MySQL, and Socket.IO, providing a seamless and interactive experience for users.


## Getting Started:

Before you get started, ensure that you have the following software installed on your local machine:

- Node.js v14.0.0 or higher
- npm v6.14.0 or higher
- MySQL v5.7 or higher
- IDE (for better navigation)
- MySQL Workbench v5.7 or higher

### `Installation:`

1. Clone the repository
git clone https://github.com/elsheikhmohamed/final-year-project.git

2. Change to the product directory

-  cd campusShare/product

3. Install the dependencies for the backend and frontend

 - cd api && npm install

 - cd ../client && npm install

4. Set up the MySQL database by running the provided SQL scripts (found in the product folder).
    - import mysql database file to your localhost database
    - make sure the name of the database stays the same as provided.

5. Start the backend server

    - cd ../api && npm start

6. In a separate terminal, start the frontend development server

7. cd client && npm start

The app should now be running on http://localhost:3000 for frontend and http://localhost:8800 for backend. If you encounter an error please make sure that the server is up and running and not in use by other applications.

### Folder Structure:

CampusShare/
└── product/
    ├── api/ (backend)
    │   ├── controllers/
    │   ├── routes/
    │   ├── index.js
    │   ├── connect.js
    │   └── package.json
    │   
    └── client/ (frontend)
        ├── public/
        │   ├── upload/
        │   └── index.html
        │ 
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   ├── context/
        │   ├── hooks/
        │   ├── pages/
        │   ├── App.js
        │   ├── index.js
        │   └── axios.js
        │   └── style.scss
        ├── .gitignore
        └──  package.json


### Contributing:

Contributions are NOT welcomed at the moment! If you'd like to improve the app or fix any issues, please get in touch first as this is a university project.

### License:

This project is licensed under the MIT License. See the LICENSE file for more information.

### Contact:

If you have any questions or need support, please contact the app creator (Mohamed El Sheikh) at elsheikhmoha@gmail.com.