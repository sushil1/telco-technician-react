import React from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const HomePage = () => (
	<Grid
		stretched

		style={{
			paddingLeft: '20px',
			paddingRight: '20px',
			marginTop: '0px'
		}}>
		<Grid.Row centered style={{ height: '550px', paddingTop: '0' }}>
			<Grid.Column
				stretched
				width={16}
				textAlign="center"
				style={{
					backgroundColor:'black',
					backgroundSize: 'cover',
					boxShadow: 'inset 0px 0px 400px 110px rgba(0, 0, 0, .7)',

					color: '#fff'
				}}>
				<h5
					style={{
						fontSize:'1.8em',
						fontWeight: 'normal',
						marginTop: '3em',
						color: '#fff',
						letterSpacing: '0.2em'
					}}>
					TELCO TECHNICIAN
				</h5>
				<p
					style={{
						fontSize: '1.5em',
						fontWeight: 'normal',
						marginBottom: '0.5em',
						color: '#fff',
						margin:'auto',
						width:'80%',
						textAlign:'center'
					}}>
					Best telecom technicians in Sydney. <br/>
					We will fix your phone lines, ADSL, internet, internal wiring issues within next 24 hour.<br/>
					 Let us get you back up and running.
				</p>
				<div style={{ margin: 'auto', textAlign: 'center' }}>
					<Button


						color="teal"
						style={{
							fontSize: '1.5em',
							width: '100%',
							margin: 'auto',

							letterSpacing: '0.1em'
						}} as={Link} to='/book'>
						BOOK US NOW
					</Button>
				</div>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
			<Grid.Column width={8}>
				<Image src={'http://via.placeholder.com/250x250'} />Section 1 here
			</Grid.Column>
			<Grid.Column width={8}>
				<Image src={'http://via.placeholder.com/250x250'} />Section 2 here
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Grid.Column width={8}>
				<Image src={'http://via.placeholder.com/250x250'} />
			</Grid.Column>
			<Grid.Column width={8}>
				<Image src={'http://via.placeholder.com/250x250'} />
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Grid.Column width={8}>
				 The point of using Lorem Ipsum is that it has a
				more-or-less normal distribution of letters, as opposed to using
				'Content here, content here', making it look like readable English.
			</Grid.Column>
			<Grid.Column width={8}>
				What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
				and typesetting industry. Lorem Ipsum has been the industry standard

			</Grid.Column>
		</Grid.Row>

	</Grid>
);

export default HomePage;
