
"use client";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative w-full px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-screen overflow-hidden rounded-[2rem] shadow-xl group">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[30s] ease-out group-hover:scale-105"
              style={{
                backgroundImage: 'url(/background-image.png)',
              }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
            
            <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-white/30 animate-fade-in"></div>
            <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-white/30 animate-fade-in-delayed"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-white/30 animate-fade-in-slow"></div>
            <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-white/30 animate-fade-in-slower"></div>
            
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full max-w-3xl px-12">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full border border-white/25 animate-slide-in-up hover:bg-white/20 transition-all duration-500">
                    <span className="text-white text-sm font-semibold tracking-wide uppercase">Geleceğin İnşası</span>
                  </div>
                  
                  <h1 className="text-white text-6xl md:text-7xl font-bold leading-tight drop-shadow-2xl animate-slide-in-up-delayed hover:scale-[1.02] transition-transform duration-700">
                    Üçüncü Binyıl
                  </h1>
                  
                  <p className="text-white/95 text-2xl md:text-3xl leading-relaxed drop-shadow-lg max-w-2xl font-light animate-slide-in-up-slow hover:text-white transition-colors duration-500">
                    Geleceğini inşa etmen için seni bekliyor
                  </p>
                  
                  <div className="w-32 h-1 bg-gradient-to-r from-white to-white/60 rounded-full animate-expand-width"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        @keyframes fade-in-delayed {
          from { 
            opacity: 0; 
            transform: scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        @keyframes fade-in-slow {
          from { 
            opacity: 0; 
            transform: scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        @keyframes fade-in-slower {
          from { 
            opacity: 0; 
            transform: scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-up-delayed {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-up-slow {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expand-width {
          from { 
            width: 0; 
            opacity: 0;
          }
          to { 
            width: 8rem; 
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1.2s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .animate-fade-in-slow {
          animation: fade-in-slow 1.2s ease-out;
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
        
        .animate-fade-in-slower {
          animation: fade-in-slower 1.2s ease-out;
          animation-delay: 0.9s;
          animation-fill-mode: both;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 1.5s ease-out;
        }
        
        .animate-slide-in-up-delayed {
          animation: slide-in-up-delayed 1.8s ease-out;
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        
        .animate-slide-in-up-slow {
          animation: slide-in-up-slow 2s ease-out;
          animation-delay: 0.8s;
          animation-fill-mode: both;
        }
        
        .animate-expand-width {
          animation: expand-width 2.5s ease-out;
          animation-delay: 1.5s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
