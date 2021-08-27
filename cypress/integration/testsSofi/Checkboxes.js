/// <reference types="Cypress"/>

describe('Checkboxes', function () {
    it('My fisrt Test Case', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Check and uncheck checkbox
        cy.get('#checkBoxOption1')
            .check()
            .should('be.checked')
            .and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

        //Check and uncheck multiple checkbox
        cy.get('#checkBoxOption1')
            .check()
            .should('be.checked')
            .and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').check[2]

        //Unncheck only one option
        cy.get('input[type="checkbox"]').uncheck(['option2', 'option3'])

        //Static Dorpdowns
        cy.get('select').select('option2')

        //Static Dorpdowns
        cy.get('select').select('Option2').should('have.value', 'option2')
    })

    it('Dropdown test', function () {
        //Dynamic Droopdown
        cy.get('#autocomplete').type('ind')
        cy.wait(1000)

        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === 'India') {
                $el.click()
            }
        })

        //Assert Edit box visible
        cy.get('#displayed-text').should('be.visible')

        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')

        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //Radio Button
        cy.get('[value="radio2"]').check().should('be.checked')
    })
})
