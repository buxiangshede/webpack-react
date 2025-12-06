import React from 'react'
import { App } from '../../src/index'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />)
  })
})