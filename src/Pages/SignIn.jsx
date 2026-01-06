const SignIn = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <img
                src="/Images/signUp-Bg.png"
                alt="Signup background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Kajkori Text Logo – Top Left */}
            <div className="absolute top-6 left-6 z-20 select-none">
                <h1 className="text-3xl font-extrabold tracking-wide">
                    <span className="text-black">Kaj</span>
                    <span className="text-red-600">kori</span>
                </h1>
                <p className="text-xs text-gray-700 -mt-1">
                    Freelance Marketplace
                </p>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-16">
                <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-2xl">
                    
                    <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                        Sign In
                    </h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm mb-1 text-gray-800">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 text-gray-800">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm mt-6 text-center text-gray-800">
                        Don’t have an account?{" "}
                        <span className="underline cursor-pointer font-medium">
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
