const activityController = require('../controllers/activity.controller');
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
    app.post("/api/user/activities", activityController.create_activity);

    app.get("/api/user/activities", activityController.get_all_activities);

    app.get("/api/user/activity/:id", activityController.get_activity_by_id);

    app.put("/api/user/activity/:id", activityController.update_activity);

    app.delete("/api/user/activity/:id", activityController.delete_activity);

    app.post("/api/user/assign-activity-to-role", activityController.activity_mapping, [authJwt.verifyToken])

    app.get("/api/user/get-role-activities/:id", activityController.get_role_activities)
}