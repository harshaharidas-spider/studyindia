"use client";

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactPage() {
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
          <div className="cta"><div className="sbtn" title="Search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17130F" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg></div>
            <a className="login" href="#">Login</a><a className="reg" href="#">Register</a></div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      <main>
        <section className="hero"><div className="w hg">
          <div>
            <h1>Let&apos;s get in <em>touch</em></h1>
            <p className="lead">Great! We are excited to hear from you. Send us a message and we will reply by email to assist with your queries.</p>
          </div>
        </div></section>

        <section className="sec"><div className="w two">
          <div>
            <div className="lh"><h3>Contact Information</h3></div>
            <div className="item" style={{ gridTemplateColumns: '1fr', padding: '24px 0' }}>
              <b style={{ color: 'var(--mute)', display: 'block', marginBottom: '4px' }}>Phone</b>
              <span style={{ fontSize: '18px', fontWeight: '500' }}>+91 00000 00000</span>
            </div>
            <div className="item" style={{ gridTemplateColumns: '1fr', padding: '24px 0' }}>
              <b style={{ color: 'var(--mute)', display: 'block', marginBottom: '4px' }}>Email</b>
              <span style={{ fontSize: '18px', fontWeight: '500' }}>info@yourdomain.com</span>
            </div>
            <div className="item" style={{ gridTemplateColumns: '1fr', padding: '24px 0' }}>
              <b style={{ color: 'var(--mute)', display: 'block', marginBottom: '4px' }}>Office</b>
              <span style={{ fontSize: '18px', fontWeight: '500' }}>Your office address,<br/>Kochi, Kerala, India</span>
            </div>
            <div className="item" style={{ gridTemplateColumns: '1fr', padding: '24px 0', borderBottom: 'none' }}>
              <b style={{ color: 'var(--mute)', display: 'block', marginBottom: '4px' }}>Expert answers</b>
              <span style={{ fontSize: '18px', fontWeight: '500' }}>Ask in the forum</span>
            </div>
          </div>
          <div>
            <div className="lh"><h3>Send a message</h3></div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <input type="text" placeholder="Name" style={{ flex: '1 1 200px', padding: '16px', background: 'var(--tint)', border: '1px solid var(--line)', borderRadius: '4px', font: 'inherit', outline: 'none' }} />
                <input type="email" placeholder="Email" style={{ flex: '1 1 200px', padding: '16px', background: 'var(--tint)', border: '1px solid var(--line)', borderRadius: '4px', font: 'inherit', outline: 'none' }} />
              </div>
              <input type="text" placeholder="Subject (Admissions help)" style={{ width: '100%', padding: '16px', background: 'var(--tint)', border: '1px solid var(--line)', borderRadius: '4px', font: 'inherit', outline: 'none' }} />
              <textarea placeholder="Tell us what you are interested in" style={{ width: '100%', padding: '16px', background: 'var(--tint)', border: '1px solid var(--line)', borderRadius: '4px', font: 'inherit', outline: 'none', minHeight: '120px' }}></textarea>
              <button className="reg" style={{ alignSelf: 'flex-start', marginTop: '8px', border: 'none', cursor: 'pointer' }}>Submit</button>
            </form>
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
