import React from 'react'
import NavBar from './NavBar'

// TODO: Testear que se oculte o se muestre correctamente en mobile al hacer click en icono hamburguesa

describe('<NavBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavBar />)
  })
})