import Lottie from 'lottie-react';
import RunningLoadingAnimation from '../Animation/runningLoading.json';

/**
 * A functional component that displays the loading animation when loading.
 * @returns {JSX.Element} A JSX element that represents the aimation for transition when loading
 */
function HawkerPagePlaceholder() {
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

export default HawkerPagePlaceholder;
