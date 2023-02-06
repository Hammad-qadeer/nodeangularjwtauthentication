const { sequelize} = require('../models/index');

// Create a new user
exports.create_user = (req, res, next) => {
  const { name, email, password } = req.body;
  sequelize.query("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)", 
  {replacements: { name, email, password },
    type: sequelize.QueryTypes.INSERT
  })
  .then(result => {
    res.status(201).json({ message: 'User created successfully', user_id: result[0] });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

// Get user by ID
exports.get_user_by_id = (req, res, next) => {
  const { id } = req.params;
  sequelize.query("SELECT * FROM users WHERE id = :id", {
    replacements: { id },
    type: sequelize.QueryTypes.SELECT
  })
  .then(user => {
    if (user.length > 0) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

exports.update_user = (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  sequelize.query("UPDATE users SET name = :name, email = :email, password = :password WHERE id = :id",
  { replacements: { id, name, email, password }, type: sequelize.QueryTypes.UPDATE })
  .then(result => {
      if (result[0] > 0) {
          res.status(200).json({ message: 'User updated successfully' });
        } else {
        res.status(404).json({ message: 'User not found' });
        }
        }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
        });
        };

exports.delete_user = (req, res, next) => {
  const { id } = req.params;
  sequelize.query("DELETE FROM users WHERE id = :id", 
  { replacements: { id }, type: sequelize.QueryTypes.DELETE })
      .then(result => {
        if (result[0] > 0) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
        }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
        });
     };
     
exports.get_role_by_user_id = (req, res, next) => {
  const { id } = req.params;
  sequelize.query("SELECT roleId FROM user_roles WHERE userId = :id", 
  { replacements: { id }, type: sequelize.QueryTypes.SELECT })
  .then(result => {
     res.status(200).json({ role_id: result[0].roleId });
  }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  });
};
