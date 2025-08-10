const MOCK_USER = {
 getAllUsers: () => {
        return {
            titre : 'Utilisateur Actif',
            nombre : 300,
        };
    },
    getNewUsers: () => {
            return {
                titre : 'Nouveaux Utilisateurs',
                nombre : 15,
            };
        },
    getCroissanceUtilisateurs: () => {
            return {
                titre : 'Croissance des Utilisateurs',
                pourcentage : '+5%',
            };
        },
    getCustomersNotes: () => {
        return {
            titre : 'Notes des Clients',
            notes: '20 pts',
        };
    },
}; 

export default MOCK_USER;
