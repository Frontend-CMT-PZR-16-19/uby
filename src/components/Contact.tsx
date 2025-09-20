"use client"

import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: '',
    campaign: '',
    course: '',
    subject: '',
    message: ''
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Ad Soyad gereklidir';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon numarası gereklidir';
    if (!formData.email.trim()) newErrors.email = 'E-posta gereklidir';
    if (!formData.branch) newErrors.branch = 'Şube seçimi gereklidir';
    if (!formData.course.trim()) newErrors.course = 'İlgilendiğiniz kurs gereklidir';
    if (!formData.message.trim()) newErrors.message = 'Mesaj gereklidir';
    if (!recaptchaToken) newErrors.recaptcha = 'reCAPTCHA doğrulamasını tamamlamanız gereklidir';

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (örn: 05551234567)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form başarıyla gönderildi:', { ...formData, recaptchaToken });
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          branch: '',
          campaign: '',
          course: '',
          subject: '',
          message: ''
        });
        setRecaptchaToken(null);
        setIsSubmitted(false);
      }, 8000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token && errors.recaptcha) {
      setErrors(prev => ({ ...prev, recaptcha: '' }));
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-white mb-4">
              İletişim
            </h2>
            <p className="text-gray-300 text-lg">
              Bizimle İletişime Geç ve Geleceğini İnşa Et
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white/90 mb-6">
                  İletişim Bilgileri
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-400">E-posta</p>
                      <p className="text-gray-300 font-medium">bilgi@ucuncubinyil.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-400">Telefon</p>
                      <p className="text-gray-300 font-medium">444 3 111</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="text-sm text-gray-400">Adres</p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-300 font-medium">Kadıköy Şube</p>
                          <p className="text-gray-400 text-sm mb-3">Caferağa, Mühürdar Cd. No:50, 34734 Kadıköy/İstanbul</p>
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.7!2d29.0229!3d40.9858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab8f9f2e9b5b5%3A0x1234567890abcdef!2sCafera%C4%9Fa%2C%20M%C3%BCh%C3%BCrdar%20Cd.%20No%3A50%2C%2034734%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                            width="100%"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg"
                          ></iframe>
                        </div>
                        <div>
                          <p className="text-gray-300 font-medium">Mecidiyeköy Şube</p>
                          <p className="text-gray-400 text-sm mb-3">Mecidiyeköy, Eski Osmanlı Sk. No:40 Kat:5, 34387 Şişli/İstanbul</p>
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8!2d28.9784!3d41.0661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7d5e2f4b123%3A0xabcdef1234567890!2sMecidiyek%C3%B6y%2C%20Eski%20Osmanl%C4%B1%20Sk.%20No%3A40%20Kat%3A5%2C%2034387%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1234567890124!5m2!1str!2str"
                            width="100%"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div>
              <h3 className="text-xl font-medium text-white/90 mb-6">
                Bize Yazın
              </h3>
              {isSubmitted ? (
                <div className="bg-white rounded-lg p-12 text-center shadow-lg">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-800">
                      Mesajınız Başarıyla Gönderildi!
                    </h4>
                    
                    <p className="text-gray-600 text-lg max-w-md">
                      Talebiniz alınmıştır. En kısa sürede size dönüş yapacağız.
                    </p>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Acil durumlar için: <span className="font-medium text-gray-700">444 3 111</span></p>
                      <p>E-posta: <span className="font-medium text-gray-700">bilgi@ucuncubinyil.com</span></p>
                    </div>
                    
                    <div className="w-full max-w-xs">
                      <div className="text-xs text-gray-500 mb-2">Form otomatik olarak temizlenecek...</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all ease-linear"
                          style={{
                            width: '0%',
                            animation: 'shrinkWidth 8s linear forwards'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Ad Soyad <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                        errors.name ? 'border-red-500 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
                      }`}
                      placeholder="Adınızı giriniz"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon Numarası <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                        errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
                      }`}
                      placeholder="0555 123 45 67"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-posta <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                      errors.email ? 'border-red-500 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
                    }`}
                    placeholder="E-posta adresiniz"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-300 mb-2">
                      Şube Seçiniz <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 text-white ${
                        errors.branch ? 'border-red-500 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
                      }`}
                    >
                      <option value="" className="text-gray-400">Şube seçiniz</option>
                      <option value="mecidiyekoy" className="bg-slate-700 text-white">Mecidiyeköy</option>
                      <option value="kadikoy" className="bg-slate-700 text-white">Kadıköy</option>
                      <option value="online" className="bg-slate-700 text-white">Online</option>
                    </select>
                    {errors.branch && <p className="mt-1 text-sm text-red-400">{errors.branch}</p>}
                  </div>
                  <div>
                    <label htmlFor="campaign" className="block text-sm font-medium text-gray-300 mb-2">
                      Kampanya Seçiniz
                    </label>
                    <select
                      id="campaign"
                      name="campaign"
                      value={formData.campaign}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    >
                      <option value="" className="text-gray-400">Kampanya seçiniz</option>
                      <option value="weekday-evening" className="bg-slate-700 text-white">Hafta İçi Akşam Kursu (%15 İndirim)</option>
                      <option value="weekend" className="bg-slate-700 text-white">Hafta Sonu Kursu (%15 İndirim)</option>
                      <option value="weekday-day" className="bg-slate-700 text-white">Hafta İçi Gündüz Kursu (%15 İndirim)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-300 mb-2">
                    İlgilendiğiniz Kurs <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                      errors.course ? 'border-red-500 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
                    }`}
                    placeholder="Hangi kursa ilgi duyuyorsunuz?"
                  />
                  {errors.course && <p className="mt-1 text-sm text-red-400">{errors.course}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                    placeholder="Mesaj konusu"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mesaj <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 resize-none ${
                      errors.message ? 'border-red-500 focus:ring-red-400' : 'border-slate-600 focus:ring-blue-400'
                    }`}
                    placeholder="Mesajınızı buraya yazınız"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>
                
                <div className="space-y-2 flex flex-col items-center">
                  <div className={`${errors.recaptcha ? 'border-2 border-red-500 rounded-lg p-1' : ''}`}>
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleRecaptchaChange}
                      theme="light"
                      size="normal"
                    />
                  </div>
                  {errors.recaptcha && <p className="text-sm text-red-400 text-center">{errors.recaptcha}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Mesaj Gönder
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}