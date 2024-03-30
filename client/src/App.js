import './App.css';
import TextInputComponent from './components/InputComponent';
import ErrorBoundary from './components/ErrorBoundary';
import AuthenticationModalManager from './components/AuthModalManager';
import SideBar from './components/SideBar';


function App() {

  return (
    <ErrorBoundary>
        <div className="App">
          <div id="body">
            <div id="sidebar-div">
              <AuthenticationModalManager />
              <SideBar />
            </div>
            <div id="input-div">
              <TextInputComponent />
            </div>

          </div>
          
          
          
        </div>
    </ErrorBoundary>
  );
}

export default App;
