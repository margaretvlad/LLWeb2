
let defaultState = {
	staff:[]
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "GET_STAFF":

			let t_ = [];
			let staff = action.staff;
			let staffOption = [];

			staff.map(function(item){
				let x = {
					value: item._id,
					label: `${item.firstname} ${item.lastname}`
				}

				staffOption.push(x);
			})

			let unscheduled = 0;

			let day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

			let d2d = day[new Date().getDay()-1];

			
			staff.map(function(item){

				//console.log(item.schedule.length)
				if(item.schedule.length===0){
					unscheduled++;
				}
				
			})


			// staff.map(function(item){
			// 	let y = {
			// 		_id: item._id,
			// 		firstname: item.firstname,
			// 		lastname: item.lastname,
			// 		schedule: [
			// 			{
			// 				day:item.schedule.day,

			// 			}
			// 		]
			// 	}

			// 	t_.push(y);
			// });


			return {
				staff,
				unscheduled,
				staffOption
			}
		default:
			return state
	}
}
