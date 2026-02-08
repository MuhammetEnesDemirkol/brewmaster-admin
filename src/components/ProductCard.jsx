import { Edit2, Trash2, Coffee } from 'lucide-react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Görsel Alanı - Yükseklik sabitlendiği için taşma yapmaz */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Kategori Etiketi - Görselin üstüne binen şık etiket */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#4B3621] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Coffee size={12} /> {product.category}
        </span>
      </div>

      {/* İçerik */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-[#4B3621]">{product.name}</h3>
          <span className="text-[#D4A373] font-bold text-lg">{product.price} ₺</span>
        </div>
        
        <div className="border-t border-gray-100 my-3"></div>

        {/* Butonlar - Yazı yerine modern ikonlar */}
        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => onEdit(product)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Edit2 size={16} /> Düzenle
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <Trash2 size={16} /> Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;