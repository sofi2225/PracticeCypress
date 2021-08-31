/// <reference types="Cypress"/>
import HomePage from '../../support/pageObjects/HomePage'
import ProductsPage from '../../support/pageObjects/ProductsPage'

//Small Test Cases on Practice Page

describe('Filling Form Test Suite', function () {
    beforeEach(function () {
        cy.fixture('example.json').then(function (data) {
            this.data = data
        }) 
    })

    it('Filling Form Test', function () {
        const homePage = new HomePage()

        cy.visit(Cypress.env('url')+"/angularpractice/")

        //Filling form with data from json file
        homePage.getNameInput().type(this.data.name)
        homePage.getGender().select(this.data.gender)

        //Assert that name eneterd is displaying in the end of page
        homePage.getNameEndOfPage().should('have.value', this.data.name)

        //Assert attribute of minlenght equals 2
        homePage.getNameInput().should('have.attr', 'minlength', 2)

        //Assert that radio button is disabled
        homePage.getEntrepreneurRadioButton().should('be.disabled')
    })

    it('Shop Page Test', function () {
        const productsPage = new ProductsPage()

        //Go to the Shop Page
        productsPage.getShopTab().click()

        //Find items and add to cart using command
        this.data.productName.forEach(function (element) {
            cy.selectProduct(element)
        })

        //Go to Checkout
        productsPage.getCheckOutButton().click()

        //Validate sum of each product equals Total
        var sum = 0
        productsPage
            .getProductPricesList()
            .each(($el, index, $list) => {
                cy.log($el)
                const amount = $el.text()
                var result = amount.split(' ')
                result = result[1].trim()
                sum = Number(sum) + Number(result)
                cy.log(result)
            })
            .then(function () {
                cy.log(sum)
            })

        productsPage.getTotalAmount().then(function (element) {
            const totalAmount = element.text()
            var total = totalAmount.split(' ')
            total = total[1].trim()

            expect(Number(total)).to.equal(sum)
        })

        //Continue to Purchease
        productsPage.getCheckOutButtonPurchase().click()

        productsPage.getInputCountryDelivery().type('india')

        //Change defalut Wait for Country option to appear and click
        Cypress.config('defaultCommandTimeout', 10000)
        productsPage.getCountryDisplayed().click()

        productsPage.getCheckboxTermsAndConditions().click({ force: true })
        productsPage.getPurchaseButton().click()

        //Assert Success Message
        productsPage.getSuccessMessagePurchase().then(function (element) {
            const actualMesssage = element.text()
            expect(actualMesssage.includes('Success')).to.be.true
        })
    })
})
