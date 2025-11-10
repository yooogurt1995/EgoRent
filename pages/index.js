import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Список товаров — можно будет добавлять через админку
const initialItems = [
  { name: "GoPro Hero 12 Black", desc: "Экшн-камера с отличной стабилизацией и 5.3K видео.", price: "от 1500₽/сутки", image: "/images/gopro.jpg" },
  { name: "Insta360 X3", desc: "Камера 360° для эффектных видео и Reels.", price: "от 1800₽/сутки", image: "/images/insta360.jpg" },
  { name: "Колонка JBL PartyBox 110", desc: "Громкая вечеринка в любом месте. Мощный звук и подсветка.", price: "от 1200₽/сутки", image: "/images/jbl110.jpg" },
  { name: "Колонка JBL PartyBox 310", desc: "Серьезный звук и до 18 часов автономности.", price: "от 2000₽/сутки", image: "/images/jbl310.jpg" },
  { name: "Камера Canon G7X Mark III", desc: "Компактная камера для блогеров и стримов.", price: "от 1700₽/сутки", image: "/images/canon.jpg" },
  { name: "Стабилизатор DJI Ronin SC", desc: "Идеален для плавных видео и съёмок на ходу.", price: "от 1000₽/сутки", image: "/images/dji.jpg" }
];

export default function EgoRent() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", desc: "", price: "", image: "" });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      setItems([...items, newItem]);
      setNewItem({ name: "", desc: "", price: "", image: "" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold">EgoRent</h1>
        <nav className="space-x-6 text-gray-700">
          <a href="#catalog" className="hover:text-black">Каталог</a>
          <a href="#reviews" className="hover:text-black">Отзывы</a>
          <a href="#contact" className="hover:text-black">Контакты</a>
          <button onClick={() => setAdminMode(!adminMode)} className="ml-4 text-sm text-gray-500 hover:text-black">{adminMode ? "Выйти из админки" : "Админ"}</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-4 bg-gray-50">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-semibold mb-4">
          Аренда техники для съёмок и отдыха в Москве
        </motion.h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          GoPro, Insta360, колонки JBL, фотоаппараты и стабилизаторы. Быстрая бронь и доставка.
        </p>
        <Button className="bg-black text-white rounded-full px-6 py-3 hover:bg-gray-800">Смотреть каталог</Button>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center">Каталог техники</h3>
        {adminMode && (
          <form onSubmit={handleAddItem} className="max-w-xl mx-auto mb-10 p-6 border rounded-xl bg-gray-50">
            <h4 className="text-xl font-semibold mb-4">Добавить товар</h4>
            <input type="text" placeholder="Название" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="w-full p-2 border rounded mb-2" required />
            <textarea placeholder="Описание" value={newItem.desc} onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })} className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Цена (например: от 1500₽/сутки)" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="w-full p-2 border rounded mb-2" required />
            <input type="text" placeholder="Путь к изображению (например: /images/newitem.jpg)" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} className="w-full p-2 border rounded mb-4" />
            <Button type="submit" className="w-full bg-black text-white">Добавить</Button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
              <CardContent className="p-4">
                <h4 className="text-xl font-semibold mb-1">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.price}</span>
                  <Button size="sm" onClick={() => setSelectedItem(item)}>Бронировать</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-gray-50 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">Отзывы клиентов</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6"><p className="text-gray-700 mb-4">“Брал GoPro в поездку — всё чётко, камера как новая.”</p><span className="font-semibold">Алексей</span></Card>
          <Card className="p-6"><p className="text-gray-700 mb-4">“Арендовали колонку JBL — звук топ! Будем обращаться снова.”</p><span className="font-semibold">Марина</span></Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">Оставить заявку</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Имя" className="w-full p-3 border rounded-xl" required />
          <input type="text" placeholder="Телеграм или телефон" className="w-full p-3 border rounded-xl" required />
          <textarea placeholder="Что хочешь арендовать и на какие даты" className="w-full p-3 border rounded-xl" rows="4"></textarea>
          <Button className="bg-black text-white rounded-full px-6 py-3 hover:bg-gray-800 w-full">Отправить заявку</Button>
        </form>
      </section>

      <footer className="text-center py-8 text-gray-500 border-t border-gray-100">© 2025 EgoRent — аренда техники в Москве</footer>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center">
            <h4 className="text-xl font-semibold mb-4">{selectedItem.name}</h4>
            <p className="text-gray-600 mb-6">Заполни форму, чтобы забронировать.</p>
            <Button className="bg-black text-white w-full" onClick={() => setSelectedItem(null)}>Закрыть</Button>
          </div>
        </div>
      )}
    </div>
  );
}
