# Course Management System API Documentation

## Table of Contents
1. [Course API](#course-api-documentation)
2. [Teacher API](#teacher-api-documentation)
3. [Student API](#student-api-documentation)
4. [Error Responses](#common-error-responses)

# Course API Documentation

## Course Model

```json
{
  "title": "String (required)",
  "description": "String (required)",
  "teacher": "Teacher ID (required)",
  "students": ["Array of Student IDs"],
  "capacity": "Number (required)",
  "startDate": "Date (required)",
  "endDate": "Date (required)",
  "createdAt": "Date (auto-generated)"
}
```

## Course Endpoints

### 1. Get All Courses
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
- **URL:** `/courses/:id`
- **Method:** `GET`
- **URL Parameters:** `id=[string]` (Course ID)

### 3. Create Course
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

### 4. Update Course
- **URL:** `/courses/:id`
- **Method:** `PUT`
- **URL Parameters:** `id=[string]` (Course ID)

### 5. Delete Course
- **URL:** `/courses/:id`
- **Method:** `DELETE`
- **URL Parameters:** `id=[string]` (Course ID)

### 6. Add Student to Course
- **URL:** `/courses/:id/students`
- **Method:** `POST`
- **URL Parameters:** `id=[string]` (Course ID)

# Teacher API Documentation

## Teacher Model

```json
{
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required)",
  "specialization": "String (required)",
  "courses": ["Array of Course IDs"],
  "createdAt": "Date (auto-generated)"
}
```

## Teacher Endpoints

### 1. Get All Teachers
- **URL:** `/teachers`
- **Method:** `GET`
- **Query Parameters:**
  - `page=[number]` (optional, default=1)
  - `limit=[number]` (optional, default=10)
  - `specialization=[string]` (optional)
- **Success Response:**
  ```json
  {
    "teachers": [
      {
        "_id": "teacher_id",
        "name": "John Doe",
        "email": "john@example.com",
        "specialization": "Web Development",
        "courses": [
          {
            "_id": "course_id",
            "title": "JavaScript Fundamentals"
          }
        ]
      }
    ],
    "total": 50,
    "page": 1,
    "totalPages": 5
  }
  ```

### 2. Get Single Teacher
- **URL:** `/teachers/:id`
- **Method:** `GET`
- **URL Parameters:** `id=[string]` (Teacher ID)
- **Success Response:**
  ```json
  {
    "teacher": {
      "_id": "teacher_id",
      "name": "John Doe",
      "email": "john@example.com",
      "specialization": "Web Development",
      "courses": [
        {
          "_id": "course_id",
          "title": "JavaScript Fundamentals",
          "students": ["student_ids"]
        }
      ]
    }
  }
  ```

### 3. Create Teacher
- **URL:** `/teachers`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "specialization": "Web Development"
  }
  ```

### 4. Update Teacher
- **URL:** `/teachers/:id`
- **Method:** `PUT`
- **URL Parameters:** `id=[string]` (Teacher ID)
- **Request Body:**
  ```json
  {
    "name": "John Doe Updated",
    "specialization": "Full Stack Development"
  }
  ```

### 5. Delete Teacher
- **URL:** `/teachers/:id`
- **Method:** `DELETE`
- **URL Parameters:** `id=[string]` (Teacher ID)

### 6. Get Teacher's Courses
- **URL:** `/teachers/:id/courses`
- **Method:** `GET`
- **URL Parameters:** `id=[string]` (Teacher ID)
- **Success Response:**
  ```json
  {
    "courses": [
      {
        "_id": "course_id",
        "title": "JavaScript Fundamentals",
        "description": "Learn the basics of JavaScript",
        "students": ["student_ids"],
        "capacity": 30,
        "startDate": "2025-06-01T00:00:00.000Z",
        "endDate": "2025-08-31T00:00:00.000Z"
      }
    ]
  }
  ```

## Règles de Gestion - Teacher (Business Rules)

### 1. Gestion des Enseignants (Teacher Management)
- Le nom de l'enseignant est obligatoire et nettoyé des espaces inutiles
- L'email est unique, obligatoire et converti en minuscules
- Le mot de passe est obligatoire et doit être sécurisé
- La spécialisation est un champ obligatoire
- La date de création est automatiquement générée

### 2. Gestion des Relations (Relationship Management)
- Un enseignant peut être associé à plusieurs cours
- Les cours associés sont référencés par leurs IDs
- La suppression d'un enseignant doit tenir compte des cours associés

### 3. Validation des Données (Data Validation)
- L'email doit être dans un format valide
- Le nom ne peut pas être vide
- La spécialisation doit être spécifiée

# Student API Documentation

## Student Model

```json
{
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required)",
  "enrolledCourses": [
    {
      "course": "Course ID",
      "enrollmentDate": "Date (auto-generated)"
    }
  ],
  "createdAt": "Date (auto-generated)"
}
```

## Student Endpoints

### 1. Get All Students
- **URL:** `/students`
- **Method:** `GET`
- **Query Parameters:**
  - `page=[number]` (optional, default=1)
  - `limit=[number]` (optional, default=10)
  - `course=[string]` (optional, filter by course ID)
- **Success Response:**
  ```json
  {
    "students": [
      {
        "_id": "student_id",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "enrolledCourses": [
          {
            "course": {
              "_id": "course_id",
              "title": "JavaScript Fundamentals"
            },
            "enrollmentDate": "2025-06-01T00:00:00.000Z"
          }
        ]
      }
    ],
    "total": 100,
    "page": 1,
    "totalPages": 10
  }
  ```

### 2. Get Single Student
- **URL:** `/students/:id`
- **Method:** `GET`
- **URL Parameters:** `id=[string]` (Student ID)
- **Success Response:**
  ```json
  {
    "student": {
      "_id": "student_id",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "enrolledCourses": [
        {
          "course": {
            "_id": "course_id",
            "title": "JavaScript Fundamentals",
            "teacher": {
              "_id": "teacher_id",
              "name": "John Doe"
            }
          },
          "enrollmentDate": "2025-06-01T00:00:00.000Z"
        }
      ]
    }
  }
  ```

### 3. Create Student
- **URL:** `/students`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "securepassword"
  }
  ```

### 4. Update Student
- **URL:** `/students/:id`
- **Method:** `PUT`
- **URL Parameters:** `id=[string]` (Student ID)
- **Request Body:**
  ```json
  {
    "name": "Jane Smith Updated",
    "email": "jane.updated@example.com"
  }
  ```

### 5. Delete Student
- **URL:** `/students/:id`
- **Method:** `DELETE`
- **URL Parameters:** `id=[string]` (Student ID)

### 6. Enroll in Course
- **URL:** `/students/:id/enroll`
- **Method:** `POST`
- **URL Parameters:** `id=[string]` (Student ID)
- **Request Body:**
  ```json
  {
    "courseId": "course_id"
  }
  ```

### 7. Get Student's Courses
- **URL:** `/students/:id/courses`
- **Method:** `GET`
- **URL Parameters:** `id=[string]` (Student ID)
- **Success Response:**
  ```json
  {
    "courses": [
      {
        "course": {
          "_id": "course_id",
          "title": "JavaScript Fundamentals",
          "description": "Learn the basics of JavaScript",
          "teacher": {
            "_id": "teacher_id",
            "name": "John Doe"
          }
        },
        "enrollmentDate": "2025-06-01T00:00:00.000Z"
      }
    ]
  }
  ```

## Règles de Gestion - Student (Business Rules)

### 1. Gestion des Étudiants (Student Management)
- Le nom de l'étudiant est obligatoire et nettoyé des espaces inutiles
- L'email est unique, obligatoire et converti en minuscules
- Le mot de passe est obligatoire et doit être sécurisé
- La date de création est automatiquement générée

### 2. Gestion des Inscriptions (Enrollment Management)
- Un étudiant peut s'inscrire à plusieurs cours
- Chaque inscription est horodatée automatiquement
- L'historique des inscriptions est maintenu
- Un étudiant ne peut pas s'inscrire deux fois au même cours

### 3. Validation des Données (Data Validation)
- L'email doit être dans un format valide
- Le nom ne peut pas être vide
- Les références aux cours doivent être valides
- La date d'inscription doit être valide

### 4. Sécurité (Security)
- Les mots de passe doivent être hashés avant stockage
- Les informations sensibles ne doivent pas être exposées dans les réponses API
- Les tokens d'authentification doivent être gérés de manière sécurisée

## Common Error Responses

All endpoints may return the following error responses:

- **404 Not Found:**
  ```json
  {
    "message": "Resource not found"
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
