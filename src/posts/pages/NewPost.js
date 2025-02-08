import React from "react";
import { useForm } from '../../shared/Form-hook';
import { VALIDATOR_REQUIRE } from "../../shared/Validators";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './PostForm.css';

const NewPost = () => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const postSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <div className="main-content"> {/* Add this wrapper */}
            <form className="post-form" onSubmit={postSubmitHandler}>
                <Input
                    id='title'
                    element='input'
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title.'
                    onInput={inputHandler}
                />

                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid description.'
                    onInput={inputHandler}
                />

                <Button type='submit' disabled={!formState.isValid}>
                    POST
                </Button>
            </form>
        </div>
    );
};

export default NewPost;

