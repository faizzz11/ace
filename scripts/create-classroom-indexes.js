// This script creates the proper unique indexes for the classrooms collection

const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://faiz1234:6vXlGxrjgTKpq0wV@cluster0.7f4yz7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function createIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('classrooms');

    // Create unique indexes
    console.log('Creating unique indexes...');
    
    try {
      await collection.createIndex({ classroomId: 1 }, { unique: true, sparse: true });
      console.log('✓ Created unique index for classroomId');
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        console.log('⚠ Unique index for classroomId already exists or has duplicates');
      } else {
        console.error('Error creating classroomId index:', error.message);
      }
    }

    try {
      await collection.createIndex({ inviteCode: 1 }, { unique: true, sparse: true });
      console.log('✓ Created unique index for inviteCode');
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        console.log('⚠ Unique index for inviteCode already exists or has duplicates');
      } else {
        console.error('Error creating inviteCode index:', error.message);
      }
    }

    // List all indexes
    console.log('\nFinal indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      const unique = index.unique ? ' (unique)' : '';
      const sparse = index.sparse ? ' (sparse)' : '';
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}${unique}${sparse}`);
    });

    console.log('\n✅ Index creation completed successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
createIndexes();