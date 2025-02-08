import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../shared/Form-hook';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/Validators';
import './PostForm.css';

const DUMMY_POSTS = [
    // Your dummy posts
];

const UpdatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const postId = useParams().postId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const identifiedPost = DUMMY_POSTS.find(p => p.id === postId);

    useEffect(() => {
        if (identifiedPost) {
            setFormData(
                {
                    title: {
                        value: identifiedPost.title,
                        isValid: true
                    },
                    description: {
                        value: identifiedPost.description,
                        isValid: true
                    }
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedPost]);

    if (!identifiedPost) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find post!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        );
    }

    const postUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className='place-form' onSubmit={postUpdateSubmitHandler}>
            <Input
                id='title'
                element='input'
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid description."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />

            <Button type='submit' disabled={!formState.isValid}>
                UPDATE
            </Button>
        </form>
    );
};

export default UpdatePost;
