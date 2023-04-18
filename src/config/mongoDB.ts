import { MongoClient , Db} from 'mongodb'
import { MONGO_DB_NAME, MONGO_URI } from './constants';



const client = new MongoClient(MONGO_URI);

export default async function connectToMongoDB() {
    try {
        const _client = await client.connect();
        const db:Db = _client.db(MONGO_DB_NAME);
        console.log(`Connected to MongoDB with dbName ${db.databaseName}`);
        return db;
    } catch (error) {
        console.error(error);
    }
}
