
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'outfit': ['Outfit', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// GreenWise Brand Colors
				sage: {
					DEFAULT: '#7C9082',
					50: '#F0F3F1',
					100: '#E1E7E3',
					200: '#C3CFC7',
					300: '#A5B7AB',
					400: '#879F8F',
					500: '#7C9082',
					600: '#6A7D70',
					700: '#586A5E',
					800: '#46574C',
					900: '#34443A',
				},
				earth: {
					DEFAULT: '#8B7355',
					50: '#F2F0ED',
					100: '#E5E1DB',
					200: '#CBC3B7',
					300: '#B1A593',
					400: '#9D8974',
					500: '#8B7355',
					600: '#786149',
					700: '#654F3D',
					800: '#523D31',
					900: '#3F2B25',
				},
				forest: {
					DEFAULT: '#2C5530',
					50: '#E8F0E9',
					100: '#D1E1D3',
					200: '#A3C3A7',
					300: '#75A57B',
					400: '#47874F',
					500: '#2C5530',
					600: '#234428',
					700: '#1A3320',
					800: '#112218',
					900: '#081110',
				},
				cream: {
					DEFAULT: '#F5F5F0',
					50: '#FEFEFE',
					100: '#FDFDFC',
					200: '#FBFBF8',
					300: '#F9F9F4',
					400: '#F7F7F2',
					500: '#F5F5F0',
					600: '#E8E8DD',
					700: '#DBDBCA',
					800: '#CECEB7',
					900: '#C1C1A4',
				},
				coral: '#FF8A5C',
				sky: '#81A4CD',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'eco': '12px',
				'btn': '8px',
			},
			boxShadow: {
				'eco': '0 4px 12px rgba(0, 0, 0, 0.08)',
				'eco-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
				'eco-xl': '0 12px 32px rgba(0, 0, 0, 0.16)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'pulse-eco': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'pulse-eco': 'pulse-eco 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
