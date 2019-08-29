import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

class ErrorPage extends React.Component {

  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    }
  }

  static getInitialProps({res, xhr}) {
    const initProps = {}
    initProps.errorCode =  res ? res.statusCode : (xhr ? xhr.status : null)
    return {initProps}
  }

  renderErrorDetails = () => {
    var response
    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 401:
          response = (
            <div>
                <h1 >You have been banned</h1>
            </div>
          )
          break
      case 404:
        response = (
          <div>
              <h1>Page Not Found</h1>
              <p>The page <strong>{ this.props.router.pathname }</strong> does not exist.</p>
              <p><Link href="/"><a>Home</a></Link></p>
          </div>
        )
        break
      case 500:
        response = (
          <div>
              <h1>Internal Server Error</h1>
              <p>An internal server error occurred.</p>
          </div>
        )
        break
      default:
        response = (
          <div>
              <h1>HTTP { this.props.errorCode } Error</h1>
              <p>
                An <strong>HTTP { this.props.errorCode }</strong> error occurred while
                trying to access <strong>{ this.props.router.pathname }</strong>
              </p>
          </div>
        )
  }
  return response
}

  render() {
        return this.renderErrorDetails()
    }
}

export default withRouter(ErrorPage)