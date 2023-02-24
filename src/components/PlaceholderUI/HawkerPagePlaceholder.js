import { Row, Col, CardImg } from "reactstrap";
import Lottie from "lottie-react";
import BarLoadingAnimation from '../Animation/barLoading.json';
import RunningLoadingAnimation from '../Animation/runningLoading.json';

export default function HawkerPagePlaceholder(props){
    return (
        <>
            <div className="background page-transition d-flex align-items-center justify-content-center">
                <Lottie className="mt-5" animationData={RunningLoadingAnimation} style={{height: 280}}/>
            </div>
            </>
    )
}