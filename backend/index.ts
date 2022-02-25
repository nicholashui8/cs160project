const express = require('express');
const app = express();

app.get('/', (req: any, res: any) => {
    res.send('Well done!');
})

app.listen(8000, () => {
    console.log('The application is listening on port 8000! Hello!');
})