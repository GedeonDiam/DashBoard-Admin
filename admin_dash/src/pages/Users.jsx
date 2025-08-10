import { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSpinner,
  FaUserCheck,
  FaUserTimes,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5500/api/stats/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // Fonction de tri
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Tri des données
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtrage des données
  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Composant pour l'icône de tri
  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-[#1A73E8]" /> : 
      <FaSortDown className="text-[#1A73E8]" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center gap-3 text-[#1A73E8]">
          <FaSpinner className="animate-spin text-2xl" />
          <span className="text-xl">Chargement des utilisateurs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F9FAFB] mb-2 flex items-center gap-3">
            <FaUsers className="text-[#1A73E8]" />
            Gestion des Utilisateurs
          </h1>
          <p className="text-[#A0A0A0]">
            Liste complète de tous les utilisateurs inscrits
          </p>
        </div>
       
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaUsers className="text-2xl text-blue-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Total utilisateurs</p>
              <p className="text-xl font-bold text-[#F9FAFB]">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaUserCheck className="text-2xl text-green-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Utilisateurs actifs</p>
              <p className="text-xl font-bold text-[#F9FAFB]">
                {users.filter(user => user.status === 'Actif').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaUserTimes className="text-2xl text-red-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Utilisateurs inactifs</p>
              <p className="text-xl font-bold text-[#F9FAFB]">
                {users.filter(user => user.status === 'Inactif').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaUserPlus className="text-2xl text-purple-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Nouveaux ce mois</p>
              <p className="text-xl font-bold text-[#F9FAFB]">
                {users.filter(user => {
                  const userDate = new Date(user.createdAt);
                  const now = new Date();
                  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                  return userDate >= lastMonth;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et contrôles */}
      <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-6 rounded-lg border border-[#2a2f3a]">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#141821] border border-[#2a2f3a] rounded-lg text-[#F9FAFB] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
            />
          </div>
          <div className="text-[#A0A0A0]">
            {filteredUsers.length} utilisateur(s) trouvé(s)
          </div>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] rounded-lg border border-[#2a2f3a] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#141821]">
              <tr>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Utilisateur
                    <SortIcon column="name" />
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-2">
                    Email
                    <SortIcon column="email" />
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('dateInscription')}
                >
                  <div className="flex items-center gap-2">
                    Date d'inscription
                    <SortIcon column="dateInscription" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-[#F9FAFB]">Dernière connexion</th>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Statut
                    <SortIcon column="status" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-[#F9FAFB]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={user.id} className="border-t border-[#2a2f3a] hover:bg-[#141821]/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#1A73E8] to-[#2E8DF7] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="font-medium text-[#F9FAFB]">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#A0A0A0]">{user.email}</td>
                  <td className="py-4 px-6 text-[#A0A0A0]">{user.dateInscription}</td>
                  <td className="py-4 px-6 text-[#A0A0A0]">{user.derniereConnexion}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Actif' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        onClick={() => console.log('Voir', user)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                        onClick={() => console.log('Éditer', user)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        onClick={() => console.log('Supprimer', user)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#141821] border-t border-[#2a2f3a]">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="text-[#A0A0A0] hover:text-[#1A73E8] disabled:text-[#4a4f5a] transition-colors"
          >
            Précédent
          </button>
          <span className="text-[#F9FAFB]">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-[#A0A0A0] hover:text-[#1A73E8] disabled:text-[#4a4f5a] transition-colors"
          >
            Suivant
          </button>
        </div>
        
        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaUsers className="mx-auto text-6xl text-[#A0A0A0] mb-4" />
            <p className="text-xl text-[#A0A0A0]">Aucun utilisateur trouvé</p>
            <p className="text-[#A0A0A0] mt-2">
              {searchTerm ? 'Essayez de modifier votre recherche' : 'Aucun utilisateur dans la base de données'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
