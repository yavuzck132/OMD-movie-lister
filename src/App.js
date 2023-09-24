import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListPage from './pages/listPage/ListPage';
import { Provider } from 'react-redux';
import store from './store';
import DetailsPage from './pages/detailsPage/DetailsPage';

//Create a router to switch between list and details pages
const router = createBrowserRouter([
  {path: '/', element: <ListPage />},
  {path: '/:imdbID', element: <DetailsPage />}
])

function App() {
  return (
    <Provider store={store}> {/*Redux will keep data as long as session is open */}
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
