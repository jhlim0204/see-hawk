import { Row, Col } from "reactstrap";

export default function ReviewPagePlaceholder(props) {
    return(
        <Row className="mb-3 placeholder-glow">
            <Col xs={8}>
                <div className="d-flex align-items-center">
                    <h3 className='mb-3 col-12 rounded-1 placeholder'></h3>
                </div>

                <div className="d-flex align-items-center">
                    <h6 className='mb-3 col-6 rounded-1 placeholder'></h6>
                </div>
                <div className="d-flex align-items-center">
                    <h6 className='mb-3 col-6 rounded-1 placeholder'></h6>
                </div>
                <div className="d-flex align-items-center">
                    <h6 className='mb-3 col-6 rounded-1 placeholder'></h6>
                </div>
                <div className="d-flex align-items-center">
                    <h6 className='mb-3 col-6 rounded-1 placeholder'></h6>
                </div>
                <div className="d-flex align-items-center">
                    <h6 className='mb-3 col-6 rounded-1 placeholder'></h6>
                </div>
            </Col>
        </Row>
    )
}

