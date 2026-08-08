# Student Management System

A full-stack Student Management System built using **Spring Boot, MySQL, and React.js**.

## Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

### Frontend
- React.js
- Vite
- Axios
- Bootstrap

## Features

- Add student
- View all students
- Update student details
- Delete student
- Search students
- Filter students by course
- Pagination
- REST API integration
- DTO-based architecture
- Input validation

## Project Structure

```text
student-management-system/
├── student-backend/
├── student-frontend/
└── README.md
```

## How to Run

### Backend

1. Make sure MySQL is running.
2. Configure your database details in the Spring Boot application.
3. Set the `DB_PASSWORD` environment variable with your MySQL password.
4. Open the `student-backend` project in IntelliJ IDEA.
5. Run the Spring Boot application.

Backend runs on:

```text
http://localhost:8080
```

### Frontend

Open a terminal inside the `student-frontend` folder.

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Add a student |
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get student by ID |
| PUT | `/students/{id}` | Update a student |
| DELETE | `/students/{id}` | Delete a student |
| GET | `/students/name/{name}` | Search by name |
| GET | `/students/course/{course}` | Filter by course |
| GET | `/students/search/{keyword}` | Search students |
| GET | `/students/page` | Get paginated students |

## Author

**Naveen Kumar Koppineni**