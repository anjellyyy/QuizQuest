import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://s19anjali_db_user:QuizApp123@cluster0.neixhlg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
    .then(()=>{console.log('DB CONNECTED')})

}