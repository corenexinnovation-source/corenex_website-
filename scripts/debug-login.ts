import { prisma } from '../lib/db';
import { verifyPassword, generateToken } from '../lib/auth';
import { loginSchema } from '../lib/validation';

async function main() {
    console.log('Testing authentication flow...');

    try {
        // 1. Validating credentials
        console.log('1. Validating schema...');
        const email = 'corenexinnovation@gmail.com';
        const password = 'Core1995'; // The password from .env

        // 2. Database Connection
        console.log('2. Connecting to database...');
        const admin = await prisma.admin.findUnique({
            where: { email },
        });

        if (!admin) {
            console.error('❌ Admin user not found!');
            return;
        }
        console.log('✅ Admin user found:', admin.id);

        // 3. Password Verification
        console.log('3. Verifying password...');
        console.log('   Stored Hash:', admin.password);
        console.log('   Input Password:', password);

        const isValid = await verifyPassword(password, admin.password);

        if (isValid) {
            console.log('✅ Password verified successfully');
        } else {
            console.error('❌ Password verification failed');
        }

        // 4. Token Generation
        console.log('4. Generating token...');
        const token = await generateToken({
            id: admin.id,
            email: admin.email,
            name: admin.name,
        });
        console.log('✅ Token generated:', token ? 'Yes' : 'No');

    } catch (error) {
        console.error('❌ An error occurred:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
