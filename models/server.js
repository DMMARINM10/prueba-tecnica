const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.purchasePath = '/purchase';
        this.salePath = '/sale';

        // Connection
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }
    
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors ());

        //body reading
        this.app.use( express.json());
    }

    routes() {
        this.app.use(this.purchasePath, require('../routes/purchase'));
        this.app.use(this.salePath, require('../routes/sale'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port', this.port);
        });
    }
}

module.exports = Server;

 
