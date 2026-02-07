const axios = require('axios');

exports.getGamingNews = async (req, res) => {
    try {
        const search = req.query.search?.trim() || "gaming";

        const response = await axios.get("https://api.apitube.io/v1/news/everything", {
            params: {
                query: search,
                per_page: 10,
            },
            headers: {
                Authorization: `Bearer ${process.env.APITUBE_API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch gaming news", error: error.message });
    }
};

