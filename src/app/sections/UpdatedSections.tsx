import React from 'react';

export const BreedersSection = () => (
  <div className="flex flex-col relative group p-6 rounded-lg">
    <div className="absolute left-0 -top-5 -bottom-5 w-[1px] bg-gradient-to-b from-transparent via-gray-600 to-transparent group-hover:via-brand-gold group-hover:shadow-[0_0_8px_1px_rgba(210,179,103,0.3)] transition-all duration-300"></div>
    <div className="pl-6 transform group-hover:scale-105 transition-transform duration-300 ease-in-out origin-top-left">
      <h3 className="text-lg font-medium text-white mb-4">
        <span className="text-brand-gold">For</span>{' '}
        <span className="relative inline-block group/heading">
          <span className="relative z-10 whitespace-nowrap">
            {'Breeders & Syndicators'.split('').map((char, i) => (
              <span 
                key={i}
                className="inline-block transition-all duration-200 group-hover:text-brand-gold"
                style={{
                  transitionProperty: 'color',
                  transitionDuration: '0.2s',
                  transitionDelay: `calc(var(--is-hover, 0) * ${i * 0.03}s + var(--is-leaving, 0) * ${(10 - i) * 0.02}s)`,
                  transform: 'translateZ(0)'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      </h3>
      <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed mb-6 transition-all duration-300">
        <span className="group-hover:text-gray-200 transition-colors duration-300">
          Unlock new income streams on your terms—flexible structures while retaining control. Access a fresh market of passionate investors.
        </span>
      </p>
      <div className="mt-8 w-[80%] mx-auto">
        <div className="relative overflow-hidden rounded-lg group/image-container transform transition-all duration-500 ease-out hover:rotate-0 hover:scale-105" 
             style={{
               transform: 'perspective(1000px) rotateX(3deg) rotateY(-2deg)',
               boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.05)'
             }}>
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/images/Untitled design (16).svg" 
              alt="Breeders & Syndicators"
              className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105 border border-white/10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-gold/10 to-transparent opacity-70 animate-ripple-slow transition-all duration-700"></div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-y-full -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 animate-shimmer-slow transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ClubsSection = () => (
  <div className="flex flex-col relative group p-6 rounded-lg">
    <div className="absolute left-0 -top-5 -bottom-5 w-[1px] bg-gradient-to-b from-transparent via-gray-600 to-transparent group-hover:via-brand-gold group-hover:shadow-[0_0_8px_1px_rgba(210,179,103,0.3)] transition-all duration-300"></div>
    <div className="pl-6 transform group-hover:scale-105 transition-transform duration-300 ease-in-out origin-top-left">
      <h3 className="text-lg font-medium text-white mb-4">
        <span className="text-brand-gold">For</span>{' '}
        <span className="relative inline-block group/heading">
          <span className="relative z-10 whitespace-nowrap">
            {'Clubs & Organisations'.split('').map((char, i) => (
              <span 
                key={i}
                className="inline-block transition-all duration-200 group-hover:text-brand-gold"
                style={{
                  transitionProperty: 'color',
                  transitionDuration: '0.2s',
                  transitionDelay: `calc(var(--is-hover, 0) * ${i * 0.03}s + var(--is-leaving, 0) * ${(10 - i) * 0.02}s)`,
                  transform: 'translateZ(0)'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      </h3>
      <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed mb-6 transition-all duration-300">
        Future-proof racing by welcoming broader audiences, fostering participation, and unlocking sustainable revenue pathways.
      </p>
      <div className="mt-8 w-[80%] mx-auto">
        <div className="relative overflow-hidden rounded-lg group/image-container transform transition-all duration-500 ease-out hover:rotate-0 hover:scale-105" 
             style={{
               transform: 'perspective(1000px) rotateX(3deg) rotateY(-2deg)',
               boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.05)'
             }}>
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/images/Untitled design (19).svg" 
              alt="Clubs & Organisations"
              className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105 border border-white/10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-gold/10 to-transparent opacity-70 animate-ripple-slow transition-all duration-700"></div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-y-full -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 animate-shimmer-slow transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
