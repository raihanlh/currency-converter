import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CurrencyList from './screens/CurrencyList';
import AddCurrency from './screens/AddCurrency';

const navigationStack = createStackNavigator(
  {
    CurrencyList,
    AddCurrency
  },
  {
    initialRouteName: 'CurrencyList'
  }
);

const appContainer = createAppContainer(navigationStack);

export default appContainer;