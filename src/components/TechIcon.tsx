import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4', size = 16 }) => {
  const norm = name.toLowerCase().replace(/[^a-z0-9+]/g, '');

  switch (norm) {
    case 'python':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.814v.826H3.85S0 5.79 0 11.908c0 6.12 3.36 5.912 3.36 5.912h2.004v-2.816s-.108-3.36 3.307-3.36h5.688s3.193.05 3.193-3.138V3.138S18.06 0 11.914 0zm-3.36 1.834a1.008 1.008 0 1 1 0 2.016 1.008 1.008 0 0 1 0-2.016zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752H11.98v-.826h8.17s3.85.444 3.85-5.674c0-6.118-3.36-5.912-3.36-5.912h-2.004v2.816s.108 3.36-3.307 3.36H9.641s-3.193-.05-3.193 3.138v5.374S5.94 24 12.086 24zm3.36-1.834a1.008 1.008 0 1 1 0-2.016 1.008 1.008 0 0 1 0 2.016z" />
        </svg>
      );

    case 'c++':
    case 'cpp':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M22.394 6.007l-9.878-5.7a1.026 1.026 0 0 0-1.032 0l-9.878 5.7a1.03 1.03 0 0 0-.516.893v11.4a1.03 1.03 0 0 0 .516.893l9.878 5.7a1.026 1.026 0 0 0 1.032 0l9.878-5.7a1.03 1.03 0 0 0 .516-.893v-11.4a1.03 1.03 0 0 0-.516-.893zM10.96 15.688a4.2 4.2 0 1 1 0-7.376.685.685 0 0 1 .686 1.187 2.829 2.829 0 1 0 0 5.002.685.685 0 0 1-.686 1.187zm5.02-3.003h-1.03v1.03a.685.685 0 1 1-1.37 0v-1.03h-1.03a.685.685 0 0 1 0-1.37h1.03v-1.03a.685.685 0 1 1 1.37 0v1.03h1.03a.685.685 0 1 1 0 1.37zm5.485 0h-1.03v1.03a.685.685 0 1 1-1.37 0v-1.03h-1.03a.685.685 0 1 1 0-1.37h1.03v-1.03a.685.685 0 1 1 1.37 0v1.03h1.03a.685.685 0 1 1 0 1.37z" />
        </svg>
      );

    case 'react':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
        >
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );

    case 'nextjs':
    case 'next':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.83 17.658l-5.69-8.47v8.47h-2.14V6.342h2.24l5.59 8.35V6.342h2.14v11.316h-2.14z" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.071 5.143h3.429L10.5 12h4.286L8.571 18.857 10.5 12.857H7.071l3.858-7.714z" />
        </svg>
      );

    case 'opencv':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <circle cx="12" cy="6" r="3.6" fill="currentColor" />
          <circle cx="6.5" cy="15.5" r="3.6" fill="currentColor" />
          <circle cx="17.5" cy="15.5" r="3.6" fill="currentColor" />
          <path
            d="M12 9.6v1.8m-3.6 2.4l1.5-.9m4.2 0l1.5.9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'threejs':
    case 'three':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M21.93 17.75l-9.42-16.32a.59.59 0 0 0-1.02 0L2.07 17.75a.59.59 0 0 0 .51.89h18.84a.59.59 0 0 0 .51-.89zM12 4.41l7.46 12.93H4.54L12 4.41z" />
          <circle cx="12" cy="13" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'pytorch':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M12.632 0a.72.72 0 0 0-.508.21L9.299 3.037a.72.72 0 0 0 1.018 1.018l2.008-2.008 5.766 5.767a8.558 8.558 0 1 1-12.103 0 .72.72 0 1 0-1.018-1.018 9.997 9.997 0 1 0 14.139 0l-5.968-5.968a.72.72 0 0 0-.509-.21v-.618z" />
          <circle cx="16.5" cy="5.5" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'docker':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.576a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.886c0 .102.083.186.185.186m0 2.715h2.118a.186.186 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.083.186.185.186m-2.954 0h2.118a.186.186 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.186H8.075a.185.185 0 0 0-.185.186v1.887c0 .102.083.186.185.186m-2.954 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186H5.121a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m2.954 0h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186H8.075a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m2.954 0h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185M23.959 11.9a3.8 3.8 0 0 0-2.482-3.535l-.266-.101-.177.224c-.475.6-.968.966-1.572 1.157a6.6 6.6 0 0 0-.663.149H17.88a.4.4 0 0 0-.397.397v3.256c0 .874-.712 1.586-1.587 1.586H3.342c-.22 0-.4-.179-.4-.4 0-.189.13-.347.31-.387a5.5 5.5 0 0 1 1.228-.138c2.812 0 4.168-1.554 4.168-3.037V10.8a.4.4 0 0 0-.4-.4H2.434a.4.4 0 0 0-.4.4v.266C2.034 16.51 5.926 20.4 12 20.4c6.31 0 11.233-4.143 11.959-8.5" />
        </svg>
      );

    case 'redis':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M21.574 6.786L12.51 2.3a1.144 1.144 0 0 0-1.02 0L2.426 6.786a1.14 1.14 0 0 0 0 2.044L6.1 10.643V14.5a1.14 1.14 0 0 0 .633 1.023l4.757 2.378a1.14 1.14 0 0 0 1.02 0l4.757-2.378a1.14 1.14 0 0 0 .633-1.023v-3.857l3.674-1.813a1.14 1.14 0 0 0 0-2.044z" />
        </svg>
      );

    case 'github':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'webgl':
    case 'lif':
    case 'ast':
    case 'treesitter':
    case 'chromadb':
    case 'numpy':
    case 'canvas':
    case 'compiler':
    case 'mediapipe':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={className}
        >
          <rect x="3" y="3" width="18" height="18" />
          <path d="M7 7l10 10M17 7L7 17" />
        </svg>
      );
  }
};

export default TechIcon;
