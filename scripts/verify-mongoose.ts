import dbConnect from '../lib/mongoose';
import Admin from '../lib/models/Admin';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env explicitly for script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function test() {
    console.log('Testing Mongoose connection with current env...');
    try {
        await dbConnect();
        console.log('✅ Connected successfully!');
        const admins = await Admin.find({}, 'email name');
        console.log('👥 Admin count:', admins.length);
        admins.forEach(a => console.log(` - ${a.email} (${a.name})`));
    } catch (error: any) {
        console.error('❌ Connection failed:', error.message);
        if (error.stack) console.error(error.stack);
    } finally {
        process.exit();
    }
}

test();
