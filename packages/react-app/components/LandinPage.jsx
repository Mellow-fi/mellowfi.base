import { useRouter } from "next/router";
import Image from 'next/image';
import Footer from './Footer';

const LandingPage = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/Login');
    };

    return (
        <div className="bg-black">
            <div className="min-h-screen bg-black flex flex-col justify-center items-center">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    {/* Left Section */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="font-san-serif text-7xl font-bold text-white mb-4">Credit <br /> Made Easy</h1>
                        <p className="text-2xl font-san-serif text-white mb-8">Mellow Finance simplifies decentralized lending. Borrow crypto easily and securely on our user-friendly platform. Deposit, loan, repay – it's that simple.</p>
                        <button
                            onClick={handleGetStarted}
                            className="relative inline-flex items-center justify-center px-6 py-2 border-2 border-black bg-[#FFF700] text-black font-semibold rounded-full transition-transform duration-200 ease-out transform hover:translate-x-0 hover:translate-y-0">
                            Get Started
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 flex justify-center mt-2"> {/* Reduced margin-top here */}
                        <div className="relative">
                            <Image
                                src="/../static/mellow.png"
                                alt="Phone displaying Mellow Finance"
                                className="max-w-xs md:max-w-[1200px] w-[500px]"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                </div>

                {/* Photo Section */}
                <div className="py-12 bg-white w-full">
                    <div className="container mx-auto flex flex-col items-center justify-center gap-8">
                        <div className="w-full">
                            <Image
                                src="/static/1.png" // Replace with your image path
                                alt="Photo 1"
                                className="w-full h-auto rounded-lg shadow-md"
                                width={1200}
                                height={600}
                            />
                        </div>
                        <div className="w-full mt-8">
                            <Image
                                src="/static/2.png" // Replace with your image path
                                alt="Photo 2"
                                className="w-full h-auto rounded-lg shadow-md"
                                width={1200}
                                height={600}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;
