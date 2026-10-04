const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); 

// Kết nối tới MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/recruitment_db')
.then(() => console.log('Kết nối MongoDB thành công!'))
.catch(err => console.log('Lỗi kết nối MongoDB:', err));

// Nhúng các route vào server
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Chạy server ở cổng 3000
app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
})