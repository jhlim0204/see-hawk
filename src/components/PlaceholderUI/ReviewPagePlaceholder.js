import { Row, Col } from 'reactstrap';

/**
 * A functional component that displays the loading animation and placeholder text.
 * @author Lim Jun Hern
 * @returns {JSX.Element} A JSX element that represents the loading animation and placeholder text.
 */
function ReviewPagePlaceholder() {
    return (
        <Row className='mb-3 placeholder-glow'>
            <Col xs={8}>
                <div className='d-flex align-items-center'>
                    <h3 className='mb-3 col-12 rounded-1 placeholder'> </h3>
                </div>

                <div className='d-flex align-items-center'>
                    <h6 className='mb-3 col-6 rounded-1 placeholder'> </h6>
                </div>
                <div className='d-flex align-items-center'>
                    <h6 className='mb-3 col-6 rounded-1 placeholder'> </h6>
                </div>
                <div className='d-flex align-items-center'>
                    <h6 className='mb-3 col-6 rounded-1 placeholder'> </h6>
                </div>
                <div className='d-flex align-items-center'>
                    <h6 className='mb-3 col-6 rounded-1 placeholder'> </h6>
                </div>
                <div className='d-flex align-items-center'>
                    <h6 className='mb-3 col-6 rounded-1 placeholder'> </h6>
                </div>
            </Col>
        </Row>
    );
}

export default ReviewPagePlaceholder;
