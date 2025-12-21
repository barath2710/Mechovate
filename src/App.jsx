import React, { useState, useEffect, useRef } from 'react';
import { Clock, Calendar, Cpu, Users, Gift, MapPin, Phone, Mail, Award, Target, Zap } from 'lucide-react';

// Main App Component with Advanced Features
export default function MechovateLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Advanced scroll parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Advanced mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Advanced Canvas Animation for Background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const particleCount = 80;

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
          }
        }

        draw() {
          ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
          particle.update();
          particle.draw();

          // Connect nearby particles with lines
          particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      {/* Advanced Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* World-Class Multi-Layer Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient with parallax */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        {/* Advanced hexagonal mesh grid */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 8.7v17.3L30 34.6 15 26V8.7L30 0z' fill='none' stroke='%230ea5e9' stroke-width='0.8' opacity='0.6'/%3E%3Cpath d='M30 17.3L45 26v17.3L30 52 15 43.3V26l15-8.7z' fill='none' stroke='%2306b6d4' stroke-width='0.4' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
          transform: `translateY(${scrollY * 0.3}px)`
        }}></div>

        {/* Circuit pattern overlay with parallax */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4;stop-opacity:0.8' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:0.4' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cline x1='0' y1='60' x2='120' y2='60' stroke='url(%23grad)' stroke-width='1.5'/%3E%3Cline x1='60' y1='0' x2='60' y2='120' stroke='url(%23grad)' stroke-width='1.5'/%3E%3Ccircle cx='60' cy='60' r='4' fill='%2306b6d4'/%3E%3Ccircle cx='0' cy='60' r='2' fill='%233b82f6'/%3E%3Ccircle cx='120' cy='60' r='2' fill='%233b82f6'/%3E%3Ccircle cx='60' cy='0' r='2' fill='%233b82f6'/%3E%3Ccircle cx='60' cy='120' r='2' fill='%233b82f6'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
            transform: `translateY(${scrollY * -0.2}px)`
          }}
        ></div>

        {/* Dynamic gradient orbs with mouse interaction */}
        <div 
          className="absolute w-[600px] h-[600px] bg-blue-600 rounded-full filter blur-[120px] opacity-25 transition-all duration-1000"
          style={{
            top: `${20 + mousePosition.y * 0.1}%`,
            left: `${10 + mousePosition.x * 0.1}%`,
            animation: 'pulse 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute w-[500px] h-[500px] bg-cyan-500 rounded-full filter blur-[100px] opacity-20 transition-all duration-1000"
          style={{
            bottom: `${15 + mousePosition.y * 0.05}%`,
            right: `${15 + mousePosition.x * 0.05}%`,
            animation: 'pulse 10s ease-in-out infinite 2s'
          }}
        ></div>
        <div 
          className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full filter blur-[80px] opacity-15 transition-all duration-1000"
          style={{
            top: `${50 + mousePosition.y * 0.08}%`,
            left: `${50 + mousePosition.x * 0.08}%`,
            animation: 'pulse 12s ease-in-out infinite 4s'
          }}
        ></div>

        {/* Advanced Mechanical Gears with complex animations */}
        <AdvancedGear 
          top="8%" 
          left="5%" 
          size={180} 
          teeth={12} 
          speed={40} 
          direction="normal"
          opacity={0.12}
        />
        <AdvancedGear 
          bottom="15%" 
          right="8%" 
          size={220} 
          teeth={16} 
          speed={60} 
          direction="reverse"
          opacity={0.1}
        />
        <AdvancedGear 
          top="35%" 
          right="15%" 
          size={120} 
          teeth={8} 
          speed={30} 
          direction="normal"
          opacity={0.15}
        />
        <AdvancedGear 
          bottom="40%" 
          left="12%" 
          size={150} 
          teeth={10} 
          speed={45} 
          direction="reverse"
          opacity={0.13}
        />

        {/* Blueprint grid with depth */}
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(6, 182, 212, 0.03) 0px, transparent 1px, transparent 20px),
            repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.03) 0px, transparent 1px, transparent 20px),
            repeating-linear-gradient(0deg, rgba(6, 182, 212, 0.05) 0px, transparent 1px, transparent 100px),
            repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.05) 0px, transparent 1px, transparent 100px)
          `,
          transform: `translateY(${scrollY * 0.15}px)`
        }}></div>

        {/* Scan line effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              rgba(6, 182, 212, 0.05) ${(scrollY * 0.1) % 100}%, 
              transparent ${(scrollY * 0.1 + 2) % 100}%)`
          }}
        ></div>
      </div>

      {/* Content Container with Advanced Layering */}
      <div className="relative z-10">
        {/* Ultra-Professional Header */}
        <header className="relative backdrop-blur-xl bg-slate-950/40 border-b border-cyan-500/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Premium College Branding */}
              <div className="flex items-center gap-5 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center border-4 border-yellow-500 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-yellow-400 font-black text-xs leading-tight">ST.</div>
                      <div className="text-yellow-400 font-black text-[11px] leading-tight">JOSEPH'S</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-3 border-slate-950 shadow-xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                    St. JOSEPH'S
                  </h1>
                  <p className="text-sm md:text-lg text-cyan-400 font-bold tracking-wide">COLLEGE OF ENGINEERING</p>
                  <p className="text-xs text-gray-400 italic mt-1 font-medium">An Autonomous Institution, Affiliated to Anna University</p>
                </div>
              </div>

              {/* Premium Accreditation Badges */}
              <div className="flex flex-wrap gap-3 items-center justify-center">
                <PremiumBadge text="SDG" gradient="from-green-400 to-emerald-600" icon="🌍" />
                <PremiumBadge text="Cambridge" gradient="from-blue-500 to-indigo-700" icon="📚" />
                <PremiumBadge text="NIRF" gradient="from-orange-400 to-red-600" icon="🏆" />
                <PremiumBadge text="NBA" gradient="from-blue-400 to-blue-700" icon="✓" />
                <PremiumBadge text="A+" gradient="from-red-500 to-rose-700" icon="⭐" />
                <PremiumBadge text="32 Years" gradient="from-amber-400 to-orange-600" icon="🎓" />
              </div>
            </div>
          </div>
        </header>

        {/* World-Class Hero Section */}
        <section className="relative pt-24 pb-16 px-4 overflow-hidden">
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              ></div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto text-center relative">
            <div className={`transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              {/* Department Badge with advanced styling */}
              <div className="inline-flex items-center gap-3 mb-8 px-10 py-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-cyan-500/40 rounded-full backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Cpu className="w-6 h-6 text-cyan-400" />
                <h2 className="text-lg md:text-2xl font-black text-cyan-400 tracking-widest uppercase">
                  Department of Mechanical Engineering
                </h2>
              </div>

              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-500"></div>
                <p className="text-2xl md:text-4xl text-white font-light tracking-[0.3em] uppercase">Proudly Presents</p>
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-500"></div>
              </div>
              
              {/* Ultra-Premium Main Title */}
              <div className="relative inline-block mb-8">
                {/* Glow effect layers */}
                <div className="absolute inset-0 blur-3xl opacity-50">
                  <h1 className="text-7xl md:text-[160px] font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    MECHOVATE
                  </h1>
                </div>
                <div className="absolute inset-0 blur-2xl opacity-30">
                  <h1 className="text-7xl md:text-[160px] font-black tracking-tighter bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    MECHOVATE
                  </h1>
                </div>
                
                {/* Main title */}
                <h1 
                  className="relative text-7xl md:text-[160px] font-black tracking-tighter leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #06b6d4 50%, #3b82f6 75%, #06b6d4 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-shift 8s ease infinite',
                    textShadow: '0 0 60px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  MECHOVATE
                </h1>
                
                {/* Version number with premium styling */}
                <div className="relative mt-4">
                  <div className="absolute inset-0 blur-2xl opacity-40">
                    <div className="text-6xl md:text-8xl font-black text-cyan-400">1.0</div>
                  </div>
                  <div className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-wider"
                       style={{ animation: 'gradient-shift 6s ease infinite' }}>
                    1.0
                  </div>
                </div>
                
                {/* Premium corner decorations */}
                <div className="absolute -top-8 -left-8 w-16 h-16">
                  <div className="absolute inset-0 border-t-4 border-l-4 border-cyan-400 animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400 animate-ping"></div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16">
                  <div className="absolute inset-0 border-b-4 border-r-4 border-cyan-400 animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 animate-ping"></div>
                </div>
              </div>

              {/* Event highlights */}
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <EventHighlight icon={<Zap />} text="Innovation Challenge" />
                <EventHighlight icon={<Target />} text="Problem Solving" />
                <EventHighlight icon={<Award />} text="Win Big Prizes" />
              </div>
            </div>
          </div>
        </section>

        {/* Premium Feature Cards */}
        <section className="py-16 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <WorldClassFeatureCard
                icon={<Clock size={56} strokeWidth={2} />}
                title="24 HOURS"
                subtitle="CHALLENGE"
                description="Non-stop innovation sprint"
                delay={200}
                color="cyan"
              />
              <WorldClassFeatureCard
                icon={<Cpu size={56} strokeWidth={2} />}
                title="5+ DOMAINS"
                subtitle="50+ PROBLEM STATEMENT"
                description="Diverse engineering challenges"
                delay={400}
                color="blue"
              />
              <WorldClassFeatureCard
                icon={<Calendar size={56} strokeWidth={2} />}
                title="FEBRUARY"
                subtitle="26TH & 27TH"
                description="Mark your calendars"
                delay={600}
                color="cyan"
              />
            </div>
          </div>
        </section>

        {/* Ultra-Premium Information Panel */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/90 to-blue-950/90 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/30 shadow-2xl overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(6, 182, 212, 0.1) 35px, rgba(6, 182, 212, 0.1) 70px)`
                  }}></div>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-3">
                  {/* Information Section - Premium */}
                  <div className="lg:col-span-2 p-10 md:p-16 border-r border-cyan-500/20">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-2 h-16 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 rounded-full"></div>
                      <div>
                        <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                          WHAT YOU SHOULD KNOW
                        </h3>
                        <p className="text-cyan-400 text-xl mt-2 font-light">Essential Information</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-8">
                      <PremiumInfoItem 
                        icon={<Users size={28} />}
                        title="Team Composition"
                        description="3 - 6 members per team"
                        detail="Form your dream team"
                      />
                      <PremiumInfoItem 
                        icon={<Gift size={28} />}
                        title="Internship Opportunities"
                        description="Exclusive offers for top teams"
                        detail="Industry partnerships awaiting"
                      />
                      <PremiumInfoItem 
                        icon={<Calendar size={28} />}
                        title="Registration Deadline"
                        description="February 5, 2026"
                        detail="Don't miss your chance"
                      />
                      <PremiumInfoItem 
                        icon={<MapPin size={28} />}
                        title="Event Venue"
                        description="Hackathon & Training Centre"
                        detail="State-of-the-art facility"
                      />
                    </div>
                  </div>

                  {/* Prize Section - Ultra Premium */}
                  <div className="bg-gradient-to-br from-slate-800/60 to-blue-900/60 p-10 flex flex-col justify-center items-center gap-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`
                      }}></div>
                    </div>
                    
                    <div className="relative">
                      <h4 className="text-3xl font-black text-center text-cyan-400 mb-8 tracking-wide">PRIZE POOL</h4>
                      <UltraPremiumPrizeBadge 
                        rank="FIRST"
                        amount="₹10,000"
                        gradient="from-yellow-300 via-yellow-400 to-amber-500"
                        ringColor="yellow"
                      />
                    </div>
                    
                    <div className="relative">
                      <UltraPremiumPrizeBadge 
                        rank="SECOND"
                        amount="₹5,000"
                        gradient="from-slate-200 via-slate-300 to-slate-400"
                        ringColor="slate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {/* Ultra-Premium Register Button */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <button className="relative px-16 py-8 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 border-2 border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 3s ease infinite' }}></div>
                  <span className="relative z-10 text-4xl md:text-5xl font-black text-white tracking-wider block">
                    REGISTER NOW
                  </span>
                  <span className="relative z-10 text-xl font-bold text-cyan-100 block mt-2">
                    Limited Slots Available
                  </span>
                  <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-50"></div>
                </button>
              </div>

              {/* Premium QR Code */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <a href="#register" className="relative block">
                  <div className="w-48 h-48 bg-white rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border-4 border-cyan-400 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex flex-col items-center justify-center shadow-inner">
                      <div className="text-white text-center">
                        <div className="text-5xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">QR</div>
                        <div className="text-sm font-bold text-cyan-400">SCAN TO REGISTER</div>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-500"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-500"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Coordinators Section */}
        <section className="py-20 px-4 relative border-t border-cyan-500/20 backdrop-blur-sm bg-slate-950/60">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-16">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MEET THE TEAM</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Staff Coordinators - Premium */}
              <UltraPremiumCoordinatorPanel
                title="STAFF COORDINATORS"
                icon={<Award />}
                coordinators={[
                  { name: "DR.K.M.KUMAR", phone: "+91 94456 83372" },
                  { name: "DR. K. ARUN", phone: "+91 98945 49805" },
                  { name: "MR. N. SATHISH KUMAR", phone: "+91 90952 35577" },
                  { name: "MR. K. GNANASEKARAN", phone: "+91 91763 17179" }
                ]}
              />

              {/* Student Coordinators - Premium */}
              <UltraPremiumCoordinatorPanel
                title="STUDENT COORDINATORS"
                icon={<Users />}
                coordinators={[
                  { name: "HARISH J", phone: "+91 9043717319" },
                  { name: "JAI AKASH LAL A", phone: "+91 7845445691" }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Ultra-Premium Footer */}
        <footer className="relative bg-slate-950 border-t-2 border-cyan-500/30 py-10 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <MapPin className="text-cyan-400" size={24} />
                <p className="text-white font-bold text-lg">
                  St. JOSEPH'S GROUP OF INSTITUTIONS, <span className="text-cyan-400">OMR, CHENNAI - 119</span>
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3">
                <a href="https://www.stjosephs.ac.in" className="text-2xl font-black text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                  www.stjosephs.ac.in
                </a>
                <p className="text-gray-400 text-sm">© 2026 St. Joseph's College of Engineering. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* World-Class Custom Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { 
            transform: translateY(-100px) translateX(20px);
          }
        }
        
        @keyframes spin-complex {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4),
                        0 0 40px rgba(6, 182, 212, 0.2),
                        inset 0 0 20px rgba(6, 182, 212, 0.1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.6),
                        0 0 80px rgba(6, 182, 212, 0.4),
                        inset 0 0 40px rgba(6, 182, 212, 0.2);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

// Advanced Gear Component with Complex Animation
function AdvancedGear({ top, bottom, left, right, size, teeth, speed, direction, opacity }) {
  return (
    <div 
      className="absolute pointer-events-none"
      style={{ 
        top, 
        bottom, 
        left, 
        right,
        opacity
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        style={{
          animation: `spin-complex ${speed}s linear infinite ${direction === 'reverse' ? 'reverse' : 'normal'}`,
          filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))'
        }}
      >
        <defs>
          <linearGradient id={`gear-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <filter id={`glow-${size}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer circle */}
        <circle cx="50" cy="50" r="42" fill="none" stroke={`url(#gear-gradient-${size})`} strokeWidth="2" filter={`url(#glow-${size})`}/>
        
        {/* Inner circles */}
        <circle cx="50" cy="50" r="32" fill="none" stroke={`url(#gear-gradient-${size})`} strokeWidth="1.5" opacity="0.8"/>
        <circle cx="50" cy="50" r="22" fill="none" stroke={`url(#gear-gradient-${size})`} strokeWidth="1" opacity="0.6"/>
        <circle cx="50" cy="50" r="12" fill={`url(#gear-gradient-${size})`} opacity="0.4"/>
        
        {/* Gear teeth */}
        {[...Array(teeth)].map((_, i) => {
          const angle = (i * 360) / teeth;
          return (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <rect 
                x="48" 
                y="8" 
                width="4" 
                height="12" 
                fill={`url(#gear-gradient-${size})`}
                filter={`url(#glow-${size})`}
              />
            </g>
          );
        })}
        
        {/* Center bolt holes */}
        {[...Array(6)].map((_, i) => (
          <circle 
            key={i}
            cx={50 + 18 * Math.cos((i * Math.PI * 2) / 6)} 
            cy={50 + 18 * Math.sin((i * Math.PI * 2) / 6)} 
            r="2" 
            fill="#06b6d4"
            opacity="0.8"
          />
        ))}
      </svg>
    </div>
  );
}

// Premium Badge Component
function PremiumBadge({ text, gradient, icon }) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className={`relative w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex flex-col items-center justify-center shadow-2xl border-3 border-white/40 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
        <span className="text-2xl mb-0.5">{icon}</span>
        <span className="text-white text-[9px] font-black text-center leading-tight px-1">{text}</span>
      </div>
    </div>
  );
}

// Event Highlight Component
function EventHighlight({ icon, text }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 group">
      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-white font-semibold">{text}</span>
    </div>
  );
}

// World-Class Feature Card Component
function WorldClassFeatureCard({ icon, title, subtitle, description, delay, color }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 hover:border-cyan-400/80 hover:shadow-cyan-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 hover:border-blue-400/80 hover:shadow-blue-500/30'
  };

  return (
    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className={`group relative bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl rounded-3xl border-2 p-10 transition-all duration-500 hover:scale-105 shadow-2xl overflow-hidden`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan"></div>
        </div>

        {/* Corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-3 border-l-3 border-cyan-400/60 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-cyan-400/60 rounded-br-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon with advanced effects */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-20 h-20 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="relative text-cyan-400 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
              {icon}
            </div>
          </div>
          
          <h3 className="text-5xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xl text-cyan-300 font-bold tracking-wide mb-4">
            {subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mb-4"></div>
          <p className="text-gray-300 text-sm font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Premium Info Item Component
function PremiumInfoItem({ icon, title, description, detail }) {
  return (
    <div className="group relative">
      <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-slate-800/40 to-blue-900/20 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:translate-x-4 hover:shadow-xl hover:shadow-cyan-500/10">
        {/* Icon container */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center border-2 border-cyan-500/40 group-hover:border-cyan-400/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
              {icon}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          <h4 className="text-cyan-400 font-black text-xl mb-2 group-hover:text-cyan-300 transition-colors duration-300">
            {title}
          </h4>
          <p className="text-white text-lg font-semibold mb-1">
            {description}
          </p>
          <p className="text-gray-400 text-sm italic">
            {detail}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="text-cyan-400/50 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:translate-x-2">
          →
        </div>
      </div>
    </div>
  );
}

// Ultra-Premium Prize Badge Component
function UltraPremiumPrizeBadge({ rank, amount, gradient, ringColor }) {
  const ringColors = {
    yellow: 'from-yellow-400 to-amber-500',
    slate: 'from-slate-300 to-slate-400'
  };

  return (
    <div className="group relative">
      {/* Outer glow ring */}
      <div className={`absolute -inset-6 bg-gradient-to-r ${ringColors[ringColor]} rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>
      
      {/* Middle ring */}
      <div className={`absolute -inset-3 bg-gradient-to-r ${ringColors[ringColor]} rounded-full blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-500`}></div>
      
      {/* Main badge */}
      <div className={`relative bg-gradient-to-br ${gradient} rounded-full w-52 h-52 flex flex-col items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border-4 border-white overflow-hidden`}
           style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative z-10 text-center">
          {/* Star decoration */}
          <div className="flex justify-center gap-2 mb-3">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-white text-3xl drop-shadow-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                ★
              </span>
            ))}
          </div>
          
          <h4 className="text-4xl font-black text-slate-900 mb-3 tracking-tight drop-shadow-md">
            {rank}
          </h4>
          <div className="w-16 h-1 bg-slate-900 rounded-full mx-auto mb-3"></div>
          <p className="text-3xl font-black text-slate-900 mb-2 drop-shadow-md">
            {amount}
          </p>
          <p className="text-2xl font-black text-slate-900 tracking-widest drop-shadow-md">
            PRIZE
          </p>
        </div>
      </div>
    </div>
  );
}

// Ultra-Premium Coordinator Panel Component
function UltraPremiumCoordinatorPanel({ title, icon, coordinators }) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-950/80 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/30 p-10 shadow-2xl overflow-hidden group-hover:border-cyan-400/60 transition-all duration-500">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(6, 182, 212, 0.1) 20px, rgba(6, 182, 212, 0.1) 40px)`
          }}></div>
        </div>

        {/* Header */}
        <div className="relative flex items-center gap-4 mb-10">
          <div className="w-3 h-16 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 rounded-full"></div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-cyan-400">
                {icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                {title}
              </h3>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Coordinators list */}
        <div className="relative space-y-5">
          {coordinators.map((coord, idx) => (
            <div key={idx} className="group/item relative">
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-800/60 to-blue-900/30 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:translate-x-3 hover:shadow-lg hover:shadow-cyan-500/20">
                {/* Index number */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg flex items-center justify-center border border-cyan-500/40 font-black text-cyan-400">
                  {idx + 1}
                </div>
                
                {/* Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-lg text-white group-hover/item:text-cyan-400 transition-colors duration-300">
                      {coord.name}
                    </h4>
                    {coord.designation && (
                      <span className="text-xs px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 font-semibold">
                        {coord.designation}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Phone size={14} />
                    <span className="text-base font-semibold">{coord.phone}</span>
                  </div>
                </div>

                {/* Contact icon */}
                <div className="text-cyan-400/50 group-hover/item:text-cyan-400 transition-all duration-300 transform group-hover/item:scale-125">
                  <Phone size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}