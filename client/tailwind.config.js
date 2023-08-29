/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-red': '#ff4400',
        'primary-orange': '#FF4401',
        'primary-orange-1': '#fd7240',
        'primary-orange-2': '#ea942b',
        'primary-blue-1': '#347be2',
        'primary-blue-2': '#6570f6',
        'primary-green': '#6570f6',
        'grey-1': '#f5f6f8',
        'grey-2': '#f7f7f7',
        'grey-3': '#858EAD',
        white: '#ffffff',
        'dark-blue': '#192251',
        'dark-grey-1': '#3f4353',
        'dark-grey-2': '#97989d',
        'dark-grey-3': '#848dad',
        'dark-grey-4': '#c5d0e6',
        'dark-black-1': '#151a1d',
        'dark-black-2': '#1e252b',
        'dark-main-bg': '#262d34',
        'dark-secondary-bg': '#2c353d',
        'dark-black-5': '#192351',
        'alt-1': '#FF8F67',
        'alt-2': '#FF6934',
        'alt-3': '#FFECE6',
        'alt-4': '#EC9F41',
        'alt-5': '#FDF4EA',
        'alt-6': '#E0E2FD',
        'alt-7': '#6570F7',
        'alt-8': '#5D95E8',
        'alt-9': '#0ECC8D',
        'alt-10': '#347AE2',
        'light-blueish': '#EBF2FC',
        'see-all-btn': '#E0E2FD',
        'see-all-text-color': '#6570F7',
        'main-bg': '#F4F6F8',
      },
      boxShadow: {
        meetup: '0px 6px 6px 2px rgba(71, 153, 235, 0.04)',
        notification: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        groupSelect: '0px 4px 30px rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        xxs: '0.6rem',
      },
      keyframes: {
        leftright: {
          '0%': { transform: 'translate(-2px)' },
          '100%': { transform: 'translate(35px)' },
        },
        rightleft: {
          '0%': { transform: 'translate(35px)' },
          '100%': { transform: 'translate(4px)' },
        },
      },
      animation: {
        leftAnimate: 'leftright 200ms ease-in-out',
        rightAnimate: 'rightleft 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
