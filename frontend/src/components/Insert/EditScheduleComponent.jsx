import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from '../Poto/1.jpeg'; 

const CrudComponent = () => {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState([]);
  const [formData, setFormData] = useState({
    address: '',
    date: '',
    garbage_number: 1,
    garbage_type: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    if (id) {
      setEditingId(id);
      fetchScheduleData(id);
    } else {
      fetchScheduleData();
    }
  }, [id]);

  const fetchScheduleData = async (id = null) => {
    try {
      let response;
      if (id) {
        response = await axios.get(`http://localhost:5000/api/schedule/${id}`);
        setFormData(response.data);
      } else {
        response = await axios.get('http://localhost:5000/api/schedule');
        setScheduleData(response.data);
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today) {
        toast.error('Please select a future date.');
        return;
      }
    }

    if (name === 'garbage_number' && (isNaN(value) || value <= 0)) {
      toast.error('Please enter a valid garbage number greater than 0.');
      return;
    }

    setFormData({ ...formData, [name]: value });
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

      if (editingId) {
        await axios.put(`http://localhost:5000/api/schedule/${editingId}`, finalFormData);
        setEditingId(null);
        setShowInputs(false);
        toast.success('Schedule updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/schedule', finalFormData);
        toast.success('Schedule added successfully!');
      }
      setFormData({
        address: '',
        date: '',
        garbage_number: 1,
        garbage_type: ''
      });
      fetchScheduleData();
    } catch (error) {
      console.error('Error creating/editing schedule:', error);
      toast.error('Error adding/editing schedule. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedule/${id}`);
      fetchScheduleData();
      toast.success('Schedule deleted successfully!');
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Error deleting schedule. Please try again.');
    }
  };

  const handleEdit = (schedule) => {
    setFormData({
      ...formData,
      address: schedule.address,
      date: schedule.date,
      garbage_number: schedule.garbage_number,
      garbage_type: schedule.garbage_type
    });
    setEditingId(schedule._id);
    setShowInputs(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded px-20 pt-6 pb-6 mb-4" /*style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}*/>
        <div className="mb-4">
          <Link to="/home">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back</button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">{editingId ? 'Edit Schedule' : 'View Schedule'}</h1>
        {showInputs && (
          <form onSubmit={handleFormSubmit} className="mb-8">
            <div className="mb-8">
              <label htmlFor="date" className="block text-gray-700">Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-green-500" />
            </div>
            <div className="mb-8">
              <label htmlFor="garbage_number" className="block text-gray-700">Garbage Number:</label>
              <input type="number" name="garbage_number" value={formData.garbage_number} onChange={handleInputChange} className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-green-500" />
            </div>
            <div className="mb-8">
              <label htmlFor="garbage_type" className="block text-gray-700">Garbage Type:</label>
              <select name="garbage_type" value={formData.garbage_type} onChange={handleInputChange} className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-green-500">
                <option value="">Select Garbage Type</option>
                <option value="recyclable">Recyclable</option>
                <option value="non-recyclable">Non-Recyclable</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">{editingId ? 'Edit Schedule' : 'Add Schedule'}</button>
          </form>
        )}
        {!editingId && (
          <>
            <h2 className="text-2xl font-bold mb-4">Schedule List</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Garbage Number</th>
                    <th className="border border-gray-300 p-2">Garbage Type</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((schedule) => (
                    <tr key={schedule._id}>
                      <td className="border border-gray-300 p-2">{formatDate(schedule.date)}</td>
                      <td className="border border-gray-300 p-2">{schedule.garbage_number}</td>
                      <td className="border border-gray-300 p-2">{schedule.garbage_type}</td>
                      <td className="border border-gray-300 p-2">
                        <button onClick={() => handleEdit(schedule)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                          <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDelete(schedule._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default CrudComponent;
