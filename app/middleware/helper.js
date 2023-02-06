function checkPermissions(role_id, activity_id, requiredPermission) {
    return function (req, res, next) {
      // Step 1: Get the permission value for the specific role_id and activity_id combination
      const permissionValue = getPermissionValue(role_id, activity_id);
  
      // Step 2: Check if the permission value matches the required permission
      if (permissionValue === requiredPermission) {
        // Step 3: If the permission value matches, allow the action to proceed
        next();
      } else {
        // Step 4: If the permission value does not match, return an error message
        return res.status(401).json({ error: "You do not have the necessary permissions to perform this action" });
      }
    };
  }

  module.exports = checkPermissions;
  