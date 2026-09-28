"use client";

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Colleges');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);

    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    const sections = gsap.utils.toArray(".sec .w, .band .w");
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse" // Reverse animation when scrolling up
          }
        }
      );
    });

    // Animate the hero section elements on load
    gsap.fromTo([".hero h1", ".hero .lead", ".hero .sb", ".hero .hint"], 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const tabs = ['Colleges', 'Universities', 'Courses', 'Schools'];

  return (
    <>
      <header>
        <div className="w nb">
          <a className="logo" href="#"><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a>
          <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
            <div className="mi"><a href="#">Education</a>
              <div className="mega"><a href="#">Admissions</a><a href="#">Learn English</a><a href="#">Institutes</a><a href="#">Universities</a><a href="#">Colleges</a><a href="#">Courses</a><a href="#">Schools</a><a href="#">Practice Tests</a><a href="#">Study Abroad</a></div></div>
            <div className="mi"><a className="kc" href="#">Knowledge Centre</a></div>
            <div className="mi"><a href="#">Forum</a></div>
            <div className="mi"><a href="#">More</a>
              <div className="mega sm"><a href="#">Articles</a><a href="#">Ask Experts</a><a href="#">Jobs</a><a href="#">Reviews</a><a href="#">Study Abroad Consultants</a><a href="#">Social Hub</a><a href="#">New Posts</a><a href="#">Post Content</a></div></div>
          </div>
          <div className="cta"><div className="sbtn" title="Search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17130F" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg></div>
            <a className="login" href="#">Login</a><a className="reg" href="#">Register</a></div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      <main>
        <section className="imgs"><div className="w">
          <svg viewBox="0 0 1180 340" role="img" aria-label="Illustration of students walking towards a university hall" xmlns="http://www.w3.org/2000/svg">
            <rect width="1180" height="340" fill="#FFF4EC" />
            <circle cx="190" cy="92" r="50" fill="#FFD9BF" /><circle cx="190" cy="92" r="30" fill="#F26A1B" />
            <g fill="#fff"><ellipse cx="450" cy="70" rx="46" ry="13" /><ellipse cx="480" cy="60" rx="26" ry="12" /><ellipse cx="770" cy="56" rx="50" ry="13" /><ellipse cx="800" cy="46" rx="26" ry="11" /><ellipse cx="960" cy="128" rx="38" ry="10" /></g>
            <path d="M0 250 Q200 190 420 235 T860 222 T1180 240 V300 H0Z" fill="#FBE3D2" />
            <g fill="#F7CDB0"><rect x="60" y="204" width="72" height="80" /><rect x="140" y="226" width="52" height="58" /><rect x="960" y="196" width="80" height="88" /><rect x="1048" y="224" width="60" height="60" /></g>
            <g fill="#fff"><rect x="74" y="218" width="12" height="14" /><rect x="102" y="218" width="12" height="14" /><rect x="74" y="244" width="12" height="14" /><rect x="102" y="244" width="12" height="14" /><rect x="976" y="210" width="12" height="14" /><rect x="1004" y="210" width="12" height="14" /><rect x="976" y="238" width="12" height="14" /><rect x="1004" y="238" width="12" height="14" /></g>
            <rect y="280" width="1180" height="60" fill="#F3D5BE" />
            <path d="M470 280 L380 340 L800 340 L710 280Z" fill="#F7B98F" />
            <g stroke="#17130F" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
              <rect x="350" y="205" width="90" height="75" fill="#fff" /><rect x="740" y="205" width="90" height="75" fill="#fff" />
              <g fill="#FFD9BF" strokeWidth="2"><rect x="366" y="226" width="18" height="28" /><rect x="398" y="226" width="18" height="28" /><rect x="766" y="226" width="18" height="28" /><rect x="798" y="226" width="18" height="28" /></g>
              <rect x="550" y="118" width="80" height="42" fill="#fff" />
              <path d="M550 118 A40 40 0 0 1 630 118Z" fill="#F26A1B" />
              <rect x="583" y="60" width="14" height="20" fill="#fff" /><line x1="590" y1="60" x2="590" y2="34" /><polygon points="590,34 616,42 590,50" fill="#17130F" />
              <rect x="500" y="160" width="180" height="120" fill="#F26A1B" />
              <polygon points="486,192 590,152 694,192" fill="#fff" />
              <g fill="#fff" strokeWidth="2.5"><rect x="512" y="194" width="13" height="80" /><rect x="545" y="194" width="13" height="80" /><rect x="578" y="194" width="13" height="80" /><rect x="611" y="194" width="13" height="80" /><rect x="644" y="194" width="13" height="80" /></g>
              <g fill="#fff" strokeWidth="2.5"><rect x="490" y="262" width="200" height="6" /><rect x="480" y="268" width="220" height="6" /><rect x="470" y="274" width="240" height="6" /></g>
              <g><rect x="296" y="252" width="8" height="30" fill="#17130F" /><circle cx="300" cy="234" r="30" fill="#F26A1B" /><circle cx="286" cy="246" r="18" fill="#C94F0A" />
                <rect x="876" y="252" width="8" height="30" fill="#17130F" /><circle cx="880" cy="234" r="30" fill="#C94F0A" /><circle cx="894" cy="246" r="18" fill="#F26A1B" /></g>
              <g><circle cx="236" cy="252" r="10" fill="#FFD9BF" /><rect x="226" y="263" width="20" height="34" rx="7" fill="#17130F" /><rect x="245" y="267" width="9" height="22" rx="3" fill="#F26A1B" /><line x1="232" y1="297" x2="230" y2="316" /><line x1="241" y1="297" x2="244" y2="316" />
                <circle cx="272" cy="258" r="9" fill="#FFD9BF" /><rect x="263" y="268" width="18" height="30" rx="6" fill="#F26A1B" /><line x1="268" y1="298" x2="266" y2="314" /><line x1="277" y1="298" x2="280" y2="314" />
                <circle cx="900" cy="254" r="10" fill="#FFD9BF" /><rect x="890" y="265" width="20" height="34" rx="7" fill="#F26A1B" /><rect x="903" y="276" width="14" height="10" rx="1" fill="#fff" strokeWidth="2" /><line x1="896" y1="299" x2="894" y2="318" /><line x1="905" y1="299" x2="908" y2="318" />
                <circle cx="938" cy="260" r="9" fill="#FFD9BF" /><rect x="929" y="270" width="18" height="30" rx="6" fill="#17130F" /><line x1="934" y1="300" x2="932" y2="316" /><line x1="943" y1="300" x2="946" y2="316" /></g>
              <g><polygon points="1030,88 1076,70 1122,88 1076,106" fill="#17130F" /><path d="M1052,98 v16 q24 12 48 0 v-16" fill="#17130F" /><line x1="1122" y1="88" x2="1122" y2="116" stroke="#F26A1B" strokeWidth="4" /></g>
              <g fill="#fff"><path d="M84 70 q22-10 44 0 v30 q-22-10-44 0Z" /><path d="M128 70 q22-10 44 0 v30 q-22-10-44 0Z" /></g>
            </g>
            <g fill="#F26A1B"><circle cx="330" cy="120" r="4" /><circle cx="700" cy="100" r="3" /><circle cx="1000" cy="60" r="4" /><circle cx="60" cy="150" r="3" /></g>
          </svg>
        </div></section>

        <section className="hero"><div className="w hg">
          <div>
            <h1>College admissions in India, <em>2027–2028</em></h1>
            <p className="lead">Guidance for universities, colleges, schools and study abroad, with reliable information on exams, results and entrance coaching.</p>
            <div className="sb">
              <div className="tabs" id="tabs">
                {tabs.map(tab => (
                  <button key={tab} className={activeTab === tab ? 'on' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>
              <div className="sr"><input id="q" placeholder={`Search ${activeTab.toLowerCase()} in India`} /><button>Search</button></div>
            </div>
            <div className="hint">Popular: <a href="#">Online MBA</a><a href="#">Distance MBA</a><a href="#">MBBS</a><a href="#">CBSE Schools</a></div>
          </div>
          <div className="idx">
            <h3>Admissions open <span>2027 – 28</span></h3>
            <a className="row" href="#"><b>01</b><div><strong>Online MBA</strong><small>Best online MBA courses in India</small></div><span className="ar">→</span></a>
            <a className="row" href="#"><b>02</b><div><strong>University admissions</strong><small>Notifications, results and affiliated colleges</small></div><span className="ar">→</span></a>
            <a className="row" href="#"><b>03</b><div><strong>School admissions</strong><small>CBSE, ICSE, State and International</small></div><span className="ar">→</span></a>
            <a className="row" href="#"><b>04</b><div><strong>Study abroad</strong><small>With or without scholarship</small></div><span className="ar">→</span></a>
          </div>
        </div></section>

        <section className="sec"><div className="w">
          <div className="sh"><h2>College admissions in India</h2>
            <p>Rated the best educational website in India. We guide you to admission in universities, colleges and schools, with reliable information on exams, results and entrance coaching.</p></div>
          <div className="cols">
            <div className="col"><span>01</span><h3>Universities</h3><p>Contact details, admission notifications, announcements, exam results and every affiliated college.</p><a className="lk" href="#">Search universities</a></div>
            <div className="col"><span>02</span><h3>Courses</h3><p>Browse courses and their branches, then find colleges offering the one you want.</p><a className="lk" href="#">Search courses</a></div>
            <div className="col"><span>03</span><h3>Schools</h3><p>Our school finder guides you to admission in the best schools across the country.</p><a className="lk" href="#">Best schools in India</a></div>
            <div className="col"><span>04</span><h3>Study abroad</h3><p>Guidance for Germany, Canada, Switzerland, Singapore, China and more, through trusted consultants.</p><a className="lk" href="#">Explore countries</a></div>
          </div>
          <div className="tags"><a href="#">CBSE Schools</a><a href="#">ICSE Schools</a><a href="#">IB Schools</a></div>
        </div></section>

        <section className="sec"><div className="w two">
          <div><div className="lh"><h3>Recent announcements</h3><a className="lk" href="#">More</a></div>
            <a className="item" href="#"><b>01</b>Completing 13 years with ISC today</a>
            <a className="item" href="#"><b>02</b>Republic Day Greetings to all!</a>
            <a className="item" href="#"><b>03</b>Festival greetings to all!</a>
            <a className="item" href="#"><b>04</b>Alert: Ongoing Cyber Crimes, Scams and Frauds to Avoid Getting Trapped</a>
            <a className="item" href="#"><b>05</b>Remembering the Mahatma and Shastriji, Oct 2nd</a></div>
          <div><div className="lh"><h3>Recent articles</h3><a className="lk" href="#">More</a></div>
            <a className="item" href="#"><b>01</b>Small Amounts, Long-Term Goals: How Digital Gold Can Fit into Family Saving Habits</a>
            <a className="item" href="#"><b>02</b>MBBS in Russia: Key Factors &amp; Universities 2026</a>
            <a className="item" href="#"><b>03</b>Where an Early Childhood Care and Education Qualification Actually Takes You</a></div>
        </div></section>

        <section className="sec"><div className="w">
          <div className="sh"><h2>Forum discussions</h2><p>Ask questions, share experience and follow what the ISC community is talking about.</p></div>
          <div className="fm">
            <div><div className="lh"><h3>Latest threads</h3><a className="lk" href="#">Open forum</a></div>
              <a className="th" href="#"><em>Guide</em><strong>Post content and make money from ISC</strong><span>Join →</span></a>
              <a className="th" href="#"><em>Alert</em><strong>Ongoing Cyber Crimes, Scams and Frauds to Avoid Getting Trapped</strong><span>Read →</span></a>
              <a className="th" href="#"><em>Announcement</em><strong>Completing 13 years with ISC today</strong><span>Read →</span></a>
              <a className="th" href="#"><em>Greetings</em><strong>Republic Day Greetings to all!</strong><span>Read →</span></a>
              <a className="th" href="#"><em>Greetings</em><strong>Festival greetings to all!</strong><span>Read →</span></a>
              <a className="th" href="#"><em>Remembrance</em><strong>Remembering the Mahatma and Shastriji, Oct 2nd</strong><span>Read →</span></a>
            </div>
            <aside className="side"><h3>Have a question?</h3><p>Start a discussion in the forum or ask one of our experts directly.</p>
              <a className="b p" href="#">Start a discussion</a><a className="b" href="#">Ask an expert</a><a className="b" href="#">New posts</a></aside>
          </div>
        </div></section>

        <section className="sec"><div className="w">
          <div className="sh"><h2>More than admissions</h2><p>Learn, practise and connect with the community, all under one login.</p></div>
          <div className="tl">
            <a href="#"><b>Ask Experts</b><span>Get your questions answered by experts.</span><i>Ask now →</i></a>
            <a href="#"><b>Jobs</b><span>Browse education and career openings.</span><i>View jobs →</i></a>
            <a href="#"><b>Reviews</b><span>Read reviews of colleges and institutes.</span><i>Read reviews →</i></a>
            <a href="#"><b>Learn English</b><span>Improve your spoken and written English.</span><i>Start learning →</i></a>
            <a href="#"><b>Practice Tests</b><span>Prepare with online practice tests.</span><i>Take a test →</i></a>
          </div>
        </div></section>

        <section className="sec"><div className="w">
          <div className="sh"><h2>Browse all listings</h2><p>Jump straight to the directory you need: popular admissions, study abroad countries, school boards and the full ISC directory.</p></div>
          <div className="ls">
            <div><h4>Popular admissions <span>9</span></h4>
              <a href="#">Online MBA</a><a href="#">Distance MBA</a><a href="#">MBA in Bangalore</a><a href="#">MBA Digital Marketing</a><a href="#">MBBS in Mangalore</a><a href="#">BDS in Mangalore</a><a href="#">B Pharm in Mangalore</a><a href="#">Nursing colleges in Mangalore</a><a href="#">BBA in Mangalore</a></div>
            <div><h4>Study abroad <span>6</span></h4>
              <a href="#">Study in Germany</a><a href="#">Study in Italy</a><a href="#">Study in Ireland</a><a href="#">Study in France</a><a href="#">Study in Australia</a><a href="#">Study in New Zealand</a><a className="all" href="#">All countries</a></div>
            <div><h4>School boards <span>3</span></h4>
              <a href="#">CBSE Schools</a><a href="#">ICSE Schools</a><a href="#">IB Schools</a><a className="all" href="#">Best schools in India</a>
              <h4 style={{ marginTop: '32px' }}>Learn <span>2</span></h4><a href="#">Learn English</a><a href="#">Practice Tests</a></div>
            <div><h4>Directory <span>9</span></h4>
              <a href="#">Admissions</a><a href="#">Institutes</a><a href="#">Universities</a><a href="#">Colleges</a><a href="#">Courses</a><a href="#">Schools</a><a href="#">Jobs</a><a href="#">Reviews</a><a href="#">Ask Experts</a></div>
          </div>
        </div></section>

        <section className="band"><div className="w"><div><h2>Join us today</h2><p>A complete directory of schools, colleges and universities in India, with contact information, course details and admission guidance.</p></div><a href="#">Create free account</a></div></section>
      </main>

      <footer><div className="w">
        <div className="fg">
          <div><a className="logo" href="#" style={{ color: 'var(--ink)' }}><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a><p style={{ color: 'var(--mute)', maxWidth: '300px' }}>The most popular educational website in India, committed to quality content for its readers.</p><form className="sub" onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Your email" aria-label="Email" /><button>Subscribe</button></form></div>
          <div><h4>General</h4><a href="#">Admissions Consulting</a><a href="#">Become an Editor</a><a href="#">Membership Levels</a><a href="#">Payments</a><a href="#">Winners &amp; Awards</a><a href="#">Guest Posting</a><a href="#">Help Topics</a><a href="#">Online MBA</a></div>
          <div><h4>Study abroad</h4><a href="#">Study in Germany</a><a href="#">Study in Italy</a><a href="#">Study in Ireland</a><a href="#">Study in France</a><a href="#">Study in Australia</a><a href="#">Study in New Zealand</a><a href="#">Indian Universities</a></div>
          <div><h4>Education</h4><a href="#">Distance MBA</a><a href="#">MBA in Bangalore</a><a href="#">MBBS in Mangalore</a><a href="#">BDS in Mangalore</a><a href="#">B Pharm in Mangalore</a><a href="#">MBA Digital Marketing</a><a href="#">Education Leads</a><a href="#">Advertise</a></div>
        </div>
        <div className="fb"><span><a href="#">About Us</a><a href="#">Contact Us</a><a href="#">Copyright</a><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></span><span>Promoted by SpiderWorks Technologies, Kochi, India</span></div>
      </div></footer>
      
      <a className={`top ${showTop ? 'on' : ''}`} id="top" href="#" aria-label="Back to top">↑</a>
    </>
  );
}
