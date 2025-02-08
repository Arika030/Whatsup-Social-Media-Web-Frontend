import React from "react";
import { Link} from 'react-router-dom';
import Card from "./Card";

import './PostPreview.css';


const PostPreview = props => { 




    return (
        
        <li className="post-prev">
        {/* Remove onClick handler from Card */}
        <Card className='post-prev__content'>
            {/* Use only Link for navigation */}
            <Link to={`/posts/${props.id}`} state={{ background: true }}>
                <div className="post-prev__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="post-prev__title">
                    <h2>{props.title}</h2>
                </div>
                <div className="post-prev__creatorinfo">
                    <img src={props.avatar} alt={props.title} />
                    <h3>{props.creatorName}</h3>
                </div>
            </Link>
        </Card>
    </li>

    );
};

export default PostPreview;
