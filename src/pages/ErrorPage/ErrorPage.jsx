import React from 'react'
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className="not-found-container">
            <h1>404</h1>
            <p>Page Not Found</p>
            <p>
                <a href="/">Go back to Home</a>
            </p>
    </div>
  )
}

export default ErrorPage