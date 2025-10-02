import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import EventTypes from './components/EventTypes';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import Features from './components/Features';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="bg-bredi-bg text-bredi-neutral antialiased">
            <Header />
            <main>
                <Hero />
                <Benefits />
                <HowItWorks />
                <EventTypes />
                <SocialProof />
                <Pricing />
                <Features />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
};

export default App;