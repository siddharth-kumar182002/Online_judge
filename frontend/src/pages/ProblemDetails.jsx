import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;
int main() { 
  std::cout << "Hello World!"; 
  return 0; 
}`);
  const [output, setOutput] = useState('');
  const [verdict, setVerdict] = useState('');
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/problems/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token') // Attach the token to the request
      }
    })
      .then(response => setProblem(response.data))
      .catch(error => console.error('Error fetching problem details:', error));
  }, [id]);

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code
    };

    try {
      setLoadingRun(true);
      const { data } = await axios.post(`http://localhost:8080/api/problems/${id}`, payload, {
        headers: {
          'Authorization': localStorage.getItem('token') // Attach the token to the request
        }
      });
      setOutput(data.outputs.map(output => `Input:\n${output.input}\nExpected Output:\n${output.expectedOutput}\nActual Output:\n${output.actualOutput}\nSuccess: ${output.success}`).join('\n\n'));
      setVerdict(data.verdict);
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setLoadingRun(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code,
    };

    try {
      setLoadingSubmit(true);
      const { data } = await axios.post(`http://localhost:8080/api/submissions/${id}`, payload, {
        headers: {
          'Authorization': localStorage.getItem('token') // Attach the token to the request
        }
      });
      setVerdict(data.verdict);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 flex">
      <ResizableBox
        width={600}
        height={Infinity}
        axis="x"
        minConstraints={[300, Infinity]}
        maxConstraints={[1000, Infinity]}
        resizeHandles={['e']}
        className="resizable-box"
      >
        <div className="p-4 bg-gray-100 shadow-md rounded-md overflow-auto" style={{ height: '80vh' }}>
          <h2 className="text-2xl font-bold mb-4">{problem.name}</h2>
          <p>{problem.description}</p>
          <h3 className="text-xl font-semibold mt-4">Test Cases</h3>
          {problem.testCases.map((testCase, index) => (
            <div key={index} className="mt-2 p-2 bg-white rounded shadow">
              <p><strong>Input:</strong></p>
              <pre>{testCase.input}</pre>
              <p><strong>Expected Output:</strong></p>
              <pre>{testCase.output}</pre>
            </div>
          ))}
        </div>
      </ResizableBox>
      <ResizableBox
        width={1000}
        height={Infinity}
        axis="x"
        minConstraints={[1000, Infinity]}
        maxConstraints={[1000, Infinity]}
        resizeHandles={['w']}
        className="resizable-box"
      >
        <div className="h-full p-4 bg-gray-100 shadow-md rounded-md flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">AlgoU Online Code Compiler</h1>
          <select className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500">
            <option value='cpp'>C++</option>
            <option value='c'>C</option>
            <option value='py'>Python</option>
            <option value='java'>Java</option>
          </select>
          <br />
          <div className="bg-gray-100 shadow-md w-full mb-4" style={{ height: '300px', overflowY: 'auto' }}>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                outline: 'none',
                border: 'none',
                backgroundColor: '#f7fafc',
                height: '100%',
                overflowY: 'auto'
              }}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleRun}
              type="button"
              className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              disabled={loadingRun}
            >
              {loadingRun ? (
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 me-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              )}
              Run
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="text-center inline-flex items-center text-white bg-gradient-to-br from-green-500 to-blue-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? (
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 me-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              )}
              Submit
            </button>
          </div>
          {output && (
            <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4 w-full">
              <pre
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              >
                {output}
              </pre>
            </div>
          )}
          {verdict && (
            <div
              className={`verdict mt-4 p-4 rounded-md w-full ${
                verdict === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <h2 className="text-xl font-bold">{verdict}</h2>
            </div>
          )}
        </div>
      </ResizableBox>
    </div>
  );
};

export default ProblemDetails;
