Checklist for start
 - MongoDB must be running
   - brew services start mongodb-community@4.2
 - Reddis must be running
   - redis-server /usr/local/etc/redis.conf
 - All packages are installed from package.json
   - npm install
 - Finally Start the server
   Nodemon start (Run from script in package.json)
   - npm run start

Tech Stack
 - Node
 - Express
DataBases/Memory Caches
 - MongoDB (Mongoose for Document Structure)
 - Reddis Cache
 - Cloudinary (To save User Uploads)
Servers
 - Main server
 - Auth Server

Main Server
 This server handles all the user requests regarding creation of new resources and finding such resources
 Auth -> User must be logged in
 Authentication
    - This is done with cookies and sessions on the Auth server. The Cookie ID is stored on the client side, and relevant info is stored on the server (Redis)
Routes

Course Related
    - /createCourse (Auth)
        - Takes name of course, code of the course ?, professorID of the course, schoolID of the School. Then Checks if the course has already been created with the professorID, schoolId and name of course. If nothing returns then the course is created in the mongodb database
    - /getCoursesByProfID/:profID
        - Gets all courses by profID (from params) from mongodb

File Related
    - /upload (Auth)
        - Uses multer to get the file upload (uses multitype html form), then puts the file in /uploads
        - Takes title, courseID, type (of resource), semester, authorID, anonymous, tags from req.body.
        Then creates a document in the database, uploads the file from the /uploads folder on the server to the uploads folder on cloudinary and names it whatever the document ID was when it was created in the Database.
        - Then deletes the file from the server, and updates the file URL.
    - /file/:ID
        -  Takes the ID (from params) and returns the File Document (with the fileURL)

Professor Related
    - /createProf (Auth)
        - Gets the profName and the schoolID from req.body,
        first checks if the professor already exists, then if nothing is found then it creates the professor
    - /searchProfWithSchoolID/:schoolID/:searchTerm/
        - Given a schoolID, searches for the searchTerm in the database (Professor Name) and returns results
    - /searchProf/:searchTerm
        - Just searches for the searchTerm in the professor database and returns 8 results
    - /getAllProfBySearch/:searchTerm
        - Searches for a professor in the Database and returns all matches found

School Related
    - /createSchool (Auth)
        - Gets the name, nickname, country, state, city, schoolWebsite from req.body, checks if there is a school with the name, country and city provided, if not the school is created with these credentials
    - /searchSchool/:searchTerm
        - Searches for the school name with the search term and returns 8 schools found
    - /searchSchoolAll/:searchTerm
        - Searches for the school name with the search term and returns all schools found