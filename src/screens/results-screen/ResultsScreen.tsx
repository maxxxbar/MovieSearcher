import React, {Component} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {RootRouteStack} from '../../navigation/root-route-stack'
import {Screens} from '../../navigation/screens'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {Api} from '../../network/api'
import {
  AppThunkDispatch,
  loadResult,
  resetStore,
} from '../../redux/actions/actions'
import {SearchQuery} from '../../entities/search-query'
import {ResultsState} from '../../redux/reducers/reducer'
import {ActivityIndicator} from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import {MovieItem} from '../../entities/search-results'
import {RootState} from '../../redux/store'
import {connect} from 'react-redux'
import {SnackBarProject} from '../../components/snackbar-project/SnackBarProject'
import {resultScreenStyles} from './result-screen-styles'

type NavigationProps = StackNavigationProp<
  RootRouteStack,
  Screens.ResultsScreen
>
type NavigationRouteProps = RouteProp<RootRouteStack, Screens.ResultsScreen>

interface IProps {
  navigation: NavigationProps
  route: NavigationRouteProps
  loadMore: (query: SearchQuery) => void
  allResults: ResultsState
  resetStore: () => void
}

interface IState {
  page: number
  snackbarVisible: boolean
}

class ResultsScreen extends Component<IProps, IState> {
  private api: Api

  constructor(props: IProps) {
    super(props)
    this.api = new Api()
    this.state = {page: 1, snackbarVisible: true}
  }

  componentDidMount() {
    if (this.props.route.params) {
      const {text, year, type} = this.props.route.params
      this.props.loadMore({
        text: text,
        page: this.state.page,
        year: year,
        type: type,
      })
    }
  }

  componentWillUnmount() {
    this.props.resetStore()
  }

  private renderItem = ({item}: {item: MovieItem}) => (
    <TouchableOpacity onPress={() => {}}>
      <FastImage
        style={resultScreenStyles.renderItem}
        source={{
          uri: item.Poster.match(
            '([--:\\w?@%&+~#=]*\\.[a-z]{2,4}\\/{0,2})((?:[?&](?:\\w+)=(?:\\w+))+|[--:\\w?@%&+~#=]+)?',
          )
            ? item.Poster
            : 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png',
        }}
      />
    </TouchableOpacity>
  )

  render() {
    const {loading, error} = this.props.allResults
    const {snackbarVisible} = this.state
    return (
      <View style={resultScreenStyles.content}>
        <FlatList
          numColumns={2}
          ListFooterComponent={
            !error && <ActivityIndicator animating={loading} />
          }
          keyExtractor={item => item.imdbID}
          data={this.props.allResults.results?.Search}
          renderItem={this.renderItem}
          onEndReached={() => {
            this.setState((prevState, props) => {
              const page = prevState.page + 1
              props.loadMore({...props.route.params, page: page})
              return {page: page}
            })
          }}
        />
        {!loading && error && !this.props.allResults.results?.Search && (
          <SnackBarProject
            onDismiss={() => {
              this.setState({snackbarVisible: false})
            }}
            visible={snackbarVisible}>
            <Text>{error}</Text>
          </SnackBarProject>
        )}
      </View>
    )
  }
}

const mapToStateProps = (state: RootState) => ({
  allResults: state.results,
})
const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
  return {
    loadMore: (query: SearchQuery) => {
      dispatch(loadResult(query))
    },
    resetStore: () => dispatch(resetStore()),
  }
}
export default connect(mapToStateProps, mapDispatchToProps)(ResultsScreen)
