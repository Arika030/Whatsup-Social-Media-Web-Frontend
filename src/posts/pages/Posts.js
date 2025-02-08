import React from "react";
import PostList from '../components/PostList';

const DUMMY_POSTS =[
    {
        id:'p1',
        uid:'u1',
        imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        creatorName:'user1',
        title:'This skirt is so BEAUTIFUL!',
        content:'Guys! You should try this! It can make your legs look long.',
        likes:2,
        comments: [
            { id: 'c1', text: 'Nice post!', userId: 'user2' },
            { id: 'c2', text: 'Hope you like!', userId: 'user1' }
        ]
    },
    {
        id:'p2',
        uid:'u2',
        imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        creatorName:'user2',
        title:'How you guys doing?',
        content:'Hi.',
        likes:1,
        comments: [
            { id: 'c3', text: 'Good!', userId: 'user1' }
        ]
    }
];

const Posts =() =>{

    return <PostList items={DUMMY_POSTS}/>
}

export default Posts;