# SWOT Analysis Generator

A small Node.js web app that turns a short business description into a SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis. The description is sent to the OpenAI Chat Completions API, and the result comes back as a styled HTML page.

## Features

- Simple form where you paste a description of a company or business idea
- Prompt that asks the model to fill a fixed HTML template with strengths, weaknesses, opportunities and threats
- Returns the analysis as a dark-themed HTML card in the browser
- API key, model and port are read from environment variables

## Tech Stack

- Node.js
- Express
- Axios
- dotenv
- OpenAI Chat Completions API (`gpt-3.5-turbo` by default)

## Project Structure

```
.
├── index.js       # Express server, prompt template and OpenAI request
├── package.json
├── .env.example   # Environment variables to copy into .env
└── LICENSE
```

## Getting Started

### Prerequisites

- Node.js and npm
- An OpenAI API key

### Installation

```bash
git clone https://github.com/Hamza-Tahirr/SWOT-Analysis.git
cd SWOT-Analysis
npm install
```

Copy the example environment file and add your key:

```bash
cp .env.example .env
```

| Variable         | Required | Default         | Description                  |
| ---------------- | -------- | --------------- | ---------------------------- |
| `OPENAI_API_KEY` | Yes      |                 | Your OpenAI API key          |
| `OPENAI_MODEL`   | No       | `gpt-3.5-turbo` | Chat model used for the call |
| `PORT`           | No       | `3000`          | Port the server listens on   |

### Run

```bash
npm start
```

Open http://localhost:3000, enter a business description and click **Submit**.

### Example input

> ABC Supply Chain Inc. is a global logistics company that provides end-to-end supply chain solutions to businesses of all sizes. Its core services include transportation, warehousing, inventory management and distribution, along with customs brokerage, packaging and labeling. The company has grown steadily, but the industry is becoming more competitive as new players enter the market and existing competitors expand their offerings.

## How It Works

1. `GET /` serves the input form.
2. `POST /` builds a prompt from the submitted text and an HTML template for the SWOT card.
3. The prompt is sent to the OpenAI Chat Completions endpoint.
4. The HTML returned by the model is sent back to the browser.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
