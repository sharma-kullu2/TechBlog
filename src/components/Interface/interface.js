import React from 'react';
import {Post} from './defaults';
import Blog from '../Blog/Blog';

function Interface(props){
    let mainPost = '';
    let featuredPost = [];
    let posts = [];

    //console.log("MAIN-> ",props.api.main);
    if (props.api.main) {
        mainPost = new Post(
            {
            title : props.api.main.title,
            summary : props.api.main.summary,
            date : props.api.main.date,
            image : props.api.main.imgUrl,
            author : props.api.main.author,
            data : props.api.main.data,
            }
        );
        //console.log("OBJECT MAIN POST-> ",props.api.main);
    }
    else{
        mainPost= new Post();
    }
    if(props.api.feature){
        if (Array.isArray(props.api.feature)){
            props.api.feature.forEach( (post) => {
                    console.log("Post:-> ",post);
                    featuredPost.push(new Post(
                                {
                                    title : post.title,
                                    summary : post.summary,
                                    date : post.date,
                                    image : post.imgUrl,
                                    author : post.author,
                                    data :post.data,
                                }
                        ));
                }
            );
            
            //console.log("FEATURE-> ",featuredPost);
        }
    }
    else{
        featuredPost = [
            new Post(),
        ];
    }
    if(props.api.post){
        if (Array.isArray(props.api.post)){
            props.api.post.forEach( (post) => {
                    posts.push(new Post(
                                {
                                    title : post.title,
                                    summary : post.summary,
                                    date : post.date,
                                    image : post.imgUrl,
                                    author : post.author,
                                    data :post.data,
                                }
                        ));
                }
            );
            //
        }
    }
    else{    
        
        posts = [
            new Post(),
        ];
    }
    return(
        <Blog main={mainPost} 
        feature={featuredPost} 
        posts={posts} 
        apiLoading={props.postLoading}
        />
    )

};

export default Interface;