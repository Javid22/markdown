const express = require('express');
const cors = require('cors');
const marked = require('marked');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Custom middleware for error handling and response types
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Middleware to set JSON response headers
const setJSONResponse = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

// Middleware to handle not found routes
const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Not Found' });
};

// Apply middleware
app.use(setJSONResponse);

app.post('/convert', (req, res) => {
  const { markdownText } = req.body;

  // Example common function for processing markdown
  const processedMarkdown = marked(markdownText);

  res.json({ processedMarkdown });
});

// Use error handling middleware
app.use(errorHandler);

// Use not found middleware
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
