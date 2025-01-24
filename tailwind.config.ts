import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

// import scrollbar from 'tailwind-scrollbar';
// import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'3xs': '175px',
  			'2xs': '275px',
  			xs: '375px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1400px',
  			'3xl': '1536px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: '#D9D9D9',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: '#2C3C39',
  				dark: '#2C3C39',
  				light: '#198341',
  				foreground: '#ABDE3B'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				purple: '#AF52DE',
  				indigo: '#5856D6',
  				pink: '#FF2D55',
  				text: '#7D8180'
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
  			hover: {
  				DEFAULT: 'hsl(var(--primary-hover))',
  				secondary: 'hsl(var(--secondary-hover))',
  				muted: 'hsl(var(--muted-hover))',
  				accent: 'hsl(var(--accent-hover))',
  				destructive: 'hsl(var(--destructive-hover))'
  			},
  			success: {
  				DEFAULT: 'hsl(120, 100%, 25%)',
  				foreground: 'hsl(120, 100%, 95%)'
  			},
  			danger: {
  				DEFAULT: 'hsl(0, 100%, 50%)',
  				foreground: 'hsl(0, 100%, 95%)'
  			},
  			alert: {
  				DEFAULT: 'hsl(39, 100%, 50%)',
  				foreground: 'hsl(39, 100%, 95%)'
  			},
  			info: {
  				DEFAULT: 'hsl(210, 100%, 40%)',
  				foreground: 'hsl(210, 100%, 95%)'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			typewriter: {
  				'0%, 10%': {
  					maxWidth: '0%',
  					borderRight: '2px solid currentColor',
  					whiteSpace: 'nowrap'
  				},
  				'30%, 60%': {
  					maxWidth: '100%',
  					borderRight: '2px solid currentColor'
  				},
  				'70%, 80%': {
  					maxWidth: '100%',
  					borderRight: '2px solid transparent'
  				},
  				'90%, 100%': {
  					maxWidth: '100%',
  					borderRight: '2px solid transparent',
  					whiteSpace: 'normal'
  				}
  			},
  			blink: {
  				'0%, 100%': {
  					borderColor: 'transparent'
  				},
  				'50%': {
  					borderColor: 'hsl(var(--primary))'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '0.5'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			'accorion-right': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			projectImageAnimation: {
  				'0%': {
  					transform: 'translateY(-30px)'
  				},
  				'25%': {
  					transform: 'translateY(-15px)'
  				},
  				'50%': {
  					transform: 'translateY(0px)'
  				},
  				'75%': {
  					transform: 'translateY(-15px)'
  				},
  				'100%': {
  					transform: 'translateX(-30)'
  				}
  			},
  			testimonial: {
  				'0%': {
  					rotate: '5deg'
  				},
  				'25%': {
  					rotate: '2deg'
  				},
  				'50%': {
  					rotate: '0'
  				},
  				'75%': {
  					rotate: '-2deg'
  				},
  				'100%': {
  					rotate: '-5deg'
  				}
  			},
  			'progress-bar': {
  				'0%': {
  					width: '0%'
  				},
  				'50%': {
  					width: '70%'
  				},
  				'100%': {
  					width: '100%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			typewriter: 'typewriter 4s steps(30) 1s forwards',
  			blink: 'blink 0.75s step-end infinite',
  			fadeIn: 'fadeIn 1s ease-in',
  			fadeOut: 'fadeOut 1s ease-out',
  			'accorion-right': 'accorion-right 4s ease-out',
  			projectImageAnimation: 'projectImageAnimation 6s ease-in-out infinite',
  			testimonial: 'testimonial 4s ease-in-out infinite',
  			'progress-bar': 'progress-bar 2s ease-out'
  		},
  		fontFamily: {
  			cairo: [
  				'Cairo',
  				'sans-serif'
  			]
  		},
  		screens: {
  			'2xs': '360px',
  			xs: '200px',
  			sm: '640px',
  			lg: '800px'
  		},
  		fontSize: {
  			xs: '0.75rem',
  			sm: '0.875rem',
  			base: '1rem',
  			lg: '1.125rem',
  			xl: '1.25rem',
  			'2xl': '1.5rem',
  			'3xl': '1.875rem',
  			'4xl': '2.25rem',
  			'5xl': '3.25rem',
  			'6xl': '3.5rem',
  			'7xl': '4.5rem',
  			'8xl': '5rem',
  			'9xl': '6rem'
  		}
  	}
  },
  plugins: [animate],
} satisfies Config;
export default config;
