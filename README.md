# CALORIES
## Environment setup

The following manual will help you setting up the environment:
1. You need to have a running PostgreSQL database 
(set username and password of db in application.properties based on your postgresql configuration)
2. Manually create **calories** database
3. Start spring-boot backend located in **calories-be**
   - You can use your IDE's options for this purpose
4. Tables, relations and initial data will be created automatically once you start the application.
5. Start the separate react application(**widget**) located
in **invite-friend-widget** folder, so it could be integrated within the main frontend application.
   - Type yarn install && yarn start in console window or use IDE's options
6. Start the main react application located in **calories-fe**.
   - As in the step above, type yarn install && yarn start in console window or use IDE's options
7. Once the application is started, you have two options to log in (you can register as well):
    - Login as role USER:
      - email: user@toptal.com or user2@toptal.com, password: user
    - Login as role ADMIN:
      - email: admin@toptal.com, password: admin
8. Enjoy the application! :)

## API testing

- You can find all the endpoints used by the application after staring the backend on:
  - http://localhost:8080/swagger-ui/index.html#/