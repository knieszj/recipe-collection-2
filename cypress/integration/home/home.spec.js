describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", () => {
        cy.get('.App-header').should('contain', 'My Recipes')
        cy.get('p').should('contain', 'You have not added any delicious recipes to the list yet.')
    })

    it('contains an add recipe button that when clicked opens a form', () => {
        // eslint-disable-next-line cypress/no-assigning-return-values
        const addRecipeButton = cy.get('#add-recipe');
        addRecipeButton.click();

        expect(cy.get('#recipe-form')).toExist();
    })

    it('contains a form with fields "Recipe Name" and "Recipe Instructions" after clicking the "Add Recipe" button', () => {
        // eslint-disable-next-line cypress/no-assigning-return-values
        const addRecipeButton = cy.get('#add-recipe');
        addRecipeButton.click();

        expect(cy.get('input[name="newRecipeName"]')).toExist();
        expect(cy.get('textarea[name="newRecipeInstructions"]')).toExist();

    })

    it('displays a recipe name under the "My Recipe" heading after it has been added through the "add Recipe" form', () => {
        // eslint-disable-next-line cypress/no-assigning-return-values
        const addRecipeButton = cy.get('#add-recipe');
        // eslint-disable-next-line jest/valid-expect-in-promise
        addRecipeButton.click().then(()=>{
            cy.get('input[name="newRecipeName"]').type("Peanut Butter Jelly Sammich With Pickles");
            cy.get('textarea[name="newRecipeInstructions"]').type('1. make a peanut butter and jelly sammich as normal 2. add sliced dill pickles to it 3. enjoy the delicious sammich 4. thank me later')
            cy.get('input[type="submit"]').click();
            // eslint-disable-next-line jest/valid-expect-in-promise
            cy.get('ul').then(()=>{
                cy.get("ul").contains('Peanut Butter Jelly Sammich With Pickles')
            })
        })
    })


})