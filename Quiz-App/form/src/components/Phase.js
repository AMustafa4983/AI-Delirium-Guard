// src/components/Phase.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Phase = ({ title, questions, options, onNext, onBack }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
  
    const handleInputChange = (question, answer) => {
      setFormData({ ...formData, [question]: answer });
      setErrors({ ...errors, [question]: undefined });
    };
  
    const validateData = () => {
      const newErrors = {};
      questions.forEach((question) => {
        if (!formData[question]) {
          newErrors[question] = 'This field is required.';
        } else if (
          (question === 'Age' || question === 'Weight' || question === 'Height') &&
          (isNaN(formData[question]) || formData[question] < 0)
        ) {
          newErrors[question] = 'Please enter a valid value.';
        }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleNext = () => {
      const isValid = validateData();
      if (isValid) {
        if (onNext) {
          onNext(formData);
        }
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="container bg-white shadow-md rounded-md p-6"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <label className="question">{question}</label>
            {options[question] ? (
              <div className="flex flex-wrap gap-4">
                {options[question].map((option) => (
                  <label
                    key={option}
                    className={`option-label option ${
                      errors[question] ? 'border border-red-500' : ''
                    }`}
                    onClick={() => handleInputChange(question, option)}
                  >
                    <input
                      type="radio"
                      name={question}
                      value={option}
                      className="option-input"
                      onChange={() => handleInputChange(question, option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                {question === 'Gender' ? (
                  <div className="flex gap-4">
                    <label className="option-label option">
                      <input
                        type="radio"
                        name={question}
                        value="Male"
                        className="option-input"
                        onChange={() => handleInputChange(question, 'Male')}
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="option-label option">
                      <input
                        type="radio"
                        name={question}
                        value="Female"
                        className="option-input"
                        onChange={() => handleInputChange(question, 'Female')}
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                ) : (
                  <input
                    type={question === 'Age' || question === 'Weight' || question === 'Height' ? 'number' : 'text'}
                    className={`input ${errors[question] ? 'border border-red-500' : ''}`}
                    onChange={(e) => handleInputChange(question, e.target.value)}
                  />
                )}
                {errors[question] && (
                  <p className="text-red-500 text-sm mt-2">{errors[question]}</p>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBack && onBack()}
            className="button bg-gray-400 text-white hover:bg-gray-500 transition duration-300"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="button bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
          >
            {title === 'Surgery Details' ? 'Finish' : 'Next'}
          </motion.button>
        </div>
      </motion.div>
    );
  };
  
  export default Phase;