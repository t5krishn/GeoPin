const { Pool } = require('pg');
const dbParams = require('../lib/db');
const pool = new Pool(dbParams);

const q = require('./queries/queryExporter');


// console.log(q.getAllMapsForUser(pool, 2).then(res=>{console.log(res);}));

pool.query(`SELECT COUNT(*) FROM properties;`, [])
    .then(res => {
        if (res.rows) {
            console.log(res.rows[0].count);
            return true;
        } else {
            console.log(null);
            return false;
        }
    })
    .catch(err => { console.log(err) });
