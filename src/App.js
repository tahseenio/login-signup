import { BrowserRouter as Router } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';

const App = () => {
  // TODO: FIGURE OUT A BETTER WAY TO DO ISLOADING FOR PROTECTEDROUTE AS IT IS A BIT IFFY RIGHT NOW
  // ADD USER FRIENDLY ERROR MESSAGES FOR LOGIN PAGE
  // add loading state for pie chart data fetching and home page when data is being fetched
  // add app check protection
  // error handling for piechart set color usestates

  return (
    <div className='App'>
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
};

export default App;
