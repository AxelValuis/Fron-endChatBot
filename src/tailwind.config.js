/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'seal-blue': '#0033A0', // Azul corporativo de SEAL
        'seal-yellow': '#FFD100', // Amarillo/Dorado corporativo
        emojis:'#454DE6',

        block: '#FFFFFFCC',

        primary : '#172C93',
        primary_light : '#1e40af',

        badge_label_text: '#DBEAFE',

        obstetricia_light:"#C9FAFF",
        obstertricia_base:"#C9FAFF",
        obstetricia_dark:"#00918D",

        odontologia_light:"#D9EAFF",
        odontologia_base:"#247BFF",
        odontologia_dark:"#095BFF",

        spa_light:"#F4E7FF",
        spa_base:"#AC49FE",
        spa_dark:"#9633E7",

        fioterapia_light:"#DDFFE9",
        fioterapia_base:"#7EC178",
        fioterapia_dark:"#6AA54D",

        softblue: '#EEF4FF',
      },

      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        SubTitle: ['Montserrat', 'sans-serif'],
        arimo: ['Arimo', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },


      fontSize: {

				xs: '0.5rem', // Tamaño extra pequeño
				s: '0.625rem', // Tamaño pequeño
				sm: '0.75rem', // Tamaño semi pequeño
				m: '0.8125rem', // Tamaño medio
				md: '0.875rem', // Tamaño mediano
				base: '1rem', // Tamaño base
				lg: '1.125rem', // Tamaño grande


        xl: '1.25rem', // Tamaño extra grande
				'2xl': '1.5rem', // Tamaño 2x
				'3xl': '2rem', // Tamaño 3x
				'4xl': '2.5rem', // Tamaño 4x
				'5xl': '3rem', // Tamaño 5x
				'6xl': '3.5rem', // Tamaño 6x
			},
      screens: {
				xs: '320px', // Muy pequeños smartphones
				s: '375px', // Smartphones pequeños
				sm: '425px', // Smartphones grandes
				m: '576px', // Dispositivos medianos (tabletas pequeñas, phablets)
				md: '768px', // Tabletas y dispositivos pequeños
				lg: '1024px', // Computadoras portátiles pequeñas y tabletas grandes
				xl: '1280px', // Computadoras portátiles grandes
				'2xl': '1440px', // Monitores pequeños de escritorio
				'3xl': '1920px', // Monitores de escritorio estándar
				'4xl': '2560px', // Monitores grandes
				'5xl': '3840px', // Monitores 4K
        'h-sm': { raw: '(max-height: 640px)' },
        // Media query para altura mayor a 800px
        'h-lg': { raw: '(min-height: 800px)' },
			},


 spacing: {
        'word-space': '0.1em',  // Ajusta este valor según el espaciado que prefieras
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}
