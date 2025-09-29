const bcrypt = require('bcryptjs');
const database = require('./config/database');

async function createDummyUsers() {
  try {
    console.log('🔧 Creating dummy users for testing...');
    
    // Connect to database
    await database.connect();
    const db = database.getDb();
    
    // Check if dummy user already exists
    const existingDummyUser = await db.collection('users').findOne({ 
      email: 'user@test.com' 
    });
    
    if (existingDummyUser) {
      console.log('✅ Dummy user already exists');
      console.log('Email:', existingDummyUser.email);
      console.log('Name:', existingDummyUser.name);
      console.log('Role:', existingDummyUser.role);
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash('user123', 12);
      
      // Create dummy regular user
      const dummyUser = {
        name: 'Test User',
        email: 'user@test.com',
        phone: '+919863779900',
        password: hashedPassword,
        role: 'user',
        plan: 'monthly',
        status: 'active',
        phoneVerified: true,
        referralCode: 'TEST001',
        earnings: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Insert dummy user
      const result = await db.collection('users').insertOne(dummyUser);
      
      console.log('✅ Dummy user created successfully!');
      console.log('User ID:', result.insertedId);
      console.log('Email: user@test.com');
      console.log('Password: user123');
      console.log('Name: Test User');
      console.log('Status: Active');
      console.log('Plan: Monthly');
    }
    
    // Check if admin user already exists
    const existingAdmin = await db.collection('users').findOne({ 
      email: 'admin@suchbliss.com' 
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      // Create admin user
      const adminUser = {
        name: 'Admin User',
        email: 'admin@suchbliss.com',
        phone: '+919863779900',
        password: hashedPassword,
        role: 'admin',
        plan: 'annually',
        status: 'active',
        phoneVerified: true,
        referralCode: 'ADMIN001',
        earnings: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Insert admin user
      const result = await db.collection('users').insertOne(adminUser);
      
      console.log('✅ Admin user created successfully!');
      console.log('Admin ID:', result.insertedId);
      console.log('Email: admin@suchbliss.com');
      console.log('Password: admin123');
      console.log('Role: admin');
    }
    
    console.log('\n📱 Demo Credentials Summary:');
    console.log('============================');
    console.log('🔹 User Login:');
    console.log('   Email: user@test.com');
    console.log('   Password: user123');
    console.log('');
    console.log('🔹 Admin Login:');
    console.log('   Email: admin@suchbliss.com');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating dummy users:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

// Run the script
createDummyUsers();
