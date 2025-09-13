// This script drops stale indexes from the classrooms collection
// Run this script to fix the duplicate key error

const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://faiz1234:6vXlGxrjgTKpq0wV@cluster0.7f4yz7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function fixIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('classrooms');

    // List all indexes
    console.log('Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });

    // Drop the problematic classCode index if it exists
    try {
      await collection.dropIndex('classCode_1');
      console.log('✓ Dropped classCode_1 index');
    } catch (error) {
      if (error.codeName === 'IndexNotFound') {
        console.log('ℹ classCode_1 index not found (already removed)');
      } else {
        console.error('Error dropping classCode_1 index:', error.message);
      }
    }

    // Drop duplicate indexes if they exist
    const indexesToDrop = ['classroomId_1', 'inviteCode_1'];
    
    for (const indexName of indexesToDrop) {
      try {
        // Check if this is not the unique index
        const indexInfo = indexes.find(idx => idx.name === indexName);
        if (indexInfo && !indexInfo.unique) {
          await collection.dropIndex(indexName);
          console.log(`✓ Dropped duplicate ${indexName} index`);
        }
      } catch (error) {
        if (error.codeName === 'IndexNotFound') {
          console.log(`ℹ ${indexName} index not found`);
        } else {
          console.error(`Error dropping ${indexName} index:`, error.message);
        }
      }
    }

    // List indexes after cleanup
    console.log('\nIndexes after cleanup:');
    const newIndexes = await collection.indexes();
    newIndexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });

    console.log('\n✅ Index cleanup completed successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
fixIndexes();