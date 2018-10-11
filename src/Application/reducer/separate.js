
let defaultState = {
	ala:[],
	
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "ALA": 

			let data = [];
		let a  = action.appointments;
		let b=0;

		a.map(function(item){
			
			item.appointment.map(function(itemx){
				if(itemx.accepted==="false"){
					data.push(itemx);
					b++;
				}
			})
			
		})

		
			//console.log(b);

			return {
				ala: data,
				c:b
			};
			break;
		
		default:
			return state
	}
}
