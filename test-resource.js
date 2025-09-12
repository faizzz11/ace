const { MongoClient } = require('mongodb');

async function testResource() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('resources');

    // Create a test resource
    const testResource = {
      name: 'Test Book',
      description: 'A sample book for testing',
      category: 'book',
      location: 'Library Section A',
      condition: 'good',
      isAvailable: true,
      status: 'active',
      requiresApproval: false,
      tags: ['test', 'sample'],
      image: null,
      
      // Book specific fields
      isbn: '123-456-789',
      author: 'Test Author',
      publisher: 'Test Publisher',
      edition: '1st Edition',
      totalCopies: 5,
      availableCopies: 5,
      
      // Counters
      totalBorrows: 0,
      currentBorrower: null,
      dueDate: null,
      
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(testResource);
    console.log('Test resource created with ID:', result.insertedId);

    // List all resources
    const resources = await collection.find({}).toArray();
    console.log('Total resources in database:', resources.length);
    resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.name} (${resource.category})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testResource();
