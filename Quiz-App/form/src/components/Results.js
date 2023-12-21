// src/components/Results.js
import React from 'react';
import { motion } from 'framer-motion';

const Results = ({ deliriumResult, restartQuiz }) => {
  console.log(deliriumResult);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="container bg-white shadow-md rounded-md p-6"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        {deliriumResult === 1 ? 'Post-Delirium Detected' : 'No Post-Delirium Detected'}
      </h1>
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restartQuiz}
          className="button bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
        >
          Restart Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Results;
