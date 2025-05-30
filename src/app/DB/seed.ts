import { UserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

const adminUser = {
  email: 'admin@swiftcart.com',
  password: 'admin123',
  name: 'Khaled',
  role: UserRole.ADMIN,
  clientInfo: {
    device: 'pc',
    browser: 'Unknown',
    ipAddress: '127.0.0.1',
    pcName: 'localhost',
    os: 'Unknown',
    userAgent: 'Seed Script',
  },
};

const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ role: UserRole.ADMIN });

    if (!isAdminExist) {
      await User.create(adminUser);
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

export default seedAdmin;
