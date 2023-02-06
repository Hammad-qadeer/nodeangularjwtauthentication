const { sequelize, role } = require('../models/index');
const db = require('../models/index');
const Role = db.role;

exports.create_role= (req, res, next) => {
    const roleName = req.body.roleName;
    const createdAt = new Date();
    const updatedAt = new Date();
    sequelize.query("INSERT INTO roles (name, createdAt, updatedAt) VALUES (?, ?, ?)", 
    { replacements: [roleName, createdAt,  updatedAt], type: sequelize.QueryTypes.INSERT })
        .then(result => {
            res.status(201).json({
                message: 'Role created Successfully.',
                createdRole: {
                    roleName: roleName,
                    id: result[0]
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Get all roles
exports.get_all_roles = (req, res, next) => {
    sequelize.query("SELECT * FROM roles", { type: sequelize.QueryTypes.SELECT })
    .then(roles => {
        res.status(200).json({
            count: roles.length,
            roles: roles
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// Get a specific role by ID
exports.get_role_by_id = (req, res, next) => {
    const roleId = req.params.roleId;
    sequelize.query("SELECT * FROM roles WHERE id = ?", [roleId], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({
            error: err
    });
        } else if (result.length > 0) {
        res.status(200).json({
        role: result[0]
    });
        } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    });
    };

// Update a specific role by ID
exports.update_role = (req, res, next) => {
    const roleId = req.params.roleId;
    const roleName = req.body.roleName;
    sequelize.query("UPDATE roles SET name = ? WHERE id = ?", 
    { replacements: [roleName, roleId], type: sequelize.QueryTypes.UPDATE })
        .then(result => {
            if (result[0] > 0) {
                res.status(200).json({
                    message: 'Role updated',
                    request: {
                        roleName: roleName
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    };

// Delete a specific role by ID
exports.delete_role = (req, res, next) => {
    const roleId = req.params.roleId;
    sequelize.query("DELETE FROM roles WHERE id = ?", 
    { replacements: [roleId], type: sequelize.QueryTypes.DELETE })
        .then(result => {
            if (result[0] > 0) {
                res.status(200).json({
                    message: 'Role deleted'
                });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    };