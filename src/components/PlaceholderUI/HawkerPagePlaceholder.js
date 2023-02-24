import { Row, Col, CardImg } from "reactstrap";

export default function HawkerPagePlaceholder(props){
    return (
        <>
            <div className="background page-transition">
                <Row className="mb-3 placeholder-glow">
                    <Col xs={9} className="mt-auto mb-2">
                        <Row>
                            <Col xs={3}>
                            
                                <CardImg className="card-left placeholder" height={200}>
                                </CardImg>
                            </Col>
                            <Col xs={9} className="mt-auto">
                                <h1 className='col-12 me-auto rounded-1 placeholder'></h1>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="content rounded shadow-sm" style={{height:"300px"}}>
                    <Row className="mt-3 placeholder-glow">
                        <Col className="hawker-detail border-end">
                            <p className='col-5 mt-3 mb-2 rounded-1 placeholder'></p>
                            <p className='col-10 mt-3 mb-2 rounded-1 placeholder'></p>
                            <p className='col-6 mt-3 mb-2 rounded-1 placeholder'></p>
                            <p className='col-7 mt-3 mb-2 rounded-1 placeholder'></p>
                            <p className='col-7 mt-3 mb-2 rounded-1 placeholder'></p>
                        </Col>
                    </Row>
                </div>
            </div>
            </>
    )
}