import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

var config = {
    apiKey: "AIzaSyCM629elsrSqoLHgtQpN53p4kxPT360tPM",
    authDomain: "llsalon-19296.firebaseapp.com",
    databaseURL: "https://llsalon-19296.firebaseio.com",
    projectId: "llsalon-19296",
    storageBucket: "llsalon-19296.appspot.com",
    messagingSenderId: "1077977759444"
  };
  //firebase.initializeApp(config);


class Uploader extends Component {
state = {
username: '',
avatar: '',
isUploading: false,
progress: 0,
avatarURL: ''
};
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
render() {
return (
<div>
<form>
<div style={{margin:20}} class="gx">
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
);
}
}
export default Uploader;