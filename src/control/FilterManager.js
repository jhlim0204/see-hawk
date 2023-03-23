/**
 * Class for filtering hawker centres
 */
export class FilterManager {
    /**
     * Constructor for FilterManager
     * @throws Will throw error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to filter the list of hawker centres depending on criteria
     * @param {Object[]} hawkerCentreList - The list of hawker centres to be filtered
     * @param {Object} criteria - The criteria
     * @returns {Object[]} The filtered hawker centres
     */
    static filter(hawkerCentreList, criteria) {
        let returnList = hawkerCentreList;
        returnList = FilterManager.filterStar(returnList, criteria.star);
        returnList = FilterManager.filterRegion(returnList, criteria.region);
        return returnList;
    }

    /**
     * Method to filter the list of hawker centres based on the numerical rating
     * @param {Object[]} hawkerCentreList - The list of hawker centres to be filtered
     * @param {number} minStar - The minimum star allowed
     * @returns {Object[]} The filtered hawker centres
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
     * Method to filter the list of hawker centres based on region
     * @param {Object[]} hawkerCentreList - The list of hawker centres to be filtered
     * @param {region} region - The regions allowed
     * @returns {Object[]} The filtered hawker centres
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
     * Method to convert address to region using first two digit of postal code
     * W: 60 <= postalCode <= 71
     * N: 72 <= postalCode <= 76
     * E: 46 <= postalCode <= 52
     * NE: 53 <= postalCode <= 55 or 79 <= postalCode <= 82 except for 81
     * C: 1 <= postalCode <= 45 or 56 <= postalCode <= 59
     * NA: No match
     * @param {string} address - The address of the hawker centre
     * @returns {string} The region code
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