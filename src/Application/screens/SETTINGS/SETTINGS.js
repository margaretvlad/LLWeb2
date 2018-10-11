import React from 'react';
import styles from '../../styles.css';
import SkyLight from 'react-skylight';
//import SwitchButton from 'react-switch-button';
// import 'react-switch-button/dist/react-switch-button.css';

import Toggle from 'react-toggle'
import {
  MdAssessment,
  MdContactMail
} from 'react-icons/md';
import {connect} from 'react-redux';
import {
  setsalary
} from '../../actions/REPORT';
import swal from 'sweetalert2';

import {

  getStaff,
  setAVA

} from '../../actions/EMPLOYEES';
import {
  sendToAll
} from '../../actions/CUSTOMER';


class SETTINGS extends React.Component{

  constructor(props) {
    super(props);
  
    this.state = {
      price: null,
      individual:false,
      id:null,
      message:null,
      isAVA:false,
    };
  }

  componentDidMount(){
    this.timer =setInterval(()=>{
      this.props.dispatch(getStaff());
    },1000)
  }



  handlePrice = (event) => {
    let price = event.target.value;
      (price/1||price===".") ? price:price="0"

      this.setState({
        price
      })
  }

  onOpen = () => {
    this.setDialog.show();
  }

  onOpenF = () => {
    this.setFDialog.show();
  }

  setSalary = () => {
    if(this.state.price){


      if(this.state.individual===true){
        this.props.dispatch(setsalary(this.state.id,this.state.price));
      }
      if(this.state.individual===false){
        this.props.dispatch(setsalary(null,this.state.price));
      }

      this.setState({
        individual:false,
      })

      
      this.setDialog.hide();
    }
  }

  setInd = () => {
      this.setIndividualDialog.show();
  }

  modify = (id) => {
    this.setState({
        individual:true,
        id
    });
    this.setIndividualDialog.hide();
  }

  cancel = () => {
    this.setState({
        individual:false
    });

  }


  messageX = (text) => {
    console.log(text)
    this.setState({
      message:text.target.value
    })
  }


  send=()=> {
    let {
      message
    } = this.state;


    if(!message){
          swal("Empty Message");
    }
    if(message){
    this.props.dispatch(sendToAll(message));
    swal("Message Announced to all customers.")
  }
  }

  onOpenS = () => {


    this.setAvailableDialog.show();


  }

  handleAVChange = (staffid,ava) => {



      


      this.setState({

          isAVA:!ava

      })

      this.props.dispatch(setAVA(staffid,!ava));

      swal("Employee Status Changed!")

  }

  render(){

    let {
      staff
    } = this.props;

   // console.log(staff)
    return(
      <div class="container">
        <div class="row">
          <div class="col-3">
            <div onClick={()=>this.onOpen()} class="cardx ml lime">
              <MdAssessment size={64} color="#FFFFFF"/>
              <p class="sales">Employee Salary</p>
              </div>
          </div>


          <div class="col-3">
            <div onClick={()=>this.onOpenF()} class="cardx ml orange">
              <MdContactMail size={64} color="#FFFFFF"/>
              <p class="sales">Announce</p>
              </div>
          </div>



        <div class="col-3">
            <div style={{backgroundColor: 'green'}} onClick={()=>this.onOpenS()} class="cardx ml red">
              <MdContactMail size={64} color="#FFFFFF"/>
              <p class="sales">Employee Availability</p>
              </div>
          </div>


        </div>



        <SkyLight  hideOnOverlayClicked={true} ref={ref => this.setFDialog = ref} >

        <div class="row">
              <div class="col-12">
                    <textarea required onChange={this.messageX} value={this.state.message} style={{width:'90%',height:'100%',resize: 'none'}}  className="inputbox w l" placeholder="Message"/>
              </div>
        </div>
        <div style={{marginTop:20}} class="row">
        <button  onClick={()=>this.send()} className="btnModal">
                      <p>SEND MESSAGE</p>
        </button>
          </div>


        </SkyLight>


        <SkyLight dialogStyles={addStyles} hideOnOverlayClicked={true} ref={ref => this.setDialog = ref} >
            <div class="col-12">
              <div class="row">
                 <h2 class="color">Set Salary</h2>
              </div>
                <div class="row">
                 
                  <input onChange={this.handlePrice} value={this.state.price} className="inputbox w" placeholder="e.g. 500"/>
                </div>

                <div class="row">
                  <button onClick={()=>this.setSalary()} className="btnModal">
                      <p>SET</p>
                      </button>
                      {this.state.individual===false && <button onClick={()=>this.setInd()} className="btnModal">
                      <p>SET INDIVIDUAL</p>
                      </button>}
                      {this.state.individual===true && <button onClick={()=>this.cancel()} className="btnModal red">
                      <p>ABORT MODIFY</p>
                      </button>}

                </div>  
            </div>
        </SkyLight>


        <SkyLight dialogStyles={addStyles1} hideOnOverlayClicked={true} ref={ref => this.setAvailableDialog = ref} >
            <div class="col-12">
                <div class="row">
                    <div class="col-4">
                      <h4 class="color">Staff Name</h4>
                    </div>
                    <div class="col-4">
                    <h4 class="color">Available</h4>
                    </div>
                    <div class="col-4">
                    <h4 class="color">Override</h4>
                    </div>
                   
                </div>  
                <hr/>


                {
                  staff.map((item,index)=>(

                      <div class="row">
                    <div class="col-4">
                      <h4 class="color">{item.firstname} {item.lastname}</h4>
                    </div>
                    <div class="col-4">
                    <h4 class="color">{item.available===true?"Yes":"No"}</h4>
                    </div>
                    <div class="col-4" alignItems="center" padding={10} justifyContent="center">
                    
                   
                        
                        <Toggle
                          
                          defaultChecked={this.state.isAVA || item.available===true}
                          
                          onChange={()=>this.handleAVChange(item._id,item.available)} />
                        
                        
                      
                      

                    </div>
                </div>  

                    ))
                }
                
            </div>
        </SkyLight>

       

         <SkyLight dialogStyles={addStyles1} hideOnOverlayClicked={true} ref={ref => this.setIndividualDialog = ref} >
            <div class="col-12">
                <div class="row">
                    <div class="col-4">
                      <h4 class="color">Staff Name</h4>
                    </div>
                    <div class="col-4">
                    <h4 class="color">Salary</h4>
                    </div>
                   
                </div>  
                <hr/>


                {
                  staff.map((item,index)=>(

                      <div class="row">
                    <div class="col-4">
                      <h4 class="color">{item.firstname} {item.lastname}</h4>
                    </div>
                    <div class="col-4">
                    <h4 class="color">{item.salary}</h4>
                    </div>
                    <div class="col-4">
                    <h4 onClick={()=>this.modify(item._id)} class="btntext">MODIFY</h4>
                    </div>
                </div>  

                    ))
                }
                
            </div>
        </SkyLight>

      </div>
    );
  }
}

let addStyles = {
   width: '30%',
     minHeight: '200px',
     marginTop: '-350px',
     marginLeft: '-35%', 
}
let addStyles1 = {
   width: '70%',
     minHeight: '600px',
     marginTop: '-350px',
     marginLeft: '-35%', 
}
let mapStateToProps = (state) => {
  return {
     staff: state.schedule.staff
  }
}
export default connect(mapStateToProps)(SETTINGS);