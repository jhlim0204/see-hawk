export class FilterManager {
    /**
     * Constructor for FilterManager
     * @throws Will throw effor if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to filter hawkerCentreList depending on criteria
     * @param {hawkerCentreList} - hawkerCentreList
     * @param {criteria} - criteria
     * @returns {hawkerCentre[]} - returns filtered hawkerCentres
     */
    static filter(hawkerCentreList, criteria) {
        let returnList = hawkerCentreList;
        returnList = FilterManager.filterStar(returnList, criteria.star);
        returnList = FilterManager.filterRegion(returnList, criteria.region);
        return returnList;
    }
    /**
     * Method to filter hawkerCentre list based on reviewStar
     * @param {hawkerCentreList} - hawkerCentreList
     * @param {Number} - minStar
     * @returns {hawkerCentre[]} - returns filtered hawkerCentres
     */
    static filterStar(hawkerCentreList, minStar) {
        let returnList = hawkerCentreList.filter((hawkerCentre) => {
            return (
                hawkerCentre.averageRating >= minStar ||
                (hawkerCentre.averageRating === 'Unrated' && minStar === 0)
            );
        });
        return returnList;
    }

    /**
     * Method to filter hawkerCentre list based on region
     * @param {hawkerCentreList} - hawkerCentreList
     * @param {region} - minStar
     * @returns {hawkerCenter[]} - returns filtered hawkerCentres
     */
    static filterRegion(hawkerCentreList, region) {
        const regionSet = new Set();
        for (const key in region) {
            if (region[key]) {
                regionSet.add(key);
            }
        }

        if (regionSet.size === 0) {
            return hawkerCentreList;
        }

        let returnList = hawkerCentreList.filter((hawkerCentre) =>
            regionSet.has(FilterManager.convertAddressToRegion(hawkerCentre.address))
        );

        return returnList;
    }

    /**
     * Method to convert adress to region using postal code
     * W: 60 <= postalCode <= 71
     * N: 72 <= postalCode <= 76
     * E: 46 <= postalCode <= 52
     * NE: 53 <= postalCode <= 55 or 79 <= postalCode <= 82 except for 81
     * C: 1 <= postalCode <= 41 or 56 <= postalCode <= 82 except for 59
     * @param {String} - address
     * @returns {String} - returns W for west,N for north, E for east, NE for northeast, C for central. 
     */
    static convertAddressToRegion(address) {
        let postalCode = (address.match(/\d{6}/) || [false])[0];
        if (postalCode) {
            postalCode = Number(postalCode.slice(0, 2));
            if (60 <= postalCode && postalCode <= 71) {
                console.log(postalCode);
                return 'W';
            }
            if (72 <= postalCode && postalCode <= 76) {
                return 'N';
            }
            if ((46 <= postalCode && postalCode <= 52) || postalCode === 81) {
                return 'E';
            }
            if ((53 <= postalCode && postalCode <= 55) || (79 <= postalCode && postalCode <= 82)) {
                //if postal code == 81, it will be matched in the previous condition, so ok
                return 'NE';
            }
            if ((1 <= postalCode && postalCode <= 45) || (56 <= postalCode && postalCode <= 59)) {
                return 'C';
            }
        }

        return 'NA';
    }
}
