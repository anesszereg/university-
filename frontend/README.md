# Educational Management System

A modern educational management system built with React and styled with Tailwind CSS. This system provides a comprehensive solution for managing courses, teachers, and students with a beautiful, responsive, and user-friendly interface.

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

- **Frontend**: React.js
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Axios for REST API calls
- **Notifications**: React Hot Toast
- **Icons**: Heroicons
- **Routing**: React Router

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/educational-management-system.git
cd educational-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

## Project Structure

```
src/
├── pages/
│   ├── Courses.jsx     # Course management page
│   ├── Teachers.jsx    # Teacher management page
│   ├── Students.jsx    # Student management page
│   └── Home.jsx        # Home/dashboard page
├── components/         # Reusable components
├── App.jsx            # Main application component with routing
├── index.js           # Entry point
└── index.css          # Global styles and Tailwind imports
```

## API Integration

The system integrates with a RESTful API providing endpoints for:

### Base URLs
- Students API: `http://localhost:3000/api/v1/students`
- Courses API: `http://localhost:3000/api/v1/courses`
- Teachers API: `http://localhost:3000/api/v1/teachers`

### Endpoints

#### Students
- `GET /api/v1/students` - Get all students
- `POST /api/v1/students` - Create a new student
- `PUT /api/v1/students/:id` - Update a student
- `DELETE /api/v1/students/:id` - Delete a student
- `POST /api/v1/students/:id/enroll` - Enroll a student in a course

#### Courses
- `GET /api/v1/courses` - Get all courses
- `POST /api/v1/courses` - Create a new course
- `PUT /api/v1/courses/:id` - Update a course
- `DELETE /api/v1/courses/:id` - Delete a course

#### Teachers
- `GET /api/v1/teachers` - Get all teachers
- `POST /api/v1/teachers` - Create a new teacher
- `PUT /api/v1/teachers/:id` - Update a teacher
- `DELETE /api/v1/teachers/:id` - Delete a teacher

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

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

## Screenshots

### Students Page
![Students Page](screenshots/students.png)

### Courses Page
![Courses Page](screenshots/courses.png)

### Teachers Page
![Teachers Page](screenshots/teachers.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
