import React from 'react'


type Props = {
  children: React.ReactNode
}
type State = {
  hasError: boolean
}
export class RootErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false
  }

  componentDidCatch( error: any, info: any ) {
    this.setState( { hasError: true } )
    // eslint-disable-next-line no-console
    console.error( error, info )
  }

  render() {
    if ( this.state.hasError ) {
      return (
        <div className="error-page">
          <h1>Error</h1>
        </div>
      )
    }
    return this.props.children
  }
}

export default RootErrorBoundary
