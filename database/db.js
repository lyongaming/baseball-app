const { Client, Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});

const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});

pool.on("error", (err, client) => {
    console.error("Some error occured while connecting to the database, exiting...", err);
    process.exit(-1);
});

const select_players = async() => {
    const client = await pool.connect();
    let players = {};
    
    try {
        const res = await client.query(`
            SELECT * FROM databaseball 
            WHERE position = '1B'
                AND hits > 50 
                AND homerun > 10
                AND runsbattedin > 30;  
            `);
        players = res.rows;
    } catch(err) {
        console.log(err.stack);
    } finally {
        client.release();
    }
    return players.slice(0,8);
}

module.exports = {
    select_players
}