const axios = require("axios");

exports.getGamingNews = async (req, res) => {
  try {
    const searchQuery =
      'video games OR "gaming industry" OR "playstation" OR "xbox" OR "nintendo" -casino -betting';

    const response = await axios.get(
      "https://api.apitube.io/v1/news/everything",
      {
        params: {
          query: searchQuery,
          language: "en",
          per_page: 15,
        },
        headers: {
          Authorization: `Bearer ${process.env.APITUBE_API_KEY}`,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "API Error", error: error.message });
  }
};
