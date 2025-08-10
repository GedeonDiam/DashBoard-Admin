const MOCK_PRODUCTS = {
    getActiveProducts: () => {
        return {
            titre : 'Active Products',
            nombre : 120,
        };
    },
    getNewProducts: () => {
        return {
            titre : 'New Products',
            nombre : 5,
        };
    },
    getCroissanceProduits: () => {
        return {
            titre : 'Croisssgjhgsjnce des Produits',
            pourcentage : '+10%',
        };
    },
    getTopCategories: () => {
        return {
            titre : 'Top Categories',
            categories: ['Electronics'],
        };
    }
};

export { MOCK_PRODUCTS };