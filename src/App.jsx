import { useState } from 'react';
import { Plus, Search, Coffee } from 'lucide-react'; 
import { Toaster, toast } from 'react-hot-toast';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import EmptyState from './components/EmptyState';
import { initialProducts } from './interfaces/data';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Ürün başarıyla silindi!", { icon: '🗑️' });
    }
  };

  const handleAdd = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }; 
    setProducts([...products, productWithId]);
    setIsFormOpen(false);
    toast.success("Yeni kahve menüye eklendi!", { icon: '☕' });
  };

  const handleUpdate = (updatedProduct) => {
    const updatedList = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedList);
    setIsFormOpen(false);
    setEditingProduct(null);
    toast.success("Ürün güncellendi!", { icon: '👍' });
  };

  // ARAMA FİLTRESİ
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-6 md:p-12 font-sans">
      <Toaster position="bottom-right" />

      <div className="max-w-6xl mx-auto mb-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#4B3621] p-3 rounded-xl text-white">
              <Coffee size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#4B3621]">BrewMaster</h1>
              <p className="text-gray-500 text-sm">Yönetim Paneli</p>
            </div>
          </div>
          
          <button 
            onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
            className="flex items-center gap-2 bg-[#4B3621] text-white px-5 py-3 rounded-xl hover:bg-[#3a2a1a] transition shadow-lg hover:shadow-xl font-medium"
          >
            <Plus size={20} /> Yeni Ürün Ekle
          </button>
        </div>

        {/* ARAMA ÇUBUĞU - Kritik UX Detayı */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Kahve veya kategori ara..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-[#4B3621]/20 focus:outline-none bg-white text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* LİSTELEME ALANI */}
      <div className="max-w-6xl mx-auto">
        {products.length === 0 ? (
          <EmptyState onAddClick={() => setIsFormOpen(true)} />
        ) : filteredProducts.length === 0 ? (
           <div className="text-center py-12">
             <p className="text-gray-500 text-lg">"{searchTerm}" için sonuç bulunamadı.</p>
             <button onClick={() => setSearchTerm("")} className="text-[#4B3621] font-bold mt-2 hover:underline">Aramayı Temizle</button>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onDelete={handleDelete}
                onEdit={(prod) => { setEditingProduct(prod); setIsFormOpen(true); }}
              />
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <ProductForm 
          onAdd={handleAdd} 
          onUpdate={handleUpdate}
          initialData={editingProduct} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;