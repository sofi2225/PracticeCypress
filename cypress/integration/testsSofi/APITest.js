/// <reference types="Cypress"/>

describe('My fisrt Test Suite', function () {
    it('My fisrt Test Case', function () {

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
            "name": "Learn Appium Automation with Java",
            "isbn": "bcdsss",
            "aisle": "22789",
            "author": "jhon foe"
        }).then(function (response) {
            expect(response.body).to.have.property('Msg', 'successfully added')

            expect(response.status).to.eq(200)
        })
    })
})
