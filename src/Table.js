import React, {Component, useState, useEffect } from 'react';
import TableUpdateBox from './TableUpdateBox'


class Table extends Component {
    constructor(props) {
        super(props);
        console.log("making table")
        this.state = {
            table_name: props.table_name,
            attributes: [],
            edit_attributes: [],
            selected_row: -1,
            table: props.table_data,
            refresh_table: props.refresh
        }
    }
    setAttributes = (attributes) => {
        this.setState({
            attributes: attributes
        });
    };

    setEditAttributes = (attributes) => {
        this.setState({
            edit_attributes: attributes
        });
    };

    setTable = (table_data) => {
        this.setState({
            table: table_data
        });
    };

    updateOnClick = (id) => {
        this.setState({
            selected_row: id
        });
    }

    deleteOnClick = (table_name, id) => {
        fetch('/' + table_name + '/delete/' + id)
    }

    renderTableHeader() {
        if (!this.state.table) return (<></>)
        let attrs = this.state.attributes;
        return (
            <>
            {
                attrs.map((key, index) => {
                    return <th key={index}>{key.toUpperCase()}</th>
                })
            }
                <th key={11}>Update</th>
                <th key={12}>Delete</th>
            </>
        )
    }
    
    renderTable() {
        if (!this.state.table) return (<></>)
        return this.state.table.map((entity, idx) => {
            const table_name = (this.state.table_name=='items') ? 'item' : this.state.table_name;
            const id = entity[table_name + '_' + 'id'] //destructuring
            return (
               <tr key={id}>
                {
                    this.state.attributes.map((attr) => {
                        return (
                            <td>{entity[attr]}</td>
                        )
                    })
                }
                <td>
                    <div class='updateRowContainer'>
                        <button type="button" class="updateRow" onClick={() => {this.updateOnClick(id)}} id="{id}">^</button>
                    </div>
                </td>
                <td>
                    <div class='deleteRowContainer'>
                        <button type="button" class="deleteRow" id="{id}" onClick={() => {this.deleteOnClick(this.state.table_name, id)}}>x</button>
                    </div>
                </td>
               </tr>
            )
        })
    }

    updateModalCloseCB = () => {
        this.setState({
            selected_row: -1
        })
    }

    render(){
        return (
            <>
        {(this.state.selected_row != -1) ? <TableUpdateBox refresh={this.state.refresh_table} table_name={this.state.table_name} id={this.state.selected_row} updateModalCloseCB={this.updateModalCloseCB} attributes={this.state.edit_attributes}/> : null}
            <div class="table-responsive">
                <h1>{this.state.table_name} results</h1>
                <table id={this.state.table} class="table table-striped table-sm">
                    <thead>
                        {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>

            </div>
            </>
        )
    }
}

export default Table