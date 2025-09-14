
"use client";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative w-full">
        <div className="w-full">
          <div className="relative w-full h-screen overflow-hidden shadow-xl group">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[30s] ease-out group-hover:scale-105"
              style={{
                backgroundImage: 'url(/background-image.png)',
              }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full px-8">
                <div className="max-w-md ml-12">
                  <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-2xl">
                    Üçüncü Binyıl - Geleceğini inşa etmen için seni bekliyor
                  </h1>
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
