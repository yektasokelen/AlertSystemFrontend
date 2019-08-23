import React from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import './Graph.css'


class Graph extends React.Component{

        constructor(props){
                super(props);
                this.state ={
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

                                                    situations: [['alertDate', 'success']].concat(result.data.situations.map((s) => [s.alertDate, s.success]))
                                            })
                                    }
                            });
                }




        render() {

                return (
                    <div className={'my-pretty-chart-container'}>
                            <div>
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
                            </div>
                    </div>
                );
        }
}

export default Graph;