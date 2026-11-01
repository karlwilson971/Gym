import { Component } from 'react'
import { CircleAlert } from 'lucide-react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('PulseFit hit an error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div className="glass max-w-md p-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-danger/15 text-danger">
            <CircleAlert size={30} />
          </div>
          <h1 className="mt-5 text-2xl font-bold">We dropped the bar.</h1>
          <p className="mt-2 text-muted">
            Something went wrong on our side. Your progress is safe, so give it another rep.
          </p>
          <button className="btn btn-primary mt-6" onClick={() => window.location.reload()}>
            Reload PulseFit
          </button>
        </div>
      </div>
    )
  }
}
