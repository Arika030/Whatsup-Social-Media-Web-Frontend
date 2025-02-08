import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import PostPreview from '../../shared/components/UIElements/PostPreview';
import './PostList.css';

const PostList = props => {
    

    if (props.items.length === 0){
        return(
            <div className="user-list center">
                <Card>
                    <h2>No posts found. Wait for you to create one!</h2>
                </Card>
            </div>
        );
    };

    return(
   
        <ul className='post-list'>
            {props.items.map(post => (
                <PostPreview
                    key={post.id}
                    id={post.id}
                    uid={post.uid}
                    image={post.imageUrl}
                    title={post.title}
                    avatar={post.avatar}
                    creatorName={post.creatorName}

                />
            ))}
        </ul>

        

    );
};

export default PostList;
