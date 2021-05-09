import React, {Component} from 'react'
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native'
import {Button, Searchbar} from 'react-native-paper'
import {StackNavigationProp} from '@react-navigation/stack'
import {Screens} from '../../navigation/screens'
import {RootRouteStack} from '../../navigation/root-route-stack'
import {RouteProp} from '@react-navigation/native'
import {SnackBarProject} from '../../components/snackbar-project/SnackBarProject'
import {MovieFilters} from '../../components/movie-filters/MovieFilters'
import {FilterItems} from '../../entities/filter-items'
import {searchScreenStyles} from './search-screen-styles'

type NavigationProps = StackNavigationProp<RootRouteStack, Screens.SearchScreen>
type NavigationRouteProps = RouteProp<RootRouteStack, Screens.SearchScreen>

interface IProps {
  navigation: NavigationProps
  route: NavigationRouteProps
}

interface IState {
  searchBarValue: string
  snackbarVisible: boolean
  filterItemsResult: FilterItems | undefined
}

export class SearchScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      searchBarValue: '',
      snackbarVisible: false,
      filterItemsResult: undefined,
    }
  }

  private navigateToResultsScreens = (searchQuery: string) => {
    if (searchQuery.trim()) {
      this.props.navigation.navigate(Screens.ResultsScreen, {
        ...this.state.filterItemsResult,
        text: searchQuery,
      })
      this.setState({
        searchBarValue: '',
        snackbarVisible: false,
      })
    } else {
      this.setState({snackbarVisible: true})
    }
  }

  render() {
    const {searchBarValue, snackbarVisible} = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={searchScreenStyles.content}>
          <Searchbar
            placeholder={'Search'}
            value={searchBarValue}
            blurOnSubmit={false}
            onIconPress={() => this.navigateToResultsScreens(searchBarValue)}
            onChangeText={text => this.setState({searchBarValue: text})}
            onSubmitEditing={() => {
              this.navigateToResultsScreens(searchBarValue)
            }}
          />
          <MovieFilters
            callback={(value: FilterItems) => {
              this.setState({filterItemsResult: value})
            }}
          />
          <Button
            mode={'outlined'}
            onPress={() => {
              this.navigateToResultsScreens(searchBarValue)
            }}>
            <Text>Search</Text>
          </Button>
          <SnackBarProject
            onDismiss={() => {
              this.setState({snackbarVisible: false})
            }}
            visible={snackbarVisible}>
            <Text>Enter text</Text>
          </SnackBarProject>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
