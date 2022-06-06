const express = require("express");
const session = require("express-session");

const { PORT = 3000, SESS_NAME = 'myses' } = process.env;
const users = [{ id: 1, name: "Gach", email: "gachpeter2@gmail.com", password: "helloWord" }];

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: "/its/a secret please!ssh",
    cookie: {
        name: SESS_NAME,
        maxAge: 1000 * 60 * 60 * 5,
        secure: true
    }

}))

const redirectLogin = function(req, res, next) {
    if (!req.session.userId) {
        res.redirect("/login");
    } else {
        next();
    }
}
const redirectHome = function(req, res, next) {
    if (req.session.userId) {
        res.redirect("/home");
    } else {
        next();
    }
}
app.use((req, res, next) => {
    const userId = req.session.userId;
    if (userId) {
        res.locals.user = users.find(user => user.id === userId);
    }
    next();
})


app.get("/", (req, res) => {
    const { userId } = req.session;
    res.send(`
    <h1>Welcome</h1>
    ${userId ? "<a href='/home'>Home</a><form method='post' action='/logout'><button>Logout</button></form>":"<a href='/login'>Login</a><a href='register'>Register</a>"
    
}`)
})
app.get("/login", redirectHome, (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="reset"/>
        <input type="submit"/>
        <a href="/register">Register</a>
    </form>
    `)
})
app.get("/register", redirectHome, (req, res) => {
    res.send(`
    <h1>Register</h1>
    <form action="/register" method="post">
        <input type="text" name="name" placeholder="Name"/>
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="reset"/>
        <input type="submit"/>
        <a href="/login">Login</a>
    </form>
    `)
})

app.get("/home", redirectLogin, (req, res) => {
    res.send(`
    <h1>Home</h1>
    <p>You are logged in as {user.name} with email {user.email}</p>
    `)
})

app.post("/login", redirectHome, (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (email && password) {
        const user = users.find(user => user.email == email && user.password == password);
        if (user) {
            req.session.userId = user.id;
            console.log(user.id);
            console.log(req.session);
            console.log(req.session.userId);
            return res.redirect("/home");

        }
        res.redirect("login");
    }

});
app.post("/register", redirectHome, (req, res) => {})
app.post("/logout", redirectLogin, (req, res) => {})

app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`));