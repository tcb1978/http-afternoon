import React, {Component} from 'react';
import ConfirmModal from './subcomponents/ConfirmModal';

import axios from 'axios';


class Edit extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            subTitle:'',
            image:'',
            text:'',
            confirm: ''
        }
        this.yes = this.yes.bind(this);
        this.no = this.no.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/blog/${this.props.match.params.id}`).then(response => {
            console.log(response.data)
            this.setState({
                blog: response.data
            })
        }).catch(console.log)
    }

    
    // insert updatePost 
    

    // Insert into the deletePost 

    
    render() {
        let {title, subTitle, image, text} = this.state;
        return (
            <div className='content'>
                <div className="add-blog">
                    <div className="input-group">
                        <label htmlFor="">Title</label>
                        <input value={title} onChange={e=>this.titleChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Sub-Title</label>
                        <input value={subTitle} onChange={e=>this.subTitleChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Photo Url</label>
                        <input value={image} onChange={e=>this.imageChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group text-input">
                        <label htmlFor="">Content</label>
                        <textarea value={text} onChange={e=>this.textChange(e.target.value)} placeholder="Blog here!" />
                    </div>
                    <div className="buttons">
                        <button onClick={_=>this.delete()} className='delete-button' >Delete</button>
                        <button onClick={_=>this.cancel()} className='cancel-button'>Cancel</button>
                        <button onClick={_=>this.updatePost()} >Update</button>
                    </div>
                    {
                        this.state.confirm
                        ?
                        <ConfirmModal confirm={this.state.confirm} no={this.no} yes={this.yes} />
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    yes(){
        if (this.state.confirm === 'discard'){
            this.setState({
                title: this.state.original.title,
                subTitle: this.state.original.subTitle,
                image: this.state.original.image,
                text: this.state.original.text,
                confirm: ''
            })
        }
        else{
            this.deletePost()
        }
    }
    no(){
        this.setState({
            confirm: ''
        })
    }
    delete(){
        this.setState({
            confirm: 'delete'
        })
    }
    cancel(){
        this.setState({
            confirm: 'discard'
        })
    }

    titleChange(val){
        this.setState({
            title: val
        })
    }
    subTitleChange(val){
        this.setState({
            subTitle: val
        })
    }
    imageChange(val){
        this.setState({
            image: val
        })
    }
    textChange(val){
        this.setState({
            text: val
        })
    }
}

export default Edit;