import React from 'react'
import {Grid, Card, Icon, Label, Segment} from 'semantic-ui-react'
import moment from 'moment'
import {connect} from 'react-redux'
import {trackBooking} from '../../actions/tickets'
import {BookingTrackerForm} from '../forms'
import {TicketStatusLabel} from '../labels'

class BookingTrackerPage extends React.Component{

  state={
    showTrackedTicket:false,
  }



  trackBooking = (data) => this.props.trackBooking(data)
      .then((ticket)=>{
        this.setState({
          showTrackedTicket:true,
          trackedTicket:ticket
        })
  })


  render(){
    const {trackedTicket} = this.state
    return(
      <Grid.Row centered>
        <Grid.Column mobile={14} tablet={10} computer={8}>
        <Segment color='teal'>
        <BookingTrackerForm submit={this.trackBooking}/>
        </Segment>
      </Grid.Column>
        {this.state.trackedTicket && (
          <Grid.Column mobile={14} tablet={10} computer={6}>
          <Card key={trackedTicket._id} color="teal" fluid>
          <Card.Content>
            <Card.Header>{trackedTicket.name}
            </Card.Header>
            <TicketStatusLabel type={trackedTicket.jobStatus.name}/>
            <Card.Content>{trackedTicket.service.name}</Card.Content>
            <Card.Meta>
              <Icon name="mobile" />
              {trackedTicket.mobile}
            </Card.Meta>
            <Card.Meta>
              <Icon name="marker" />
              {trackedTicket.address}
            </Card.Meta>
            <Card.Meta>
              <Icon name="calendar" />
              {moment(trackedTicket.date).format('MMMM Do YYYY, h:mm:ss a')}
            </Card.Meta>
            <Card.Meta>
              <Icon name="clock" />
              {moment(trackedTicket.date).startOf('day').fromNow()}
            </Card.Meta>
            <Label as='a' ribbon color='orange'>Your technician: {trackedTicket.assignedStaff.name}</Label>
          </Card.Content>

          <Card.Content><strong>Status: </strong>{trackedTicket.jobStatus.name}
          </Card.Content>
    		</Card>
        </Grid.Column>
      )}

      </Grid.Row>

    )
  }

}

function stateToProps(state){
  return{
    currentUser: state.user.currentUser
  }
}

export default  connect(stateToProps, {trackBooking}) (BookingTrackerPage)
