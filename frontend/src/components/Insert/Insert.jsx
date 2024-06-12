import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Insert.css';

const Insert = ({ history }) => {
  const defaultAddress = "123 Main Street, Anytown, USA"; 
  const [address, setAddress] = useState(defaultAddress);
  const [date, setDate] = useState('');
  const [garbageNumber, setGarbageNumber] = useState('');
  const [garbageType, setGarbageType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form fields
      const errors = {};
      if (!date.trim()) {
        errors.date = 'Date is required';
      }
      if (!garbageNumber.trim()) {
        errors.garbageNumber = 'Number of garbage bags is required';
      }
      if (!garbageType.trim()) {
        errors.garbageType = 'Garbage type is required';
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      // Make API request to insert data
      const response = await axios.post('http://localhost:5000/api/schedule', {
        address,
        date,
        garbage_number: garbageNumber,
        garbage_type: garbageType
      });
      setSuccessMessage('Data inserted successfully');
      setErrorMessage('');
      setAddress(defaultAddress); 
      setDate('');
      setGarbageNumber('');
      setGarbageType('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      setErrorMessage('Failed to insert data');
      setSuccessMessage('');
    }
  };

  const handleGarbageTypeChange = (e) => {
    setGarbageType(e.target.value);
  };

  return (
    <div className='insert-page'>
      <div className='header'>
        <Link to="/home">
          <button className='back'>Back</button>
        </Link>
      </div>
      <div className="insert-container"> 
        <h2>Insert Details</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-field">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            {validationErrors.date && <span>{validationErrors.date}</span>}
          </div>
          <div className="form-field">
            <label>Number of Garbage Bags:</label>
            <input type="number" value={garbageNumber} onChange={(e) => setGarbageNumber(e.target.value)} />
            {validationErrors.garbageNumber && <span>{validationErrors.garbageNumber}</span>}
          </div>
          <div className="form-field">
            <label>
              Garbage Type:
              <select value={garbageType} onChange={handleGarbageTypeChange}>
              <option value="">Select</option>
                <option value="non-recyclable">Non-Recyclable</option>
                <option value="recyclable">Recyclable</option>
              </select>
            </label>
            {validationErrors.garbageType && <span>{validationErrors.garbageType}</span>}
          </div>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
);

};

export default Insert;
