import React from 'react'
import {Component} from "react";
import './App.css'


class App extends Component {

    state = {
        isAddRecipeFormDisplayed: false,
        recipes: [],
        newRecipeName: ''
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value})
    }

    toggleAddRecipeForm = () => {
        this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
    }

    submitRecipe = (event) => {
        event.preventDefault();
        this.setState({
            recipes: [
                {
                    name: this.state.newRecipeName,
                    instructions: this.state.newRecipeInstructions
                }
            ]
        })
    }

    render() {
        const {submitRecipe} = this;
        const {toggleAddRecipeForm} = this;
        const {handleChange} = this;

        const addNewRecipeForm = (
            <form id={'recipe-form'} onSubmit={submitRecipe}>
                <label htmlFor="newRecipeName">Recipe name:</label>
                <input
                    type="text"
                    name={"newRecipeName"}
                    onChange={handleChange}
                />
                <label htmlFor={"newRecipeInstructions"}>Instructions:</label>
                <textarea
                    name={"newRecipeInstructions"}
                    placeholder={'write your recipe instructions here...'}
                    onChange={handleChange}
                />
                <input type={'submit'}/>
            </form>
        )
        return (

            <div className="App">
                <h1 className="App-header">My Recipes</h1>
                {this.state.isAddRecipeFormDisplayed ?
                    addNewRecipeForm
                    :
                    <button
                        id={'add-recipe'}
                        onClick={toggleAddRecipeForm}
                    >
                        Add Recipe
                    </button>
                }
                {
                    this.state.recipes.length > 0 ?
                        <ul>
                            <li>{this.state.recipes[0].name}</li>
                        </ul>
                        :
                        <p>You have not added any delicious recipes to the list yet.</p>
                }
            </div>
        )
    }
}

export default App;
