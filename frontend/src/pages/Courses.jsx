import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowPathIcon, AcademicCapIcon, BookOpenIcon, UserGroupIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

function Courses() {
  const base_url = 'http://localhost:3000/api/v1/courses';
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(base_url);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    } finally {
      // Add a small delay to make loading indicator visible even for fast operations
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleCreateCourse = async (courseData) => {
    setIsLoading(true);
    try {
      await axios.post(base_url, courseData);
      toast.success('Course created successfully');
      fetchCourses();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course');
      setIsLoading(false);
    }
  };

  const handleUpdateCourse = async (id, courseData) => {
    setIsLoading(true);
    try {
      await axios.put(`${base_url}/${id}`, courseData);
      toast.success('Course updated successfully');
      fetchCourses();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course');
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${base_url}/${id}`);
        toast.success('Course deleted successfully');
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
        setIsLoading(false);
      }
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fadeIn">
      {/* Sticky Loading Indicator */}
      {isLoading && (
        <div className="fixed top-16 left-0 right-0 z-50 flex justify-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-b-lg shadow-lg flex items-center space-x-2 animate-pulse">
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
            <span>Loading courses...</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Courses</h1>
          <p className="text-gray-600 mt-2 text-lg">Discover and manage your educational offerings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64 bg-gray-50 hover:bg-white transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-indigo-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentCourse(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 font-medium shadow-md transform hover:scale-105 duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Course
          </button>
        </div>
      </div>

      {courses.length === 0 && !isLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 flex flex-col items-center justify-center py-12">
          <AcademicCapIcon className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
          <p className="text-gray-500 mt-1">Try adding a new course to get started</p>
        </div>
      ) : filteredCourses.length === 0 && !isLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 flex flex-col items-center justify-center py-12">
          <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No matching courses found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or add a new course</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
            <div
              key={course._id}
              className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{course.title}</h2>
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm">
                    {course.capacity} seats
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {course.teacher?.name || 'No teacher assigned'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setCurrentCourse(course);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium text-sm flex items-center rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm flex items-center rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

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
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {currentCourse ? 'Edit Course' : 'Add Course'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const courseData = {
                  title: formData.get('title'),
                  description: formData.get('description'),
                  teacher: formData.get('teacher'),
                  capacity: parseInt(formData.get('capacity')),
                  startDate: formData.get('startDate'),
                  endDate: formData.get('endDate'),
                };
                
                if (currentCourse) {
                  handleUpdateCourse(currentCourse._id, courseData);
                } else {
                  handleCreateCourse(courseData);
                }
              }}
              className="space-y-4"
            >
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Course Title</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AcademicCapIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    defaultValue={currentCourse?.title || ''}
                    required
                    placeholder="Enter course title"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <DocumentTextIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <textarea
                    name="description"
                    defaultValue={currentCourse?.description || ''}
                    required
                    rows="3"
                    placeholder="Enter course description"
                    className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserGroupIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="number"
                    name="capacity"
                    defaultValue={currentCourse?.capacity || ''}
                    required
                    min="1"
                    placeholder="Enter maximum number of students"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={currentCourse?.startDate ? new Date(currentCourse.startDate).toISOString().split('T')[0] : ''}
                    required
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={currentCourse?.endDate ? new Date(currentCourse.endDate).toISOString().split('T')[0] : ''}
                    required
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
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
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-200 flex items-center gap-2"
                >
                  {currentCourse ? (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Update Course
                    </>
                  ) : (
                    <>
                      <BookOpenIcon className="h-5 w-5" />
                      Create Course
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
