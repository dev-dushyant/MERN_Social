import React from 'react';
import {Card, Icon, Label,Image} from 'semantic-ui-react';
import moment from 'moment';

const PostCard = ({post: {body, createdAt, id, user_name, likeCount, commentCount, likes}}) => {
      
    return (
        <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{user_name}</Card.Header>
          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            buttons here
          </p>
        </Card.Content>
      </Card>
    )
}

export default PostCard;