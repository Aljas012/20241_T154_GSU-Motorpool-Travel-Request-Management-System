const user_data = require("../../MODELS/user_model");

const checkProfileUpdates = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await user_data.findById(userId);
        
        if (!user) {
            console.log('User not found during update check');
            return res.status(404).json({
                success: false,
                message: "User not found.",
                hasUpdates: false
            });
        }


        const lastClientUpdate = req.headers['last-update'] || req.query.lastUpdate;
        const hasUpdates = !lastClientUpdate || new Date(user.updatedAt) > new Date(lastClientUpdate);

        console.log('Profile check successful:', {
            userId,
            hasUpdates,
            lastClientUpdate,
            serverUpdate: user.updatedAt
        });

        res.status(200).json({ success: true, hasUpdates, message: hasUpdates ? "Updates available" : "No updates available",
            user: hasUpdates ? { name: user.name, email: user.email, college_name: user.college_name,
                office_code: user.office_code, updatedAt: user.updatedAt } : null
        });

    } catch (error) {
        console.error("Error checking profile updates:", error);
        res.status(500).json({
            success: false,
            hasUpdates: false,
            message: "An error occurred while checking profile updates.",
            error: error.message
        });
    }
}

module.exports = { checkProfileUpdates };