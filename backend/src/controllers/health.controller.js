export const checkHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend API is running effectively.',
        timestamp: new Date().toISOString(),
    });
};
