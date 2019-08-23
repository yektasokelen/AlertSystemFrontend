import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import './Graph.css'
import Container from "react-bootstrap/Container";


class Graph extends React.Component{

        constructor(props){
                super(props);
                this.state ={
                    goBackTime:[],
                    situations: [],
                };

        }
        componentDidMount(){

                setInterval(() => {
                        this.axiosGetSituations();
                },1000);

        }

        axiosGetSituations = () => {


                        axios.get('http://localhost:8080/alert/'+this.props.match.params.id)

                            .then((result) => {

                                    if (result.data.situations) {

                                            this.setState({

                                                    situations: [['AlertDate', 'success']].concat(result.data.situations.map((s) => [s.alertDate, s.success])),

                                                    goBackTime: [['AlertDate', 'GobackTime(ms)']].concat(result.data.situations.map((e) => [e.alertDate, e.goBackTime]))
                                            })
                                    }
                            });
                }




        render() {

                return (
                    <div className={'GraphClass'}>
                        <Container>
                                <Chart
                                    chartType="ScatterChart"
                                    data={this.state.situations}
                                    options={{
                                        hAxis:{
                                            title:'saniye',

                                        },
                                        vAxis:{
                                            title:'Situations',
                                            ticks:[{v:0,f:'Fail'},{v:1,f:'Success'}]

                                        },

                                    }}
                                    graph_id="ScatterChart"
                                    width="100%"
                                    height="400px"
                                    legend_toggle
                                />
                                <br/>
                                <Chart
                                    chartType="LineChart"
                                    data={this.state.goBackTime}
                                    options={{}}
                                    graph_id="ScatterChart1"
                                    width="100%"
                                    height="400px"
                                    legend_toggle
                                />
                        </Container>


                    </div>
                );
        }
}

export default Graph;