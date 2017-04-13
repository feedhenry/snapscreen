import { StackNavigator } from 'react-navigation';
import InviteListScreen from './screens/InviteList';
import InviteDetailScreen from './screens/InviteDetail';

export default StackNavigator({
  // First item in this object is the first screen displayed
  InvitesList: { screen: InviteListScreen },
  InviteDetail: { screen: InviteDetailScreen },
});
