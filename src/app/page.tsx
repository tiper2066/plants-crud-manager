import Hero from '@/components/home/Hero';

export default function Home() {
    return (
        <>
            <Hero
                heading='Plants Ventory'
                description='for plant inventory management Next.js Project with CRUD Features'
                image={{
                    src: '/img/hero-plants.jpg',
                    alt: 'hero-plants',
                }}
            />
        </>
    );
}
