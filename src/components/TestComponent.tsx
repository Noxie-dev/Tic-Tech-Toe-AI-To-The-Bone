import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800">Test Component</h1>
      <p className="mt-2 text-gray-700">If you can see this, React is working correctly!</p>
    </div>
  );
};

export default TestComponent;
