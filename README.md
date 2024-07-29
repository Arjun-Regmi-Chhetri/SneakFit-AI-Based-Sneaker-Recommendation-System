# SneakFit - AI-Based Sneaker Recommendation System

SneakFit is an e-commerce platform designed to provide personalized sneaker recommendations using AI algorithms. The system integrates a recommendation engine with a web application that includes a frontend for user interaction and a backend for managing data and processing requests.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [MySQL Setup](#mysql-setup)

- [License](#license)

## Features

- **Personalized Recommendations**: AI-driven recommendations based on user preferences and historical data.
- **Dynamic Product Listings**: Interactive and up-to-date product listings.
- **User Authentication**: Secure login and account management.
- **Search Functionality**: Advanced search with filtering options.
- **Responsive Design**: Mobile-friendly and responsive UI.

## Installation

To get started with SneakFit, follow these steps to set up your local development environment:

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (for backend)
- [Maven](https://maven.apache.org/) (for backend)
- [Python](https://www.python.org/) (for AI model)
- [MySQL](https://dev.mysql.com/downloads/) (for relational database)

### Clone the Repository

```sh
git clone https://github.com/Arjun-Regmi-Chhetri/SneakFit-AI-Based-Sneaker-Recommendation-System.git
cd SneakFit-AI-Based-Sneaker-Recommendation-System
```


### Backend Setup

```sh
 cd backend
 mvn install
```

### Frontend Setup
```sh
  cd frontend
  npm install
```

## mysql-setup

### Prerequisites

- MySQL Server
- MySQL Workbench

### Steps

1. **Open MySQL Workbench.**
2. **Create a new database:**
    ```sql
    CREATE DATABASE sneakfit;
    ```

### configuration
**Configure your Database: **
Update the src/main/resources/application.properties file in the backend directory with your MySQL connection details:
```sh
spring.datasource.url=url (example: jdbc:mysql://localhost:3306/sneakfit)
spring.datasource.username= username (example: root)
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.





