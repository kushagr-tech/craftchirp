"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, ShieldAlert, ArrowLeft, Sparkles } from "lucide-react";
import { ARTWORKS_SEED } from "@/data/catalogue";

export default function RussianInquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "Москва",
    artworkId: ARTWORKS_SEED[0].id,
    inquiryType: "acquisition",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-8 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>На главную (Return Home)</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block">
            Кураторский запрос • Craftchirp
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight">
            Частный запрос на приобретение оригиналов
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
            Галерея Craftchirp представляет уникальные оригиналы индийской народной живописи Варли и Мадхубани на натуральной основе из очищенной глины и высушенного на солнце грунта от художницы Рачаны Агарвал.
          </p>
        </div>

        {/* Compliance Notice */}
        <div className="p-5 bg-brand-sand/30 border border-brand-sand/80 rounded-xs space-y-2 mb-10 text-xs text-gray-700 font-sans">
          <div className="flex items-center space-x-2 font-bold text-[#2d2a26]">
            <ShieldAlert size={16} className="text-brand-clay" />
            <span>Информация о доставке и расчётах:</span>
          </div>
          <p className="leading-relaxed">
            В связи с ограничениями международных платёжных шлюзов автоматический чекаут для заказов из России временно приостановлен. Мы взаимодействуем с коллекционерами, галереями и декораторами напрямую через персональное кураторское сопровождение и согласование логистики.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-brand-sand p-8 sm:p-10 rounded-xs shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 size={48} className="mx-auto text-brand-olive" />
              <h3 className="font-serif text-3xl font-bold text-[#2d2a26]">Запрос успешно отправлен</h3>
              <p className="text-sm text-gray-600 font-sans max-w-md mx-auto leading-relaxed">
                Спасибо за интерес к творчеству Рачаны Агарвал. Наш куратор свяжется с вами по электронной почте в течение 24 часов для обсуждения деталей.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-8 py-3 bg-brand-clay text-white text-xs uppercase tracking-widest font-semibold"
              >
                Отправить ещё один запрос
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1.5 font-medium">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                    placeholder="Анна Смирнова"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1.5 font-medium">Email для связи *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                    placeholder="anna@example.ru"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1.5 font-medium">Город доставки *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                    placeholder="Москва, Санкт-Петербург..."
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1.5 font-medium">Интересующая работа</label>
                  <select
                    value={formData.artworkId}
                    onChange={(e) => setFormData({ ...formData, artworkId: e.target.value })}
                    className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay cursor-pointer"
                  >
                    {ARTWORKS_SEED.map((art) => (
                      <option key={art.id} value={art.id}>
                        {art.title} ({art.style} • ${art.pricePerCurrency.USD.toLocaleString()} USD)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gray-600 mb-1.5 font-medium">Комментарий или пожелания</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-brand-sand/15 border border-brand-sand p-3 rounded-xs focus:outline-none focus:border-brand-clay resize-none"
                  placeholder="Укажите ваши вопросы по оформлению, сертификату подлинности или индивидуальному заказу..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-clay text-white uppercase tracking-widest text-xs font-semibold hover:bg-brand-terracotta transition-colors flex items-center justify-center space-x-2 rounded-xs mt-4"
              >
                <Send size={13} />
                <span>Отправить кураторский запрос</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

