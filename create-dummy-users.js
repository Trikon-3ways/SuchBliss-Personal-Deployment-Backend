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
      phone: '+919863779900' 
    });
    
    if (existingDummyUser && existingDummyUser.role !== 'admin') {
      console.log('✅ Dummy user already exists');
      console.log('Phone:', existingDummyUser.phone);
      console.log('Name:', existingDummyUser.name);
      return;
    }
    
    // Create dummy regular user
    const dummyUser = {
      name: 'Test User',
      phone: '+919863779900',
      password: null, // No password for OTP-based login
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
    console.log('Phone: +919863779900');
    console.log('Name: Test User');
    console.log('Status: Active');
    console.log('Plan: Monthly');
    
    console.log('\n📱 Demo Credentials Summary:');
    console.log('============================');
    console.log('🔹 WhatsApp/Phone Login:');
    console.log('   Phone: +919863779900');
    console.log('   (OTP will be sent to WhatsApp & SMS)');
    console.log('');
    console.log('🔹 Admin Login:');
    console.log('   Email: admin@suchbliss.com');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating dummy user:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

// Run the script
createDummyUsers();
