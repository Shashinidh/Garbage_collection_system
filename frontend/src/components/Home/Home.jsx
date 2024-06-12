import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import img from '../Poto/kk.jpeg';
import Calendar1 from '../Calendar/Calendar';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import bg from '../Poto/poto.jpeg'; 

const localizer = momentLocalizer(moment);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [item, setItem] = useState({});
  const { transcript, resetTranscript } = useSpeechRecognition(); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/schedule')
      .then(response => {
        const formattedEvents = response.data.map(item => ({
          id: item._id,
          title: `     `,
          start: new Date(item.date),
          end: new Date(item.date),
          address: item.address,
          date: item.date,
          garbage_number: item.garbage_number,
          garbage_type: item.garbage_type
        }));
        setEvents(formattedEvents);
        if(response.data.length > 0) {
          setItem(response.data[0]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (transcript.toLowerCase().includes('view list')) {
      window.location.href = '/list'; 
      resetTranscript(); 
    }

    if (transcript.toLowerCase().includes('insert')) { 
      window.location.href = '/insert'; 
      resetTranscript(); 
    }

    if (transcript.toLowerCase().includes('back')) { 
      window.location.href = '/'; 
      resetTranscript(); 
    }
  }, [transcript, resetTranscript]);

  return (
    <div className="home bg-green-100 min-h-screen">
      <div className="header bg-green-800 text-white py-4">
        <div className="container mx-auto max-w-6xl px-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Garbage Management System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/insert">
              <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Schedule</button>
            </Link>
            <Link to="/list">
              <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View List</button>
            </Link>
            <Link to="/">
              <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="content container mx-auto max-w-6xl px-4 mt-8">
        <div className="w-full bg-white rounded-lg overflow-hidden shadow-md">
          <img src={bg} alt="Description of the image" className="w-full h-auto object-cover" />
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 mx-auto max-w-6xl">
            <div className="calender-wrap order-2 lg:order-1">
              <Calendar1 />
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto order-1 lg:order-2">
              <div className="schedule-title bg-gray-200 py-4 px-6">
                <h1 className="text-2xl font-bold">Schedule Details</h1>
                <h2 className="text-lg">{item.address}</h2>
              </div>
              <table className="schedule-table w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200">Date</th>
                    <th className="py-2 px-4 bg-gray-200">Number of Garbage Bags</th>
                    <th className="py-2 px-4 bg-gray-200">Garbage Type</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td className="py-2 px-4">{event.date && new Date(event.date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{event.garbage_number}</td>
                      <td className="py-2 px-4">{event.garbage_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={() => SpeechRecognition.startListening()} className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start Speech Recognition</button>
      </div>

      <div className="flex justify-center mt-4">
        <p>Transcript: {transcript}</p>
      </div>
    </div>
  );
};

export default Home;
