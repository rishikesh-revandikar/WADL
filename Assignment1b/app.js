import express from 'express';
import bodyparser from 'body-parser'
import fs, { readFile } from 'fs'
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8000;

const app = express()

app.use(cors());

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login.html")
})

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + "/public/signup.html")
})

app.get('/users', (req, res) => {
  res.sendFile(__dirname + "/public/user.html")
})




app.post('/register', async (req, res) => {
  const data = req.body;



  // await addData(data)
  console.log(data);

  let check = await addData(data)
  if (check) {
    res.status(200).json({ message: "Registered successfully" })
    // res.redirect('/users')
  }
  else {
    res.status(500).json({ message: "Registered Unsuccessfully" })
  }


})

async function addData(data) {
  try {
    let existingData = []
    fs.readFile('./user.json', 'utf8', (err, filedata) => {
      if (err) {
        throw err;
      }
      else {
        console.log("file read");
        console.log(filedata);
        existingData = JSON.parse(filedata);

        existingData.push(data);
        fs.writeFile('user.json', JSON.stringify(existingData), (err) => {
          if (err) {
            throw err;
          }
          else {
            console.log("file written");
          }
        });
      }
    })
    return true;
  } catch (error) {
    console.log("error while saving data :: ", error);
  }
}

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
})