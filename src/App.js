
import './App.css';
import TrackerFooter from './components/TrackerFooter';
import TrackerHeader from './components/TrackerHeader';
import Modal from './components/Modal';
function App() {
  return (
    <div className="App">
          <TrackerHeader/>
          <TrackerFooter/>
          <Modal/>
    </div>
  );
}

export default App;
