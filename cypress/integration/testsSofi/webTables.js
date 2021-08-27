/// <reference types="Cypress"/>

describe('TestWebTables', function () {
    it('WebTables Test Case', function () {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //WebTables
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const text = $el.text()

            if (text.includes('Python')) {
                //  cy.get('tr td:nth-child(2)').eq(index).next().should('have.text', '25')
                cy.get('tr td:nth-child(2)')
                    .eq(index)
                    .next()
                    .then(function (price) {
                        const priceText = price.text()
                        expect(priceText).to.equal('25')
                    })
            }
        })
    })

    it('Mouse Hover Test', function () {
        //Click on Hidden Button
        cy.contains('Top').click({ force: true })

        //Handle Mouse Over
        cy.get('div.mouse-hover-content').invoke('show')
        cy.wait(1000)
        cy.contains('Top').click()
        cy.url().should('include', 'top')
    })

    it('Open Tab Test', function () {
        //Open url
        cy.get('#opentab').then(function (el) {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        })
    })
})
