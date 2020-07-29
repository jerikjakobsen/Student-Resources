Checklist for start
 - MongoDB must be running
   - brew services start mongodb-community@4.2
 - Redis must be running
   - redis-server /usr/local/etc/redis.conf
 - All packages are installed from package.json
   - npm install
 - Finally Start the server
   Nodemon start (Run from script in package.json)
   - npm run start

Tech Stack
 - Node
 - Express
 - Express-Sessions
 Databases/Caches
 - MongoDB
 - Redis

Auth Server
 This Server handles all the Authentication and Sessions for the Users. Everytime a user logins, if their information is valid, then it attaches a set-cookie to the header. This cookie has the session ID, encrypted with the session secret. On every subsequent request the cookie is attached and validated.

Routes

    - /createUser
        - Gets username, email, password, schoolID from the req.body, then hashes the password, saves the user in mongoDB with the hashed password, username, email and schoolID
    - /login
        - First it get the email and password from the req.body, then verifies if the email and password match with records, if it is valid then the userID is attached to the req.body. Then the session is created. After that if the session is created then if the user wants to stay logged in then the session expires in 90 days instead of 1 hour.
    - /logout
        - Gets the cookie session attached to the request then destroys the session in the redis cache
    - /logoutAll
        - Each session is stored with the key of userID + _ + randomID. So in order to logout all, the redis cache is searched for all keys that have the user's ID in the beginning of it, then destroys all sessions found. Successfully rendering any cookies on any device with the user's cookie useless.