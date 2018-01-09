import React from 'react';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import {myImage} from '../../images/telecom.png'
const HomePage = () => (
	<Grid
		stretched
		divided="vertically"
		style={{
			paddingLeft: '20px',
			paddingRight: '20px',
			marginTop: '0px'
		}}>
		<Grid.Row centered style={{ height: '500px', paddingTop: '0' }}>
			<Grid.Column
				stretched
				width={16}
				textAlign="center"
				style={{
					backgroundImage: `url(http://himalayangatewaytrek.com/wp-content/uploads/2017/06/opo9m1jvu7g4egKmhJq-o.jpg)`,
					backgroundSize: 'cover',
					boxShadow: 'inset 0px 0px 400px 110px rgba(0, 0, 0, .7)',

					color: '#fff'
				}}>
				<h5
					style={{
						fontWeight: 'normal',
						marginBottom: '1em',
						marginTop: '7em',
						color: '#fff',
						letterSpacing: '0.1em'
					}}>
					TELCO TECHNICIAN
				</h5>
				<Header
					as="h2"
					style={{
						fontSize: '1.8em',
						fontWeight: 'normal',
						marginBottom: '0.5em',
						color: '#fff'
					}}>
					Best telecom technicians.
				</Header>
				<div style={{ width: '40%', margin: 'auto', textAlign: 'center' }}>
					<Button
						basic
						color="green"
						style={{
							fontSize: '0.8em',
							width: '100%',
							margin: 'auto',

							letterSpacing: '0.1em'
						}}>
						BOOK US NOW
					</Button>
				</div>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
			<Grid.Column width={8}>
				<Image src={''} />Section 1 here
			</Grid.Column>
			<Grid.Column width={8}>
				<Image src={''} />Section 2 here
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Grid.Column width={8}>
				<Image src={''} />Who are we
			</Grid.Column>
			<Grid.Column width={8}>
				<Image src={''} />
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Grid.Column width={8}>
				Customer Review Why do we use it? It is a long established fact that a
				reader will be distracted by the readable content of a page when looking
				at its layout. The point of using Lorem Ipsum is that it has a
				more-or-less normal distribution of letters, as opposed to using
				'Content here, content here', making it look like readable English. Many
				desktop publishing packages and web page editors now use Lorem Ipsum as
				their default model text, and a search for 'lorem ipsum' will uncover
				many web sites still in their infancy. Various versions have evolved
				over the years, sometimes by accident, sometimes on purpose (injected
				humour and the like).
			</Grid.Column>
			<Grid.Column width={8}>
				What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
				and typesetting industry. Lorem Ipsum has been the industry standard
				dummy text ever since the 1500s, when an unknown printer took a galley
				of type and scrambled it to make a type specimen book. It has survived
				not only five centuries, but also the leap into electronic typesetting,
				remaining essentially unchanged. It was popularised in the 1960s with
				the release of Letraset sheets containing Lorem Ipsum passages, and more
				recently with desktop publishing software like Aldus PageMaker including
				versions of Lorem Ipsum.
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Image style={{minHeight:'200px', minWidth:'200px'}} src={myImage} />
		</Grid.Row>
	</Grid>
);

export default HomePage;
