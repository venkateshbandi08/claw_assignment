import mongoose from 'mongoose'
import { createClient } from '@supabase/supabase-js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log("DB Connected");
  } catch (e) {
    console.log(e);
  }
};

export const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_PROJECT_ANON_KEY);