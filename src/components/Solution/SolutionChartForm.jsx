import React, { Component } from "react";
import { Card } from "components/Card/Card.jsx";
import { FormGroup, ControlLabel, Button} from "react-bootstrap";
import Select from 'react-select';
import { retriveRepo, retrieveCharts } from 'client-api/apicall.jsx';

export class SolutionChartForm extends Component {

    state = {
        formData: {
            release_id: '',
            chartName: '', 
        },
        charts: [],
        repositories: [],
        selectedRepository: {},
        selectedChart: {},
    }    

    componentDidMount() {
        if(this.props.editItem) {
            this.setState(() => ({
                formData: this.props.editItem
            }));
        } else {
            this.setState(() => ({
                formData: {}
            }));
        }
        retriveRepo(this);
    }    

    handleChange = event => {
        const { value, name } = event.target;
        this.setState(state => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }));
    }

    saveClick = event => {
        event.preventDefault();
        const data = this.state.formData;
        data.chartName = this.state.selectedChart.value;
        this.props.saveClick(data);
    }    

    handleRepositoryChange = (selectedRepository) => {
        this.setState({ selectedRepository });
        retrieveCharts(this, selectedRepository.value, false);
    }

    handleChartChange = (selectedChart) => {
        this.setState({ selectedChart });
    }

    render() {
        const { editMode } = this.props;
        const { selectedChart } = this.state;
        const { selectedRepository } = this.state;

        return (
            <div>
                <Card title={editMode ? "Edit Chart Association" : "New Chart Association"}
                    content={
                        <form>

                            <FormGroup>
                                <ControlLabel>Repository</ControlLabel>
                                <Select value={selectedRepository} onChange={this.handleRepositoryChange} options={this.state.repositories} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Helm Chart</ControlLabel>
                                <Select value={selectedChart} onChange={this.handleChartChange} options={this.state.charts} />
                            </FormGroup>

                            <div className="btn-toolbar">
                                <div className="btn-group">
                                    <Button bsStyle="info" type="button" onClick={this.saveClick}>
                                        Save
                                    </Button>
                                </div>
                                <div className="btn-group">
                                    <Button bsStyle="info" type="button" onClick={this.props.cancelClick}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </form>
                    }
                />
            </div>
        );
    }
}

export default SolutionChartForm;
