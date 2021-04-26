import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {createAppContainer} from 'react-navigation';

const DrawerNavigatorExample = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        drawerLabel: 'Detail',
      },
    },
    About: {
      screen: About,
      navigationOptions: {
        drawerLabel: 'About',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - 150,
  },
);

export default createAppContainer(DrawerNavigatorExample);