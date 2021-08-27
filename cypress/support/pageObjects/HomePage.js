class HomePage {
    getNameInput() {
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getNameEndOfPage() {
        return cy.get(':nth-child(4) > .ng-pristine')
    }

    getGender() {
        return cy.get('select')
    }

    getEntrepreneurRadioButton() {
        return cy.get('#inlineRadio3')
    }

}

export default HomePage;
