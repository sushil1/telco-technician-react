import api from '../api';
import {
	BOOKING_CREATED,
	BOOKINGS_FETCHED,
	BOOKING_UPDATED,
	BOOKING_DELETED
} from '../constants';

export const bookingCreated = booking => ({
	type: BOOKING_CREATED,
	booking
});

export const bookService = data => dispatch =>
	api.booking.create(data).then(booking => dispatch(bookingCreated(booking)));

export const fetchAllBookings = () => dispatch =>
	api.booking.fetchAll().then(bookings => dispatch(bookingsFetched(bookings)));

export const updateBooking = (id, args) => dispatch =>
	api.booking
		.update(id, args)
		.then(booking => dispatch(bookingUpdated(booking)));

export const bookingsFetched = bookings => ({
	type: BOOKINGS_FETCHED,
	bookings
});

export const bookingUpdated = booking => ({
	type: BOOKING_UPDATED,
	booking
});

export const bookingDeleted = id => ({
	type: BOOKING_DELETED,
	id
});

export const deleteBooking = id => dispatch =>
	api.booking.delete(id).then(id => dispatch(bookingDeleted(id)));
