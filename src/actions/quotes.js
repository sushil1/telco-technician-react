import api from '../api';
import { QUOTE_CREATED } from '../constants';

export const quoteCreated = quote => ({
	type: QUOTE_CREATED,
	quote
});

export const createQuote = data => dispatch =>
	api.quote.create(data).then(quote => dispatch(quoteCreated(quote)));
