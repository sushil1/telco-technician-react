import api from '../api';
import { SERVICES_FETCHED, SERVICE_SELECTED } from '../constants';

export const servicesFetched = services => ({
	type: SERVICES_FETCHED,
	services
});
export const serviceSelected = service => ({
	type: SERVICE_SELECTED,
	service
});

export const fetchById = id => dispatch =>
	api.service.fetchById(id).then(service => dispatch(serviceSelected(service)));

export const fetchAll = () => dispatch =>
	api.service.fetchAll().then(services => dispatch(servicesFetched(services)));
