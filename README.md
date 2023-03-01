# Interview Scheduler
Interview Scheduler is a single-page app that allows users to book interviews. The front end of this project was created with **React**. It makes requests to an **API** with **Axios** to fetch and store appointment data from a database. This project was tested using **Storybook**, **Jest** and **Cypress**.

## Final Product
### Demo
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Setup
1. Clone this repository.
2. Install the scheduler dependencies with `npm install`.
3. Clone the [scheduler-api repository](https://github.com/lighthouse-labs/scheduler-api).
4. Install the scheduler-api dependencies with `npm install`.
5. Login to the the PostgreSQL server with the username **development** and the password **development**. Use the command `psql -U development`.
6. Create the database with the command `CREATE DATABASE scheduler_development;`.
7. Within the scheduler-api root folder, copy and paste the **.env.example file.** Name the new file **.env.development**.
8. In the **.env.development** file, add the following PostgreSQL configiration:

```sh
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

9. Run the scheduler-api with the command `npm start`.
10. Perform a database reset by navigating to http://localhost:8001/api/debug/reset in your browser.
11. In a seperate terminal window, navigate to the scheduler root folder and use the command `npm start` to run the scheduler.
12. Visit http://localhost:8000/ in your browser and check out the scheduler! The scheduler should
    now be populated with data from the scheduler-api.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies
- axios: 1.3.4
- classnames: 2.2.6
- normalize.css: 8.0.1
- react: 16.9.0
- react-dom: 16.9.0
- react-scripts: 3.4.4
