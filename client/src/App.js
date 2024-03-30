import './App.css';
import TextInputComponent from './components/InputComponent';
import ErrorBoundary from './components/ErrorBoundary';
import AuthenticationModalManager from './components/AuthModalManager';
import Header from './components/Header';


function App() {

  return (
    <ErrorBoundary>
        <div className="App">

          <AuthenticationModalManager />
          <Header />
          <TextInputComponent />
          
        </div>
    </ErrorBoundary>
  );
}

export default App;
