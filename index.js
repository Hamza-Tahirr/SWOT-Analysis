const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded request bodies
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const OPENAI_API_KEY = process.env.OPEN_API;

app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <label for="input">Enter the text over here: </label>
      <input type="text" name="input" id="input">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/', (req, res) => {
  console.log(req.body.input);
      
const inputText = `ABC Supply Chain Inc. is a global logistics company that specializes in providing end-to-end supply chain solutions to businesses of all sizes. The company has a strong presence in several countries and has built a reputation for its reliability, efficiency, and cost-effectiveness. ABC Supply Chain's core services include transportation, warehousing, inventory management, and distribution. The company also offers value-added services such as customs brokerage, packaging, and labeling. ABC Supply Chain has experienced steady growth over the years, but the industry is becoming increasingly competitive, with new players entering the market and existing competitors expanding their offerings. The company's management team is concerned about maintaining its competitive edge and identifying new opportunities for growth in a rapidly evolving industry`
const textBeforeInput = `Use the Below information to Generate a SWOT Analysis and output in the following format`
const textAfterInput = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SWOT Analysis</title>

    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1a1a1a;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .swot-container {
            background-color: #333;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            padding: 20px;
            width: 400px;
            animation: fadeIn 1s ease-in-out; /* Add fade-in animation */
        }

        h2 {
            color: #007BFF;
            text-align: center;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        li {
            margin-bottom: 15px;
        }

        strong {
            color: #007BFF;
            font-weight: bold;
        }

        span {
            color: #ddd;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    </style>
</head>
<body>

    <div class="swot-container">
        <h2>SWOT Analysis</h2>

        <ul>
            <li>
                <strong>Strengths:</strong>
                <span>Business Strengths, Separate by Comma</span>
            </li>
            <li>
                <strong>Weakness:</strong>
                <span>Business Weakness, Separate by Comma</span>
            </li>
            <li>
                <strong>Opportunity:</strong>
                <span>Business Opportunities, Separate by Comma</span>
            </li>
            <li>
                <strong>Threat:</strong>
                <span>Business Threats, Separate by Comma</span>
            </li>
        </ul>
    </div>

</body>
</html>


`;


const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: `${textBeforeInput}\nn${inputText}\nn${textAfterInput}` }],
  temperature: 0.7
};

axios.post('https://api.openai.com/v1/chat/completions', requestData, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
})
  .then(response => {
    console.log(response.data.choices[0].message.content);
    res.send(response.data.choices[0].message.content);
  })
  .catch(error => {
    console.error(error);
  });
;
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});