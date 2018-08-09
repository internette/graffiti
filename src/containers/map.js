import { connect } from 'react-redux'
import MapPresenter from '../componets/map'
import {} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

}

const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPresenter)

export default Map