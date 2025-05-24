
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserIcon, AcademicCapIcon, PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function Students() {
  const base_url = 'http://localhost:3000/api/v1/students';
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
useEffect(() => {
  fetchStudents();
  fetchAvailableCourses();
}, [currentPage]);

const fetchStudents = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(base_url);
    setStudents(response.data);
    setTotalPages(Math.ceil(response.data.length / 10));
  } catch (error) {
    console.error('Error fetching students:', error);
    toast.error('Failed to fetch students');
  } finally {
    // Add a small delay to make loading indicator visible even for fast operations
    setTimeout(() => setIsLoading(false), 500);
  }
};

const fetchAvailableCourses = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/courses');
    setAvailableCourses(response.data.map(c => ({ _id: c._id, title: c.title })));
  } catch (error) {
    console.error('Error fetching courses:', error);
    toast.error('Failed to fetch available courses');
  }
};

const handleCreateStudent = async (studentData) => {
  setIsLoading(true);
  try {
    await axios.post(base_url, studentData);
    toast.success('Student created successfully');
    fetchStudents();
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error creating student:', error);
    toast.error('Failed to create student');
    setIsLoading(false);
  }
};

const handleUpdateStudent = async (id, studentData) => {
  setIsLoading(true);
  try {
    await axios.put(`${base_url}/${id}`, studentData);
    toast.success('Student updated successfully');
    fetchStudents();
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error updating student:', error);
    toast.error('Failed to update student');
    setIsLoading(false);
  }
};

const handleDeleteStudent = async (id) => {
  if (window.confirm('Are you sure you want to delete this student?')) {
    setIsLoading(true);
    try {
      await axios.delete(`${base_url}/${id}`);
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
      setIsLoading(false);
    }
  }
};

const handleEnrollStudent = async (studentId, courseId) => {
  setIsLoading(true);
  try {
    await axios.post(`${base_url}/${studentId}/enroll`, { courseId });
    toast.success('Student enrolled successfully');
    fetchStudents();
    setIsEnrollModalOpen(false);
  } catch (error) {
    console.error('Error enrolling student:', error);
    toast.error('Failed to enroll student');
    setIsLoading(false);
  }
};

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Students Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 h-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64 bg-gray-50 hover:bg-white transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-blue-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentStudent(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Student
          </button>
        </div>
      </div>
      
      {/* Sticky Loading Indicator */}
      {isLoading && (
        <div className="fixed top-16 left-0 right-0 z-50 flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-b-lg shadow-lg flex items-center space-x-2 animate-pulse">
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
            <span>Loading students...</span>
          </div>
        </div>
      )}
      
      {students.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No students found</h3>
          <p className="text-gray-500 mt-1">Try adding a new student to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          {filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No students found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or add a new student</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudents.map((student, index) => (
              <div 
                key={student._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white mr-4 shadow-md">
                      <UserIcon className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
                      <p className="text-gray-600 flex items-center gap-1">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {student.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Age: {student.age}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{student.address}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <AcademicCapIcon className="h-5 w-5 text-blue-500" />
                      Enrolled Courses:
                    </h3>
                    {student.courses && student.courses.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {student.courses.map((course) => (
                          <span key={course._id} className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center">
                            <AcademicCapIcon className="h-3.5 w-3.5 mr-1" />
                            {course.title}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic flex items-center gap-1">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        No courses enrolled
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => {
                        setCurrentStudent(student);
                        setIsEnrollModalOpen(true);
                      }}
                      className="p-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors shadow-sm hover:shadow border border-green-100 transform hover:scale-105 duration-200"
                      title="Enroll in Course"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStudent(student);
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors shadow-sm hover:shadow border border-blue-100 transform hover:scale-105 duration-200"
                      title="Edit Student"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="p-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-lg hover:from-red-100 hover:to-pink-100 transition-colors shadow-sm hover:shadow border border-red-100 transform hover:scale-105 duration-200"
                      title="Delete Student"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg flex items-center ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all'}`}
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${currentPage === page ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-5 py-2.5 rounded-xl border shadow-sm flex items-center gap-1 transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed border-gray-200 bg-gray-50'
                : 'text-gray-700 hover:bg-gray-50 border-gray-200 bg-white'
            }`}
          >
            Next
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all border border-gray-100 animate-fadeIn">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">{currentStudent ? 'Edit Student' : 'Add Student'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const studentData = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  dateOfBirth: formData.get('dateOfBirth'),
                };
                
                if (!currentStudent) {
                  studentData.password = formData.get('password');
                }
                
                if (currentStudent) {
                  handleUpdateStudent(currentStudent._id, studentData);
                } else {
                  handleCreateStudent(studentData);
                }
              }}
              className="space-y-4"
            >
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentStudent?.name || ''}
                    required
                    placeholder="Enter student's name"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={currentStudent?.email || ''}
                    required
                    placeholder="Enter student's email"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  defaultValue={currentStudent?.phone || ''}
                  className="mt-1 h-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  defaultValue={currentStudent?.dateOfBirth ? new Date(currentStudent.dateOfBirth).toISOString().split('T')[0] : ''}
                  className="mt-1 h-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {!currentStudent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 h-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl hover:from-blue-700 hover:to-violet-700 font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-200 flex items-center gap-2"
                >
                  {currentStudent ? (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Update Student
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Student
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enroll Modal */}
      {isEnrollModalOpen && currentStudent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all border border-gray-100 animate-fadeIn">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEnrollModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Enroll {currentStudent.name} in Course</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleEnrollStudent(currentStudent._id, formData.get('courseId'));
              }}
              className="space-y-4"
            >
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Course</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AcademicCapIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <select
                    name="courseId"
                    required
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:bg-white"
                  >
                    <option value="">Select a course</option>
                    {availableCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-200 flex items-center gap-2"
                >
                  <AcademicCapIcon className="h-5 w-5" />
                  Enroll in Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;