import React from 'react';
import Select from 'react-select';
import SkyLight from 'react-skylight';
import styles from '../../styles.css';
import {connect} from 'react-redux';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import {
	MdCheck,
	MdCancel
} from 'react-icons/md';
import {

	addCategoryAction,
	resetCatNotify,
	addProductAction,
	addServiceAction,
	getCategoryAction,
	getInventory,
	updateCat,
	updateProduct,
	updateService,
	deleteProduct,
	deleteCat,
	deleteService
} from '../../actions/INVENTORY';

const option = [

	{
		value: "all",label: "All"
	},
	{
		value: "product",label: "Product"
	},
	{
		value: "service",label: "Service"
	}

	]

var config = {
    apiKey: "AIzaSyCM629elsrSqoLHgtQpN53p4kxPT360tPM",
    authDomain: "llsalon-19296.firebaseapp.com",
    databaseURL: "https://llsalon-19296.firebaseio.com",
    projectId: "llsalon-19296",
    storageBucket: "llsalon-19296.appspot.com",
    messagingSenderId: "1077977759444"
  };
  firebase.initializeApp(config);



class INVENTORY extends React.Component{
	componentWillMount(){
		

	}
	componentDidMount(){
		
		this.timer = setInterval(()=>{
			this.refreshInventory();
		},1000);
	}
	componentWillUnmount(){
		
	}
	refreshInventory = () =>{
		this.props.dispatch(getInventory());
		this.props.dispatch(getCategoryAction());
	}
	constructor(props) {
	  super(props);
	
	  this.state = {

	  	selectedValue: null,
	  	selectedValueOption: null,
	  	vtype: null,
	  	vcat: null,
	  	catValueOption: null,

	  	// cat
	  	catname: null,
	  	catdescription: null,
	  	isShow: false,
	  	mss:null,
	  	error: null,

	  	uid:null,
	  	cid: null,
	  	
	  	// prod

	  	productname: null,
	  	productdescription: null,
	  	quantity: null,
	  	price: null,
	  	category: null,
	  	isUpdate: false,

	  	// 
	  	isUpdateCat: null,
	  	subcat: null,
	  	search:null,

	  	username: '',
		avatar: '',
		isUploading: false,
		progress: 0,
		avatarURL: ''


	  };
	}

	handleChangeUsername = (event) => this.setState({username: event.target.value});
	handleUploadStart = () => this.setState({isUploading: true, progress: 0});
	handleProgress = (progress) => this.setState({progress});
	handleUploadError = (error) => {
	this.setState({isUploading: false});
	console.error(error);
	}
	handleUploadSuccess = (filename) => {
	this.setState({avatar: filename, progress: 100, isUploading: false});
	firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
	};

	handleAddProduct = () =>{

		this.setState({
			selectedValue: null,
			selectedValueOption: null,
			isUpdate: false,
			productname: null,
			productdescription: null,
			quantity: null,
			price:null,
			category: null,
			duration:null,

		})
		this.addDialog.show();
	}

	handleAddCat=()=>{

		console.log(this.state.catname);

		this.setState({
				isUpdateCat: false,
				catname: "",
				catdescription: "",
				selectedValue: "",
				catValueOption: null,
				cid: "",
			});
		console.log(this.state.catname);
		this.addCatDialog.show();

	}


	selectedType = (event) =>{
		this.setState({
			selectedValue: event.value,
			selectedValueOption: event,
			catValueOption: event,
			vtype: event.value,
		});

		this.props.dispatch(getCategoryAction(event.value));

	}

	addCategory = () =>{




		let {
			catname,catdescription,selectedValue
		} = this.state;


		if(!catname || !catdescription || !selectedValue)
		{
			this.setState({
				mss: "Incomplete \n Please make sure everything is complete."
			})
			this.alertErrorDialog.show();
		}

		else {
			
			if(!this.state.isUpdateCat){
				this.props.dispatch(addCategoryAction(catname,catdescription,selectedValue));
			}
			else{
				this.props.dispatch(updateCat(this.state.cid,catname,catdescription,selectedValue));
			}
		
			this.setState({
				catname: null,
				catdescription: null,
				selectedValue: null,
			});

			this.addCatDialog.hide();
		}

	}

	addProduct = () =>{



		const {
			productname,
			productdescription,
			quantity,
			price,
			category,
			duration,
			selectedValue,
			avatarURL
			
		} = this.state;

		console.log("RECEVIEC",selectedValue);

		if(!productname || !productdescription || !price || !category || !selectedValue){
			console.log("IM HERE");
		}
		else{
		if(selectedValue==="product"){
			

			if(!this.state.isUpdate){
				console.log("ADDING");
				this.props.dispatch(addProductAction(productname,productdescription,quantity,price,category));
			}
			else {

				this.props.dispatch(updateProduct(this.state.uid,productname,productdescription,quantity,price,category));
			}




			this.setState({
				productname:null,
				productdescription:null,
				quantity:null,
				price:null,
				category:null,
				duration:null,
				selectedValue:null,

			})
			this.refreshInventory();
		}

		if(selectedValue==="service"){

			if(!this.state.isUpdate){
				console.log("ADDING");
				this.props.dispatch(addServiceAction(productname,productdescription,duration,price,category,avatarURL))
			}
			else {
				console.log("UPDATING",this.state.uid,productname);
				this.props.dispatch(updateService(this.state.uid,productname,productdescription,duration,price,category,avatarURL));
			}
			
			this.setState({
				productname:null,
				productdescription:null,
				quantity:null,
				price:null,
				category:null,
				duration:null,
				selectedValue:null
			})
			this.refreshInventory();
		}



	}

	this.addDialog.hide();
	this.props.dispatch(getCategoryAction(this.state.vtype));

	
}


	subCategory = (event) =>{
			this.setState({
				category: event.label,
				subcat: event,
			})
		}

		vType = (event) => {
			console.log(event.value);
			this.setState({
				vtype: event.value,
			});
			
			if(event.value==="all"){
				this.props.dispatch(getCategoryAction());
			}
			else{
				this.props.dispatch(getCategoryAction(event.value));
			}
		}

		vCat = (event) => {
			this.setState({
				vcat: event.label
			});
			console.log(event.label);
			
		}

		handleUpdateProduct = (item) => {

			let x = {

				value: item._id,
				label: item.type
			}

			let yx  = {
				value:item.category,
				label:item.category,
			}
			

			this.setState({

				selectedValue: item.type,
				vtype: item.type,
				selectedValueOption: x,
				isUpdate: true,
				productname: item.name,
				productdescription: item.description,
				quantity:item.quantity,
				price:item.price,
				category: item.category,
				duration:item.quantity,
				uid: item._id,
				subcat: yx,
				avatarURL: item.avatarURL

			});

			console.log("STATE",item,this.state.avatarURL,item.avatarURL)
			this.addDialog.show();


		}

		handleUpdateCat = (item) => {

			let catfor = "";
			if(item.catfor==="service")catfor="Service";
			else catfor="Product";

			let cd = {
				value: catfor,
				label: catfor,
			}


			console.warn(item);
			this.setState({
				isUpdateCat: true,
				catname: item.label,
				catdescription: item.description,
				catValueOption: cd,
				selectedValueOption:cd,
				selectedValue:item.catfor,
				cid: item._id,
			})

			console.log(this.state.catname);
			this.addCatDialog.show();


		}


			deleteProduct = (item) => {

				if(this.state.selectedValue==="service"){
					this.props.dispatch(deleteService(this.state.uid));
				}

				if(this.state.selectedValue==="product"){
					this.props.dispatch(deleteProduct(this.state.uid));
				}

				this.addDialog.hide();

			}

			deleteCat = (item) => {
				this.props.dispatch(deleteCat(this.state.cid));
				this.addCatDialog.hide();
			}


		search = (event) =>{
			this.setState({
				search:event.value
			});


		}


		// parsing


		handlePrice = (event) => {

			let price = event.target.value;
			(price/1||price===".") ? price:price=""

			this.setState({
				price
			})
		}

		handleDuration = (event) => {

			
			let duration = event.target.value;
			(duration/1) ? duration:duration=""
			console.log(this.state.duration);
			this.setState({
				duration,
			})

		}

		handleQuantity = (event) => {

			
			let quantity = event.target.value;
			(quantity%1===0 && quantity!==".") ? quantity:quantity=""
			this.setState({
				quantity
			})

		}
		


	render(){


		let {
			header,
			message,
			show,
			cat,
			inventory
		} = this.props;

		if(show && show!==null){
			
			this.setState({
				error:false
			})
			this.props.dispatch(resetCatNotify());


		}

		const {
			vtype,
			vcat
		} = this.state;

		let qd_name = "Product/Service Name";
		let qd_label = "Quantity/Duration";

		if(vtype==="product"){
			qd_name="Product Name";
			qd_label="Quantity";
		}
		if(vtype==="service"){
			qd_name="Service Name";
			qd_label="Duration";
		}
		let count = 0;
		cat.map(function(item){
			if(item.label==="All")count++;
		});

		let allCat = {
			value:"all",
			label: "All",
		}

		if(count===0){
			cat.unshift(allCat);
		}


		let modcat = [];

		cat.map(function(item){
			
			if(item.catfor===vtype || !vtype || vtype==="all"){
				modcat.push(item);
			}
		});

		let modcat_strict = [];

		cat.map(function(item){
			
			if(item.catfor===vtype){
				modcat_strict.push(item);
			}
		});

		let modcat_clean = [];

		option.map(function(item){
			
			if(item.value!=="all"){
				modcat_clean.push(item);
			}
		});

		let invent = [];

		inventory.map(function(item){
			let x = {
				value: item.name,
				label: item.name
			}
			invent.push(x);
		})





		return(
			<div class="container">
				
				<div class="row">
					<div class="col-4 center">
					
							<button onClick={()=>this.handleAddProduct()} class="btn">
							<p>Add Product or Service</p>
							</button>
						
						
							<button onClick={()=>this.handleAddCat()} class="btn">
							<p>Add Category</p>
							</button>
						
					</div>
					
					
				</div>
				<div class="row mj">
					
					<div class="col-8">
						<h2 class="color ml">LIST OF PRODUCTS PRODUCTS AND SERVICES</h2>
						<div class="i_container">



								<div class="row">
								<div class="col-4">
										<div class="option">
										<p class="color">Search</p>
										<Select options={invent} onChange={this.search} className="searchbox s_mod" placeholder="Search ...."/>
										</div>
									</div>
									<div class="col-4">
										<div class="option">
										<p class="color">Sort by</p>
										<Select onChange={this.vCat} options={((cat.type===vtype||!vtype) ? cat:modcat)}  className="searchbox s_mod" placeholder="Category"/>
										</div>
									</div>
									<div class="col-4">
										<div class="option">
										<p class="color">Type</p>
										<Select options={option} onChange={this.vType} className="searchbox s_mod" placeholder="Type"/>
										</div>
									</div>
								</div>


								<div class="row">
									<div class="col-12">
										<div class="row">
											<div class="col-4 alcen">
												<p class="color">{qd_name}</p>
											</div>

											<div class="col-4 alcen">
											<p class="color ">{qd_label}</p>
											</div>

											<div class="col-4 alcen">
											<p class="color">Price</p>
											</div>
										</div>
									</div>
								</div>
								<hr />

							<div className="tbl">
				

						{
							
							inventory.map((item,index)=>(

								
							((vtype===item.type && (vcat===item.category || !vcat || vcat==="All"))  || vtype==="all" ||!vtype) && (this.state.search===item.name || !this.state.search) &&
							<div key={item.name} class="row i_item">	
									<button onClick={()=>this.handleUpdateProduct(item)} class="col-12 no x">
										<div class="row">
											<div class="col-4 alcen">
												<p class="color upper">{item.name}</p>
											</div>

											<div class="col-4 alcen">
											<p class="color  upper">{item.quantity}</p>
											</div>

											<div class="col-4 alcen">
											<p class="color upper">PHP{item.price}</p>
											</div>
										</div>
									</button>
								</div>


							
								

								))

						}

						
						</div>
								
						</div>

					</div>

					<div class="col-3">
						<h2 class="color ml">LIST OF CATEGORIES</h2>
						<div class="i_category">
							<div class="row">
								<div class="col-8  alcen">
									<p class="color">
										Category
									</p>
								</div>
								<div class="col-4 alcen">
									<p class="color">
										Type
									</p>
								</div>
							</div>
							<hr />
							<div class="cat_a">


{
							cat.map((item,index)=>(

							(item.label!=="All") &&
								<div key={item._id} class="row i_item">
								<button onClick={()=>this.handleUpdateCat(item)} class="col-12 no x">
								<div class="col-8  alcen">
									<p class="color cap">
										{item.label}
									</p>
								</div>
								<div class="col-4 alcen">
									<p class="color cap">
										{item.catfor}
									</p>
								</div>
								</button>
								</div>


								))
}



							</div>





						</div>

					</div>

					


				</div>

				<SkyLight dialogStyles={addCat} hideOnOverlayClicked={true} ref={ref => this.addCatDialog = ref} >
					<div className="body">
						<h3 className="color">{this.state.isUpdateCat ? "EDIT":"ADD"} CATEGORY</h3>
						<p class="color">What category?</p>
         				<input  onChange={(event)=>this.setState({
         					catname: event.target.value
         				})} value={this.state.catname}  className="inputbox w" placeholder="e.g. Skin Care"/>
         				<p  class="color">Description</p>
         				<input  onChange={(event)=>this.setState({
         					catdescription: event.target.value
         				})} value={this.state.catdescription} className="inputbox w" placeholder="e.g. Something about something"/>
						 <p class="color">Category for</p>
						 <Select 
         				options={modcat_clean}
         				value={this.state.catValueOption}
         				onChange={this.selectedType}
         				className="select_i"/>
         				<br/>
						 <button onClick={()=>this.addCategory()} className="btnModal">
         				     	<p>{this.state.isUpdateCat ? "UPDATE":"SAVE"}</p>
         				     </button>

         				{this.state.isUpdateCat &&
         				  <button onClick={()=>this.deleteCat()} className="btnModal red">
         				     	<p>DELETE</p>
         				     </button>
         				 }
					</div>



				</SkyLight>

				<SkyLight dialogStyles={alertStyle} hideOnOverlayClicked={true} ref={ref => this.alertDialog = ref} >
					<div className="alert">
							<MdCheck size={128} color="royalblue"/>
							<p className="alert_font">SUCCESS</p>
					</div>
				</SkyLight>

				<SkyLight dialogStyles={alertStyle} hideOnOverlayClicked={true} ref={ref => this.alertErrorDialog = ref} >
					<div className="alert">
							<MdCancel size={128} color="red"/>
							<p className="alert_font">{this.state.mss}</p>
					</div>
				</SkyLight>

				<SkyLight dialogStyles={addStyle} hideOnOverlayClicked={true} ref={ref => this.addDialog = ref} >
         			<div className="row">
         			<div className="col-12">
         				<div class="body">
         				<h3 className="color">{this.state.isUpdate ? "EDIT":"ADD"} PRODUCT OR SERVICE</h3>

         			{!this.state.isUpdate &&	
         				<div>
         				<p class="color">What type is it?</p>
         				<Select 
         				options={modcat_clean}
         				value={this.state.selectedValueOption}
         				onChange={this.selectedType}
         				className="select_i"/>
         				</div>
         			}

         				{(this.state.selectedValue) &&

         					<div>
         					<p class="color">{this.state.isUpdate ? "Update Category":"Great, what category?"}</p>
         					<Select 
         					value={this.state.subcat}
         					options={modcat_strict}
         					onChange={this.subCategory}
         					className="select_i"/>
         					<button onClick={()=>this.handleAddCat()} className="no"><p className="color">Add Category</p></button>
         					</div>


         				}

         				
         				{

         					this.state.selectedValue &&
         				     <div>

         				<p class="color">{this.state.isUpdate ? "Update Title?":"What is the title or name of the product or service?"}</p>
         				<input onChange={(event)=>this.setState({
         					productname: event.target.value
         				})} value={this.state.productname} className="inputbox w" placeholder="e.g. Nail Art"/>
         				<p class="color">Description?</p>
         				<input onChange={(event)=>this.setState({
         					productdescription: event.target.value
         				})} value={this.state.productdescription} className="inputbox w" placeholder="e.g. It is something"/>

         				     <p class="color">Price</p>
         				     <input onChange={this.handlePrice} value={this.state.price} className="inputbox w" placeholder="e.g. 500"/>

         				  {this.state.selectedValue==="product" &&
         				  <div>
         				     <p class="color">Initial Stock Quantity</p>
         				      <input onChange={this.handleQuantity} value={this.state.quantity}  className="inputbox w" placeholder="e.g. 500"/>
         				           	</div>
         				           	}

         				     {(this.state.selectedValue==="service") &&

         					<div>
         					<p class="color">Duration (* in minutes) </p>
         					<input  onChange={this.handleDuration} value={this.state.duration}  className="inputbox w" placeholder="e.g. 60"/>


         					<div>
<form>
<div style={{margin:20}} class="gx">
{this.state.isUploading &&
<p style={{fontSize:15,color:'#616161',marginBottom:20}}>UPLOADING>>Progress: {this.state.progress}%</p>
}
<label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
Select Photo
<FileUploader
hidden
accept="image/*"
storageRef={firebase.storage().ref('images')}
onUploadStart={this.handleUploadStart}
onUploadError={this.handleUploadError}
onUploadSuccess={this.handleUploadSuccess}
onProgress={this.handleProgress}
/>
</label>
</div>
{this.state.avatarURL &&
<img style={{margin:20,width:100,height:100}} src={this.state.avatarURL} />
}
</form>

</div>

         					</div>

         				}

         				     <button onClick={()=>this.addProduct()} className="btnModal">
         				     	<p>{this.state.isUpdate ? "UPDATE":"SAVE"}</p>
         				     </button>

         				     {this.state.isUpdate &&
         				     	<button onClick={()=>this.deleteProduct()} className="btnModal red">
         				     	<p>Delete</p>
         				     	</button>

         				     }

         				      </div>
         				}

         			</div>
         			</div>
         			</div>



      			</SkyLight>  












			</div>
		);
	}
}

const addStyle = {
	width: '500px',
	
	alignItems:'center',
	alignSelf: 'center',
	margin: 0,
	top:0,
	right: 0,
	left: 0,
	bottom: 0,
	overflow: 'auto'

}

const addCat = {
	width: '400px',
	

	

	alignItems:'center',
	
}

const alertStyle = {
	width: '400px',
	minHeight: '20px',
	alignItems:'center'
	
}

let mapStateToProps = (state) =>{
	return {
		header: state.alert.header,
		message: state.alert.message,
		show: state.alert.show,
		cat: state.inventory.cat,
		inventory : state.inventory.inventory,
	}
}



export default connect(mapStateToProps)(INVENTORY);