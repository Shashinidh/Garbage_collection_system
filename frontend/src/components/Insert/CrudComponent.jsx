import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sampleImage from '../Poto/1.jpg'; // Import image properly

const InsertSchedule = () => {
  const [formData, setFormData] = useState({
    address: '',
    date: new Date().toISOString().slice(0, 10),
    garbage_number: 1,
    garbage_type: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'garbage_number' && (isNaN(value) || value <= 0)) {
      toast.error('Please enter a valid garbage number greater than 0.');
      newValue = 1;
    }

    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today) {
        toast.error('Please select a future date.');
        newValue = today.toISOString().slice(0, 10);
      }
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.date || !formData.garbage_number || !formData.garbage_type) {
        toast.error('Please fill out all required fields.');
        return;
      }

      const finalFormData = { ...formData };
      if (formData.address.trim() === '') {
        finalFormData.address = '123 Main Street, Anytown, USA';
      }

      await axios.post('http://localhost:5000/api/schedule', finalFormData);
      toast.success('Schedule added successfully!');
      setFormData({
        address: '',
        date: new Date().toISOString().slice(0, 10),
        garbage_number: 1,
        garbage_type: ''
      });
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error('Error adding schedule. Please try again.');
    }
  };

  return (
    <div className="container-insert flex">
      <div className="content-insert w-1/2 p-8 bg-gray-100">
        <div className="header-insert mb-8">
          <Link to="/home">
            <button className="back-insert bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back</button>
          </Link>
        </div>
        <ToastContainer />
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-3xl font-bold mb-6 text-center">Add Schedule</h1>
          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-700 mb-2">Date:</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="garbage_number" className="block text-gray-700 mb-2">Garbage Number:</label>
            <input type="number" name="garbage_number" id="garbage_number" value={formData.garbage_number} onChange={handleInputChange} className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="garbage_type" className="block text-gray-700 mb-2">Garbage Type:</label>
            <select name="garbage_type" id="garbage_type" value={formData.garbage_type} onChange={handleInputChange} className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500">
              <option value="">Select Garbage Type</option>
              <option value="recyclable">Recyclable</option>
              <option value="non-recyclable">Non-Recyclable</option>
            </select>
          </div>
          <button type="submit" className="btn-submit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Add Schedule</button>
        </form>
      </div>
      <div className="image-container-insert w-1/2 flex justify-center items-center">
        <img src={sampleImage} alt="Sample Image" className="max-w-full max-h-full rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default InsertSchedule;
