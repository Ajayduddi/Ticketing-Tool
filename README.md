# Ticket Tool

Ticket Tool is a comprehensive solution designed to streamline the process of handling and managing requests within an organization. It is particularly beneficial in IT companies where it serves as a central system for tracking and resolving issues, managing service requests, and ensuring smooth operations.

## Features

- **Dashboard**: A central hub displaying all active and resolved tickets.
- **Role-Based Access**: Different views and functionalities based on user roles (Employee, Department Head, Admin).
- **Session-Based Authentication**: Authenticate the user using session-cookie and passportjs.
- **Ticket Creation**: Easy-to-use forms for creating new tickets.
- **Ticket Assignment**: Automated or manual assignment of tickets to appropriate personnel.
- **Status Tracking**: Real-time updates on the status of each ticket.

## Technologies Used

- **Frontend**: Angular.js
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Authentication**: passportjs

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js
- npm
- MongoDB

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Ajayduddi/Ticketing-Tool.git
    cd backend
    ```

    for frontend

   ```bash
   cd frontend
   ```

3. **Install dependencies**

    ```bash
    npm install
    ```

4. **Set up environment variables for backend**

    Create a `.env` file in the root of the project and add the necessary environment variables. For example:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/ticketingtool
    SESSION_SECRET = 'the secret srting'
    SALT_ROUNDS = 10
    ```

5. **Start the application**

    ```bash
    npm start
    ```

    The application will start running on `http://localhost:3000`.

## API Documentation

For detailed API documentation and to test endpoints, use the following Postman link:

[Postman API Documentation](https://www.postman.com/collections/your-postman-link)

## Flowchart

Here is a flowchart illustrating the process of using the ticketing tool:

![Ticketing Tool Flowchart](https://github.com/Ajayduddi/Ticketing-Tool/blob/main/ticketing%20-tool%20flow%20chart.jpg)


## License

This project is licensed under the MIT License

