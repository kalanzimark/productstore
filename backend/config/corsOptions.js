const allowedOrigins = [
    //allowed origins or sites
    "http://localhost:3000",
];

const corsOptions = {
    origin: (origin, callback) => {
        //limit to sources in array or no origin like insomnia or postman
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
module.exports = corsOptions;
