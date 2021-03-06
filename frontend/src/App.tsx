import { Switch, Route } from 'react-router-dom';
import Main from 'Main';
import ProtectedRoute from 'pages/ProtectedRoute';
import { QueryClientProvider } from 'react-query';
import { queryClient, setup } from 'Utils/util';
import Login from 'pages/Login';
import Register from 'pages/Register';

setup();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <ProtectedRoute component={Main} path="/" />
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

export default App;
