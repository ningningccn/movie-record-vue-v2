module.exports = {
    content: ['./src/**/*', './src/**/*.{html, js, ts, vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#65E9B2',
                second: '#303132',
                placeholder: '#737373',
                enable: '#777777',
                disable: '#555555',
                card: '#3C3C3C',
                error: '#FF4949',
            },
        },
        screens: {
            xxs: '375px',
            xs: '480px',
            sm: '640px',
            md: '768px',
            mlg: '992px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [],
}
