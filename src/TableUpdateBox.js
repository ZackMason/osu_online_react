import React, { Component } from 'react'
import './TableUpdateBox.css';

export default class TableUpdateBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            non_form_data: {
                attributes: props.attributes,
                table_name: props.table_name,
                id: props.id,
                close_callback: props.updateModalCloseCB,
                submit_callback: props.updateModalSubmitCB,
                refresh_table: props.refresh
            }
        };
    }

    handleSubmit = () => {
        const {non_form_data, ...form_data} = this.state;
        const {id} = non_form_data
        let request_string = ""
        Object.keys(form_data).forEach((key) => {
            request_string += key + '=' + form_data[key] + '&'
        })
        fetch('/' + this.state.non_form_data.table_name + '/update/' + id + '/' + request_string)
        
        this.state.non_form_data.refresh_table()
        this.state.non_form_data.close_callback()
    }

    handleChanged = (e, attr) => {
        let data = {}
        data[attr] = e.target.value
        this.setState(data)
    }

    handleCloseButton = () => {
        this.state.non_form_data.close_callback()
    }

    render() {
        return (
            <div id="update-modal">
                <a href="#" class="modal__bg"></a>
                <div class="modal__content">
                    <h1 class="content__title">Update id: {this.state.id}</h1>
                    <a href="#" class="content__btn-close" onClick={this.handleCloseButton}>
                        X
                    </a>
                    <form class="">
                    {
                        this.state.non_form_data.attributes.map((attr, i) => {
                            return (
                                <div class="form-group">
                                    <label key={attr} for={attr}>{attr}</label>
                                    <input type="text" class="form-control" id={i} onChange={(e) => {this.handleChanged(e,attr)}}></input>    
                                </div>
                            )
                        })
                    }
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
