import React, { Component } from 'react'

export default class TableInsertBox extends Component {
    constructor(props) {
        super(props)
        this.init_state = {
            attributes: [], 
            table_name: "",
        }
        this.state = {
            attributes: [], 
            table_name: "",
        }
    }

    resetState = () => {
        console.log('reseting')
        this.setState({...this.init_state})
    }

    setTableName = (name) => {
        this.setState({
            table_name: name
        });
    };

    setAttributes = (attributes) => {
        this.setState({
            attributes: attributes
        });
    };

    handleSubmit = () => {
        const {attributes, table_name, ...form_data} = this.state;
        let request_string = ""
        Object.keys(form_data).forEach((key) => {
            request_string += key + '=' + form_data[key] + '&'
        })
        console.log(request_string)
        fetch('/' + this.state.table_name + '/insert/' + request_string)
        window.location.reload();
    }

    handleChanged = (e, attr) => {
        let data = {}
        data[attr] = e.target.value
        this.setState(data)
    }

    render() {
        return (
            <div class="d-flex justify-content-center">
            <form class="w-25">
                {
                    this.state.attributes.map((attr) => {
                        return (
                            <div class="form-group">
                                <label for="{attr}">{attr}</label>
                                <input type="text" class="form-control" id="{attr}" onChange={(e) => {this.handleChanged(e,attr)}}></input>    
                            </div>
                        )
                    })
                }
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
            </div>
        )
    }
}
