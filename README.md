# Issue Tracker

The Issue Tracker is a Web Application that tracks issues in a project. Once installed, you can:

- 📄 **Create and manage projects**, which act as a container for issues.
- 🐞 **Create and track issues**, including tasks, comments, and attachments, within a project.
- ✌️ **Invite others** to collaborate on your project by adding them as members.
- 🔔 **Use Activity Feed** to stay up-to-date on the status of your project and issues. (Current)
- 🔔 **Use Notifications and alerts** to stay up-to-date on the status of your project. (Coming Soon)
- 📊 **Use labels, milestones, and other metadata** to organize and categorize issues. (Coming Soon)
- 🔒 **Use permissions and access controls** to manage who can view and edit issues within a project. (Coming Soon)
- 🔒 **Use security controls**, such as two-factor authentication and data encryption, to protect your data and secure access to your projects. (Coming Soon)
- 💬 **Collaborate with others in real-time** through built-in chat and communication features. (Coming Soon)
- 📈 **Use reports and charts** to track the progress of your project. (Coming Soon)
- 📈 **Use integration with other tools**, such as project management or code repository platforms, to streamline your workflow. (Coming Soon)
- 📈 **Use dashboards** to track the progress of your project and current open issues. (Coming Soon)
- 💾 **Use version control** to track changes to issues and restore previous versions if needed. (Coming Soon)

## Installation

1. **Download and install Node.js and npm**:

   - Go to https://nodejs.org and download LTS version.
   - Run the installer and follow the prompts to install Node.js and npm.
   - Check the installation by running `node --version` and `npm --version` in a command prompt.

2. **Download and install PostgreSQL**:

   - Go to https://www.postgresql.org/download and download the installer.
   - Follow the prompts to install PostgreSQL on your system.
   - Check the installation by running `psql --version` in a command prompt.

3. **Connect to PostgreSQL and run the schema SQL file**:

   - Open a command prompt and connect to PostgreSQL using the following command:
     `psql -U postgres`
   - Enter your password when prompted.
   - Copy the contents of `/server/src/configs/db.schema.sql` and paste them in the psql console, then press enter to execute the SQL commands.
   - To view all the tables that were created, type `\d` in the psql console.

4. **Download and install Git**:

   - Go to the Git website (https://git-scm.com/downloads) and download the installer:
   - Check the installation status of git by running `git --version` in cmd.

5. **Clone the git repo and install dependencies**:

   - Clone the git repo using `git clone https://github.com/sourabh-singh-rawat/issue-tracker.git`
   - Install backend dependencies by going to root and using `npm install`
   - Install frontend dependencies going to `/client` and using `npm install`

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

- Go to root and type `npm start` to start the backend server.
- Go to `/client` and type `npm start` to start the frontend server.
