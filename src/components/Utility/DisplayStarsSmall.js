function DisplayStarsSmall({activeCount}) {
    const inactiveCount = 5 - activeCount;
    return(
        <>
        {
            Array.from(Array(activeCount), () => {
                return <i className="bi bi-star-fill active"> </i>
            })
        }
        {
            Array.from(Array(inactiveCount), () => {
                return <i className="bi bi-star-fill"> </i>
            })
        }
        </>
    )
}

export default DisplayStarsSmall;