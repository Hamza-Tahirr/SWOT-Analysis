const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

if (!OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set. Copy .env.example to .env and add your key.');
  process.exit(1);
}

const textBeforeInput = `Use the below information to generate a SWOT analysis and output it in the following format:`;
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

app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <label for="input">Describe the business: </label><br>
      <textarea name="input" id="input" rows="8" cols="60" required></textarea><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/', async (req, res) => {
  const inputText = (req.body.input || '').trim();
  if (!inputText) {
    return res.status(400).send('Please enter a business description. <a href="/">Go back</a>');
  }

  const requestData = {
    model: OPENAI_MODEL,
    messages: [{ role: 'user', content: `${textBeforeInput}\n\n${inputText}\n\n${textAfterInput}` }],
    temperature: 0.7
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    // The model often wraps the returned HTML in a markdown code fence
    const html = response.data.choices[0].message.content
      .replace(/^\s*```(?:html)?\s*/i, '')
      .replace(/\s*```\s*$/, '');
    res.send(html);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(502).send('Could not generate the SWOT analysis. Check the server log for details. <a href="/">Go back</a>');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
