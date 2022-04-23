import bodyParser from "body-parser";
let users = []
let tweets = [];
export default function routes(app){
    const link = {
        http: 'http://',
        https: 'https://'
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.post('/sign-up', (req, res) => {
        if((req.body.username === '') || 
        (req.body.avatar === '') ||
        (req.body.avatar.substring(0, 7) !== link.http) ||
        (req.body.avatar.substring(0, 8) !== link.https)){
            res.sendStatus(400);
        }else{
            users = [...users, req.body];
            console.log(users);
            res.status(201).send('OK!');
        }
    });
    app.post('/tweets', (req, res) => {
        if(req.body.tweet === ''){
            res.sendStatus(400);
        }else{
            const username = req.headers.user;
            const avatar = setAvatar(users, username);
            tweets = [...tweets, {username: username, avatar: avatar, tweet: req.body.tweet}];
            res.status(201).send('OK!');
        }
    });
    app.get('/tweets', (req, res) => {
        res.send(tweets);
    });
}

function setAvatar(array, username){
    for(let i in array){
        if(array[i].username === username){
            return array[i].avatar;
        }
    }
    return '';
}