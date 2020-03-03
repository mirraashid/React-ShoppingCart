import React from 'react';
import './style.css';

import { Row, Col, Button } from 'reactstrap';

const OutputComponent = (props) => {
    const { totalPrice, actualPrice, isVisible } = props.parms;

    const handleRefresh = () => {
        window.location.reload();
    }

    const Custstyle = isVisible ? ({ padding: '20px' }) : ({ padding: '20px', display: 'none' });

    return (
        <div className="cntr">
            <div className="sm-hdr">Order Summary</div>
            <Col style={Custstyle}>
                <Row>
                    <Col className="b-r">
                        <div className="sub-content">Total Price: </div>
                        <span className="price-container">${actualPrice.toLocaleString()}</span>
                    </Col>
                    <Col style={{ color: '#229827' }}>
                        <div className="sub-content">Dicounted Price: </div>
                        <span className="price-container">${totalPrice.toLocaleString()}</span>
                    </Col>
                </Row>

                <Row style={{ marginTop: '30px' }}>
                    <Col>
                        <h3>You saved a total of ${(actualPrice - totalPrice).toLocaleString()} on this purchase</h3>
                    </Col>
                </Row>
                <Row style={{ marginTop: '30px', textAlign: 'center', display: 'block' }}>
                    <Button color="danger" size="md" onClick={handleRefresh}>Reset</Button>
                </Row>
            </Col>

        </div>
    )
}

export default OutputComponent;