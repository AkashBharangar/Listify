import React, { useState } from 'react';
import axios from 'axios';

const AiTodoGenerator = ({ onTodosGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTodos = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/ai/generate-todos', { prompt });
      onTodosGenerated(response.data.todos);
      setPrompt('');
    } catch (error) {
      console.error('Error generating AI to-dos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-todo-generator">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., plan a birthday party"
      />
      <button onClick={handleGenerateTodos} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate with AI'}
      </button>
    </div>
  );
};

export default AiTodoGenerator;