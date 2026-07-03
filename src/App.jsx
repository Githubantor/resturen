import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const navLinks = ['Home', 'About', 'Menu', 'Delivery', 'Reservations', 'Contact']

const menuItems = [
  { name: 'Wagyu Tartare', desc: 'Hand-chopped Japanese wagyu with quail egg & truffle', price: '$34', delay: 0, src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80' },
  { name: 'Lobster Ravioli', desc: 'Homemade pasta with Maine lobster & bisque sauce', price: '$42', delay: 0.1, src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80' },
  { name: 'Seared Scallops', desc: 'Day-boat scallops with cauliflower purée & brown butter', price: '$38', delay: 0.2, src: 'https://images.unsplash.com/photo-1599084993091-1cb5c07e0b26?w=600&q=80' },
  { name: 'Filet Mignon', desc: 'Prime dry-aged beef with foie gras & red wine reduction', price: '$56', delay: 0.3, src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80' },
  { name: 'Chocolate Soufflé', desc: 'Valrhona dark chocolate with vanilla bean crème anglaise', price: '$22', delay: 0.4, src: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&q=80' },
  { name: 'Tuna Crudo', desc: 'Bluefin tuna with yuzu, ginger & micro shiso', price: '$28', delay: 0.5, src: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&q=80' },
]

const testimonials = [
  { name: 'Sophia Chen', role: 'Food Critic, Michelin Guide', text: 'An extraordinary dining experience. Every dish tells a story, and the presentation is nothing short of art.', rating: 5 },
  { name: 'James Mitchell', role: 'Executive Chef, Le Bernardin', text: 'The attention to detail in both flavor and service sets a new standard for fine dining.', rating: 5 },
  { name: 'Elena Rossi', role: 'Vogue Dining Editor', text: 'A perfect harmony of tradition and innovation. The tasting menu is a culinary journey.', rating: 5 },
  { name: 'David Park', role: 'Sommelier of the Year', text: 'The wine pairings are impeccable. Each selection elevates the course it accompanies.', rating: 5 },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const menuRef = useRef(null)
  const aboutRef = useRef(null)
  const testimonialRef = useRef(null)
  const reserveRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5,
      })

      gsap.from('.hero-sub', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      })

      gsap.from('.hero-actions', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.6,
      })

      gsap.to('.scroll-indicator', {
        y: 12,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      gsap.from('.nav-bar', {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      const revealItems = document.querySelectorAll('.reveal')
      revealItems.forEach((el) => {
        const delay = parseFloat(el.dataset.delay) || 0
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay,
        })
      })

      gsap.utils.toArray('.menu-card').forEach((card) => {
        const img = card.querySelector('.dish-img')
        gsap.from(img, {
          scale: 1.3,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray('.parallax-bg').forEach((el) => {
        gsap.fromTo(el, { yPercent: -20 }, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      const stats = document.querySelectorAll('.stat-number')
      stats.forEach((stat) => {
        const target = parseInt(stat.dataset.target)
        if (!target) return
        gsap.from(stat, {
          textContent: 0,
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const current = Math.round(parseFloat(stat.textContent))
            stat.textContent = current + (stat.dataset.suffix || '')
          },
        })
      })

      const tls = document.querySelectorAll('.testimonial-card')
      tls.forEach((tl, i) => {
        gsap.from(tl, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: tl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
        })
      })

      const lines = document.querySelectorAll('.animate-line')
      lines.forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#FAF6F0] font-[Inter] overflow-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="parallax-bg absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.08),transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6 reveal" data-delay="0">
            <span className="text-gold tracking-[0.3em] text-sm uppercase font-[Inter]">Est. 2024</span>
          </div>
          <h1 className="hero-title text-7xl md:text-8xl lg:text-9xl font-[Playfair_Display] font-bold mb-6 leading-none">
            <span className="block gold-text glow-text">Sweettable</span>
          </h1>
          <p className="hero-sub text-lg md:text-xl text-[#FAF6F0]/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Where culinary artistry meets unforgettable moments. Experience a symphony of flavors crafted by world-renowned chefs.
          </p>
          <div className="hero-actions flex flex-wrap gap-4 justify-center">
            <a href="#reservations" className="btn-gold px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest text-[#0A0A0A]">
              Reserve a Table
            </a>
            <a href="#menu" className="btn-outline px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest">
              Explore Menu
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 scroll-indicator">
          <span className="text-xs uppercase tracking-[0.3em] text-gold/60">Scroll</span>
          <svg className="w-5 h-5 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <AboutSection />

      <StatsSection />

      <MenuSection />

      <DeliveryOrderSection />

      <TestimonialsSection />

      <ReservationSection />

      <ContactSection />

      <FooterSection />
    </div>
  )
}

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav-bar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="text-2xl font-[Playfair_Display] font-bold gold-text">Sweettable</a>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm uppercase tracking-widest text-[#FAF6F0]/70 hover:text-gold transition-colors duration-300 relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5">
          <span className={`block w-6 h-px bg-[#FAF6F0] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-px bg-[#FAF6F0] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-[#FAF6F0] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>
    </nav>
  )
}

function MobileMenu({ menuOpen, setMenuOpen }) {
  return (
    <div className={`fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl flex items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center gap-8">
        {navLinks.map((link, i) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
            className="text-3xl font-[Playfair_Display] gold-text hover:text-[#FAF6F0] transition-all duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}>
            {link}
          </a>
        ))}
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" ref={el => document.current = el} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="reveal relative overflow-hidden rounded-2xl" data-delay="0">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" alt="Restaurant interior" className="w-full h-[600px] object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent rounded-2xl" />
            </div>
            <div className="reveal absolute -bottom-8 -right-8 w-48 h-48 border-2 border-gold/30 rounded-2xl -z-10" data-delay="0.1" />
          </div>
          <div className="space-y-8">
            <div className="reveal" data-delay="0">
              <span className="text-gold tracking-[0.3em] text-sm uppercase">Our Story</span>
            </div>
            <h2 className="reveal text-4xl md:text-5xl font-[Playfair_Display] font-bold leading-tight" data-delay="0.1">
              Where Passion<br />Meets <span className="gold-text">Perfection</span>
            </h2>
            <div className="animate-line w-16 h-0.5 bg-gold" />
            <p className="reveal text-[#FAF6F0]/60 text-lg leading-relaxed" data-delay="0.2">
              Founded in 2024, Sweettable was born from a vision to create more than just a restaurant — 
              a sanctuary for the senses. Chef Marco Rossi brings together techniques from Tokyo, Paris, 
              and New York to craft a menu that transcends borders.
            </p>
            <p className="reveal text-[#FAF6F0]/40 leading-relaxed" data-delay="0.3">
              Every ingredient is sourced with intention, every plate is a canvas, and every guest 
              is treated to an experience that lingers long after the last bite.
            </p>
            <div className="reveal flex gap-4 pt-4" data-delay="0.4">
              <span className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </span>
              <span className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </span>
              <span className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 10.5h-5.5V5a1 1 0 00-1-1h-5a1 1 0 00-1 1v5.5H3a1 1 0 00-1 1v5a1 1 0 001 1h5.5v-5.5a1 1 0 011-1h5a1 1 0 011 1v5.5H21a1 1 0 001-1v-5a1 1 0 00-1-1z"/></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.03),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { target: 5, suffix: '+', label: 'Years of Excellence' },
            { target: 120, suffix: '+', label: 'Signature Dishes' },
            { target: 15, suffix: 'k', label: 'Happy Guests' },
            { target: 3, suffix: '', label: 'Michelin Stars' },
          ].map((stat, i) => (
            <div key={i} className="reveal text-center" data-delay={i * 0.1}>
              <div className="stat-number text-5xl md:text-6xl font-[Playfair_Display] font-bold gold-text mb-2" data-target={stat.target} data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <div className="text-[#FAF6F0]/40 text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MenuSection() {
  return (
    <section id="menu" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="reveal" data-delay="0">
            <span className="text-gold tracking-[0.3em] text-sm uppercase">Signature Selection</span>
          </div>
          <h2 className="reveal text-4xl md:text-6xl font-[Playfair_Display] font-bold mt-4 mb-6" data-delay="0.1">
            Curated <span className="gold-text">Cuisine</span>
          </h2>
          <div className="animate-line w-16 h-0.5 bg-gold mx-auto" />
          <p className="reveal text-[#FAF6F0]/50 max-w-xl mx-auto mt-6" data-delay="0.2">
            Each dish is a masterpiece, crafted with the finest ingredients from around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, i) => (
            <div key={i} className="menu-card reveal relative group rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/5" data-delay={item.delay}>
              <div className="relative h-56 overflow-hidden">
                <img src={item.src} alt={item.name} className="dish-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-gold text-[#0A0A0A] text-sm font-bold px-4 py-1.5 rounded-full">
                  {item.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-[Playfair_Display] font-bold mb-2">{item.name}</h3>
                <p className="text-[#FAF6F0]/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-16" data-delay="0.5">
          <a href="#" className="btn-outline px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest inline-block">
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="reveal" data-delay="0">
            <span className="text-gold tracking-[0.3em] text-sm uppercase">Testimonials</span>
          </div>
          <h2 className="reveal text-4xl md:text-6xl font-[Playfair_Display] font-bold mt-4" data-delay="0.1">
            Voices of <span className="gold-text">Praise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card p-8 rounded-2xl">
              <div className="flex gap-1 mb-4 star-rating">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                ))}
              </div>
              <p className="text-[#FAF6F0]/70 text-lg leading-relaxed mb-6 font-light italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-[#0A0A0A] font-bold text-lg">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-[#FAF6F0]/40 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReservationSection() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", date: "", guests: "", time: "", message: "" })
  const [status, setStatus] = useState("idle")

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: Number(form.guests),
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setForm({ firstName: "", lastName: "", email: "", phone: "", date: "", guests: "", time: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section id="reservations" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="reveal" data-delay="0">
              <span className="text-gold tracking-[0.3em] text-sm uppercase">Reservations</span>
            </div>
            <h2 className="reveal text-4xl md:text-6xl font-[Playfair_Display] font-bold leading-tight" data-delay="0.1">
              Book Your<br /><span className="gold-text">Experience</span>
            </h2>
            <div className="animate-line w-16 h-0.5 bg-gold" />
            <p className="reveal text-[#FAF6F0]/50 text-lg leading-relaxed" data-delay="0.2">
              Join us for an unforgettable evening. Reserve your table and let us craft a dining experience 
              tailored to your preferences.
            </p>
            <div className="reveal space-y-4" data-delay="0.3">
              {[
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'hello@sweettable.com' },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+1 (555) 123-4567' },
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: '123 Gourmet Lane, New York, NY' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <span className="text-[#FAF6F0]/60 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" data-delay="0.2">
            <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 md:p-10 space-y-6 glow">
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
                <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
                <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone Number" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="date" value={form.date} onChange={handleChange} type="date" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
                <select name="guests" value={form.guests} onChange={handleChange} required className="input-field rounded-xl px-5 py-3.5 text-sm">
                  <option value="" disabled>Guests</option>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                </select>
              </div>
              <select name="time" value={form.time} onChange={handleChange} required className="input-field rounded-xl px-5 py-3.5 text-sm w-full">
                <option value="" disabled>Time Preference</option>
                <option value="5:30 PM">5:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="10:00 PM">10:00 PM</option>
              </select>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Special Requests" rows={3} className="input-field rounded-xl px-5 py-3.5 text-sm w-full resize-none" />
              <button type="submit" disabled={status === "loading"} className="btn-gold w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#0A0A0A] disabled:opacity-50">
                {status === "loading" ? "Submitting..." : status === "success" ? "Confirmed!" : status === "error" ? "Failed — Try Again" : "Confirm Reservation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const deliveryMenu = [
  { category: "Starters", items: [
    { name: "Truffle Arancini", desc: "Crispy risotto balls with truffle oil, mozzarella, and parmesan", price: 16 },
    { name: "Seared Scallops", desc: "Pan-seared scallops with cauliflower puree and caviar", price: 22 },
    { name: "Beef Carpaccio", desc: "Thinly sliced prime beef with arugula, parmesan, and balsamic glaze", price: 19 },
    { name: "Lobster Bisque", desc: "Creamy lobster soup with cognac and herb croutons", price: 18 },
  ]},
  { category: "Main Courses", items: [
    { name: "Wagyu Steak", desc: "8oz A5 wagyu with truffle mashed potatoes and asparagus", price: 68 },
    { name: "Lamb Rack", desc: "Herb-crusted lamb rack with rosemary jus and roasted vegetables", price: 42 },
    { name: "Pan-Seared Salmon", desc: "Atlantic salmon with lemon butter sauce and seasonal greens", price: 34 },
    { name: "Mushroom Risotto", desc: "Wild mushroom risotto with truffle oil and aged parmesan", price: 28 },
  ]},
  { category: "Desserts", items: [
    { name: "Dark Chocolate Soufflé", desc: "Rich dark chocolate soufflé with vanilla bean ice cream", price: 18 },
    { name: "Crème Brûlée", desc: "Classic vanilla crème brûlée with caramelized sugar top", price: 14 },
    { name: "Tiramisu", desc: "Italian mascarpone tiramisu with espresso and cocoa", price: 16 },
    { name: "Cheesecake", desc: "New York style cheesecake with berry compote", price: 15 },
  ]},
  { category: "Cocktails", items: [
    { name: "Signature Gold", desc: "Champagne, gold liqueur, citrus, and edible gold flakes", price: 22 },
    { name: "Smoked Old Fashioned", desc: "Bourbon, smoked cherrywood, bitters, and orange peel", price: 20 },
    { name: "Espresso Martini", desc: "Vodka, espresso, coffee liqueur, and vanilla syrup", price: 18 },
    { name: "Berry Spritz", desc: "Aperol, prosecco, mixed berries, and mint", price: 16 },
  ]},
]

function DeliveryOrderSection() {
  const [cart, setCart] = useState({})
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", instructions: "" })
  const [status, setStatus] = useState("idle")

  const addItem = (item) => setCart({ ...cart, [item.name]: { ...item, quantity: (cart[item.name]?.quantity || 0) + 1 } })
  const removeItem = (name) => {
    const next = { ...cart }
    if (next[name].quantity <= 1) delete next[name]
    else next[name] = { ...next[name], quantity: next[name].quantity - 1 }
    setCart(next)
  }

  const cartItems = Object.values(cart)
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!itemCount) return
    setStatus("loading")
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
          total,
          customer: form,
          instructions: form.instructions,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setCart({})
        setForm({ name: "", email: "", phone: "", address: "", instructions: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section id="delivery" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="reveal" data-delay="0">
            <span className="text-gold tracking-[0.3em] text-sm uppercase">Order Online</span>
          </div>
          <h2 className="reveal text-4xl md:text-6xl font-[Playfair_Display] font-bold mt-4 mb-6" data-delay="0.1">
            Home <span className="gold-text">Delivery</span>
          </h2>
          <div className="animate-line w-16 h-0.5 bg-gold mx-auto" />
          <p className="reveal text-[#FAF6F0]/50 max-w-xl mx-auto mt-6" data-delay="0.2">
            Enjoy Sweettable from the comfort of your home. Select your items and we'll deliver.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {deliveryMenu.map((cat) => (
              <div key={cat.category} className="reveal" data-delay="0">
                <h3 className="text-xl font-[Playfair_Display] font-bold gold-text mb-6 uppercase tracking-wider">{cat.category}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between bg-[#1A1A1A] border border-white/5 rounded-xl p-4 hover:border-gold/30 transition-colors">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-[#FAF6F0]/40 text-xs truncate mt-0.5">{item.desc}</p>
                        <p className="text-gold text-sm font-bold mt-1">${item.price}</p>
                      </div>
                      <button onClick={() => addItem(item)} className="btn-gold shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#0A0A0A] font-bold text-lg hover:scale-110 transition-transform">
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" data-delay="0.2">
            <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 md:p-8 glow sticky top-28">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                Your Order
                {itemCount > 0 && <span className="text-gold text-sm font-normal">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>}
              </h3>

              {itemCount === 0 ? (
                <p className="text-[#FAF6F0]/40 text-sm py-8 text-center">Select items from the menu</p>
              ) : (
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm truncate">{item.name}</p>
                        <p className="text-[#FAF6F0]/40 text-xs">${item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => removeItem(item.name)} className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-xs text-[#FAF6F0]/50 hover:text-gold hover:border-gold/50 transition-colors">−</button>
                        <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                        <button onClick={() => addItem(item)} className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-xs text-[#FAF6F0]/50 hover:text-gold hover:border-gold/50 transition-colors">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {itemCount > 0 && (
                <>
                  <div className="flex justify-between items-center py-3 border-t border-white/5 mb-4">
                    <span className="text-sm">Total</span>
                    <span className="text-lg font-bold gold-text">${total}</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name" required className="input-field rounded-xl px-4 py-3 text-sm w-full" />
                    <div className="grid grid-cols-2 gap-3">
                      <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required className="input-field rounded-xl px-4 py-3 text-sm w-full" />
                      <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone" required className="input-field rounded-xl px-4 py-3 text-sm w-full" />
                    </div>
                    <input name="address" value={form.address} onChange={handleChange} type="text" placeholder="Delivery Address" required className="input-field rounded-xl px-4 py-3 text-sm w-full" />
                    <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Delivery Instructions (optional)" rows={2} className="input-field rounded-xl px-4 py-3 text-sm w-full resize-none" />
                    <button type="submit" disabled={status === "loading"} className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#0A0A0A] disabled:opacity-50">
                      {status === "loading" ? "Placing Order..." : status === "success" ? "Order Placed!" : status === "error" ? "Failed — Try Again" : `Place Order — $${total}`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState("idle")

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="reveal" data-delay="0">
            <span className="text-gold tracking-[0.3em] text-sm uppercase">Get in Touch</span>
          </div>
          <h2 className="reveal text-4xl md:text-6xl font-[Playfair_Display] font-bold mt-4" data-delay="0.1">
            <span className="gold-text">Contact</span> Us
          </h2>
          <div className="animate-line w-16 h-0.5 bg-gold mx-auto mt-6" />
        </div>
        <div className="reveal" data-delay="0.2">
          <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 md:p-10 space-y-6 glow max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your Email" required className="input-field rounded-xl px-5 py-3.5 text-sm" />
            </div>
            <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Subject" required className="input-field rounded-xl px-5 py-3.5 text-sm w-full" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={5} required className="input-field rounded-xl px-5 py-3.5 text-sm w-full resize-none" />
            <button type="submit" disabled={status === "loading"} className="btn-gold w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#0A0A0A] disabled:opacity-50">
              {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : status === "error" ? "Failed — Try Again" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-[Playfair_Display] font-bold gold-text mb-4">Sweettable</h3>
            <p className="text-[#FAF6F0]/40 text-sm max-w-md leading-relaxed">
              Redefining fine dining since 2024. Every plate tells a story, every visit creates a memory.
            </p>
          </div>
          {[
            { title: 'Hours', items: ['Mon–Thu: 5:30 PM – 10 PM', 'Fri–Sat: 5:30 PM – 11 PM', 'Sun: 10 AM – 9 PM'] },
            { title: 'Connect', items: ['Instagram', 'Facebook', 'Twitter'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-sm uppercase tracking-widest text-gold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li key={j} className="text-[#FAF6F0]/40 text-sm hover:text-gold transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FAF6F0]/20 text-xs">© 2024 Sweettable. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-[#FAF6F0]/20 text-xs hover:text-gold/60 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-[#FAF6F0]/20 text-xs hover:text-gold/60 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
