import { Coffee, Plus } from 'lucide-react';

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-sm border border-gray-100 border-dashed">
      <div className="bg-[#4B3621]/10 p-6 rounded-full mb-4">
        <Coffee size={48} className="text-[#4B3621]" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Menü Henüz Boş</h3>
      <p className="text-gray-500 max-w-sm mb-6 text-sm">
        Listeniz şu an boş görünüyor. Müşterilerinize sunacağınız ilk kahveyi ekleyerek başlayın.
      </p>
      <button 
        onClick={onAddClick}
        className="flex items-center gap-2 bg-[#4B3621] text-white px-6 py-3 rounded-xl hover:bg-[#3a2a1a] transition shadow-lg hover:shadow-xl font-medium"
      >
        <Plus size={20} /> İlk Ürünü Ekle
      </button>
    </div>
  );
};

export default EmptyState;