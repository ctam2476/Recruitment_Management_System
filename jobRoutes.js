const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },         
    department: { type: String, required: true },    
    type: { type: String, default: 'Full-time' },    
    workModel: { type: String, default: 'Hybrid' },  
    salary: { type: Number, required: true },        
    deadline: { type: String },                      
    status: { type: String, default: 'Open' },      
    skills: [String],                                
    description: { type: String }                    
}, { timestamps: true });

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

module.exports = mongoose.model('Job', jobSchema);
