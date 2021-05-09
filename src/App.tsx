import React from 'react'
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import {
  Colors,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import {SearchNavigator} from './navigation/search-navigation'
import {Provider} from 'react-redux'
import {store} from './redux/store'

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    onSurface: Colors.greenA700,
  },
}
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <SearchNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
export default App
