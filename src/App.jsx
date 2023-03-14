import Layout from './components/Layout/Layout';
import './index.css';

function App() {
  return <Layout />;
}

function WrappedApp() {
  return <App />;
}

export default WrappedApp;
