
import React, { useState, useEffect, useRef } from 'react';
import { personalInfo, experiences, educationData, projects, skills, contact, uiTexts } from './constants';
import type { Project, TimelineItemData } from './types';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpRightIcon, ChevronDownIcon, MenuIcon, XIcon } from './components/Icons';

// To keep the file count low, sub-components are defined here.
// In a larger project, these would be in separate files.

//== HOOK for SCROLL ANIMATIONS ===============================================
const useAnimateOnScroll = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Animate only once
            }
        }, { threshold: 0.1, ...options });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return [ref, isVisible] as const;
};


//== ANIMATED BACKGROUND ======================================================
const AnimatedBackground: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const spacing = 45; // Slightly tighter grid
    const connectionRadius = 120; // Mouse connection radius
    const pulseCount = 12; 
    const brandColor = { r: 210, g: 255, b: 0 }; // #d2ff00
    
    // State
    let mouse = { x: -1000, y: -1000 };
    let ripples: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];
    
    interface Pulse {
        x: number; // Grid index X
        y: number; // Grid index Y
        dx: number; // Direction X
        dy: number; // Direction Y
        progress: number; 
        speed: number;
        life: number; 
    }

    let pulses: Pulse[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createPulse = (): Pulse => {
        const gx = Math.floor(Math.random() * (width / spacing));
        const gy = Math.floor(Math.random() * (height / spacing));
        const dir = Math.floor(Math.random() * 4);
        let dx = 0, dy = 0;
        if (dir === 0) dy = -1;
        else if (dir === 1) dx = 1;
        else if (dir === 2) dy = 1;
        else dx = -1;

        return {
            x: gx,
            y: gy,
            dx,
            dy,
            progress: 0,
            speed: 0.04 + Math.random() * 0.06,
            life: 1.0,
        };
    };

    for(let i = 0; i < pulseCount; i++) {
        pulses.push(createPulse());
    }

    window.addEventListener('resize', resize);
    
    const mouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', mouseMove);

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 1,
        speed: 8
      });
    };
    window.addEventListener('mousedown', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      // 1. Update and Draw Ripples (Sonar Effect)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.015;
        
        // Draw the actual ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${brandColor.r}, ${brandColor.g}, ${brandColor.b}, ${r.alpha * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
        }
      }

      // 2. Draw Grid Dots & Connections
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
            const x = i * spacing;
            const y = j * spacing;

            // Calculate distances
            const distMouse = Math.hypot(mouse.x - x, mouse.y - y);
            
            // Check ripple intersections
            let rippleInfluence = 0;
            ripples.forEach(r => {
              const distRipple = Math.abs(Math.hypot(r.x - x, r.y - y) - r.radius);
              if (distRipple < 50) { // If dot is near the ripple ring
                 rippleInfluence += (1 - distRipple / 50) * r.alpha;
              }
            });

            // Base dot style
            let dotSize = 1;
            let dotAlpha = 0.1; 
            let dotColor = `255, 255, 255`;

            // MOUSE INTERACTION: Flashlight Only (Removed Line Connections)
            if (distMouse < connectionRadius) {
                const strength = 1 - distMouse / connectionRadius;
                dotAlpha = 0.2 + (strength * 0.8);
                dotSize = 1 + (strength * 1.5);
                dotColor = `${brandColor.r}, ${brandColor.g}, ${brandColor.b}`;
            }

            // RIPPLE INTERACTION: Glow up
            if (rippleInfluence > 0) {
                dotAlpha = Math.max(dotAlpha, rippleInfluence);
                dotSize = Math.max(dotSize, 1 + rippleInfluence * 3);
                dotColor = `${brandColor.r}, ${brandColor.g}, ${brandColor.b}`;
            }

            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${dotColor}, ${dotAlpha})`;
            ctx.fill();
        }
      }

      // 3. Update and Draw Circuit Pulses (Data Packets)
      pulses.forEach((p, index) => {
        if (p.life <= 0) {
            pulses[index] = createPulse();
            return;
        }

        p.progress += p.speed;
        if (p.progress >= 1) {
            p.x += p.dx;
            p.y += p.dy;
            p.progress = 0;
            
            // Turn randomly
            if (Math.random() < 0.3) {
                if (p.dx !== 0) { p.dx = 0; p.dy = Math.random() > 0.5 ? 1 : -1; } 
                else { p.dy = 0; p.dx = Math.random() > 0.5 ? 1 : -1; }
            }
            
            p.life -= 0.005;
            if (p.x < 0 || p.x > cols || p.y < 0 || p.y > rows) p.life = 0;
        }

        const currentX = (p.x + p.dx * p.progress) * spacing;
        const currentY = (p.y + p.dy * p.progress) * spacing;
        
        // Draw Trail
        const tailLength = 25 * p.speed; 
        const tailX = currentX - (p.dx * spacing * tailLength);
        const tailY = currentY - (p.dy * spacing * tailLength);

        const gradient = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
        gradient.addColorStop(0, `rgba(${brandColor.r}, ${brandColor.g}, ${brandColor.b}, 0)`);
        gradient.addColorStop(1, `rgba(${brandColor.r}, ${brandColor.g}, ${brandColor.b}, ${p.life * 0.8})`);

        ctx.lineWidth = 2;
        ctx.lineCap = 'square'; // Tech feel
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return <canvas 
    ref={canvasRef} 
    className={`fixed top-0 left-0 w-full h-full -z-10 transition-all duration-1000 ${!isVisible ? 'opacity-20 blur-sm' : 'opacity-100 blur-none'}`} 
  />;
};


//== HEADER =================================================================
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);


  const navLinks = uiTexts.navLinks;
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-bg/50 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <a href="#hero" className="text-4xl font-black tracking-tighter" onClick={handleHomeClick}>
            <span className="text-brand-text">JW</span><span className="text-brand-primary">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick} className="text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-primary transition-colors duration-300 group">
                {link.label}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-brand-primary mt-1"></span>
              </a>
            ))}
          </div>
          
          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-text">
              <MenuIcon className="w-7 h-7"/>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-brand-bg/70 backdrop-blur-2xl transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
           <a href="#hero" className="text-4xl font-black tracking-tighter" onClick={handleHomeClick}>
              <span className="text-brand-text">JW</span><span className="text-brand-primary">.</span>
           </a>
           <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-text">
              <XIcon className="w-7 h-7"/>
           </button>
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100%-92px)] space-y-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick} className="text-2xl font-black uppercase tracking-widest text-brand-text hover:text-brand-primary transition-colors duration-300">
                {link.label}
              </a>
            ))}
        </div>
      </div>
    </>
  );
};

//== PROJECT CARD =============================================================
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-brand-card/30 backdrop-blur-lg rounded-lg overflow-hidden group relative border border-white/10 hover:border-brand-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-brand-primary/10">
      <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-brand-text">{project.title}</h3>
        <p className="text-brand-text/70 mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-brand-dark/50 text-brand-primary/80 px-3 py-1 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
       <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-brand-text hover:text-brand-primary transition-colors">
            <ArrowUpRightIcon className="w-6 h-6" />
          </a>
        </div>
    </div>
  );
};

//== TIMELINE =================================================================
interface TimelineProps {
  title: string;
  items: TimelineItemData[];
}

const Timeline: React.FC<TimelineProps> = ({ title, items }) => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-8 text-brand-text">{title}</h3>
      <div className="relative border-l-2 border-brand-text/10 ml-2">
        {items.map((item, index) => (
          <div key={index} className="mb-12 pl-8 relative timeline-marker">
            <p className="text-sm text-brand-primary mb-1">{item.date}</p>
            <h4 className="text-xl font-semibold text-brand-text">{item.title}</h4>
            <p className="text-md text-brand-text/80 mb-2">{item.subtitle}</p>
            <p className="text-sm text-brand-text/60">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

//== SECTIONS ================================================================
const HeroSection: React.FC = () => (
  <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative">
    <div className="max-w-3xl">
      <h1 
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
      >
        <span className="name-highlight-anim px-4 py-1">
          <span className="text-brand-dark name-text-anim">
            {personalInfo.name}
          </span>
        </span>
      </h1>
      <p className="text-2xl md:text-3xl font-medium mb-8 text-brand-text/80">
        {personalInfo.role}
      </p>
    </div>
    <a href="#about" className="absolute bottom-10 animate-bounce">
      <ChevronDownIcon className="w-8 h-8 text-brand-primary"/>
    </a>
  </section>
);

const AboutSection = React.forwardRef<HTMLElement>((props, fwdRef) => {
    const [animRef, isVisible] = useAnimateOnScroll({ threshold: 0.2 });

    // Combine forwarded ref (for blur logic) and animation ref
    const setRefs = (node: HTMLElement | null) => {
        (animRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof fwdRef === 'function') {
            fwdRef(node);
        } else if (fwdRef) {
            fwdRef.current = node;
        }
    };

    return (
      <section
        id="about"
        className="py-24"
        ref={setRefs}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>{uiTexts.aboutSection.title}</h2>
        <div className={`w-16 h-1 bg-brand-primary mb-12 transition-all duration-700 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}></div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-16 gap-y-12 items-center">
            <div className={`md:col-span-2 flex justify-center md:justify-start transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="polaroid-frame max-w-sm">
                    <img src={personalInfo.avatarUrl} alt="A portrait of James Wu" />
                    <p className="polaroid-caption">{uiTexts.aboutSection.polaroidCaption}</p>
                </div>
            </div>
            <div className={`md:col-span-3 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '500ms' }}>
               {personalInfo.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg text-brand-text/80 leading-relaxed mb-6 last:mb-0 text-justify">
                    {paragraph}
                  </p>
               ))}
               <div className="mt-12">
                   <h3 className="text-2xl font-bold mb-6 text-brand-text">{uiTexts.aboutSection.skillsTitle}</h3>
                   <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <div key={skill.name} className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 text-brand-text/90 px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-primary/10 hover:border-brand-primary/80 hover:text-brand-primary transition-all duration-300 cursor-default">
                          <skill.icon className="w-4 h-4 mr-2"/>
                          {skill.name}
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          </div>
        
      </section>
    );
});

const ExperienceSection: React.FC = () => {
  const [ref, isVisible] = useAnimateOnScroll();

  const experienceItems: TimelineItemData[] = experiences.map(exp => ({
    date: exp.period,
    title: exp.role,
    subtitle: exp.company,
    description: exp.description,
  }));

  const educationItems: TimelineItemData[] = educationData.map(edu => ({
    date: edu.period,
    title: edu.degree,
    subtitle: edu.institution,
    description: edu.details.join(' | '),
  }));

  return (
    <section 
      id="experience" 
      className="py-24"
      ref={ref}
    >
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>{uiTexts.experienceSection.title}</h2>
      <div className={`w-16 h-1 bg-brand-primary mb-12 transition-all duration-700 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}></div>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
        <Timeline title={uiTexts.experienceSection.experienceTitle} items={experienceItems} />
        <Timeline title={uiTexts.experienceSection.educationTitle} items={educationItems} />
      </div>
    </section>
  );
};

const ProjectsSection: React.FC = () => {
  const [ref, isVisible] = useAnimateOnScroll();
  return (
    <section 
      id="projects" 
      className="py-24"
      ref={ref}
    >
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>{uiTexts.projectsSection.title}</h2>
      <div className={`w-16 h-1 bg-brand-primary mb-12 transition-all duration-700 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div 
            key={project.title} 
            className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${400 + index * 150}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const [ref, isVisible] = useAnimateOnScroll();
  return (
    <section 
      id="contact" 
      className="py-32 text-center"
      ref={ref}
    >
      <h2 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 transition-all duration-700 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <span className="text-brand-text">LET'S WORK</span> <span className="text-brand-primary">TOGETHER</span>
      </h2>
      
      <p className={`max-w-3xl mx-auto text-xl md:text-2xl text-brand-text/70 mb-16 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
        {uiTexts.contactSection.paragraph}
      </p>
      
      <div className={`flex justify-center items-center space-x-6 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
        <a href={`mailto:${contact.email}`} aria-label="Email" className="group">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300 transform group-hover:scale-110">
            <MailIcon className="w-8 h-8 text-brand-text group-hover:text-brand-primary transition-colors duration-300" />
          </div>
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300 transform group-hover:scale-110">
            <GithubIcon className="w-8 h-8 text-brand-text group-hover:text-brand-primary transition-colors duration-300" />
          </div>
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300 transform group-hover:scale-110">
            <LinkedinIcon className="w-8 h-8 text-brand-text group-hover:text-brand-primary transition-colors duration-300" />
          </div>
        </a>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-8 border-t border-brand-text/10">
    <div className="container mx-auto px-6 flex justify-center items-center text-center">
      <p className="text-brand-text/60 text-sm">&copy; {new Date().getFullYear()} {personalInfo.name}. {uiTexts.footer.copyrightText}</p>
    </div>
  </footer>
);

//== MAIN APP =================================================================
const App: React.FC = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const aboutSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScrollAndResize = () => {
      if (aboutSectionRef.current) {
        // Blur when the top of the about section passes the vertical midpoint of the screen
        const threshold = aboutSectionRef.current.offsetTop - window.innerHeight / 2;
        setIsHeroVisible(window.scrollY < threshold);
      }
    };

    window.addEventListener('scroll', handleScrollAndResize, { passive: true });
    window.addEventListener('resize', handleScrollAndResize);
    
    // Run on mount to set initial state correctly
    handleScrollAndResize();

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, []);

  return (
    <div className="relative isolate">
      <div 
        className="fixed top-0 left-0 w-full h-full -z-20 opacity-[0.02]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <AnimatedBackground isVisible={isHeroVisible} />
      <Header />
      <main className="container mx-auto px-6 relative z-10">
        <HeroSection />
        <AboutSection ref={aboutSectionRef} />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
