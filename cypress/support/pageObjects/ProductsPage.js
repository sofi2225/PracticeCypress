class ProductsPage {
  
    getShopTab() {
        return cy.get(':nth-child(2) > .nav-link')
    }

    getCheckOutButton() {
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
    }

    getCheckOutButtonPurchase() {
        return cy.contains('Checkout')
    }

    getInputCountryDelivery() {
        return cy.get('#country')
    }

    getCountryDisplayed() {
        return cy.get('.suggestions > ul > li > a')
    }

    getCheckboxTermsAndConditions() {
        return cy.get('#checkbox2')
    }
    getPurchaseButton() {
        return cy.get('input[type="submit"]')
    }

    getSuccessMessagePurchase() {
        return cy.get('.alert')
    }

    getProductPricesList() {
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotalAmount() {
        return cy.get('h3 strong')
    }


}

export default ProductsPage;
