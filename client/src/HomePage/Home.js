import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [numJobs, setNumJobs] = useState(5);
    const [casep, setCasep] = useState(1);
    const [cased, setCased] = useState(1);
    const [method, setMethod] = useState("FCFS");
    const [jobData, setJobData] = useState([]);
    const [jobSchedule, setJobSchedule] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/schedule', {
                num_jobs: numJobs,
                casep: casep,
                cased: cased,
                method: method,
            });
            setJobData(response.data.job_data);
            setJobSchedule(response.data.job_schedule);
        } catch (error) {
            console.error("Error scheduling jobs", error);
        }
    };

    const handleReset = () => {
        setNumJobs(5);
        setCasep(1);
        setCased(1);
        setMethod("FCFS");
        setJobData([]);
        setJobSchedule([]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Scheduler</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Jobs:</label>
                    <input
                        type="number"
                        value={numJobs}
                        onChange={(e) => setNumJobs(e.target.value)}
                        min="1"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Case for Processing Time:</label>
                    <select
                        value={casep}
                        onChange={(e) => setCasep(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    >
                        <option value="1">Case 1</option>
                        <option value="2">Case 2</option>
                        <option value="3">Case 3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Case for Due Dates:</label>
                    <select
                        value={cased}
                        onChange={(e) => setCased(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    >
                        <option value="1">Case 1</option>
                        <option value="2">Case 2</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Scheduling Method:</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    >
                        <option value="FCFS">FCFS</option>
                        <option value="SPT">SPT</option>
                        <option value="LPT">LPT</option>
                        <option value="SST">SST</option>
                        <option value="SCR">SCR</option>
                        <option value="User specific">User Specific</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Generate Schedule
                    </button>
                    <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Reset
                    </button>
                </div>
            </form>

            <h2 className="text-xl font-bold mt-8">Job Data</h2>
            <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Job ID</th>
                        <th className="py-2 px-4 border">Processing Time</th>
                        <th className="py-2 px-4 border">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {jobData.map((job, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{job[0]}</td>
                            <td className="py-2 px-4 border">{job[1]}</td>
                            <td className="py-2 px-4 border">{job[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-xl font-bold mt-8">Job Schedule</h2>
            <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Job ID</th>
                        <th className="py-2 px-4 border">Processing Time</th>
                        <th className="py-2 px-4 border">Completion Time</th>
                    </tr>
                </thead>
                <tbody>
                    {jobSchedule.map((job, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{job[0]}</td>
                            <td className="py-2 px-4 border">{job[1]}</td>
                            <td className="py-2 px-4 border">{job[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="mt-10 bg-gray-800 text-white p-4 rounded">
                <div className="text-center">
                    <p className="text-lg font-bold">Team Members:</p>
                    <p>
                        Varsha (230003030), Anan (230003031), Rucha (230003032),
                        Lavanya (230003033), Koyna (230003034), Nihal (230003035)
                    </p>
                </div>
            </footer>

        </div>
    );
};

export default Home;
