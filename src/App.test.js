import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

test('toggleAddRecipeForm() modifies isAddRecipeFormDisplayed state value to toggle visibility on a form on the page', () => {
    const wrapper = shallow(<App/>)
    wrapper.instance().toggleAddRecipeForm();

    wrapper.update();
    expect(wrapper.state().isAddRecipeFormDisplayed).toBeTruthy();
    expect(wrapper.exists('#recipe-form')).toEqual(true);

    wrapper.instance().toggleAddRecipeForm();
    expect(wrapper.exists('#recipe-form')).toEqual(false);
    expect(wrapper.state().isAddRecipeFormDisplayed).toBeFalsy();

})

test('the Add Recipe button onClick calls the toggleAddRecipeForm method', () => {
    const wrapper = shallow(<App/>)
    wrapper.instance().toggleAddRecipeForm = jest.fn();
    wrapper.instance().forceUpdate();

    const button = wrapper.find('#add-recipe');

    button.simulate('click');

    expect(wrapper.instance().toggleAddRecipeForm).toHaveBeenCalled();

})

test('submitting the form calls the submitRecipe method', () => {
    const wrapper = shallow(<App/>);
    wrapper.setState({isAddRecipeFormDisplayed: true});
    wrapper.instance().submitRecipe = jest.fn();
    wrapper.instance().forceUpdate();

    wrapper.find('#recipe-form').simulate("submit");
    expect(wrapper.instance().submitRecipe).toHaveBeenCalled();

})

test('submitRecipe() method modifies the recipe value in state', () => {
    const wrapper = shallow(<App/>);
    const recipeName = "Hot Pockets";
    const recipeInstructions = "microwave for 6000 seconds or until the hours burns down";

    wrapper.setState({
        isAddRecipeFormDisplayed: true,
        newRecipeName: recipeName,
        newRecipeInstructions: recipeInstructions
    })

    const submittedRecipe = {name: recipeName, instructions: recipeInstructions};

    const mockPreventDefault = jest.fn();

    wrapper.find('#recipe-form').simulate("submit", {preventDefault: mockPreventDefault})

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(wrapper.state().recipes).toEqual([submittedRecipe]);
})

test('typing into the recipe name input updates state', () => {
    const wrapper = shallow(<App/>);
    const recipeName = "Knuckle Sammiches";

    wrapper.setState({
        isAddRecipeFormDisplayed: true
    })

    wrapper.find('input[name="newRecipeName"]').simulate("change", {target: {name: 'newRecipeName', value: recipeName}})

    expect(wrapper.state().newRecipeName).toEqual(recipeName);
})

test('typing into the recipe instructions input updates the state', () => {
    const wrapper = shallow(<App/>);
    const recipeInstructions = "Do instructions to cook exist independently of the thing which is cooked?";

    wrapper.setState({isAddRecipeFormDisplayed: true});

    wrapper.find('textarea[name="newRecipeInstructions"]').simulate("Change", {
        target: {name: 'newRecipeInstructions', value: recipeInstructions}
    })

    expect(wrapper.state().newRecipeInstructions).toEqual(recipeInstructions);
})

test('recipe name from recipe in state appears in unordered list', () => {
    const wrapper = shallow(<App/>);
    const recipeName = "Mean Pockets";
    const recipeInstructions = "place in a toaster oven at 350 degreesd for 45 minutes while belittling the pocket and telling it how flavorless it is";
    const submittedRecipe = { name: recipeName, instructions: recipeInstructions};

    wrapper.setState({recipes: [submittedRecipe]});

    expect(wrapper.find('li')).toHaveLength(1);
    expect(wrapper.find('li').text()).toEqual("Mean Pockets")

})














