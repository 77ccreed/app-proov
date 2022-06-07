const mySql = require('mysql');


const db = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usersdata'
});


let dbUsers = null;

db.query('SELECT * FROM users', (err, users) => {
  if (err) throw err;
  dbUsers = users;
  console.log(users);
});


module.exports = {
  users: () => {
    return dbUsers;
  },
};