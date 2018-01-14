import axios from 'axios';

export default {
	user: {
		login: credentials =>
			axios.post('/api/auth', { credentials }).then(res => res.data.user),

		signup: user =>
			axios.post('/api/users', { user }).then(res => res.data.user),

		confirm: token =>
			axios
				.post('/api/auth/confirmation', { token })
				.then(res => res.data.user),

		resetPasswordRequest: email =>
			axios.post('/api/auth/reset_password_request', { email }),

		validateToken: token => axios.post('/api/auth/validate_token', { token }),

		resetPassword: data => axios.post('/api/auth/reset_password', { data }),

		fetchAll: () =>
			axios.get('/api/users').then(res => {
				let list = {};
				res.data.users.forEach(user => (list[user._id] = user));
				return list;
			}),
		fetchById: id => axios.get(`/api/users/${id}`).then(res => res.data.user),

		fetchCurrentUser: () => axios.get('/api/users/current_user').then(res => res.data.user),

		update: (id, data) =>
			axios.patch(`/api/users/${id}`, { data }).then(res => res.data.user),
		delete: id => axios.delete(`/api/users/${id}`).then(res => res.data.id),
		fetchStaffOptions: () => axios.get('/api/users/staff').then(res => res.data.options),
	},

	service: {
		fetchAll: () => axios.get('/api/services').then(res => res.data.services),

		fetchById: id =>
			axios.get(`/api/services/${id}`).then(res => res.data.service)
	},

	booking: {
		create: data =>
			axios.post('/api/bookings', { data }).then(res => res.data.booking),
		fetchAll: () =>
			axios.get('/api/bookings').then(res => {
				let list = {};
				res.data.bookings.forEach(booking => (list[booking._id] = booking));
				return list;
			}),
		fetchById: id =>
			axios.get(`/api/bookings/${id}`).then(res => res.data.booking),

		update: (id, data) =>
			axios
				.patch(`/api/bookings/${id}`, { data })
				.then(res => res.data.booking),
		delete: id => axios.delete(`/api/bookings/${id}`).then(res => res.data.id)
	},
	ticket: {
		create: data =>
			axios.post('/api/tickets', { data }).then(res => res.data.ticket),
		fetchAll: params =>
			axios.get('/api/tickets', { params }).then(res => {
				let list = {};
				res.data.tickets.forEach(ticket => (list[ticket._id] = ticket));
				return list;
			}),
		fetchById: id =>
			axios.get(`/api/tickets/${id}`).then(res => res.data.ticket),

		update: (id, data) =>
			axios.patch(`/api/tickets/${id}`, { data }).then(res => res.data.ticket),

			acceptTicket: (ticketId) => axios.patch(`/api/tickets/accept/${ticketId}`)
			.then(res => res.data.ticket),
			declineTicket: (ticketId) => axios.patch(`/api/tickets/decline/${ticketId}`)
			.then(res => res.data.ticket),
			trackBooking: params =>
			axios.get(`/api/tickets/tracker`, {params}).then(res => res.data.ticket),

		delete: id => axios.delete(`/api/tickets/${id}`).then(res => res.data.id)
	},

	quote: {
		create: data =>
			axios.post('/api/quotes', { data }).then(res => res.data.quote),
		fetchAll: () =>
			axios.get('/api/quotes').then(res => {
				let list = {};
				res.data.quotes.forEach(quote => (list[quote._id] = quote));
				return list;
			}),
		fetchById: id => axios.get(`/api/quotes/${id}`).then(res => res.data.quote),

		update: (id, data) =>
			axios.patch(`/api/quotes/${id}`, { data }).then(res => res.data.quote),

		delete: id => axios.delete(`/api/quotes/${id}`).then(res => res.data.id)
	},

	payment: {
		fetchPaymentOptions: () => axios.get('/api/payments/payment-options').then(res => res.data.options),
	},
	jobStatus: {
		fetchJobStausOptions: () => axios.get('/api/jobstatus/jobstatus-options').then(res => res.data.options),
	},
};
