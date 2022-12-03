# Issue Tracker

The Issue Tracker is a web application that tracks issues in a project. Once installed, you can:

- Create projects that act as a container for issues
- Create issues with tasks and attachments.
- Collaborate with other people by inviting them your project

## Installation

- [Download and install node along with npm](https://nodejs.org/en/)

  - Check the installation status of node by running `node --version` in cmd.
  - Check the installation status of npm by running `npm --version` in cmd.

- [Download and install postgres](https://www.postgresql.org/download/)

  - Open cmd and connect to postgres using `psql -U postgres`, enter your password (eg. `root`)
  - Copy the contents of `/configs/schema.sql` and paste them in psql console, press enter
  - Type `/d` to see all the tables created

- [Download and install git](https://git-scm.com/downloads)

  - Check the installation status of git by running `git --version` in cmd.

- Clone the git repo using `git clone https://github.com/sourabh-singh-rawat/issue-tracker.git`

- Install Backend dependencies by going to root and using `npm i`

- Install Frontend dependencies going to `/client` and using `npm i`

- Install Firebase services for Auth and Storage in frontend

  - Signup to firebase and go to the console to create a new project
  - Authentication
    - Go to Authentication in the build section and click on get started.
    - Choose sign-in method and enable Google as a provider, add support email and save.
  - Storage
    - Go to Storage in the build section and click on get started.
    - Start in test mode and click next.
    - Click on done
  - Go to project settings and register a web app by clicking on the `</>` icon
  - Go to `/client` and install firebase if not already using `npm i firebase`.
  - Copy the value of the `firebaseConfig` variable shown, to the `firebaseConfig` variable in the `/client/src/configs/firebase.configs.js` file

    ```
      // Example
      apiKey: "AIzaSyBg39iZrsuY-pCz-Oj4ZLa9enPvPurDwUQ",
      authDomain: "test-d2028.firebaseapp.com",
      projectId: "test-d2028",
      storageBucket: "test-d2028.appspot.com",
      messagingSenderId: "45944513713",
      appId: "1:45944513713:web:a7b8bb1438f8147cdb2e90"
    ```

  - Create a `.env` file in the root and add the following environment variables, also replace JWT_SECRET with a random string of your choice.

    ```
      DATABASE_NAME=issue-tracker
      DATABASE_HOST=localhost
      DATABASE_USER=postgres
      DATABASE_PASSWORD=root
      DATABASE_POST=5432
      JWT_SECRET={Pick any JWT secret key you want}
    ```

- Install Firebase service for Auth in the backend server

  - Go to Project settings and click on the service accounts tab
  - Click on generate new private key and save the file as `service-account.json` in a new`../service-account` directory outside the issue-tracker directory (keep it safe as it contains private key)
  - Add a new environment variable `GOOGLE_APPLICATION_CREDENTIALS` in `.env` and set its value to the absolute path of the `service-account.json` file

    ```
      GOOGLE_APPLICATION_CREDENTIALS={Absolute path to service accounts file}
    ```

- [Signup to SendGrid Email Service](https://sendgrid.com/)

  - Go to Email API on the sidebar and click on Integration Guide.
  - Choose Web API and click on Node.js.
  - Create an API Key by typing a name and clicking on Create Key.
  - Copy the value of the API Key and add it to the environment variable `SENDGRID_API_KEY` in the `.env` file.

    ```
      SENDGRID_API_KEY={Your API Key}
    ```

## Environment Variables

In case you missed we need the following environment variables to run the application

```
  DATABASE_NAME=issue-tracker
  DATABASE_HOST=localhost
  DATABASE_USER=postgres
  DATABASE_PASSWORD=root
  DATABASE_POST=5432
  JWT_SECRET={Pick any JWT secret key you want}
  GOOGLE_APPLICATION_CREDENTIALS={Absolute path to service accounts file}
  SENDGRID_API_KEY={Your API Key}
```

## Usage

- Go to root and type `npm run dev` to start the backend server.
- Go to `/client` and type `npm start` to start the frontend server.
