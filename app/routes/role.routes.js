const roleController = require('../controllers/role.controller');

module.exports = function(app) {
    app.post("/api/auth/role", roleController.create_role);

    app.get("/api/auth/roles", roleController.get_all_roles);

    app.get("/api/auth/role/:roleId", roleController.get_role_by_id);

    app.patch("/api/auth/role/:roleId", roleController.update_role);

    app.delete("/api/auth/role/:roleId", roleController.delete_role);
}

// router.post('/role', roleController.create_role);
// router.get('/roles', );
// router.get('/role/:roleId', roleController.get_role_by_id);
// router.patch('/role/:roleId', roleController.update_role);
// router.delete('/role/:roleId', roleController.delete_role);
