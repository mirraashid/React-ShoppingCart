import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './style.css';

class InputComp extends Component {

    state = {
        input: ''
    }

    render() {
        const ValidateInput = (event) => {
            //Function for validating the input entered into the text field
            const re = /^[A-Z\b]+$/;
            if (event.target.value === '' || re.test(event.target.value)) {
                this.setState({ input: event.target.value })
            }
        }


        return (
            <div style={{ marginTop: '30px' }} >
                <input value={this.state.input} type="text" className="custom-input" onChange={(event) => ValidateInput(event)} />
                <Button color="primary" size="md" onClick={(e) => this.props.calculate(e, this.state.input)}>Calculate Price</Button> <br />
                <span>Valid inputs - [A, B, C, D]</span>
            </div>
        )
    }


}

export default InputComp;