
import { MongoClient } from 'mongodb';
// Connection URL
const url = 'mongodb://testing-user:test123123@testing-cluster-shard-00-00-3gnj7.mongodb.net:27017,testing-cluster-shard-00-01-3gnj7.mongodb.net:27017,testing-cluster-shard-00-02-3gnj7.mongodb.net:27017/test?ssl=true&replicaSet=testing-cluster-shard-0&authSource=admin&retryWrites=true';

let start = process.hrtime();

const elapsed_time = (note) => {
    const precision = 3; // 3 decimal places
    const elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
}

class mongoForEach {
    public state: any;

    constructor() {
        // Use connect method to connect to the Server
        this.state = MongoClient.connect(url, { useNewUrlParser: true });
    }

    public async foreach() {
        const dbConn = await this.state;
        const cursor = await dbConn.db('testing').collection('foreach').find({});
        return cursor;
    }

    public async count() {
        const dbConn = await this.state;
        const cursor = await dbConn.db('testing').collection('foreach').find({});
        const cnt = await cursor.count();
        console.log(cnt);
        return cnt;
    }
}

const mongo = new mongoForEach();

mongo.foreach().then(cursor => {
    cursor.forEach(value => {
        // console.log(value)
    });
    elapsed_time("Mongo foreach")
});

mongo.foreach().then(cursor => {
    cursor.toArray((err, result) => {
        result.forEach(async (val) => {
            // console.log(val);
        })
        elapsed_time("foreach basic")
    });
});

const used = process.memoryUsage();
for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
}


// rss 147.98 MB
// heapTotal 112.06 MB
// heapUsed 93.95 MB
// external 17.06 MB
// 1 s, 290.845 ms - Mongo foreach
// 18 s, 220.055 ms - foreach basic