import React,{Component} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import './SituationTable.css';
import "./Graph"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class SituationTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alerts: []
        };
    }


    componentDidMount(){
        this.axiosGetData();
    }

    axiosPostDeleteData =(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8080/alert/delete/${id}`)
            .then(obj => {
                this.axiosGetData();
            });
    }



    axiosGetData = () =>{
        axios.get('http://localhost:8080/alert/getalert').then((result) => {
            this.setState({alerts: result.data});
        });
    }

    render(){
        let alertData = this.state.alerts.map((alert) => {
            return<tr key = {alert.id} >
                <td><Link to={'/graph/'+alert.id}>{alert.id}</Link></td>
                <td>{alert.name}</td>
                <td>{alert.url}</td>
                <td>{alert.method}</td>
                <td>{alert.period}</td>
                <td><Link to={'/graph/'+alert.id}><Button type="button" className="btn btn-secondary btn-button">Graph</Button></Link></td>
                <td><button type="button" className="btn btn-secondary btn-button" onClick={() => this.axiosPostDeleteData(alert.id)} >Delete</button></td>
                <td><Link to={'/updatedata/'+alert.id}><Button type="button" className="btn btn-secondary btn-button">Update</Button></Link></td>
            </tr>;
        });

        return(
            <Table responsive bordered="2" className="tablo" >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>URL</th>
                    <th>METHOD</th>
                    <th>PERIOD</th>
                </tr>
                </thead>
                <tbody>
                {alertData}
                </tbody>
            </Table>

        );
    }
}
export default SituationTable;