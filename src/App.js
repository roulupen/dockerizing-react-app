import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Dummy applicationsss to demonstrate Dockerizing React JS application.</h1>
      <p>Google Key: {process.env.REACT_APP_GOOGLE_KEY}</p>
    </div>
  );
}

export default App;
