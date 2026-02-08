import { useState, useEffect } from 'react';

// initialData: Eğer düzenleme yapıyorsak dolu gelir, ekleme yapıyorsak null gelir
const ProductForm = ({ onAdd, onUpdate, onCancel, initialData }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Sıcak',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000'
  });

  // Bu sihirli kod: Form açıldığında "Düzenleme" mi yoksa "Yeni Ekleme" mi olduğunu anlar
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Kutuları ürün bilgisiyle doldur
    } else {
      // Formu sıfırla
      setFormData({
        name: '',
        price: '',
        category: 'Sıcak',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000'
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      // Eğer düzenleme modundaysak Güncelleme fonksiyonunu çalıştır
      onUpdate(formData);
    } else {
      // Değilsek Ekleme fonksiyonunu çalıştır
      onAdd(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-[#4B3621]">
          {initialData ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-600">Ürün Adı</label>
          <input 
            type="text" 
            className="border p-2 rounded-lg focus:ring-2 focus:ring-[#4B3621] outline-none"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          
          <label className="text-sm font-semibold text-gray-600">Fiyat (TL)</label>
          <input 
            type="number" 
            className="border p-2 rounded-lg focus:ring-2 focus:ring-[#4B3621] outline-none"
            required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />

          <label className="text-sm font-semibold text-gray-600">Kategori</label>
          <select 
            className="border p-2 rounded-lg focus:ring-2 focus:ring-[#4B3621] outline-none"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Sıcak">Sıcak Kahve</option>
            <option value="Soğuk">Soğuk Kahve</option>
            <option value="Tatlılar">Tatlılar</option>
          </select>

          <div className="flex gap-2 mt-4">
            <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 font-medium">
              İptal
            </button>
            <button type="submit" className="flex-1 bg-[#4B3621] text-white py-2 rounded-lg hover:bg-[#3a2a1a] font-medium">
              {initialData ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;