import { And, When, Then, Given } from 'cypress-cucumber-preprocessor/steps'
import ProductsPage from '../../../support/pageObjects/ProductsPage'
import HomePage from '../../../support/pageObjects/HomePage'


const productsPage = new ProductsPage()

Given('I open Ecommerce Page', () => {
    cy.visit(Cypress.env('url') + '/angularpractice/')
})

When('I add items to Cart', function () {
    //Go to the Shop Page
    productsPage.getShopTab().click()

    //Find items and add to cart using command
    this.data.productName.forEach(function (element) {
        cy.selectProduct(element)
    })

    //Go to Checkout
    productsPage.getCheckOutButton().click()
})

And('Validate the total prices', () => {
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
})

Then('Select the country , sumbit and verify Succes! message', () => {
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

    When('I fill the form details', function (dataTable) {
        const homePage = new HomePage()

        //Filling form with data from json file
        homePage.getNameInput().type(dataTable.rawTable[1][0])
        homePage.getGender().select(dataTable.rawTable[1][1])
    })

    Then('Validate the forms behaviour', function () {
        const homePage = new HomePage()

        //Assert that name eneterd is displaying in the end of page
        homePage.getNameEndOfPage().should('have.value', dataTable.rawTable[1][0])

        //Assert attribute of minlenght equals 2
        homePage.getNameInput().should('have.attr', 'minlength', 2)

        //Assert that radio button is disabled
        homePage.getEntrepreneurRadioButton().should('be.disabled')
    })

    And('select the Shop Page', function () {
        const productsPage = new ProductsPage()

        //Go to the Shop Page
        productsPage.getShopTab().click()
    })
})
