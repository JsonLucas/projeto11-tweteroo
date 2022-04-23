import app from './expressConfig.js';
import routes from './apiRoutes.js';
import cors from 'cors';
export default function server(){
    app.use(cors());
    routes(app);
    app.listen(5000, () => {
        console.log('running at port 5000');
    });
}

server();