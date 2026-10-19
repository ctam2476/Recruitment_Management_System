import mongoose from 'mongoose';

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

const Job = mongoose.model('Job', jobSchema);
export default Job;