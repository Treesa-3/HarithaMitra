# Harithamithra: Waste Management App

A mobile app that digitises waste collection for **Harithakarmasena**. Residents, waste-collection workers and administrators use one app to manage the whole process.

Built by a team of 4 as a full-stack MERN project (MongoDB, Express.js, React Native with Expo, Node.js).

## Features

The app has 4 modules:

- **Collection tracking:** [e.g. residents see collection schedules and status]
- **Payments:** [e.g. residents pay waste-collection fees in the app]
- **Event booking:** [e.g. book a collection or clean-up event]
- **Marketplace:** [e.g. list and buy recyclable or reusable items]

### User roles

Role-based login gives each user only the features they need:

| Role            | What they can do                                                  |
| --------------  | ----------------------------------------------------------------  |
| User (resident) | [e.g. track collection, pay, book events, use the marketplace]    |
| Worker          | [e.g. view assigned collection routes, update collection status]  |
| Admin           | [e.g. manage users and workers, monitor collections and payments] |

## Tech stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based login with role checks

## My contribution

- Built parts of both the frontend screens (React Native) and the backend REST API (Node.js, Express).
- Implemented role-based authentication, so users, workers and admins each log in and see only their own features.
- Worked with the backend's structure of models (data), controllers (logic) and routes (API endpoints), with MongoDB as the database.

## How to run

You need Node.js and a MongoDB database (local or MongoDB Atlas).

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Then start the server:

```bash
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone, or press `a` to open an Android emulator.

## Team

Built by a team of 4: Treesa Renny, Megha V.S, Khadeeja Nazrin, Mehbooba Saif.
