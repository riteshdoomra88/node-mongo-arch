const cors = require("cors");

const initiateSecurity = (app) => {
    /* Manage Cors Handler */
    var corsOptions = {
        origin: ['http://localhost:3000'],
        methods: 'GET,PUT,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
        maxAge: 3600
    }

    app.use(cors(corsOptions));
}

module.exports = initiateSecurity;
