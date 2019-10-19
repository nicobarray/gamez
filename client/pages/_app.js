import React from 'react'
import App from 'next/app'
import { Baseline, Toast } from '@ambler/andive'

export default class Gamez extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Baseline>
        <Component {...pageProps} />
        <Toast />
      </Baseline>
    )
  }
}
