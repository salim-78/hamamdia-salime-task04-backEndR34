const { MongoClient } = require('mongodb');

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017';
const dbName = 'userDB';

const client = new MongoClient(uri);

const runApp = async () => {
    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Insert two users separately
        await usersCollection.insertOne({ name: 'Ahmed', email: 'ahmed@example.com', age: 30 });
        await usersCollection.insertOne({ name: 'Fatima', email: 'fatima@example.com', age: 25 });

        // Insert ten users with five of them aged 27
        await usersCollection.insertMany([
            { name: 'Ali', email: 'ali@example.com', age: 27 },
            { name: 'Sara', email: 'sara@example.com', age: 27 },
            { name: 'Youssef', email: 'youssef@example.com', age: 27 },
            { name: 'Mariam', email: 'mariam@example.com', age: 27 },
            { name: 'Khaled', email: 'khaled@example.com', age: 27 },
            { name: 'Noura', email: 'noura@example.com', age: 22 },
            { name: 'Jasem', email: 'jasem@example.com', age: 29 },
            { name: 'Leila', email: 'leila@example.com', age: 35 },
            { name: 'Omar', email: 'omar@example.com', age: 40 },
            { name: 'Mona', email: 'mona@example.com', age: 41 },
        ]);

        // Find all users with age 27
        const usersWithAgeTwentySeven = await usersCollection.find({ age: 27 }).toArray();
        console.log('Users with age 27:', usersWithAgeTwentySeven);

        // Find the first three users with age 27
        const firstFourthUsersWithAgeTwentySeven = await usersCollection.find({ age: 27 }).limit(4).toArray();
        console.log('First three users with age 27:', firstFourthUsersWithAgeTwentySeven);

        // Update names of the first four users
        await usersCollection.updateMany(
            { age: { $gte: 0 } },
            [{ $set: { name: { $concat: ["Updated_", "$name"] } } }],
            { limit: 4 }
        );

        // Increment ages of the first four users by 4 years
        await usersCollection.updateMany(
            { age: { $gte: 0 } },
            { $inc: { age: 4 } },
            { limit: 4 }
        );

        // Increment ages of all users by 10 years
        await usersCollection.updateMany({}, { $inc: { age: 10 } });

        // Delete all users with age 41
        await usersCollection.deleteMany({ age: 41 });

    } catch (err) {
        console.error(err);
    }
};

// Start the application
runApp();