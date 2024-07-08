
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Welcome to the Online Judge</h1>
      <div className="mt-8">
      <div className="container mx-auto p-4 flex flex-col justify-center items-center">
          <p className="text-center">Welcome to our site. Here you can solve problems, compete with others, and improve your skills.</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            <Link to="/problem-set">Problem Set</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
