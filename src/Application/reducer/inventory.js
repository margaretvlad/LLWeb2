
let defaultState = {
	cat : [],
	inventory: [],
	service: []
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "GET_CAT": 

			let cat_ = action.category;

			let data = [];


			cat_.map(function(item){

			let x = {

				_id: item._id,
				description:item.catdescription,
				catfor: item.catfor,
				value: item._id,
				label: item.catname,

			}

			data.push(x);


			})

			return {
				...state,
				cat: data
			}

		case "GET_INVENTORY":

			let inventory = [];
			let i_ = action.inventory;

			i_.map(function(item){

				let i_mod = {

					_id:item._id,
					name: item.servicename ? item.servicename: item.productname,
					description: item.servicedescription ? item.servicedescription: item.productdescription,
					quantity: item.duration ? item.duration: item.quantity,
					price: item.price,
					category: item.category,
					type: item.type,
					avatarURL: item.avatarURL
				}
				inventory.push(i_mod);
			});


			let serviceOption = [];
			let productOption = [];

			inventory.map(function(item){
				if(item.type==="service"){
					let x = {
						value: item._id,
						label: item.name,
						price:item.price
						
					}

					serviceOption.push(x);
				}
				else {
					let y = {
						value: item.price,
						label: item.name,
						q:item.quantity,
					}
					productOption.push(y);
				}
			})

	

			

			return {
				...state,
				inventory,
				serviceOption,
				productOption
			}
		case "GET_SERVICE": 

			let data_service = [];
			let service_ = action.service;

			service_.map(function(item){
				let x_service = {
					value: item._id,
					label: item.servicename,
				}
				data_service.push(x_service);
			})

			

			return {

				...state,
				service: data_service,
			}
		
		default:
			return state
	}
}
