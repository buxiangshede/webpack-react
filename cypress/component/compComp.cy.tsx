
/// <reference types="cypress" />
import React from 'react';
import { Comp } from '../../src/comp';

describe('<Comp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Comp />);
  });
});
