//import modules
const express = require('express');

//connect to conn.js
const conn = require('./conn');

//create variable
const app = express();

//templating engine to connect js to html
app.set('view engine', 'ejs');

//use to get data in database 
app.use(express.urlencoded({extended: true}));

//route for index
app.get('/', (req, res)=>{
    res.render("index");
});

//route to insert data in database
app.post('/register', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    
    const insert = `INSERT INTO tbl_students VALUES ('0', '${firstname}', '${lastname}', '${age}')`

    //to check output such errors
    conn.query(insert, (err)=>{
        if (err) throw err;
        res.send(
            `<script>
                alert('Data successfully inserted into database!');
                location.href='/'
                </script>
                `
        );

    });
});

//route for displaying data
app.get('/view', (req,res)=>{
    const getData = `SELECT * FROM tbl_students`;

    //to excute
    conn.query(getData, (err, data)=>{
        if(err) throw err;
        res.render('view', {
            student: data //key: parameter
        })
    })
    
})

//delete
app.get('/delete/:id', (req,res)=>{

    const del_id = req.params.id;

    const toDelete = `DELETE FROM tbl_students WHERE idnum = '${del_id}'`;

    conn.query(toDelete, (err)=>{
        if(err) throw err;
        res.send(
            `<script>
            alert('Data Deleted!');
            location.href = '/view'
            </script>`
        )
    })
})

app.listen(2000, ()=>{
    console.log('Server is running on port 2000')
});






//const sql = 'INSERT INTO registration(fname, lname) VALUES (?,?)';

/*conn.query(sql, [fname, lname], () => {
        
        console.log(`First name: ${fname}, Last name: ${lname}`);
    
        res.send('Data successfully inserted into database!'); 
    });*/