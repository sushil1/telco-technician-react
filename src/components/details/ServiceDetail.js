import React from 'react';
import { Header, Divider, Icon, Grid, List, Button, Segment, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback'

const ServiceDetail = ({ service }) => (
	<Grid.Row style={{marginTop:'30px'}}>
	<Grid.Column mobile={16} tablet={8} computer={8}>
		<Header as="h2">
			<Header.Content>{service.name}</Header.Content>
		</Header>

		<Header sub>Description</Header>
		<Divider />
		<p>{service.description}</p>
		<Header sub>Whats included</Header>
		<Divider />
		<List>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 2
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 3
			</List.Item>
		</List>

		<Header sub>Usual Issues</Header>
		<Divider />
		<List>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 2
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 3
			</List.Item>
		</List>

		<Header sub>What we need</Header>
		<Divider />
		<List>
			<List.Item>
				<Icon name="right triangle" />
				Might need to access your home
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Might need to access your roof
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 3
			</List.Item>
		</List>
		<Header sub>Our stats</Header>
		<Divider />
	</Grid.Column>
	<Grid.Column mobile={0} tablet={2} computer={2}>
	</Grid.Column>
	<Grid.Column mobile={16} tablet={6} computer={6} style={{marginTop:'30px'}}>


		<Segment  fluid>
		<ReactImageFallback
					src={service.thumbnail}
					fallbackImage='http://via.placeholder.com/450x350'
					alt='Thumbnail'
					className='ui image'
				/>
		<br />
			<Button color='teal' fluid as={Link} to={`/book/${service._id}`}>
				Book {service.name}
			</Button>

		</Segment>


		<Segment  fluid>


		<Header as='h5'>
				Service Areas
			</Header>
		<ReactImageFallback
					src={service.thumbnail}
					fallbackImage='https://upload.wikimedia.org/wikipedia/commons/2/2f/Australia_location_map.svg'
					alt='Thumbnail'
					className='ui image'
				/>

			<Segment inverted >
			<Header as='h5'>Currently Available in Sydney Suburbs</Header>
			<Label.Group>
		    <Label as='a'>Northern Beaches</Label>
		    <Label as='a'>Inner West </Label>
		    <Label as='a'>Western </Label>
		    <Label as='a'>Eastern </Label>
		    <Label as='a'>Northern</Label>
		  </Label.Group>
			</Segment>
		</Segment>

</Grid.Column>




	</Grid.Row>
);

export default ServiceDetail;
