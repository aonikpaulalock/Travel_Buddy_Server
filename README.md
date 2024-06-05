# Travel Buddy App

## Live Demo

## https://travel-buddy-server-two.vercel.app/

## Getting Started

To set up the Travel Buddy Matching App locally, follow these steps:

1. **Clone the Repository**
   `https://github.com/aonikpaulalock/Travel_Buddy_Server.git`
2. **Install Dependencies**: `cd file-Name && npm i / install`
3. **Set Up Environment Variables**: Create a `.env` file based on the provided `.env.example` file and fill in the necessary configuration.
4. **Run Migrations**: `npx prisma migrate dev` to apply database migrations.
5. **Start the Server**: `npm run dev` to run the backend server.
6. **Access the App**: Visit `http://localhost:Your_Port` in your browser to access the Travel Buddy App.

## Technology Used

Programming Language: TypeScript
Web Framework: Express.js
Object Relational Mapping (ORM): Prisma with PostgreSQL
Authentication: JWT (JSON Web Tokens)

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: Supabase Database PostgreSQL with Prisma
- **Authentication Password Hash**: Jwt,Bcrypt etc

## Features

- **Trip Management**: Create, view, and manage your trips with ease.
- **Travel Buddy Requests**: Send and receive travel buddy requests to join or invite others to your trips.
- **User Profile**: Update user profile status and Maintain your user profile to share information about yourself with other users.
- **Search and Filter**: Find trips and potential travel buddies based on destination, dates, budget, and more.

## API Endpoints

### User Endpoints

- **Register User**: `POST /api/register`
- **Login User**: `POST /api/login`

## UserProfile Endpoints

- **Get User Profile**: `GET /api/profile`
- **Update User Profile**: `PUT /api/profile`

## Trip Endpoints

- **Create Trip**: `POST /api/trips`
- **Get Trip**: `GET /api/trips`

## Travel Buddy Endpoints

- **Send Travel Buddy Request**: `POST /api/trip/:tripId/request`
- **Get Potential Travel Buddies For a Specific Trip**: `GET /api/travel-buddies/:tripId`
- **Respond to Travel Buddy Request**: `PUT /api/travel-buddies/:buddyId/respond`
