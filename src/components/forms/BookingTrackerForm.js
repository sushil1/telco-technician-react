import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import {Link } from 'react-router-dom'

class BookingTrackerForm extends React.Component{

  state={
    data: {
      refrenceId:'',
      mobile:''
    },
    loading:false,
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
			//this.setState({ loading: true })
			this.props.submit(this.state.data)
				.catch(err =>
					this.setState({ errors: err.response.data.errors, loading: false})
				);
		}
	};

	validate = data => {
		const errors = {};
		if (!data.refrenceId) errors.refrenceId = "Can't be blank";

		if (!data.mobile) errors.mobile = "Can't be blank";
		return errors;
	};


  render(){
    const {data, errors, loading} = this.state

    return(



        <Form onSubmit={this.onSubmit} loading={loading}>
          {!!errors.global && (
            <Message negative>
              <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}. If you have just submitted your booking, you need to wait for our confirmation.</p>

              <span><Link to='/login'>Log In</Link>  or <Link to='/login'>Sign Up</Link> </span>
            </Message>
          )}
  				<Form.Group inline>

          <Form.Field error={!!errors.refrenceId}>
          <input
            name="refrenceId"
            type="text"
            placeholder={!!errors.refrenceId? errors.refrenceId : "Enter your refrence Id"}
            value={data.refrenceId}
            onChange={this.onChange}
          />
					</Form.Field>

          <Form.Field error={!!errors.mobile}>
          <input
            name="mobile"
            type="number"
            placeholder={!!errors.refrenceId? errors.refrenceId : "Enter your mobile"}
            value={data.mobile}
            onChange={this.onNumberChange}
          />

					</Form.Field>

          <Button>Submit</Button>
  				</Form.Group>
  				</Form>
    )
  }

}

export default BookingTrackerForm
