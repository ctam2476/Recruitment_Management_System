import express from 'express';
import Job from './job.js'; 

const router = express.Router();

// 1. CREATE: Thêm mới tin tuyển dụng
router.post('/', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        res.status(201).json({ message: "Thêm tin tuyển dụng thành công!", data: savedJob });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. READ: Lấy danh sách tin tuyển dụng
router.get('/', async (req, res) => {
    try {
        const { position } = req.query;
        let query = position ? { title: new RegExp(position, 'i') } : {};
        const jobs = await Job.find(query);
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. AGGREGATION: Thống kê lương theo phòng ban
router.get('/thongke', async (req, res) => {
    try {
        const thongKe = await Job.aggregate([
            {
                $group: {
                    _id: "$department",                    
                    tongSoTinTuyenDung: { $sum: 1 },       
                    luongTrungBinh: { $avg: "$salary" },   
                    luongCaoNhat: { $max: "$salary" },      
                    luongThapNhat: { $min: "$salary" }      
                }
            },
            {
                $sort: { luongTrungBinh: -1 }            
            }
        ]);
        
        res.status(200).json({ 
            thongBao: "Thống kê dữ liệu thành công!", 
            ketQua: thongKe 
        });
    } catch (err) {
        res.status(500).json({ loi: err.message });
    }
});

export default router;