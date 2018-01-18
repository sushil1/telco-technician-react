import React from 'react';
import { Grid, Image, Button, List, Icon, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import tpg from '../images/telecom_vendors/tpg.png'
import dodo from '../images/telecom_vendors/dodo.png'
import telstra from '../images/telecom_vendors/telstra.png'
import optus from '../images/telecom_vendors/optus.png'
import iinet from '../images/telecom_vendors/iinet.png'
import internode from '../images/telecom_vendors/internode.png'
import {Carousel} from 'react-responsive-carousel'

const HomePage = () => (
	<Grid
		stretched

		style={{
			paddingLeft: '20px',
			paddingRight: '20px',
			marginTop: '0px'
		}}>
		<Grid.Row centered={true} style={{ height: '550px', paddingTop: '0', paddingBottom:'0px' }}>
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
						letterSpacing: '0.2em',

					}}>
					TELCO TECHNICIAN
				</h5>
				<p
					style={{
						fontSize: '1.5em',
						fontWeight: 'normal',
						marginTop:'0px',
						marginBottom: '0.5em',
						color: '#fff',
						margin:'auto',
						width:'80%',
						textAlign:'center'
					}}>
					Best telecom technicians in Sydney. <br/>
					We fix your phone lines, ADSL, internet, internal wiring issues within next 24 hour.<br/>
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

	<Grid.Row centered={true} divided padded='true' style={{marginBottom:'20px', marginTop:'20px'}}>


    <Grid.Column mobile={14} tablet={5} computer={5} style={{paddingTop:'15px'}}>

      <Header as='h3'>
				<Icon circular  inverted color='red' name='phone'/>
				Book Us or Call Us {' '}

			</Header>

        <p>Book online or call us to fix your internet or ADSL issues within 24 hours.</p>

    </Grid.Column>

    <Grid.Column mobile={14} tablet={5} computer={5} style={{paddingTop:'15px'}}>


        <Header as='h3'>
					<Icon circular inverted color='blue' name='settings'/>
					Our Work {' '}

				</Header>

        <p>Our Technician will come to your location and diagnose and fix your problems.</p>

    </Grid.Column>

    <Grid.Column mobile={14} tablet={5} computer={5}style={{paddingTop:'15px'}}>


        <Header as='h3'>
					<Icon circular inverted color='teal' name='check'/>
					Our Promise {' '}

				</Header>
        <p>You services will be restored. We guarantee competitive price and service to our customers.
				</p>

    </Grid.Column>

	</Grid.Row >

<Grid.Row style={{paddingBottom:'0'}}>
	<Grid.Column style={{paddingLeft:'0', paddingRight:'0', }}>
	<Carousel emulateTouch={true} infiniteLoop={true} showStatus={false} showThumbs={false}>

		 <div style={{height:'200px', backgroundColor:'teal'}}>

				 <p style={{ paddingTop:'2em', fontSize: '1.3em', textAlign:'center', width:'90%', margin:'auto'}}>We were having issues with the noisy line for months, Telco Technician fixed it in an hour.</p>
				 <br /> Peter, Dee Why
		 </div>
		 <div style={{height:'200px', backgroundColor:'teal'}}>

				 <p style={{ paddingTop:'2em', fontSize: '1.3em', textAlign:'center', width:'90%', margin:'auto'}}>I highly recommend your technicians, they are very good at their job. They know what they are doing. Honest and reliable. Thanks.</p>
				 <br /> Sarah, French Forest
		 </div>
		 <div style={{height:'200px', backgroundColor:'teal', margin:'auto'}}>

				 <p style={{ paddingTop:'2em', fontSize: '1.3em', textAlign:'center', width:'90%', margin:'auto'}}>Telco Technician are professional bunch of technicians, they deliver what they promise. Thanks guys.</p>
				 <br /> Naresh, Auburn
		 </div>
		 <div style={{height:'200px', backgroundColor:'teal'}}>

				 <p style={{ paddingTop:'2em', fontSize: '1.3em', textAlign:'center', width:'90%', margin:'auto'}}>Telco Technician fixed my MDF jumpering and internal wiring in just two hours, what seemed like a whole day job. <br/>They would not rest until they solve the problem.</p>
				 <br /> Jeff, Rockdale
		 </div>
	</Carousel>
	</Grid.Column>
</Grid.Row>


		<Grid.Row divided style={{ height: '150px', paddingTop: '0' }}>
		<Grid.Column
			stretched
			width={8}
			textAlign="center"
			style={{
				backgroundColor:'teal',
				backgroundSize: 'cover',
				boxShadow: 'inset 0px 0px 400px 110px rgba(0, 0, 0, .7)',

				color: '#fff'
			}}>
				<div style={{marginTop:'2em', fontSize:'1.2em'}}>
				 We will provide you the service within 24 hours of your booking.
				</div>
			</Grid.Column>
			<Grid.Column
				stretched
				width={8}
				textAlign="center"
				style={{
					backgroundColor:'teal',
					backgroundSize: 'cover',
					boxShadow: 'inset 0px 0px 400px 110px rgba(0, 0, 0, .7)',

					color: '#fff'
				}}>
					<div style={{marginTop:'2em', fontSize:'1.2em'}}>
					 Our Technicians are ACMA certified.
					 <br />We are fully insured.
					</div>
				</Grid.Column>
		</Grid.Row>


		<Grid.Row centered={true} >
			<Grid.Column mobile={8} tablet={14} computer={14} >

				<List horizontal relaxed='very'>

					<List.Item>
					<Image
					 src={telstra} />
					</List.Item>
					<List.Item>
					<Image
					 src={optus} />
					</List.Item>

					<List.Item>
					<Image
					 src={tpg} />
					</List.Item>
					<List.Item>
					<Image
					 src={dodo} />
					</List.Item>

					<List.Item>
					<Image
					 src={iinet} />
					</List.Item>
					<List.Item>
					<Image
					 src={internode} />
					</List.Item>
				</List>
				</Grid.Column>

				<Grid.Column mobile={16} tablet={14} computer={10} centered='true'>
				<p style={{marginTop:'1em', fontSize:'1.2em'}}>We provide service for our customer who might be using these providers.</p>

			</Grid.Column>
		</Grid.Row>


	</Grid>
);

export default HomePage;
