# Educational Management System

A comprehensive educational management platform with a modern React frontend and a robust Node.js API backend. This system provides a complete solution for managing courses, teachers, and students with a beautiful, responsive interface and powerful backend services.

## System Overview

This project consists of two main components:
- **Frontend**: A React-based user interface with Tailwind CSS styling
- **Backend**: A RESTful API built with Node.js providing course, teacher, and student management endpoints

## Features

### Course Management
- View all courses with detailed information in a modern UI
- Create new courses with title, description, capacity, and date range
- Filter courses using the search functionality
- Set course start and end dates with an intuitive date picker
- Delete or update course information with real-time feedback
- Responsive design for all device sizes

### Teacher Management
- Comprehensive teacher directory with pagination
- Add new teachers with name, email, phone, subject, and password
- Search functionality to quickly find specific teachers
- Update teacher information with a user-friendly form
- Delete teachers with confirmation dialog
- Modern UI with icons and visual feedback

### Student Management
- Student enrollment system with a streamlined interface
- Track enrolled courses for each student
- Enroll students in courses with a simple selection process
- Student profile management with detailed information
- Search functionality to filter students
- Responsive cards to display student information

### UI/UX Enhancements
- Sticky loading indicators during data operations
- Modern input fields with icons and improved focus effects
- Gradient buttons with hover animations
- Consistent design language across all pages
- Empty state displays when no data is available
- Toast notifications for user feedback

## Technology Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Axios for REST API calls
- **Notifications**: React Hot Toast
- **Icons**: Heroicons
- **Routing**: React Router

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful architecture
- **Validation**: Server-side data validation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/educational-management-system.git
cd educational-management-system
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure environment variables:
   - Create `.env` files in both frontend and backend directories
   - Set up necessary environment variables (database connection, API URLs, etc.)

5. Start the backend server:
```bash
cd ../backend
npm start
```

6. Start the frontend development server:
```bash
cd ../frontend
npm start
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

## Project Structure

```
/
├── backend/
│   ├── controllers/   # Request handlers
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── server.js      # Entry point
│   └── README.md      # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── pages/     # Main application pages
│   │   ├── components/# Reusable components
│   │   ├── App.jsx    # Main component with routing
│   │   └── index.js   # Entry point
│   └── README.md      # Frontend documentation
│
└── README.md          # Global documentation
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Main Endpoints

#### Courses
- `GET /courses` - Get all courses with populated teacher and student information
- `GET /courses/:id` - Get a specific course by ID
- `POST /courses` - Create a new course
- `PUT /courses/:id` - Update an existing course
- `DELETE /courses/:id` - Delete a course
- `POST /courses/:id/students` - Add a student to a course

#### Students
- `GET /students` - Get all students
- `POST /students` - Create a new student
- `PUT /students/:id` - Update a student
- `DELETE /students/:id` - Delete a student
- `POST /students/:id/enroll` - Enroll a student in a course

#### Teachers
- `GET /teachers` - Get all teachers
- `POST /teachers` - Create a new teacher
- `PUT /teachers/:id` - Update a teacher
- `DELETE /teachers/:id` - Delete a teacher

For detailed API documentation, refer to the backend README.md file.

## Business Rules

### Course Management
- Courses must have a title and description
- Course titles are automatically cleaned of unnecessary spaces
- Each course must have start and end dates
- Course capacity is mandatory and must be a positive number
- Each course must be assigned to a teacher
- Course creation date is automatically recorded

### Enrollment Management
- A student cannot enroll in the same course twice
- The number of students cannot exceed the course capacity
- Students can only be added if the course is not full
- The student list is maintained for each course

### Data Validation
- All dates must be in valid format
- Teacher and student IDs must be valid
- Course capacity must be a positive number
- Title and description cannot be empty

## Features to be Added

- Dashboard with analytics and statistics
- User authentication and role-based access control
- Advanced filtering and sorting options
- Export data to CSV/PDF
- Dark mode toggle
- Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
