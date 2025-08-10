import { useState, useEffect } from 'react';
import { 
  FaBoxOpen, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaSearch,
  FaDollarSign,
  FaTag,
  FaStar,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5500/api/stats/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
      setError('Erreur lors du chargement des produits');
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
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Pour gérer le cas où les valeurs sont des chaînes ou nombres, ou undefined
    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtrage des données
  const filteredProducts = sortedProducts.filter(product =>
    (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (product.category?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Composant pour l'icône de tri
  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-[#10B981]" /> : 
      <FaSortDown className="text-[#10B981]" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center gap-3 text-[#10B981]">
          <FaSpinner className="animate-spin text-2xl" />
          <span className="text-xl">Chargement des produits...</span>
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
            <FaBoxOpen className="text-[#10B981]" />
            Gestion des Produits
          </h1>
          <p className="text-[#A0A0A0]">
            Liste complète de tous les produits du catalogue
          </p>
        </div>
        
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaBoxOpen className="text-2xl text-green-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Total produits</p>
              <p className="text-xl font-bold text-[#F9FAFB]">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaCheck className="text-2xl text-green-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Produits actifs</p>
              <p className="text-xl font-bold text-[#F9FAFB]">
                {products.filter(product => product.status === 'Actif').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaStar className="text-2xl text-yellow-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Produits promus</p>
              <p className="text-xl font-bold text-[#F9FAFB]">
                {products.filter(product => product.promoted).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1f242e] to-[#252a36] p-4 rounded-lg border border-[#2a2f3a]">
          <div className="flex items-center gap-3">
            <FaDollarSign className="text-2xl text-blue-400" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Valeur totale</p>
              <p className="text-xl font-bold text-[#F9FAFB]">
                {products.reduce((total, product) => total + (product.price ?? 0), 0).toLocaleString()} FCFA
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
              placeholder="Rechercher un produit par nom, description ou catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#141821] border border-[#2a2f3a] rounded-lg text-[#F9FAFB] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
            />
          </div>
          <div className="text-[#A0A0A0]">
            {filteredProducts.length} produit(s) trouvé(s)
          </div>
        </div>
      </div>

      {/* Tableau des produits */}
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
                    Produit
                    <SortIcon column="name" />
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-[#F9FAFB]">Description</th>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Catégorie
                    <SortIcon column="category" />
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Prix
                    <SortIcon column="price" />
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 font-semibold text-[#F9FAFB] cursor-pointer hover:bg-[#1f242e] transition-colors"
                  onClick={() => handleSort('dateCreation')}
                >
                  <div className="flex items-center gap-2">
                    Date de création
                    <SortIcon column="dateCreation" />
                  </div>
                </th>
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
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-t border-[#2a2f3a] hover:bg-[#141821]/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-lg flex items-center justify-center text-white">
                        <FaTag />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#F9FAFB]">{product.name}</span>
                        {product.promoted && (
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="text-yellow-400 text-xs">Promu</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#A0A0A0]">
                    <div className="max-w-[200px] truncate" title={product.description}>
                      {product.description}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#F9FAFB]">{product.category}</td>
                  <td className="py-4 px-6 text-[#F9FAFB] font-semibold">
                    {product.price !== undefined && product.price !== null
                      ? product.price.toLocaleString()
                      : 'N/A'} FCFA
                  </td>
                  <td className="py-4 px-6 text-[#F9FAFB]">
                    {product.dateCreation ? new Date(product.dateCreation).toLocaleDateString('fr-FR') : 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    {product.status === 'Actif' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        <FaCheck />
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                        <FaTimes />
                        Inactif
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        onClick={() => console.log('Voir', product)}
                        title="Voir"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                        onClick={() => console.log('Éditer', product)}
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        onClick={() => console.log('Supprimer', product)}
                        title="Supprimer"
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
            className="text-[#A0A0A0] hover:text-[#10B981] disabled:text-[#4a4f5a] transition-colors"
          >
            Précédent
          </button>
          <span className="text-[#F9FAFB]">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-[#A0A0A0] hover:text-[#10B981] disabled:text-[#4a4f5a] transition-colors"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
