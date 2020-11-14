import React from 'react';
import { gql, useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
    const { loading, data } = useQuery(FETCH_POST_QUERY);
    

    return (
       
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? 
                    (<h1>Loading Posts...</h1>) :
                    (data.getPosts.map(post => {
                        return (
                            <Grid.Column key={post.id} style={{marginBottom: 20}} >
                                <PostCard post={post}/>
                            </Grid.Column>
                        )
                        

                    })
                )}                
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POST_QUERY = gql`
{
        getPosts{
            id 
            body 
            createdAt
            user_name 
            likeCount
            likes{
                user_name
            }
            commentCount
            comments{
                id 
                user_name
                createdAt
                body
            }
        }
    }
`

export default Home;
