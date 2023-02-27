export class FilterManager {
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    static filter(hawkerCentreList, criteria) {
        let returnList = hawkerCentreList;
        returnList = FilterManager.filterStar(returnList, criteria.star);
        returnList = FilterManager.filterRegion(returnList, criteria.region);
        return returnList;
    }

    static filterStar(hawkerCentreList, minStar) {
        let returnList = hawkerCentreList.filter((hawkerCentre) => {
            return (
                hawkerCentre.averageRating >= minStar ||
                (hawkerCentre.averageRating === 'Unrated' && minStar === 0)
            );
        });
        return returnList;
    }

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
