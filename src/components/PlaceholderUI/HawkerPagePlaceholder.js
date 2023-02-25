import Lottie from "lottie-react";
import RunningLoadingAnimation from '../Animation/runningLoading.json';

export default function HawkerPagePlaceholder(props){
    return (
        <>
            <div className="mt-5 pt-5 page-transition d-flex align-items-center justify-content-center">
                <Lottie className="mt-2" animationData={RunningLoadingAnimation} style={{height: 400}}/>
            </div>
            </>
    )
}