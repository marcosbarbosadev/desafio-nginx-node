const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'dev',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people (name) VALUES ('Marcos Barbosa')`;
connection.query(sql)

connection.query("SELECT * FROM people", function(err, data, fields) {
    if (err) throw err;

    let names = [];

    for (let row of data) {
        names.push(`<li>${row.name}</li>`);
    }

    const content = [
        "<h1>Full Cycle Rocks!</h1>",
        "<h3>Nomes cadastrados</h3>",
        ...names
    ];
    
    app.get('/', (req, res) => {
        res.send(content.join("\n"));
    })

});
connection.end()


app.listen(port, () => {
    console.log('Rodando na porta' + port);
});