# Online Judge Platform

Welcome to the Online Judge Platform! This project is a web application designed to help users solve programming problems, compete with others, and improve their coding skills. Users can view problems, submit solutions, view leaderboards, and manage their profiles.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- User Authentication: Register, login, and manage sessions.
- Problem Set: View a list of coding problems and their details.
- Code Submission: Submit code solutions and receive feedback on correctness.
- Profile Management: Upload profile images, view activity calendar, and track progress.
- Leaderboard: View top coders and their problem-solving statistics.
- Friends: Add friends and view their problem-solving statistics.
- Code Editor: Write and run code within the application.

## Installation

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend Setup

1. Clone the repository:
 ```bash
 git clone https://github.com/yourusername/online-judge-platform.git
 cd online-judge-platform/backend
  ```
2.Install dependencies:

```bash
npm install
```
3.Create a .env file in the backend directory based on the .env.example:

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
4.Start the backend server:

```bash
npm start
```
         
### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```
2. Install dependencies:

```bash
npm install
```
3. Start the frontend development server:

```bash
npm start
```
## Usage

### User Authentication

1. Register a new account.
2. Login with your credentials.
3. The session will be managed using JWT tokens.


### Problem Set
1. View a list of problems.
2. Click on a problem to view its details and submit your solution.


### Profile Management
1. View your profile.
2. Upload a profile image.
3. View your activity calendar.
4. Track your problem-solving progress and achievements.


### Leaderboard
1. View the top coders and their statistics.
2. Click on a user's name to view their profile and submissions.

### Friends
1. Add friends to your list.
2. View your friends' problem-solving progress and achievements.


### Code Editor
1. Use the built-in code editor to write and run your code.
2. Submit your code for evaluation and view the results.

## Technologies Used
1. Frontend: React, Tailwind CSS
2. Backend: Node.js, Express.js
3. Database: MongoDB
4. Authentication: JWT (JSON Web Tokens)
5. Code Execution: Docker (for code isolation and security)
