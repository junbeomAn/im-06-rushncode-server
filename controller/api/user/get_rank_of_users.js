/*
GET /api/user/rank
{
}
*/

const Promise = require("bluebird");

const getUsersByRank = Promise.promisify(require("../../../model/get_users_by_rank"));


const getRankOfUsers = (req, res) => {
  getUsersByRank().then((users) => {
    res.send({
      message: 'success getting rank of users',
      users
    });
  })
  // res.send('test');
}

module.exports = getRankOfUsers;