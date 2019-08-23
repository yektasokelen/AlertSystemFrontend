import React from 'react';
import axios from 'axios';
import {InputGroup,FormControl} from 'react-bootstrap';
import "./UpdateData.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class UpdateData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id:'',
            list:[]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.axiosGetData();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        const alert = {
            id:this.state.id,
            name: document.getElementById("name").value,
            url: document.getElementById("url").value,
            method: document.getElementById("inputGroupSelect01").value,
            period: document.getElementById("period").value,
            leftperiod:document.getElementById("period").value
        }
        axios.post('http://localhost:8080/alert/update', alert)
            .then(obj => {
            });

    }
    axiosGetData=()=>{
            axios.get('http://localhost:8080/alert/'+this.props.match.params.id).then((result) => {
                this.setState({
                    id:result.data.id,
                    name:result.data.name,
                    url:result.data.url,
                    method:result.data.method,
                    period:result.data.period,

                });
            });

    }

    render(){



        return(
            <div className="mainClass">
                <InputGroup className="name">
                    <InputGroup.Prepend>
                        <h3 className="yazi">Name:</h3>
                    </InputGroup.Prepend>
                    <FormControl aria-label="name" value = {this.state.name} name='name' placeholder="Name" id='name' ref={this.state.name} onChange={e => this.handleChange(e)}  />
                </InputGroup>
                <InputGroup className="url">
                    <h3 className="yazi">Url:</h3>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Http://</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Url" value = {this.state.url} name='url' placeholder="www.xyz.com" id='url'ref={this.state.url}  onChange={e => this.handleChange(e)} />
                </InputGroup>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <h3 className="yazi">Method:</h3>
                    </div>
                    <select value={this.state.method} className="custom-select" id="inputGroupSelect01">
                        <option selected >Choose</option>
                        <option value="GET">Get</option>
                        <option value="POST">Post</option>
                    </select>
                </div>
                <InputGroup className="period">
                    <InputGroup.Prepend>
                        <h3 className="yazi">Period:</h3>
                    </InputGroup.Prepend>
                    <FormControl aria-label="period" id="period" value={this.state.period} placeholder="Period" type="number" min="1" name='period' ref={this.state.period} onChange={e => this.handleChange(e)} />
                </InputGroup>
                <Link to={'/alertlist/'}><button type="button" className="btn-sample" onClick={(e) => this.onSubmit(e)} >Update</button></Link>
                <td><Link to={'/alertlist/'}><Button type="button" className="btn-sample">Cancel</Button></Link></td>
            </div>

        );
    }
}
export default UpdateData;