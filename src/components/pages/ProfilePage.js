import React from 'react';
import {connect} from 'react-redux'
import {Card, Button, Image} from 'semantic-ui-react'
import Gravatar from 'react-gravatar'

const showGravatar = currentUser => {
	if (currentUser.confirmed) {
		return currentUser.email;
	}
	return 'jpt@gmail.com';
};


class ProfilePage extends React.Component{

	render(){
		const user = this.props.user
		return(
		<Card  style={{marginTop:'10px',}}>
			<Card.Content>
				<Image floated='right'
					avatar
				>{<Gravatar email={showGravatar(user)} default="mm"/> }</Image>
				<Card.Header>
	        {user.name}
	      </Card.Header>
			</Card.Content>
			<Card.Content>
				Email: {user.email}
				<Card.Meta>
						{user.role}
				</Card.Meta>
			</Card.Content>
	    <Card.Content extra>
	      <div>
					<Button fluid color='teal'>Edit Profile Info</Button>
				</div>
	    </Card.Content>
  </Card>
		)
	}
}


function stateToProps(state){
	return{
		user: state.user.currentUser
	}
}

export default connect(stateToProps, null)(ProfilePage);
