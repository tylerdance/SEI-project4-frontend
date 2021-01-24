import React, { Component } from 'react'
import Axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

class ImageUpload extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          imageUrl: null,
          imageAlt: null,
          redirect: false,
      }
  }

  handleImageUpload = () => {
    
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'ml_default')
    const options = {
      method: 'POST',
      body: formData,
    };

    return fetch('https://api.Cloudinary.com/v1_1/dok4pz3i3/image/upload', options)
      .then(res => res.json())
      .then(async(res) => {
        const link = res.url;
        if(!link){
          alert('Must choose a file to upload!')
          return
        }
        const userData ={
            email: this.props.email,
            image_url: link
        }
        console.log(this.props.email)
        console.log(link)
        await Axios.post(`${REACT_APP_SERVER_URL}/api/users/profile/setup/image`, userData)
        .then( res=>{ console.log(res);
        this.props.pic(true)
        this.props.pic(false)
        
        })
          .catch(err=>{console.log(err)})
      })
          
  }

  displayImageUploader = () => {
    document.getElementById('image-form').style.display="block"
    document.getElementById('cancel-image-upload').style.display="block"
    document.getElementById('update-pic-btn').style.display="none"
  }

  cancelUploadImage = () => {
    document.getElementById('image-form').style.display="none"
    document.getElementById('cancel-image-upload').style.display="none"
    document.getElementById('update-pic-btn').style.display="block"
  }

  render() { 
    const { imageUrl, imageAlt } = this.state;
    return ( 
      <div>
        <section className="left-side">
          <div>
            <button class="btn btn-outline-primary" id="update-pic-btn" onClick={this.displayImageUploader}>Update profile picture</button>
          </div>


          <form id="image-form">
            <div className="choosePicForm">
              <div id="choose-file-btn-div" class="btn btn-outline-dark">
                <div id="choose-file-sub-div">choose file</div>
                <input id="choose-file-btn" className="chooseFile" type="file" class="hide_file"/>
              </div>
              
              <div id="submit-button">
                <button class="btn btn-outline-success" type="button" onClick={this.handleImageUpload}>submit</button>
              </div>
            </div>
          </form>
          <div>
            <button id="cancel-image-upload" class="btn btn-outline-danger" onClick={this.cancelUploadImage}>cancel</button>
          </div>
        </section>


        <section className="right-side">
            {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
            )}
        </section>

      </div>
    );
  }
}
 
export default ImageUpload;