/*
POST /api/auth/verifyemail
{
  email,
  password
}
*/


const verifyEmail = (req, res) => {
  const email = req.url.split('/')[2];
  res.redirect('http://127.0.0.1:3000/auth');
}



module.exports = verifyEmail;