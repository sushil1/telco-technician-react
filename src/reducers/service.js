import { SERVICES_FETCHED, SERVICE_SELECTED } from '../constants';
import _ from 'lodash';

const initialState = {
	list: {},
	selected: {},
	loaded:false
};

const sortServices = services => _.sortBy(services, 'name', ['aesc']);

export default (state = initialState, action = {}) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case SERVICES_FETCHED:
			const sortedServices = sortServices(action.services);
			const list = {};
			sortedServices.map(service => (list[service._id] = service));
			updated['list'] = list;
			updated['loaded'] = true

			return updated;
		case SERVICE_SELECTED:
			if(updated['selected']['_id'] !== action.service._id){
				updated['selected'] = action.service;
				updated['loaded'] = true
				return updated;
			}else{
				return updated
			}



		default:
			return state;
	}
};
