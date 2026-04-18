import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Zap, TrendingDown, CheckCircle, Globe, Sparkles, Smartphone, Brain, AlertCircle, Users, Cpu, Lock, Twitter, Github, Linkedin } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock product data for hero mockup
  const mockProduct = {
    name: 'Sony WH-1000XM5 Headphones',
    currentPrice: 349,
    prices: [
      { store: 'Amazon', price: 349, color: '#3b82f6' },
      { store: 'Best Buy', price: 379, color: '#8b5cf6' },
      { store: 'Walmart', price: 359, color: '#ec4899' },
    ],
  };

  const features = [
    {
      icon: TrendingDown,
      title: 'Price History Graph',
      description: 'See how prices changed over time',
    },
    {
      icon: Brain,
      title: 'AI Price Prediction',
      description: 'AI tells you the best time to buy',
    },
    {
      icon: AlertCircle,
      title: 'Instant Alerts',
      description: 'Email and SMS when prices drop',
    },
    {
      icon: Users,
      title: '50+ Stores',
      description: 'Compare prices from top stores worldwide',
    },
    {
      icon: Globe,
      title: 'Any Language',
      description: 'Works in your language automatically',
    },
    {
      icon: Lock,
      title: 'Free To Use',
      description: 'Core features always free forever',
    },
  ];

  const pricingPlans = [
    {
      name: 'FREE',
      price: 0,
      features: [
        '5 price alerts',
        '7 day price history',
        'Email alerts only',
        'Basic AI insights',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'PRO',
      price: 9,
      features: [
        'Unlimited alerts',
        '1 year price history',
        'Email + SMS alerts',
        'Full AI predictions',
        'Browser extension',
      ],
      cta: 'Start Pro',
      popular: true,
    },
    {
      name: 'BUSINESS',
      price: 29,
      features: [
        'Everything in Pro',
        'API access',
        'Team accounts',
        'Priority support',
      ],
      cta: 'Contact Us',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'border-b border-gray-800 bg-dark-bg/95 backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Zap className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PricePulse
              </span>
            </div>

            {/* Hamburger Menu */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how" className="hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="hover:text-primary transition-colors">
                Pricing
              </a>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-dark-card text-sm px-3 py-2 rounded border border-gray-700 cursor-pointer hover:border-primary transition-colors"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>

              <button
                onClick={() => navigate('/login')}
                className="text-sm hover:text-primary transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/50"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-800">
              <a href="#features" className="block py-2 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how" className="block py-2 hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="block py-2 hover:text-primary transition-colors">
                Pricing
              </a>
              <button
                onClick={() => navigate('/register')}
                className="w-full mt-4 bg-primary hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Never Overpay{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Again.
                </span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Track prices across hundreds of stores. Get alerted the moment prices drop.
                <br />
                <span className="text-primary font-semibold">Powered by AI.</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/50 hover:scale-105"
              >
                Start Tracking Free
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('how');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
              >
                See How It Works
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: Sparkles, text: '10,000+ Products Tracked' },
                { icon: Users, text: '50+ Stores Compared' },
                { icon: Brain, text: 'AI Powered Predictions' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div className="hidden md:block animate-slide-up">
            <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 shadow-2xl hover:border-primary/50 transition-all">
              {/* Mockup Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              {/* Product Info */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">PRICE COMPARISON</p>
                <h3 className="text-xl font-bold mb-2">{mockProduct.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${mockProduct.prices[0].price}</span>
                  <span className="text-sm text-gray-400">Save up to $30</span>
                </div>
              </div>

              {/* Price Bars */}
              <div className="space-y-3">
                {mockProduct.prices.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{p.store}</span>
                      <span className="text-sm text-gray-400">${p.price}</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(p.price / 379) * 100}%`,
                          backgroundColor: p.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs text-primary font-semibold">✓ Alert set for $330</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">How PricePulse Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to start saving money on everything you buy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: Smartphone,
                title: 'Search',
                description: 'Search any product from any store worldwide',
              },
              {
                step: 2,
                icon: TrendingDown,
                title: 'Compare',
                description: 'See prices from multiple stores side by side instantly',
              },
              {
                step: 3,
                icon: AlertCircle,
                title: 'Save',
                description: 'Set your target price and get alerted the moment it drops',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:bg-dark-card/50 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-dark-bg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>

                {/* Icon */}
                <item.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need To Save Money
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Packed with powerful features to help you find the best deals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-xl border border-gray-800 hover:border-primary/50 hover:bg-dark-card/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Simple Pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Always transparent, no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative group rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'md:scale-105 border-2 border-primary bg-dark-card/50 shadow-2xl shadow-primary/20 p-8'
                    : 'border border-gray-800 hover:border-primary/50 p-8'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => {
                    if (plan.cta === 'Contact Us') {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/register');
                    }
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 ${
                    plan.popular
                      ? 'bg-primary hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-primary/50'
                      : 'border border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark-card/50 border-t border-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">PricePulse</span>
              </div>
              <p className="text-gray-400 text-sm">Track. Compare. Save.</p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2024 PricePulse. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
