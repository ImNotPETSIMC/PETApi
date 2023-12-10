import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send("⚙️ PETAPI ⚙️");
});

app.listen(3000, () => {
    console.log("⚙️ PETAPI - Listening at http://localhost:3000");
});