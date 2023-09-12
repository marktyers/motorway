
import pg from 'pg'

const pool = new pg.Pool({
  user: 'codio',
  host: 'localhost',
  database: 'motorway',
  password: 'p455w0rd',
  port: 5432,
})

pool.on('error', (err, client) => {
	console.error('Error:', err);
})

// const client = new pg.Client({
//     user: 'codio',
//     host: 'localhost',
//     database: 'motorway',
//     password: 'p455w0rd',
//     port: 5432,
// })

// client.connect()

const query = 'select * from public.vehicle_states;'

pool.connect((err, client, done) => {
	if (err) throw err
	client.query(query, (err, res) => {
		done()
		if (err) {
			console.log(err.stack)
		} else {
			for (let row of res.rows) {
				console.log(row)
			}
		}
	})
})

// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     for (let row of res.rows) {
//         console.log(row);
//     }
//     client.end();
// });
