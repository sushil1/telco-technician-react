import React from 'react';
import {connect} from 'react-redux'
import {Card, Button, Label} from 'semantic-ui-react'



class ProfilePage extends React.Component{


	render(){
		const user = this.props.user
		return(
			<Card  style={{ marginLeft:'10%', marginTop:'50px',}}>


      <Card.Header>
        {user.email}
      </Card.Header>
      <Card.Meta>

          {user.role}
      </Card.Meta>


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
