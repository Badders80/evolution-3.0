import React from 'react';

interface SectionCardProps {
  title: string;
  description: string | React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  children,
}) => {
  return (
    <div className="flex flex-col relative group p-6 rounded-lg">
      <div className="absolute left-0 -top-5 -bottom-5 w-[1px] bg-gradient-to-b from-transparent via-gray-600 to-transparent group-hover:via-brand-gold group-hover:shadow-[0_0_8px_1px_rgba(210,179,103,0.3)] transition-all duration-300"></div>
      <div className="pl-6 transform group-hover:scale-105 transition-transform duration-300 ease-in-out origin-top-left">
        <h3 className="text-lg font-medium text-white mb-4">
          <span className="text-brand-gold">For</span>{' '}
          <span className="relative inline-block group/heading">
            <span className="relative z-10 whitespace-nowrap">
              {title.split('').map((char, i) => (
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
          {description}
        </p>
        <div className="mt-8 w-[80%] mx-auto">
          <div 
            className="relative overflow-hidden rounded-lg group/image-container transform transition-all duration-500 ease-out hover:rotate-0 hover:scale-105" 
            style={{
              transform: 'perspective(1000px) rotateX(3deg) rotateY(-2deg)',
              boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.05)'
            }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={imageSrc} 
                alt={imageAlt}
                className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105 border border-white/10"
              />
              {/* Subtle reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
              
              {/* Pulsing ripple effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-gold/10 to-transparent opacity-70 animate-ripple-slow transition-all duration-700"></div>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-y-full -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 animate-shimmer-slow transition-all duration-700"></div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

// Animation styles that should be added to your global CSS or styles
const animationStyles = `
  @keyframes ripple-slow {
    0%, 100% {
      transform: scale(0.98);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.02);
      opacity: 0.7;
    }
  }
  @keyframes shimmer-slow {
    0% {
      left: -100%;
    }
    100% {
      left: 200%;
    }
  }
  .animate-ripple-slow {
    animation: ripple-slow 8s ease-in-out infinite;
  }
  .animate-shimmer-slow {
    animation: shimmer-slow 8s ease-in-out infinite;
  }
  .group\/heading:hover span {
    --is-hover: 1;
    --is-leaving: 0;
  }
  .group\/heading:not(:hover) span {
    --is-hover: 0;
    --is-leaving: 1;
  }
`;

// Add the styles to the head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = animationStyles;
  document.head.appendChild(style);
}
