let token = "123456789";
let user = {
    token,
    name: 'aziz',
    role: 'admin',
    email: "aziz@gmail.com"
}

function authUser(req, res, next) {
    let req_token = req.headers.authorization;
    if (!req_token) {
        res.status(403)
        res.send("Login first")
    }
    next();
}

function authRole(req, res, next) {
    let req_token = req.headers.authorization.split('Bearer ')[1];
    if (req_token != user.token) {
        res.status(401)
        return res.send("Token not validate")
    }
    if(user.role != 'admin'){
        res.status(401)
        return res.send("not permitted")
    }
    next();

}

module.exports = {
    authUser,
    authRole
}