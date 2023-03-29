/**
 * A functional component that displays a row of stars, where some are filled and others are not.
 * @param {number} activeCount - The number of stars to be filled.
 * @returns {JSX.Element} A JSX element that represents the row of stars.
 */
function DisplayStarsSmall({ activeCount }) {
    const inactiveCount = 5 - activeCount;
    return (
        <>
            {Array.from(Array(activeCount), () => {
                return (
                    <i className='bi bi-star-fill active' key={Math.random()}>
                        {' '}
                    </i>
                );
            })}
            {Array.from(Array(inactiveCount), () => {
                return (
                    <i className='bi bi-star-fill' key={Math.random()}>
                        {' '}
                    </i>
                );
            })}
        </>
    );
}

export default DisplayStarsSmall;
