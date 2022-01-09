import './App.css';
import Header from './components/Header/Header';
import Info from './components/Info/Info';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App">
      <div className='main-wrapper'>
        <Header />
        <Main />
        <Info />
      </div>
    </div>
  );
}

export default App;
