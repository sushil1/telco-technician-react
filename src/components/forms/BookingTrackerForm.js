import React from 'react'
import {Grid, Form, Button, Message, Card, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {trackBooking} from '../../actions/tickets'
import {Link } from 'react-router-dom'
import moment from 'moment'

class BookingTrackerForm extends React.Component{

  state={
    data: {
      bookingId:'',
      mobile:''
    },

    loading:false,
    success: false,
    errors:{}
  }


  onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value.trim() }
		});

  onNumberChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
		});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this.props
				.trackBooking(this.state.data)
        .then((ticket) => this.setState({loading:false, success:true, trackedTicket:ticket}))
				.catch(err =>
					this.setState({ errors: err.response.data.errors, loading: false, success:false })
				);
		}
	};

	validate = data => {
		const errors = {};
		if (!data.bookingId) errors.bookingId = "Can't be blank";

		if (!data.mobile) errors.mobile = "Can't be blank";
		return errors;
	};


  render(){
    const {data, errors, loading, success, trackedTicket} = this.state
    const showTrackedTicket = trackedTicket? (
      <Card key={trackedTicket._id} color="teal" fluid>
        <Card.Content>
          <Card.Header>{trackedTicket.name}
          </Card.Header>
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

        </Card.Content>

        <Card.Content>{trackedTicket.jobStatus}
        </Card.Content>
  		</Card>
    ) : (null)

    return(
      <Grid centered>
        <Grid.Column textAlign='center'>

        {!loading && success && <Message>{showTrackedTicket}</Message>}


        <Form onSubmit={this.onSubmit} loading={loading}>
          {!!errors.global && (
            <Message negative>
              <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}</p>
              <span><Link to='/login'>Log In</Link>  or <Link to='/login'>Sign Up</Link> </span>
            </Message>
          )}
  				<Form.Group inline>

          <Form.Field error={!!errors.bookingId}>
          <input
            name="bookingId"
            type="text"
            placeholder={!!errors.bookingId? errors.bookingId : "Enter your booking Id"}
            value={data.bookingId}
            onChange={this.onChange}
          />
					</Form.Field>

          <Form.Field error={!!errors.mobile}>
          <input
            name="mobile"
            type="number"
            placeholder={!!errors.bookingId? errors.bookingId : "Enter your mobile"}
            value={data.mobile}
            onChange={this.onNumberChange}
          />

					</Form.Field>

          <Button>Submit</Button>
  				</Form.Group>
  				</Form>
        </Grid.Column>

      </Grid>
    )
  }

}

export default connect(null, {trackBooking})(BookingTrackerForm)
