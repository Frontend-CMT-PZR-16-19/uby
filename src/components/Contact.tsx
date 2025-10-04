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
    if (!formData.email.trim()) newErrors.email = 'E-posta gereklidir';
    if (!formData.message.trim()) newErrors.message = 'Mesaj gereklidir';
    if (!recaptchaToken) newErrors.recaptcha = 'reCAPTCHA doğrulamasını tamamlamanız gereklidir';

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
    <section className="bg-gray-900 text-white">
      <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-12 lg:p-20 bg-gray-800">
              <div className="mb-12">
                <div className="text-sm tracking-[0.3em] uppercase text-white/60 mb-4">İletişim</div>
                <h2 className="text-5xl md:text-6xl font-light mb-12">
                  Bizimle<br />
                  <span className="font-bold italic">İletişime Geçin</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                <div className="border-b border-white/20 pb-6">
                  <div className="text-sm tracking-wider uppercase text-white/60 mb-2">E-posta</div>
                  <a href="mailto:bilgi@ucuncubinyil.com" className="text-2xl font-light hover:text-white/80 transition-colors">
                    bilgi@ucuncubinyil.com
                  </a>
                </div>
                
                <div className="border-b border-white/20 pb-6">
                  <div className="text-sm tracking-wider uppercase text-white/60 mb-2">Telefon</div>
                  <a href="tel:4443111" className="text-2xl font-light hover:text-white/80 transition-colors">
                    444 3 111
                  </a>
                </div>
                
                <div className="border-b border-white/20 pb-6">
                  <div className="text-sm tracking-wider uppercase text-white/60 mb-4">Adresler</div>
                  <div className='space-y-6'>
                    <div>
                    <p className="text-lg font-light mb-2">Kadıköy: Caferağa, Mühürdar Cd. No:50</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6412183631014!2d29.02113847551287!3d40.989336520591856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9971b4336d7%3A0x212748610562a9a9!2zw5zDp8O8bmPDvCBCaW55xLFsIEFrYWRlbWkgS2FkxLFrw7Z5!5e0!3m2!1str!2str!4v1758981535919!5m2!1str!2str" 
                    width="100%" 
                    height="100%"
                    loading="lazy" ></iframe>
                    </div>
                    <div>
                    <p className="text-lg font-light mb-2">Mecidiyeköy: Eski Osmanlı Sk. No:40 Kat:5</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.9911079377493!2d28.993269075517123!3d41.069187015672995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6f800b7f05d%3A0xd23adc16fdbb8ed6!2zw5zDp8O8bmPDvCBCaW55xLFsIEFrYWRlbWkgTWVjaWRpeWVrw7Z5!5e0!3m2!1str!2str!4v1758982111350!5m2!1str!2str" 
                    width="100%" 
                    height="100%"
                    loading="lazy"></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-20 bg-gray-900">
              {isSubmitted ? (
                <div className="bg-white p-12 text-center shadow-lg">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 flex items-center justify-center">
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
                      <div className="w-full bg-gray-200 h-2 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-2 transition-all ease-linear"
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none text-lg text-white placeholder-white/40 ${
                      errors.name ? 'border-red-500' : 'border-white/20 focus:border-white'
                    }`}
                    placeholder="Ad Soyad *"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>
                
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none text-lg text-white placeholder-white/40 ${
                      errors.email ? 'border-red-500' : 'border-white/20 focus:border-white'
                    }`}
                    placeholder="E-posta *"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
                
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-0 py-4 bg-transparent border-0 border-b focus:outline-none text-lg text-white placeholder-white/40 resize-none ${
                      errors.message ? 'border-red-500' : 'border-white/20 focus:border-white'
                    }`}
                    placeholder="Mesajınız *"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>
                
                <div className="space-y-2 flex flex-col items-center">
                  <div className={`${errors.recaptcha ? 'border-2 border-red-500  p-1' : ''}`}>
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
                  className="w-full bg-white text-gray-900 py-5 px-8 text-lg font-medium hover:bg-gray-100 transition-colors duration-300 tracking-wider uppercase"
                >
                  Mesaj Gönder
                </button>
              </form>
              )}
            </div>
          </div>
      </div>
    </section>
  )
}