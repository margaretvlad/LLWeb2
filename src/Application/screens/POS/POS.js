import React from 'react';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import {connect} from 'react-redux';
import swal from 'sweetalert2';

import { 
  MdDeleteForever,
  MdDone,
  MdClose,
  MdExposurePlus1,
  MdExposureNeg1
   } from 'react-icons/md';

// functions
import {
  getPayments,
  getSpecificPayments,
  makePayment,
  deletePayment,
  complete
} from '../../actions/POS';

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


import {
  getCustomerList,
  getCustomerSignup,
  updateCustomer,
  deleteCustomer
} from '../../actions/CUSTOMER';


import {
  signupAction,
  getStaff,
  updateProfile,
  deleteEmployee
} from '../../actions/EMPLOYEES';



let options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

let type_t = [
  {
    value: 'payment',label: 'Direct Payment'
  },
  {
    value: 'remit',label: 'Remit From Employee'
  }
]


let jane = [];



class POS extends React.Component{

  
  getInitialState(){
    return {
      unpaid: this.props.unpaid,
      selectedName: null
    }
  }

  componentWillReceiveProps(...props){
    this.setState({
      unpaid: this.props.unpaid
    })
  }

  handlePrice = (event) => {


    if(this.state.override===false){
      swal("Please be advise the you are overriding the price set in the inventory with your own price input.");
    }

      let price = event.target.value;
      (price/1||price===".") ? price:price=""

      this.setState({
        price,
        override:true
      })
    }

  constructor(props) {
    super(props);
  
    this.state = {

      selectedOption: null,
      act_item: [],
      price: null,
      change:null,


      as_cust:null,
      as_custid:null,

      as_serv:null,
      as_servid:null,

      as_staff:null,
      as_staffid:null,

      as_price:null,
      isNotEnough:false,

      quantityAdd:0,
      confirmItem:false,

      override:false,

      


    };
  }
	
  handleChange = (event) => {
    console.log(event.value);
    this.setState({ selectedName:event.label });

    this.props.dispatch(getSpecificPayments(event.value));

    console.log(event.label);
   
  }



  handlePayment = () =>{
  	this.paymentDialog.show();
  }

  handleDelete = () =>{
    const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
})

swalWithBootstrapButtons({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes',
  cancelButtonText: 'No!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.props.dispatch(deletePayment(this.state.act_item._id));
    this.infoDialog.hide();
    swalWithBootstrapButtons(
      'Deleted!',
      'Payment Deleted',
      'success'
    )
  } else if (
    // Read more about handling dismissals
    result.dismiss === swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons(
      'Cancelled',
      'Not deleted :)',
      'error'
    )
  }
})
  }

  handleInfo = (item) =>{
    this.setState({
      act_item: item,
    })
    this.infoDialog.show();
  }

  componentDidMount(){
    
    this.props.dispatch(getStaff());
    this.props.dispatch(getCustomerList());
    this.timer = setInterval(()=>{
      this.props.dispatch(getPayments());
      this.props.dispatch(getInventory());
    },1000);

  }

  makePay = () =>{

    let {
      act_item,
      price
    } = this.state;

    if(parseInt(act_item.price)<=parseInt(price)){
        let change = price-act_item.price;
        this.props.dispatch(makePayment(act_item._id,jane));

        swal(`CHANGE: ${change}`);
        jane=[];
        
        this.setState({
          confirmItem:false,
          override:false,
        })
        
        this.infoDialog.hide();
    }

  }


  addP = () => {
      this.addPDialog.show();
  }

  mod = () => {

      this.modDialog.show();

  }


  serviceChange = (event) => {

    let name = event.label;
    let id = event.value;
    let price= event.price;

    this.setState({
        as_serv:name,
        as_servid:id,
        price:price
    })

  }
  customerChange = (event) => {

    let name = event.label;
    let id = event.value;

    this.setState({
        as_cust:name,
        as_custid:id
    })
    
  }
  staffChange = (event) => {

    let name = event.label;
    let id = event.value;

    this.setState({
        as_staff:name,
        as_staffid:id
    })
    
  } 




  insalonPay = () => {

  //   userid,
  // customer,
  // staffid,
  // staff,
  // serviceid,
  // service,
  // type,
  // date,
  // price,
  // status,
  // paid




  let {
    as_serv,
    as_servid,
    as_cust,
    as_custid,
    as_staffid,
    as_staff,
    price,
    confirmItem
  } = this.state;


if(confirmItem===false){
    jane=[]
}




  if(as_serv,
    as_servid,
    as_cust,
    as_custid,
    as_staffid,
    as_staff,
    price){
  this.props.dispatch(complete(as_custid,as_cust,as_staffid,as_staff,as_servid,as_serv,jane,"Salon Service",price,"completed",true));
  swal(`Payment Recorded!`);



  }
  else {
    swal('Incomplete Data');
  }
  jane=[];
  console.log("emp",jane)
  // swalWithBootstrapButtons(
  //     'Payment Success',
  //     'Payment Recorded',
  //     'success'
  //   )

this.setState({
  as_servid:null,
  as_cust:null,
  as_custid:null,
  as_staffid:null,
  as_staff:null,
  price:0,
})

  


  }

  addInv = () => {
    this.invRDialog.show();
  }

  selectProduct = (event) => {
      let select = {
          name: event.label,
          quantity: 0,
          price:event.value,
          q:event.q,
      }

      let counter = 0;
      jane.map(function(entry){
          if(entry.name===event.label){
             counter++;
          }
      })

      if(counter===0){
         jane.push(select);
      }

      
  }

  quanChange = (event,item) => {

    let x = event.target.value;

    let itemprice = item.price;
    let itemname = item.name;
    let itemq = item.q;


    this.setState({
        quantityAdd:x
    })



    jane.map(function(entry){
            

        if(entry.name===item.name){

            jane.pop(item);
            let newx = {
              name:itemname,
              quantity:x,
              price:itemprice,
              q:itemq
            }
            jane.push(newx);

        }else {

          swal("You shouldnt be seeing this, If you do. You will be sent to destination F#cked")

        }


    })



    // // console.log(event.target.value,item.q)

    // let x = event.target.value;
    // let x1 = item.q;
    // let evalx = x;


    // this.setState({
    //   quantityAdd:x
    // })


    // // if(x>x1){

    // //   evalx=x1;

    // //   swal("Quantity is Low");
    // //   this.setState({

    // //       quantityAdd:x1,

    // //   })

    // // }

    // // jane.map(function(entry){

     
    // //     if(entry===item){
    // //         let newx  = {
    // //             name:item.name,
    // //             quantity:evalx,
    // //             price:item.price
    // //         }
    // //         jane.pop(item);
    // //         jane.push(newx);
    // //     }
    // // })



    // console.log(x,x1)

    // if(x1>x){

    //    this.setState({
    //       isNotEnough:false,

    //   });
    // jane.map(function(entry){

     
    //     if(entry===item){
    //         let newx  = {
    //             name:item.name,
    //             quantity:x,
    //             price:item.price
    //         }
    //         jane.pop(item);
    //         jane.push(newx);
    //     }
    // })
    // }
    // else {
    //   this.setState({
    //       isNotEnough:true,

    //   });



    // }


    // console.log(event.target.value,item)
    //   // this.setState({

    //   // })
  }


  yesAdd = () => {

      let a = 0;

      jane.map(function(item){

          if(item.q>=item.quantity && item.quantity!==0){

            a++;
            
          }

          else {
            a--;
          }
          

      })

      if(a===jane.length && a!==0){
        this.setState({
          confirmItem:true,
           });

        swal("Great. We had added the items you used, please make payment to save the datas.");
        this.invRDialog.hide();
      }

      else {

          swal("No can proceed, check your stocks, review inputs.");

      }


  }


	render(){
		let { selectedName,act_item } = this.state;
    let {
        unpaid,
        data,
        serviceOption,
        customerOption,
        staffOption,
        productOption
    } = this.props;

    

     

		return(
			<div className="container">



          <div class="row gex">

            <div style={{margin:'10'}} class="col-2">
               <button onClick={()=>this.addP()} class="btn">
                  ADD PAYMENT
               </button>
            </div>

            

          </div>
       

        <div class="row mt">

              <div class="col-12 aligned">
              <h2 class="color">Pending Payments</h2>
              <div class="t_logs col-6*">

                  
                  {
                unpaid.map((item,index)=>(
                    <div onClick={()=>this.handleInfo(item)} class="payment_x ml">
                <div class="info_x ml">
                  <h6 class="color whitex">{item.service} by {item.staff}</h6>
                  <h6 class="color whitex">{item.customer}</h6>
                </div>
                <div class="price_x mr">
                 <h6 class="color whitex">PHP200</h6>
                </div>
                
              </div>
                  ))
              }


              </div>

              </div>

          </div>

        


        
       



      <SkyLight hideOnOverlayClicked ref={ref => this.paymentDialog = ref} title="Customer Payment">
         <div className="onPayment">
         <p className="header1">Customer John Connor</p>
         </div>
      </SkyLight>

      <SkyLight dialogStyles={deleteDialogStyle} hideOnOverlayClicked={false} ref={ref => this.deleteDialog = ref} title="Remove item from cart?">
         <div className="onDelete">
            <button className="no">
              <p className="menuHover"><MdDone size={64} /></p>
            </button>
             <button className="no">
              <p className="menuHover"><MdClose size={64} /></p>
            </button>
         </div>
      </SkyLight>




      <SkyLight dialogStyles={moreInfoStyle} hideOnOverlayClicked={false} ref={ref => this.infoDialog = ref} title="Payment">
          <div class="row lh">
            <h5>Service: {act_item.service}</h5>
          </div>
          <div class="row lh">
            <h5>Staff: {act_item.staff}</h5>
          </div>
          <div class="row lh">
            <h5>Customer: {act_item.customer}</h5>
          </div>
          <div class="row lh">
            <h5>Cost: {act_item.price}</h5>
          </div>

          <div onClick={()=>this.addInv()}  class="row">
          <h1 style={{color:'royalblue'}} class="color">Add Items Used</h1>
        </div>

          <p class="color">Amount Payment</p>
          <input onChange={this.handlePrice} value={this.state.price}  className="inputbox w" placeholder="e.g. 500"/>
          <button onClick={()=>this.makePay()} class="btn rewidth">
                  MAKE PAYMENT
                </button>
          <button onClick={()=>this.handleDelete()} class="btn red rewidth">
                  DELETE PAYMENT
                </button>
      </SkyLight>  


         <SkyLight dialogStyles={moreInfoStyle} hideOnOverlayClicked={false} ref={ref => this.addPDialog = ref} title="Add Payment">
          
        <div class="row">
            <div class="col-12">
                <h1 class="color">Choose Service</h1>
                <Select options={serviceOption} onChange={this.serviceChange} class="select"/>
            </div>
        </div>

         <div class="row">
            <div class="col-12">
                <h1 class="color">Choose Customer</h1>
                <Select options={customerOption} onChange={this.customerChange} class="select"/>
            </div>
        </div>

         <div class="row">
            <div class="col-12">
                <h1 class="color">Choose Staff</h1>
                <Select options={staffOption} onChange={this.staffChange} class="select"/>
            </div>
        </div>

         <div class="row">
            <div class="col-12">
                <h1 class="color">Payment</h1>
                <input onChange={this.handlePrice} value={this.state.price}  className="inputbox w" placeholder="e.g. 500"/>
            </div>
        </div>

        <div onClick={()=>this.addInv()}  class="row">
          <h1 style={{color:'royalblue'}} class="color">Add Items Used</h1>
        </div>

          <div class="row">
            <div class="col-12">
              <button onClick={()=>this.insalonPay()} class="btn rewidth">
                  MAKE PAYMENT
                </button>
            </div>
        </div>



         </SkyLight>  

       <SkyLight dialogStyles={moreInfoStyle} hideOnOverlayClicked={false} ref={ref => this.invRDialog = ref} title="Items Used">
         <div class="container">
          <div class="row">
            <div class="col-12">
              <h1 class="color">What item</h1>
                <Select onChange={this.selectProduct} options={productOption} class="select" />
            </div>
          </div>


          <div class="row">

              {
                 jane.map((item,index)=>(
                      

                      <div style={{alignItems:'center'}} class="row">
                          <div class="col-3">
                              <h4 style={{textTransform:'uppercase'}}>
                                  {item.name} X 
                              </h4>
                          </div>

                          <div class="col-3">

                           <input onChange={(e)=>this.quanChange(e,item)} value={this.state.quantityAdd} style={{borderRadius: 6}} type="number" placeholder="Quantity"/>

                          </div>

                           <div class="col-3">
                           {this.state.isNotEnough &&
                              <pre style={{margin:10}}>Not Enough Quantity</pre>
                           }
                           </div>
                      </div>


                  ))
              }

          </div>


          <div class="row">
             <div style={{margin:'10'}} class="col-10">
               <button onClick={()=>this.yesAdd()} class="btn">
                  ADD ITEMS
               </button>
            </div>
          </div>


          </div>
      </SkyLight>  
 

      </div>



			
		);
	}
}

var deleteDialogStyle = {
      backgroundColor: '#C62828',
      color: '#ffffff',
      width: '20%',
      minHeight: '1%',
      
    };
var moreInfoStyle = {

}

let mapStateToProps = (state)=>{
  return {
      unpaid: state.pos.payment,
      data: state.pos.p_data,
      serviceOption : state.inventory.serviceOption,
      customerOption: state.customer.customerOption,
      staffOption: state.schedule.staffOption,
      productOption: state.inventory.productOption
  }
}
export default connect(mapStateToProps)(POS);