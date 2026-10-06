"use client";

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);

    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    const sections = gsap.utils.toArray(".hero, .sec, .band");
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <header>
        <div className="w nb">
          <a className="logo" href="/"><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a>
          <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
            <div className="mi"><a href="#">Education</a>
              <div className="mega"><a href="#">Admissions</a><a href="#">Learn English</a><a href="#">Institutes</a><a href="#">Universities</a><a href="/colleges">Colleges</a><a href="#">Courses</a><a href="#">Schools</a><a href="#">Practice Tests</a><a href="#">Study Abroad</a></div></div>
            <div className="mi"><a className="kc" href="#">Knowledge Centre</a></div>
            <div className="mi"><a href="#">Forum</a></div>
            <div className="mi"><a href="/contact">Contact</a></div>
            <div className="mi"><a href="#">More</a>
              <div className="mega sm"><a href="/about">About Us</a><a href="#">Articles</a><a href="#">Ask Experts</a><a href="#">Jobs</a><a href="#">Reviews</a><a href="#">Study Abroad Consultants</a><a href="#">Social Hub</a><a href="#">New Posts</a><a href="#">Post Content</a></div></div>
          </div>
          <div className="cta">
            <div className="sbtn" title="Search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17130F" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg></div>
            <a className="login" href="#">Login</a>
            <a className="reg" href="#">Register</a>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      <main>
        <section className="hero"><div className="w hg">
          <div>
            <h1>Our Identity, <em>Vision &amp; Values</em></h1>
            <p className="lead">To be the most trusted education website in India for students and parents, guiding them to admission in the right school, college or university.</p>
          </div>
        </div></section>

        <section className="sec"><div className="w">
          <div className="sh"><h2>What we stand for</h2>
            <p>We believe in providing reliable, trustworthy information to build a strong community and guide students properly.</p></div>
          <div className="cols">
            <div className="col">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--o)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>
              <h3>Reliable</h3><p>Trusted information on exams, results, and courses.</p>
            </div>
            <div className="col">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--o)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>
              <h3>Guidance</h3><p>Complete guidance for university and college admissions.</p>
            </div>
            <div className="col">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--o)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3>Community</h3><p>Active forum and expert advice for all queries.</p>
            </div>
            <div className="col">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--o)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '12px'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <h3>Quality</h3><p>High quality content dedicated to our readers.</p>
            </div>
          </div>
        </div></section>

        <section className="sec"><div className="w">
          <div className="sh"><h2>Meet our team</h2>
            <p>Dedicated professionals shaping the vision for students across India.</p></div>
          <div className="ls">
            <div>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop" alt="Rahul Sharma" style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover' }} />
              <h3 style={{ margin: '0', fontSize: '18px' }}>Rahul Sharma</h3>
              <p style={{ color: 'var(--mute)', fontSize: '14px', margin: '4px 0 0' }}>Founder &amp; Director</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Priya Singh" style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover' }} />
              <h3 style={{ margin: '0', fontSize: '18px' }}>Priya Singh</h3>
              <p style={{ color: 'var(--mute)', fontSize: '14px', margin: '4px 0 0' }}>Head of Admissions</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop" alt="Arjun Patel" style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover' }} />
              <h3 style={{ margin: '0', fontSize: '18px' }}>Arjun Patel</h3>
              <p style={{ color: 'var(--mute)', fontSize: '14px', margin: '4px 0 0' }}>Community Manager</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop" alt="Neha Gupta" style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover' }} />
              <h3 style={{ margin: '0', fontSize: '18px' }}>Neha Gupta</h3>
              <p style={{ color: 'var(--mute)', fontSize: '14px', margin: '4px 0 0' }}>Content Strategy Lead</p>
            </div>
          </div>
        </div></section>
        
        <section className="band"><div className="w"><div><h2>Join us today</h2><p>A complete directory of schools, colleges and universities in India, with contact information, course details and admission guidance.</p></div><a href="/#join">Create free account</a></div></section>
      </main>

      <footer><div className="w">
        <div className="fg">
          <div><a className="logo" href="/" style={{ color: 'var(--ink)' }}><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a><p style={{ color: 'var(--mute)', maxWidth: '300px' }}>The most popular educational website in India, committed to quality content for its readers.</p><form className="sub" onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Your email" aria-label="Email" /><button>Subscribe</button></form></div>
          <div><h4>General</h4><a href="#">Admissions Consulting</a><a href="#">Become an Editor</a><a href="#">Membership Levels</a><a href="#">Payments</a><a href="#">Winners &amp; Awards</a><a href="#">Guest Posting</a><a href="#">Help Topics</a><a href="#">Online MBA</a></div>
          <div><h4>Study abroad</h4><a href="#">Study in Germany</a><a href="#">Study in Italy</a><a href="#">Study in Ireland</a><a href="#">Study in France</a><a href="#">Study in Australia</a><a href="#">Study in New Zealand</a><a href="#">Indian Universities</a></div>
          <div><h4>Education</h4><a href="#">Distance MBA</a><a href="#">MBA in Bangalore</a><a href="#">MBBS in Mangalore</a><a href="#">BDS in Mangalore</a><a href="#">B Pharm in Mangalore</a><a href="#">MBA Digital Marketing</a><a href="#">Education Leads</a><a href="#">Advertise</a></div>
        </div>
        <div className="fb"><span><a href="/about">About Us</a><a href="/contact">Contact Us</a><a href="#">Copyright</a><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></span><span>Promoted by SpiderWorks Technologies, Kochi, India</span></div>
      </div></footer>
      
      <a className={`top ${showTop ? 'on' : ''}`} id="top" href="#" aria-label="Back to top">↑</a>
    </>
  );
}
