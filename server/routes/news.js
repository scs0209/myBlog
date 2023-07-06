const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/latest', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(
        '개발',
      )}&display=5&sort=date`,
      {
        headers: {
          'X-Naver-Client-Id': process.env.CLIENT_ID,
          'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
        },
      },
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
