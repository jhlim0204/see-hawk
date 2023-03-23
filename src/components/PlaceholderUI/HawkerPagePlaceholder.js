import Lottie from 'lottie-react';
import RunningLoadingAnimation from '../Animation/runningLoading.json';
/**
 * @function
 * HawkerPagePlaceholder
 * @description Place loading animation for transition
 * @return Animation for transition when loading
 */
export default function HawkerPagePlaceholder() {
    return (
        <>
            <div className='mt-5 pt-5 page-transition d-flex align-items-center justify-content-center'>
                <Lottie
                    className='mt-2'
                    animationData={RunningLoadingAnimation}
                    style={{ height: 400 }}
                />
            </div>
        </>
    );
}
