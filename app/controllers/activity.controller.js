const { sequelize} = require('../models/index');

exports.create_activity = (req, res, next) => {
    const { description, url, name, active, parent_id } = req.body;
    sequelize.query("INSERT INTO activities (description, url, name, active, parent_id) VALUES (:description, :url, :name, :active, :parent_id)", { replacements: { description, url , name, active, parent_id}, type: sequelize.QueryTypes.INSERT })
        .then(result => {
            res.status(201).json({ message: "Activity created successfully." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_all_activities = (req, res, next) => {
    sequelize.query("SELECT * FROM activities", { type: sequelize.QueryTypes.SELECT })
        .then(activities => {
            res.json(activities);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_activity_by_id = (req, res, next) => {
    const { id } = req.params;
    sequelize.query("SELECT * FROM activities WHERE id = :id", { replacements: { id }, type: sequelize.QueryTypes.SELECT })
        .then(activity => {
            res.json(activity[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.update_activity = (req, res, next) => {
    const { id } = req.params;
    const { description, url, name, active, parent_id} = req.body;
    sequelize.query("UPDATE activities SET description = :description, url = :url, name = :name, active = :active WHERE id = :id", { replacements: { description, url, name, active, id }, type: sequelize.QueryTypes.UPDATE })
        .then(result => {
            res.json({ message: "Activity updated successfully." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.delete_activity = (req, res, next) => {
    const { id } = req.params;
    sequelize.query("DELETE FROM activities WHERE id = :id", { replacements: { id }, type: sequelize.QueryTypes.DELETE })
        .then(result => {
            res.json({ message: "Activity deleted successfully." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.activity_mapping = (req, res, next) => {
    const { role_id, activity_id, isCreate, isRead, isUpdate, isDelete} = req.body;
    sequelize.query("INSERT INTO role_activity (role_id, activity_id, `create`, `read`, `update`, `delete`) VALUES (:role_id, :activity_id, :create, :read, :update, :delete)",
     {replacements: { role_id: role_id, activity_id: activity_id, create: isCreate, read: isRead, update: isUpdate, delete: isDelete}, type: sequelize.QueryTypes.INSERT})
     .then((result) => {
        res.status(201)
        .json(
          { message: "Activity assigned to role successfully." 
        });
    }).catch(err => {
        return res.status(500).json({ error: err });
    });
}

exports.get_role_activities = (req, res, next) => {
    const { id } = req.params;
    sequelize.query("SELECT activities.* FROM activities JOIN role_activity ON activities.id = role_activity.activity_id JOIN user_roles ON role_activity.role_id = user_roles.roleId WHERE user_roles.userId = :id",
    { replacements: { id }, type: sequelize.QueryTypes.SELECT })
    .then(result => {
       res.status(200).json({ activities: result });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};