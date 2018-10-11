
let defaultState = {
	customers: []
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){

		

		case "CUSTOMERS":


			let customerOption = [];
		let customers = action.customers;

		customers.map(function(item){
			let x = {
				value: item._id,
				label: `${item.firstname} ${item.lastname}`
			}
			customerOption.push(x);
		})

		console.log("CO",customerOption)


			return {
				customers,
				customerOption
			}
		default:
			return state
	}
}
