
import './App.css';
import Home from './components/home';
import Create from './components/create';
import Edit from './components/edit';
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element ={<Home></Home>} />
          <Route path="/add" element ={<Create></Create>} />
          <Route path="/edit" element ={<Edit></Edit>} />
        </Routes>

      </Router>
     
    </div>
  );
}

export default App;
