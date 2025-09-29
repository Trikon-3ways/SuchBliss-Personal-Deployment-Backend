const bcrypt = require('bcryptjs');
const database = require('./config/database');

async function createTestUser() {
  try {
    console.log('🔧 Creating test user...');
    
    // Connect to database
    await database.connect();
    const db = database.getDb();
    
    // Hash password
    const hashedPassword = await bcrypt.hash('user123', 12);
    
    // Create test user
    const testUser = {
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
    
    // Insert test user
    const result = await db.collection('users').insertOne(testUser);
    
    console.log('✅ Test user created successfully!');
    console.log('User ID:', result.insertedId);
    console.log('Email: user@test.com');
    console.log('Password: user123');
    console.log('Name: Test User');
    console.log('Role: user');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

// Run the script
createTestUser();
