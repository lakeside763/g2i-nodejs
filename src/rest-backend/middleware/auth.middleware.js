const auth = require('basic-auth');
const compare = require('tsscmp');


exports.protect = ((req, res, next) => {
    const credentials = auth(req);

    if (!credentials || !check(credentials.name, credentials.pass)) {
      res.status(401).json({
        message:'Authorisation denied',
        auth_type: 'Basic Auth',
        login_details: {
          username: 'john@g2i.com', password: 'secret'
        }
      }).end();
    }
    next();
});


const check = (name, pass) => {
  let valid = true;
  valid = compare(name, 'john@g2i.com') && valid;
  valid = compare(pass, 'secret') && valid;
  return valid;
}
