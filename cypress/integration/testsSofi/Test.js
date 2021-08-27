/// <reference types="Cypress"/>

describe('My fisrt Test Suite', function () {
    it('My fisrt Test Case', function () {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

        cy.get('.search-keyword').type('ca')

        cy.wait(2000)

        cy.get('.product:visible').should('have.length', 4)
    })

    it('My second Test Case', function () {
        cy.get('.products').as('productLocator')
        cy.get('.search-keyword').clear()
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get('@productLocator')
            .find('.product')
            .eq(2)
            .contains('ADD TO CART')
            .click()
    })

    it('My third Test Case', function () {
        cy.get('.search-keyword').clear()
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('.products')
            .find('.product')
            .each(($el, index, $list) => {
                const textVeg = $el.find('h4.product-name').text()
                if (textVeg.includes('Cashews')) {
                    $el.find('button').click()
                }
            })

        cy.get('.brand').should('have.text', 'GREENKART')

        cy.get('.brand').then(function (logoelement) {
            cy.log(logoelement.text())
        })

        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.wait(2000)
        cy.contains('Place Order').click()
    })
})
