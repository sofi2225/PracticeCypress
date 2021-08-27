/// <reference types="Cypress"/>

describe('My fisrt Test Suite', function () {
    it('My fisrt Test Case', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#alertbtn').click()

        cy.get('[value="Confirm"]').click()

        cy.on('window:alert', (str) => {
            //mocha
            expect(str).to.equal(
                'Hello , share this practice page and share your knowledge'
            )
        })

        cy.on('window:confirm', (str) => {
            //mocha
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        cy.get('#opentab').invoke('removeAttr', 'target')
        cy.get('#opentab').click()

        cy.url().should('include', 'index')

        cy.go('back')
    })
})
