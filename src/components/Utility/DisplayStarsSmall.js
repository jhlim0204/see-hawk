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
