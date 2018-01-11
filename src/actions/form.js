import api from '../api'
import {STAFF_OPTIONS_FETCHED, PAYMENT_OPTIONS_FETCHED, JOB_STATUS_OPTIONS_FETCHED} from '../constants'


export const fetchStaffOptions = () => (dispatch) => api.user.fetchStaffOptions().then(options => dispatch(staffOptionsFetched(options)))

export const staffOptionsFetched = (options) => ({
  type:STAFF_OPTIONS_FETCHED,
  options
})
export const fetchPaymentOptions = () => (dispatch) => api.payment.fetchPaymentOptions().then(options => dispatch(paymentOptionsFetched(options)))

export const paymentOptionsFetched = (options) => ({
  type:PAYMENT_OPTIONS_FETCHED,
  options
})
export const fetchJobStausOptions = () => (dispatch) => api.jobStatus.fetchJobStausOptions().then(options => dispatch(staffOptionsFetched(options)))

export const jobStatusOptionsFetched = (options) => ({
  type:JOB_STATUS_OPTIONS_FETCHED,
  options
})
