//var API_URL = 'http://192.168.30.5:3000/v1';
var API_URL = 'https://server-llsalon.herokuapp.com/v1/';
exports.GET_PAYMENT = `${API_URL}/getpayments`;
exports.GET_SPPAYMENT = `${API_URL}/getsppayments`;
exports.SIGNUP = `${API_URL}/signup`;
exports.CUSTOMER_SIGNUP = `${API_URL}/customersignup`;
exports.USP = `${API_URL}/updatestaffprofile`;

// INVENTORY
exports.ADD_CAT = `${API_URL}/addcat`;
exports.GET_CAT = `${API_URL}/getcat`;




exports.ADD_PRODUCT = `${API_URL}/addproduct`;
exports.GET_PRODUCT = `${API_URL}/getproduct`;

exports.ADD_SERVICE = `${API_URL}/addservices`;
exports.GET_SERVICE = `${API_URL}/services`;

exports.GET_INVENTORY = `${API_URL}/getInventory`;


// updates

exports.UPDATE_CAT = `${API_URL}/updatecat`;
exports.UPDATE_PRODUCT = `${API_URL}/updateproduct`;
exports.UPDATE_SERVICES = `${API_URL}/updateservices`;
exports.COMPLETE = `${API_URL}/setcompleteap`;

// dels

exports.DELETE_CAT = `${API_URL}/deletecat`;
exports.DELETE_PRODUCT = `${API_URL}/deleteproduct`;
exports.DELETE_SERVICE = `${API_URL}/deleteservice`;


// signup

exports.GET_STAFF = `${API_URL}/staffBulk`;


// schedules

exports.SET_SCHEDULE = `${API_URL}/setschedule`;

exports.RESET_SCHEDULE = `${API_URL}/resetschedule`;

exports.admin = `${API_URL}/admin`;


// admin powers retir
exports.GET_CUSTOMERLIST = `${API_URL}/getcustomerlist`;

exports.MAKE_PAYMENT = `${API_URL}/makepayment`;
exports.DELETE_PAYMENT = `${API_URL}/deletepayment`;
exports.DELETE_EMPLOYEE = `${API_URL}/deletebyid`;
exports.UPDATE_CUSTOMER = `${API_URL}/updatecustomer`;
exports.DELETE_CUSTOMER = `${API_URL}/deletebycustomerid`;

// get all transactions

exports.GET_ADMIN_TRANSACTION = `${API_URL}/gww`;
exports.GET_DAILY = `${API_URL}/gd`;
exports.GET_WEEKLY = `${API_URL}/gw`;
exports.GET_MONTHLY = `${API_URL}/gm`;
exports.GET_SALES = `${API_URL}/getsales`;
exports.GET_SPINV = `${API_URL}/getspinv`;
exports.GET_USED = `${API_URL}/getused`;


exports.SET_SALARY = `${API_URL}/setsalary`;
exports.GET_ALA = `${API_URL}/getala`;
exports.ACCEPT= `${API_URL}/acceptap`;
exports.REJECT= `${API_URL}/rejectap`;
exports.GALL= `${API_URL}/gall`;
exports.CD = `${API_URL}/cd`;
exports.RS = `${API_URL}/realsales`;
exports.INSALON = `${API_URL}/insalon`;
exports.GSN = `${API_URL}/getsuggestion`;
exports.TRANS = `${API_URL}/trans`;
exports.INV = `${API_URL}/alterinv`;

exports.AVA = `${API_URL}/ava`;
    