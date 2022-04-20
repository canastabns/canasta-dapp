import {Route, Switch} from 'react-router-dom';

import TokenScreen from 'screens/Tokens';
import Details from 'screens/DetailDomain';
import FavouritesScreen from 'screens/Favourites';
import HomeScreen from 'screens/Home';
import MyDomainsScreen from 'screens/MyDomains';

function App() {
 
  return (
    <Switch>
      <Route exact path="/" component={HomeScreen}/>
      <Route path="/tokens" component={TokenScreen}/>
      <Route path="/search/:domain" component={Details}/>
      <Route path="/favourites" component={FavouritesScreen}/>
      <Route path="/domains/:address" component={MyDomainsScreen}/>
    </Switch>
  );
}

export default App;
