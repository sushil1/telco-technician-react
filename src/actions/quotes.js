import api from '../api';
import {
	QUOTE_CREATED,
	QUOTES_FETCHED,
	QUOTE_UPDATED,
	QUOTE_DELETED
} from '../constants';

export const quoteCreated = quote => ({
	type: QUOTE_CREATED,
	quote
});

export const createQuote = data => dispatch =>
	api.quote.create(data).then(quote => dispatch(quoteCreated(quote)));

export const fetchAllQuotes = () => dispatch =>
	api.quote.fetchAll().then(quotes => dispatch(quotesFetched(quotes)));

export const updateQuote = (id, args) => dispatch =>
	api.quote.update(id, args).then(quote => dispatch(quoteUpdated(quote)));

export const quotesFetched = quotes => ({
	type: QUOTES_FETCHED,
	quotes
});

export const quoteUpdated = quote => ({
	type: QUOTE_UPDATED,
	quote
});

export const quoteDeleted = id => ({
	type: QUOTE_DELETED,
	id
});

export const deleteQuote = id => dispatch =>
	api.quote.delete(id).then(id => dispatch(quoteDeleted(id)));
