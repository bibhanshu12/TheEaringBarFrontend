import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className='min-h-screen mt-7 flex flex-col'>
            <Navbar />
            
            <div className="flex-grow container mx-auto px-4  py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the rich heritage of Mithila art through our carefully crafted jewelry collection
                    </p>
                </div>

                {/* Content Sections */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Our Heritage</h2>
                        <p className="text-gray-600">
                            Mithila Ornaments brings the ancient art of Mithila (Madhubani) to contemporary jewelry design. 
                            Each piece tells a story of our rich cultural heritage while embracing modern aesthetics.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Our Craftsmanship</h2>
                        <p className="text-gray-600">
                            Every piece is meticulously handcrafted by skilled artisans who have inherited generations of 
                            expertise in traditional Mithila art forms and jewelry making.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                        <p className="text-gray-600">We ensure each design stays true to Mithila art traditions</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Quality</h3>
                        <p className="text-gray-600">Using only the finest materials for lasting beauty</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                        <p className="text-gray-600">Committed to ethical practices and artisan welfare</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default About;