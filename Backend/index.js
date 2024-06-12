const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://aindeepa59:as70191387@cluster0.tuduzkq.mongodb.net/garbage-management?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define GarbageSchedule schema
const garbageScheduleSchema = new mongoose.Schema({
  address: String,
  date: Date,
  garbage_number: Number,
  garbage_type: String
});

const GarbageSchedule = mongoose.model('garbage_schedule', garbageScheduleSchema);

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Define API endpoints

// Create
app.post('/api/schedule', async (req, res) => {
  try {
    const { address, date, garbage_number, garbage_type } = req.body;
    const newSchedule = new GarbageSchedule({
      address,
      date,
      garbage_number,
      garbage_type
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// Read (Get all schedules)
app.get('/api/schedule', async (req, res) => {
  try {
    const scheduleData = await GarbageSchedule.find();
    res.json(scheduleData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// Update
app.put('/api/schedule/:id', async (req, res) => {
  try {
    const { address, date, garbage_number, garbage_type } = req.body;
    const updatedSchedule = await GarbageSchedule.findByIdAndUpdate(
      req.params.id,
      { address, date, garbage_number, garbage_type },
      { new: true } // Return the modified document
    );
    res.json(updatedSchedule);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});



// Delete
app.delete('/api/schedule/:id', async (req, res) => {
  try {
    await GarbageSchedule.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
