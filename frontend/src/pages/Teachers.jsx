import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowPathIcon, UserIcon } from '@heroicons/react/24/outline';

function Teachers() {
  const base_url = 'http://localhost:3000/api/v1/teachers'
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, [currentPage]);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}`);
      setTeachers(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('Failed to fetch teachers');
    } finally {
      // Add a small delay to make loading indicator visible even for fast operations
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleCreateTeacher = async (teacherData) => {
    setIsLoading(true);
    try {
      console.log(teacherData);
      
      await axios.post(`${base_url}`, teacherData);
      toast.success('Teacher created successfully');
      fetchTeachers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating teacher:', error);
      toast.error('Failed to create teacher');
      setIsLoading(false);
    }
  };

  const handleUpdateTeacher = async (id, teacherData) => {
    setIsLoading(true);
    try {
      await axios.put(`${base_url}/${id}`, teacherData);
      toast.success('Teacher updated successfully');
      fetchTeachers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast.error('Failed to update teacher');
      setIsLoading(false);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${base_url}/${id}`);
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
        toast.error('Failed to delete teacher');
        setIsLoading(false);
      }
    }
  };

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fadeIn">
      {/* Sticky Loading Indicator */}
      {isLoading && (
        <div className="fixed top-16 left-0 right-0 z-50 flex justify-center">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-b-lg shadow-lg flex items-center space-x-2 animate-pulse">
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
            <span>Loading teachers...</span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Teachers</h1>
          <p className="text-gray-600 mt-2 text-lg">Discover and manage your expert educators</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentTeacher(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all flex items-center gap-2 font-medium shadow-md transform hover:scale-105 duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Teacher
          </button>
        </div>
      </div>

      {teachers.length === 0 && !isLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 flex flex-col items-center justify-center py-12">
          <UserIcon className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No teachers found</h3>
          <p className="text-gray-500 mt-1">Try adding a new teacher to get started</p>
        </div>
      ) : filteredTeachers.length === 0 && !isLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 flex flex-col items-center justify-center py-12">
          <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No matching teachers found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or add a new teacher</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher, index) => (
            <div
              key={teacher._id}
              className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-sm">
                    <svg className="h-7 w-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{teacher.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg className="h-4 w-4 mr-1 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {teacher.email}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {teacher.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {teacher.subject}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setCurrentTeacher(teacher);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-teal-50 text-teal-600 hover:bg-teal-100 font-medium text-sm flex items-center rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeacher(teacher._id)}
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

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <span className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1"
        >
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

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
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              {currentTeacher ? 'Edit Teacher' : 'Add Teacher'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const teacherData = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  subject: formData.get('subject'),
                  ...(currentTeacher ? {} : { password: formData.get('password') }),
                };
                
                if (currentTeacher) {
                  handleUpdateTeacher(currentTeacher._id, teacherData);
                } else {
                  handleCreateTeacher(teacherData);
                }
              }}
              className="space-y-4 "
            >
              <div className="relative">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-1">Name</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-teal-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentTeacher?.name || ''}
                    required
                    placeholder="Enter teacher's name"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-1">Email</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={currentTeacher?.email || ''}
                    required
                    placeholder="Enter teacher's email"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={currentTeacher?.phone || ''}
                    required
                    placeholder="Enter teacher's phone number"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-left text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    defaultValue={currentTeacher?.subject || ''}
                    required
                    placeholder="Enter teacher's subject"
                    className="pl-10 h-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-white"
                  />
                </div>
              </div>
              {!currentTeacher && (
                <div className="relative">
                  <label className="block text-left text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Enter password"
                      className="pl-10 h-10   block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-white"
                    />
                  </div>
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
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:from-teal-600 hover:to-emerald-600 font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-200 flex items-center gap-2"
                >
                  {currentTeacher ? (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Update Teacher
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Teacher
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

export default Teachers;
