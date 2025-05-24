# Course Management API Documentation

This API provides endpoints for managing courses, including creating, reading, updating, and deleting courses, as well as managing student enrollment.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Get All Courses
Retrieves a list of all courses with populated teacher and student information.

- **URL:** `/courses`
- **Method:** `GET`
- **Success Response:**
  ```json
  {
    "courses": [
      {
        "_id": "course_id",
        "title": "JavaScript Fundamentals",
        "description": "Learn the basics of JavaScript",
        "teacher": {
          "_id": "teacher_id",
          "name": "John Doe",
          "email": "john@example.com",
          "specialization": "Web Development"
        },
        "students": [
          {
            "_id": "student_id",
            "name": "Jane Smith",
            "email": "jane@example.com"
          }
        ],
        "capacity": 30,
        "startDate": "2025-06-01T00:00:00.000Z",
        "endDate": "2025-08-31T00:00:00.000Z"
      }
    ]
  }
  ```

### 2. Get Single Course
Retrieves detailed information about a specific course.

- **URL:** `/courses/:id`
- **Method:** `GET`
- **URL Parameters:** `id=[string]` (Course ID)
- **Success Response:**
  ```json
  {
    "_id": "course_id",
    "title": "JavaScript Fundamentals",
    "description": "Learn the basics of JavaScript",
    "teacher": {
      "_id": "teacher_id",
      "name": "John Doe",
      "email": "john@example.com",
      "specialization": "Web Development"
    },
    "students": [
      {
        "_id": "student_id",
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ],
    "capacity": 30,
    "startDate": "2025-06-01T00:00:00.000Z",
    "endDate": "2025-08-31T00:00:00.000Z"
  }
  ```

### 3. Create Course
Creates a new course.

- **URL:** `/courses`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "JavaScript Fundamentals",
    "description": "Learn the basics of JavaScript",
    "teacher": "teacher_id",
    "capacity": 30,
    "startDate": "2025-06-01",
    "endDate": "2025-08-31"
  }
  ```
- **Success Response:**
  ```json
  {
    "_id": "course_id",
    "title": "JavaScript Fundamentals",
    "description": "Learn the basics of JavaScript",
    "teacher": "teacher_id",
    "students": [],
    "capacity": 30,
    "startDate": "2025-06-01T00:00:00.000Z",
    "endDate": "2025-08-31T00:00:00.000Z"
  }
  ```

### 4. Update Course
Updates an existing course's information.

- **URL:** `/courses/:id`
- **Method:** `PUT`
- **URL Parameters:** `id=[string]` (Course ID)
- **Request Body:**
  ```json
  {
    "title": "Advanced JavaScript",
    "description": "Updated course description",
    "capacity": 35,
    "startDate": "2025-07-01",
    "endDate": "2025-09-30"
  }
  ```
- **Success Response:**
  ```json
  {
    "_id": "course_id",
    "title": "Advanced JavaScript",
    "description": "Updated course description",
    "teacher": "teacher_id",
    "students": [],
    "capacity": 35,
    "startDate": "2025-07-01T00:00:00.000Z",
    "endDate": "2025-09-30T00:00:00.000Z"
  }
  ```

### 5. Delete Course
Deletes a specific course.

- **URL:** `/courses/:id`
- **Method:** `DELETE`
- **URL Parameters:** `id=[string]` (Course ID)
- **Success Response:**
  ```json
  {
    "message": "Course deleted successfully"
  }
  ```

### 6. Add Student to Course
Enrolls a student in a specific course.

- **URL:** `/courses/:id/students`
- **Method:** `POST`
- **URL Parameters:** `id=[string]` (Course ID)
- **Request Body:**
  ```json
  {
    "studentId": "student_id"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Student added to course successfully"
  }
  ```

## Règles de Gestion (Business Rules)

### 1. Gestion des Cours (Course Management)
- Un cours doit obligatoirement avoir un titre et une description
- Le titre du cours est automatiquement nettoyé des espaces inutiles
- Chaque cours doit avoir une date de début et une date de fin
- La capacité du cours est obligatoire et doit être un nombre
- Un cours doit être assigné à un enseignant (teacher)
- La date de création du cours est automatiquement enregistrée

### 2. Gestion des Inscriptions (Enrollment Management)
- Un étudiant ne peut pas s'inscrire deux fois au même cours
- Le nombre d'étudiants ne peut pas dépasser la capacité du cours
- Les étudiants peuvent être ajoutés uniquement si le cours n'est pas complet
- La liste des étudiants est maintenue pour chaque cours

### 3. Gestion des Relations (Relationship Management)
- Chaque cours est lié à un enseignant (relation obligatoire)
- Un cours peut avoir plusieurs étudiants (relation multiple)
- Les informations de l'enseignant et des étudiants sont automatiquement peuplées lors des requêtes

### 4. Validation des Données (Data Validation)
- Toutes les dates doivent être au format valide
- Les IDs de l'enseignant et des étudiants doivent être valides
- La capacité du cours doit être un nombre positif
- Le titre et la description ne peuvent pas être vides

## Error Responses
All endpoints may return the following error responses:

- **404 Not Found:**
  ```json
  {
    "message": "Course not found"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "message": "Error message describing the issue"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "message": "Error message describing the server error"
  }
  ```

## Specific Error Cases

### Adding Student to Course
- When course is full:
  ```json
  {
    "message": "Course is full"
  }
  ```
- When student is already enrolled:
  ```json
  {
    "message": "Student already enrolled in this course"
  }
  ```
