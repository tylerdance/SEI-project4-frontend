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

    render() { 
        const { imageUrl, imageAlt } = this.state;
        return ( 
            <div>
                <section className="left-side">
                    <form>
                      <div className="choosePicForm">
                        <div>
                          <input className="chooseFile"  type="file"/>
                        </div>

                        <div>
                          <button type="button" className="submitPhoto" onClick={this.handleImageUpload}>Submit</button>
                        </div>
                      </div>
                    </form>
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