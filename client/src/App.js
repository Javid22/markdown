import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function App() {
  const [input, setInput] = useState('');
  const [convertedHTML, setConvertedHTML] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.post(`http://localhost:3001/convert`, {
          markdownText: input,
        });
        const html = response.data.markdownText;
        setConvertedHTML(html);
      } catch (error) {
        console.error('Error converting Markdown to HTML:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const renderers = {
    code: ({ language, value }) => (
      <SyntaxHighlighter style={docco} language={language}>
        {value}
      </SyntaxHighlighter>
    ),
  };

  return (
    <div className='App'>
        <textarea
          autoFocus
          className='textarea'
          value={input}
          onChange={handleInputChange}
          placeholder='Type your Markdown here...'
        />
        <ReactMarkdown className='markdown' >{convertedHTML}</ReactMarkdown>
    </div>
  );
}

export default App;
