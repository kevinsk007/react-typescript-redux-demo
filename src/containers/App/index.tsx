import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import ErrorToast from '../../components/ErrorToast'
// import { actions as appActions, getError } from '../../redux/modules/app'
import Home from '../Home'
// import ProductDetail from '../ProductDetail'
import Search from '../Search'
import SearchResult from '../SearchResult'

class App extends Component<any, any> {
  render() {
    // const {
    //   error,
    //   appActions: { clearError },
    // } = this.props
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/search_result" component={SearchResult} />
            {/* <Route path="/detail/:id" component={ProductDetail} />
             */}
          </Switch>
        </Router>
        {/* {error ? <ErrorToast msg={error} clearError={clearError} /> : null} */}
      </div>
    )
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {
    // error: getError(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // appActions: bindActionCreators(appActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
