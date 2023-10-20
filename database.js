import mysql from "mysql2"
// const mysql = require("mysql2")

const pool = mysql.createPool({
    host:'127.0.0.1',
    user: 'root',
    password: '', // enter password
    database: 'notes_app'
}).promise()

export async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM notes")
    // let rows = result[0];
    return rows;
}

export async function getNote(id){
    const [rows] = await pool.query(`
    SELECT * FROM notes WHERE id = ?
    `,[id])
    return rows[0];
}

// const note = await getnote(1);
// console.log(note)

export async function CreateNote(name,registratin,email,password){
    const [result] = await pool.query(`
    INSERT INTO notes (name, registration, email, password)
    VALUES (?, ?, ?, ?)
    `,[name, registratin, email, password])
    
    
    const id = result.insertId;
    return getNote(id);
}
export async function CreateDatabase(db){
     await pool.query(`
    CREATE DATABASE ${db}
    `)
     await pool.query(`
     USE ${db}
    `)
     await pool.query(`
     CREATE TABLE notes (
        id integer PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL,
        registration integer NOT NULL,
        email VARCHAR(225) NOT NULL,
        password VARCHAR(225) NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
      )
      `)
}

