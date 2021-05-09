import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {SearchScreen} from '../screens/search-screen/SearchScreen'
import ResultsScreen from '../screens/results-screen/ResultsScreen'
import {Screens} from './screens'
import {RootRouteStack} from './root-route-stack'

const SearchStack = createStackNavigator<RootRouteStack>()

export const SearchNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name={Screens.SearchScreen}
      component={SearchScreen}
      options={{title: 'Movie searcher'}}
    />
    <SearchStack.Screen
      name={Screens.ResultsScreen}
      component={ResultsScreen}
      options={{title: 'Results'}}
    />
  </SearchStack.Navigator>
)
