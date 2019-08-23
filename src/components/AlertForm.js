import React,{Component} from 'react';
import axios from 'axios';
import {InputGroup,FormControl} from 'react-bootstrap';
import "./AlertForm.css"

class AlertForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            url: '',
            method: '',
            period: '',
            leftperiod:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        const alert = {
            name: document.getElementById("name").value,
            url: document.getElementById("url").value,
            method: document.getElementById("inputGroupSelect01").value,
            period: document.getElementById("period").value,
            leftperiod:document.getElementById("period").value
        }
        axios.post('http://localhost:8080/alert/add', alert)
            .then(obj => {
            });

    }

    render(){

        return(
            <div className="mainClass">
                <InputGroup className="name">
                    <InputGroup.Prepend>
                        <h3 className="yazi">Name:</h3>
                    </InputGroup.Prepend>
                    <FormControl aria-label="name" name='name' placeholder="Name" id='name' ref={this.state.name} onChange={e => this.handleChange(e)}  />
                </InputGroup>
                <InputGroup className="url">
                    <h3 className="yazi">Url:</h3>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Http://</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Url" name='url' placeholder="www.xyz.com" id='url'ref={this.state.url}  onChange={e => this.handleChange(e)} />
                </InputGroup>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <h3 className="yazi">Method:</h3>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01">
                        <option selected >Choose</option>
                        <option value="GET">Get</option>
                        <option value="POST">Post</option>
                    </select>
                </div>
                <InputGroup className="period">
                    <InputGroup.Prepend>
                        <h3 className="yazi">Period:</h3>
                    </InputGroup.Prepend>
                    <FormControl aria-label="period" id="period" placeholder="Period" type="number" min="1" name='period' ref={this.state.period} onChange={e => this.handleChange(e)} />
                </InputGroup>
                <button type="button" className="btn-sample" onClick={(e) => this.onSubmit(e)} >Submit</button>
            </div>

        );
    }
}
export default AlertForm;