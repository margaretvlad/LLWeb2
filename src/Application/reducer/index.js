import {
	combineReducers
} from 'redux';

import login from './login';
import pos from './pos';
import alert from './alert';
import inventory from './inventory';
import schedule from './schedule';
import customer from './customer';
import report from './report';
import separate from './separate';
import profit from './profit';
import suggestion from './suggestion';

export default combineReducers({
	login,
	pos,
	alert,
	inventory,
	schedule,
	customer,
	report,
	separate,
	profit,
	suggestion
});