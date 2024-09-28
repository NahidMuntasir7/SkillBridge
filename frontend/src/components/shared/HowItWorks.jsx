import React from 'react';
import { FaSearch, FaPaperPlane, FaLink, FaUserCheck } from 'react-icons/fa'; // Updated icon import

const HowItWorks = () => {
    return (
        <section className="relative py-12 px-6 lg:px-20 border-t border-white border-opacity-20" id="how-it-works"
            style={{
                background: 'linear-gradient(180deg, #000000 0%, #1a0a45 100%)', // Black gradient with dark violet
                fontFamily: 'Poppins, sans-serif' // Modern font
            }}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#1a0a45]"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <h1 className="text-5xl font-extrabold leading-tight text-white bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#00A3E0] to-[#90E0EF] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3E0] to-[#90E0EF]">Works</span> 
                </h1>
                <h2 className="text-xl text-gray-300 mb-12 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    A simple guide to navigate your career journey with us
                </h2>
                <div className="flex justify-center gap-6">
                    {[
                        { icon: <FaSearch />, title: "Search", description: "Discover job listings and opportunities tailored to your skills and preferences." },
                        { icon: <FaPaperPlane />, title: "Apply", description: "Submit your application with ease using our streamlined process." },
                        { icon: <FaLink />, title: "Connect", description: "Network with leading employers and expand your professional connections." },
                        { icon: <FaUserCheck />, title: "Get Hired", description: "Land your ideal job and embark on your new career journey." } // Icon for Get Hired
                    ].map((card, index) => (
                        <div key={index} className="w-80 p-4 flex-shrink-0 transition-transform transform hover:scale-105">
                            <div className="text-center bg-[rgba(255,255,255,0.15)] backdrop-blur-md p-6 rounded-2xl shadow-xl h-64 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="mb-4">
                                    {React.cloneElement(card.icon, { className: "text-5xl text-white" })}
                                </div>
                                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00A3E0] to-[#90E0EF] font-sans" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                                    {card.title}
                                </h3>
                                <p className="text-gray-300 text-lg font-sans" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '' }}>
                                    {card.description}
                                </p>
                                <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 hover:opacity-40"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
