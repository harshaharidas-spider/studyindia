"use client";

import { useState, useEffect, useRef, use } from 'react';

const COLLEGES_DB = {
  "0": {
    name: "Rajagiri College of Engineering", aka: "RSET Kochi",
    lead: "Planning to apply? Call or email the college office to ask about the admission schedule, fees and other details.",
    address: "Rajagiri Valley, Kakkanad, Kochi, Kerala 682039", city: "Kochi", state: "Kerala", phone: "0484 266 0999",
    emails: ["admissions@rajagiritech.edu.in", "info@rajagiritech.edu.in"], website: "https://www.rajagiritech.ac.in",
    university: ["APJ Abdul Kalam Technological University", "#"], approval: "AICTE, New Delhi", stream: "Engineering",
    about: ["Rajagiri School of Engineering & Technology (RSET) is a premier educational institution offering excellence in engineering education and research.", "Located in the picturesque Rajagiri Valley in Kakkanad, Kochi, the campus provides a serene environment conducive to learning and overall development."],
    facilities: [["Classrooms with modern teaching aids", "Learning"], ["Laboratories for all disciplines", "Learning"], ["Workshops", "Learning"], ["Library with books, journals and e-books", "Learning"], ["Seminar hall", "Learning"], ["Canteen with quality food", "Campus"], ["Own sports ground", "Campus"], ["Wi-Fi across campus", "Campus"], ["24-hour CCTV surveillance", "Safety"], ["Infirmary with basic medical care", "Safety"], ["24x7 power backup", "Safety"], ["Transport facility", "Access"], ["2-wheeler and 4-wheeler parking", "Access"], ["Ramps and restrooms", "Access"]],
    courses: [["B.Tech Computer Science and Engineering", "#"], ["B.Tech Electronics & Communication", "#"], ["B.Tech Mechanical Engineering", "#"], ["B.Tech Information Technology", "#"]],
    cats: [["Engineering Colleges", "engineering"], ["Private Colleges", "private"]],
    more: [["College of Engineering Trivandrum", "/college/1"], ["Government Medical College", "/college/2"]],
    updates: [{ by: "Admin", date: "17 Aug 2026", text: "Admissions open for 2027 batch." }],
    checklist: ["Visit the college office on a working day", "Ask for the admission schedule and fee details", "Keep your marksheets and ID documents ready", "Confirm the course and seat availability"]
  },
  "25": {
    name: "IIT Bombay", aka: "Indian Institute of Technology Bombay",
    lead: "Welcome to IIT Bombay. One of the most prestigious engineering institutes in India.",
    address: "Main Gate Rd, IIT Area, Powai, Mumbai, Maharashtra 400076", city: "Mumbai", state: "Maharashtra", phone: "022 2572 2545",
    emails: ["admissions@iitb.ac.in"], website: "https://www.iitb.ac.in/",
    university: ["Autonomous Institute", "#"], approval: "Ministry of Education", stream: "Engineering",
    about: ["IIT Bombay is a public technical university located in Powai, Mumbai, Maharashtra, India.", "Established in 1958, it is renowned for its globally recognized faculty, advanced research facilities, and diverse campus community."],
    facilities: [["Smart Classrooms", "Learning"], ["High Performance Computing Lab", "Learning"], ["Central Library", "Learning"], ["Student Activity Center", "Campus"], ["Gymkhana", "Campus"], ["Hostels", "Campus"], ["Hospital", "Safety"]],
    courses: [["B.Tech Computer Science", "#"], ["B.Tech Electrical Engineering", "#"], ["B.Tech Mechanical Engineering", "#"]],
    cats: [["Engineering Colleges", "engineering"], ["Science Colleges", "science"]],
    more: [["Fergusson College", "/college/26"], ["Symbiosis Institute", "/college/24"]],
    updates: [{ by: "Admin", date: "12 Jan 2026", text: "Admissions 2027 notification released." }],
    checklist: ["Clear JEE Advanced", "Fill JOSAA counselling form", "Keep category certificates ready"]
  }
};

export default function CollegeDetailPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  // Dynamic fallback for any ID
  const C = COLLEGES_DB[id] || {
    ...COLLEGES_DB["0"],
    name: `College Name ${id}`,
    city: "City", state: "State"
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Facilities filter
  const allFacCats = ["All", ...new Set(C.facilities.map(f => f[1]))];
  const [fCat, setFCat] = useState("All");
  
  // Checklist
  const [checks, setChecks] = useState([]);
  
  // Modal & Reviews
  const [modalOpen, setModalOpen] = useState(false);
  const [courseSel, setCourseSel] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const toggleSave = () => {
    setSaved(!saved);
    showToast(!saved ? "Saved to your shortlist" : "Removed from shortlist");
  };

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActiveTab(e.target.id);
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    
    ["overview", "about", "facilities", "courses", "apply", "photos", "reviews", "updates"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const progress = (checks.length / C.checklist.length) * 100;

  const handleReview = (e) => {
    e.preventDefault();
    if (!rating) { showToast("Choose a star rating first"); return; }
    const name = e.target.rn.value.trim();
    const text = e.target.rt.value.trim();
    setReviews([{ n: name, t: text, r: rating }, ...reviews]);
    e.target.reset(); setRating(0); setShowReviewForm(false);
    showToast("Thanks, your review is posted (demo only)");
  };

  const openEnquiry = (courseName) => {
    setCourseSel(courseName || C.courses[0][0]);
    setModalOpen(true);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* College Details Custom Styles mapped from college-detail-white.html */
        :root{ --glow: #ff8a45; --night: #0e0907; }
        html{ scroll-padding-top: 76px; }
        .clabel{ font-size: .76rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
        .cmuted{ color: var(--mute); }
        
        .hero{ position: relative; overflow: hidden; background: url('/hero-college.png') center 30%/cover no-repeat; padding-bottom: 40px; }
        .hero::before{ content:""; position:absolute; inset:0; background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 100%); pointer-events:none; }
        .hero .w{ position: relative; z-index: 2; }
        
        .crumbs{ padding: 22px 0 0; font-size: .9rem; color: var(--mute); }
        .crumbs a:hover{ color: var(--o); } .crumbs span{ margin: 0 6px; opacity: .5; }
        .pill{ display: inline-flex; align-items: center; gap: 10px; border: 1px solid var(--line); background: #fff; box-shadow: 0 4px 18px rgba(242,106,27,.12); border-radius: 999px; padding: 7px 16px; font-size: .85rem; font-weight: 600; margin-top: 44px; }
        .pill i{ width: 8px; height: 8px; border-radius: 50%; background: var(--glow); animation: pulse 2s infinite; }
        @keyframes pulse{ 70%{ box-shadow: 0 0 0 10px rgba(255,138,69,0) } 100%{ box-shadow: 0 0 0 0 rgba(255,138,69,0) } }
        
        .hero h1{ font-size: clamp(2.2rem, 5.4vw, 4.4rem); line-height: 1.04; letter-spacing: -.04em; font-weight: 800; margin: 22px 0 18px; max-width: 17ch; }
        .hlead{ font-size: 1.2rem; color: var(--mute); max-width: 40em; margin: 0 0 30px; }
        
        .acts{ display: flex; flex-wrap: wrap; gap: 12px; }
        .cbtn{ display: inline-flex; align-items: center; gap: 8px; border-radius: 6px; padding: 14px 24px; font-weight: 700; border: 0; cursor: pointer; text-align: center; }
        .cbtn.or{ background: var(--o); color: #fff; box-shadow: 0 0 28px rgba(242,106,27,.45); }
        .cbtn.or:hover{ background: var(--glow); }
        .cbtn.gl{ background: #fff; color: var(--ink); border: 2px solid var(--ink); }
        .cbtn.gl:hover{ background: var(--tint); }
        .cbtn.dk{ background: var(--ink); color: #fff; } .cbtn.dk:hover{ background: #000; }
        .cbtn.ln{ background: #fff; color: var(--ink); border: 2px solid var(--ink); } .cbtn.ln:hover{ background: var(--tint); }
        
        .stats{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 46px; }
        .stat{ border: 1px solid var(--line); background: #fff; box-shadow: 0 8px 28px rgba(242,106,27,.09); border-radius: 10px; padding: 18px 20px; }
        .stat b{ display: block; font-size: 1.7rem; letter-spacing: -.03em; line-height: 1.2; font-weight: 700; }
        
        .tabs{ position: sticky; top: 0; z-index: 6; background: rgba(255,255,255,.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
        .tabs .w{ position: relative; display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }
        .tabs .w::-webkit-scrollbar{ display: none; }
        .tabs a{ padding: 16px 18px; font-weight: 500; color: var(--mute); white-space: nowrap; transition: color 0.2s; }
        .tabs a.on{ color: var(--ink); font-weight: 600; border-bottom: 3px solid var(--o); }
        
        .dcols{ display: grid; grid-template-columns: 1fr 380px; gap: 64px; padding: 44px 0 90px; align-items: start; }
        section.blk{ padding-bottom: 48px; }
        .sh{ border-top: 2px solid var(--ink); padding-top: 16px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .sh a, .sh button.lnk{ color: var(--o); font-weight: 600; background: none; border: 0; padding: 0; cursor: pointer; }
        .sh a:hover, .sh button.lnk:hover{ text-decoration: underline; }
        
        .info{ margin: 0; }
        .info div{ display: grid; grid-template-columns: 170px 1fr; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--line); }
        .info dt{ color: var(--mute); font-weight: 500; } .info dd{ margin: 0; font-weight: 500; }
        .info dd a{ color: var(--o); } .info dd a:hover{ text-decoration: underline; }
        .about p{ margin: 0 0 14px; font-size: 1.1rem; max-width: 46em; }
        
        .fch{ display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 16px; }
        .fch button{ background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 7px 16px; font-weight: 600; font-size: .88rem; cursor: pointer; }
        .fch button[aria-pressed="true"]{ background: var(--ink); border-color: var(--ink); color: #fff; }
        .facs{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; }
        .fac{ position: relative; border: 1px solid var(--line); border-radius: 8px; padding: 14px 16px 14px 18px; font-weight: 500; background: #fff; transition: border-color .15s, box-shadow .15s; }
        .fac::before{ content:""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; background: var(--o); border-radius: 0 3px 3px 0; }
        .fac:hover{ border-color: var(--o); box-shadow: 0 6px 20px rgba(242,106,27,.14); }
        .fac small{ display: block; color: var(--mute); font-weight: 400; font-size: .8rem; }
        .note{ margin-top: 20px; font-size: .92rem; color: var(--mute); } .note a{ color: var(--o); font-weight: 600; }
        
        .ccgrid{ display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px; }
        .course{ border: 1px solid var(--line); border-radius: 10px; padding: 20px; display: flex; flex-direction: column; gap: 14px; transition: transform .15s, box-shadow .15s; }
        .course:hover{ border-color: var(--o); box-shadow: 0 10px 30px rgba(242,106,27,.16); transform: translateY(-3px); }
        .course h3{ margin: 0; font-size: 1.12rem; line-height: 1.3; }
        .course .ctag{ align-self: flex-start; background: var(--tint); border-radius: 4px; padding: 2px 10px; font-size: .78rem; font-weight: 600; }
        .course .m{ display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: .88rem; color: var(--mute); border-top: 1px solid var(--line); padding-top: 12px; }
        .course .m b{ display: block; color: var(--ink); font-weight: 600; }
        .course .croww{ display: flex; gap: 8px; margin-top: auto; }
        .course .cbtn{ padding: 10px 14px; font-size: .88rem; flex: 1; }
        
        .chk{ border: 1px solid var(--line); border-radius: 10px; padding: 22px; }
        .chk label{ display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; font-weight: 500; cursor: pointer; }
        .chk input{ accent-color: var(--o); width: 18px; height: 18px; margin-top: 3px; cursor: pointer; }
        .cbar{ height: 6px; background: var(--tint); border-radius: 6px; overflow: hidden; margin: 6px 0 10px; }
        .cbar i{ display: block; height: 100%; width: 0; background: var(--o); box-shadow: 0 0 10px var(--o); transition: width .3s; }
        
        .empty{ background: var(--tint); padding: 26px; border-radius: 8px; color: var(--mute); } .empty b{ color: var(--ink); }
        .rev{ border-bottom: 1px solid var(--line); padding: 16px 0; } .rev b{ display: block; } .rev .st{ color: var(--o); letter-spacing: 2px; }
        form.rf{ border: 2px solid var(--ink); border-radius: 8px; padding: 22px; margin-top: 16px; }
        .rf label, .dg label{ display: block; font-weight: 600; margin: 0 0 6px; font-size: .9rem; }
        .rf input, .rf textarea, .dg input, .dg select{ width: 100%; border: 1px solid var(--line); border-radius: 6px; padding: 11px 12px; font: inherit; margin-bottom: 16px; background: #fff; }
        .rf input:focus, .rf textarea:focus, .dg input:focus, .dg select:focus{ outline: 2px solid var(--o); border-color: var(--o); }
        .pick{ display: flex; gap: 4px; margin-bottom: 16px; } .pick button{ background: none; border: 0; font-size: 1.7rem; line-height: 1; color: var(--line); padding: 2px; cursor: pointer; } .pick button.on{ color: var(--o); }
        .upd{ border-left: 3px solid var(--o); padding: 4px 0 4px 16px; margin-bottom: 14px; }
        .cback{ display: inline-block; font-weight: 600; color: var(--o); margin-top: 20px; }
        
        .side{ position: sticky; top: 86px; display: flex; flex-direction: column; gap: 22px; }
        .ccard{ border: 2px solid var(--ink); border-radius: 10px; padding: 22px; }
        .ccard h2{ margin: 0 0 4px; font-size: 1.25rem; letter-spacing: -.02em; }
        .side-row{ display: flex; gap: 8px; margin-top: 14px; } .side-row .cbtn{ flex: 1; justify-content: center; padding: 12px 10px; }
        .mail{ margin-top: 14px; font-size: .92rem; word-break: break-all; } .mail a{ display: block; font-weight: 500; } .mail a:hover{ color: var(--o); }
        
        .guide{ position: relative; overflow: hidden; background: linear-gradient(135deg, #fff 40%, var(--tint)); color: var(--ink); border: 2px solid var(--ink); border-radius: 10px; padding: 24px; }
        .guide::before{ content:""; position: absolute; right: -60px; top: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(242,106,27,.28), transparent 65%); }
        .guide > *{ position: relative; }
        .guide h2{ margin: 0 0 8px; font-size: 1.25rem; } .guide p{ margin: 0 0 16px; color: var(--mute); font-size: .95rem; } .guide .sm{ font-size: .8rem; margin: 14px 0 0; }
        
        .list .hd{ border-top: 2px solid var(--ink); padding-top: 14px; margin-bottom: 4px; }
        .list a{ display: grid; grid-template-columns: 1fr 20px; padding: 13px 0; border-bottom: 1px solid var(--line); font-weight: 500; transition: color 0.15s; }
        .list a .ar{ color: var(--o); transition: transform .15s; } .list a:hover{ color: var(--o); } .list a:hover .ar{ transform: translateX(4px); }
        .cmore{ background: none; border: 0; color: var(--o); font-weight: 600; padding: 12px 0; cursor: pointer; }
        
        .dialog-over{ position: fixed; inset: 0; background: rgba(14,9,7,.7); backdrop-filter: blur(4px); z-index: 100; display: grid; place-items: center; }
        .dg-box{ background: #fff; border-radius: 12px; padding: 26px; width: min(480px, 92vw); box-shadow: 0 30px 80px rgba(0,0,0,.4); }
        .dg-box h2{ margin: 0 0 4px; letter-spacing: -.02em; }
        .dg-box .x{ float: right; background: none; border: 0; font-size: 1.4rem; line-height: 1; cursor: pointer; }
        
        .ctoast{ position: fixed; top: 16px; left: 50%; transform: translateX(-50%); background: var(--ink); color: #fff; padding: 11px 20px; border-radius: 8px; font-size: .92rem; opacity: 0; pointer-events: none; transition: opacity .2s; z-index: 200; }
        .ctoast.on{ opacity: 1; }
        
        @media (max-width:980px){ .dcols{ grid-template-columns: 1fr; gap: 36px; } .side{ position: static; } .stats{ grid-template-columns: repeat(2, 1fr); } .info div{ grid-template-columns: 120px 1fr; } }
        @media (max-width:560px){ .w{ width: calc(100% - 32px); } .info div{ grid-template-columns: 1fr; gap: 2px; } .pill{ margin-top: 30px; } }
      `}} />
      
      <header>
        <div className="w nb">
          <a className="logo" href="/"><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a>
          <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
            <div className="mi"><a href="#">Education</a>
              <div className="mega"><a href="#">Admissions</a><a href="#">Learn English</a><a href="#">Institutes</a><a href="/colleges">Colleges</a></div></div>
            <div className="mi"><a className="kc" href="#">Knowledge Centre</a></div>
            <div className="mi"><a href="/contact">Contact</a></div>
            <div className="mi"><a href="#">More</a>
              <div className="mega sm"><a href="/about">About Us</a><a href="#">Study Abroad</a></div></div>
          </div>
          <div className="cta">
            <a className="reg" href="#">Register</a>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      <div className="hero" id="hero">
        <div className="w">
          <nav className="crumbs"><a href="/colleges">Colleges</a><span>/</span><a href="/colleges">{C.state}</a><span>/</span>{C.name}</nav>
          <h1>{C.name}</h1>
          <p className="hlead">{C.lead}</p>
          <div className="acts">
            <button className="cbtn or" type="button" onClick={() => openEnquiry()}>Enquire now</button>
            <a className="cbtn gl" href={`tel:${C.phone}`}>Call college</a>
            <a className="cbtn gl" href={C.website} target="_blank">Official website</a>
            <button className="cbtn gl" type="button" onClick={toggleSave}>{saved ? "♥ Saved" : "♡ Save"}</button>
          </div>
          <div className="stats">
            <div className="stat"><b>{C.courses.length}</b><span className="clabel">Courses</span></div>
            <div className="stat"><b>{C.facilities.length}</b><span className="clabel">Facilities</span></div>
            <div className="stat"><b>{C.approval}</b><span className="clabel">Approved by</span></div>
            <div className="stat"><b>{C.university[0]}</b><span className="clabel">Affiliated to</span></div>
          </div>
        </div>
      </div>

      <nav className="tabs">
        <div className="w">
          {[
            {id: "overview", label: "Details"}, {id: "about", label: "About"},
            {id: "facilities", label: "Facilities"}, {id: "courses", label: "Courses"},
            {id: "apply", label: "Apply"}, {id: "photos", label: "Photos"},
            {id: "reviews", label: "Reviews"}, {id: "updates", label: "Updates"}
          ].map(t => (
            <a key={t.id} href={`#${t.id}`} className={activeTab === t.id ? "on" : ""} onClick={() => setActiveTab(t.id)}>{t.label}</a>
          ))}
        </div>
      </nav>

      <div className="w dcols">
        <main>
          <section className="blk" id="overview">
            <div className="sh"><span className="clabel">College details</span></div>
            <dl className="info">
              <div><dt>College name</dt><dd>{C.name}</dd></div>
              <div><dt>Address</dt><dd>{C.address} · <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.name+" "+C.address)}`} target="_blank">Open in Maps</a></dd></div>
              <div><dt>City</dt><dd>{C.city}</dd></div>
              <div><dt>State</dt><dd>{C.state}</dd></div>
              <div><dt>Phone number</dt><dd>{C.phone}</dd></div>
              <div><dt>Email</dt><dd>{C.emails.map(e => <div key={e}><a href={`mailto:${e}`}>{e}</a></div>)}</dd></div>
              <div><dt>Official website</dt><dd><a href={C.website} target="_blank">{C.website}</a></dd></div>
              <div><dt>University</dt><dd><a href={C.university[1]}>{C.university[0]}</a></dd></div>
              <div><dt>Other popular names</dt><dd>{C.aka}</dd></div>
            </dl>
          </section>
          
          <section className="blk about" id="about">
            <div className="sh"><span className="clabel">About the college</span></div>
            {C.about.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          <section className="blk" id="facilities">
            <div className="sh"><span className="clabel">Campus facilities</span><span className="cmuted">{C.facilities.filter(f => fCat === "All" || f[1] === fCat).length} shown</span></div>
            <div className="fch">
              {allFacCats.map(c => (
                <button key={c} type="button" aria-pressed={fCat === c} onClick={() => setFCat(c)}>{c}</button>
              ))}
            </div>
            <div className="facs">
              {C.facilities.filter(f => fCat === "All" || f[1] === fCat).map((f, i) => (
                <div key={i} className="fac">{f[0]}<small>{f[1]}</small></div>
              ))}
            </div>
            <p className="note">Found wrong or incomplete information? <a href="#" onClick={e => { e.preventDefault(); showToast("Connect to your form"); }}>Submit the correct details</a></p>
          </section>

          <section className="blk" id="courses">
            <div className="sh"><span className="clabel">Courses offered</span><a href="#" onClick={e => { e.preventDefault(); showToast("Connect to your form"); }}>Add a course</a></div>
            <div className="ccgrid">
              {C.courses.map((c, i) => (
                <article key={i} className="course">
                  <span className="ctag">{C.stream} · B.Tech</span>
                  <h3>{c[0]}</h3>
                  <div className="m"><span>Fees<b>Ask the college</b></span><span>Seats<b>Ask the college</b></span></div>
                  <div className="croww">
                    <button className="cbtn ln" type="button" onClick={() => openEnquiry(c[0])}>Enquire</button>
                    <a className="cbtn dk" href={c[1]}>View course</a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="blk" id="apply">
            <div className="sh"><span className="clabel">Before you apply</span></div>
            <div className="chk">
              <div className="cmuted">{checks.length === C.checklist.length ? "All set. You are ready to contact the college." : `${checks.length} of ${C.checklist.length} steps done`}</div>
              <div className="cbar"><i style={{ width: `${progress}%` }}></i></div>
              <div className="clist">
                {C.checklist.map((t, i) => (
                  <label key={i}>
                    <input type="checkbox" checked={checks.includes(i)} onChange={(e) => {
                      if (e.target.checked) setChecks([...checks, i]);
                      else setChecks(checks.filter(x => x !== i));
                    }} />{t}
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="blk" id="photos">
            <div className="sh"><span className="clabel">Photos</span><a href="#" onClick={e => { e.preventDefault(); showToast("Connect to your form"); }}>Add photos</a></div>
            <div className="empty"><b>No photos yet.</b> Upload campus photos to help students see the college.</div>
          </section>

          <section className="blk" id="reviews">
            <div className="sh"><span className="clabel">Reviews</span><button className="lnk" type="button" onClick={() => setShowReviewForm(!showReviewForm)}>Write a review</button></div>
            
            {showReviewForm && (
              <form className="rf" onSubmit={handleReview}>
                <label>Your rating</label>
                <div className="pick">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" className={n <= rating ? "on" : ""} onClick={() => setRating(n)}>★</button>
                  ))}
                </div>
                <label htmlFor="rn">Your name</label><input id="rn" required maxLength="60" />
                <label htmlFor="rt">Your review</label><textarea id="rt" rows="4" required maxLength="800"></textarea>
                <button className="cbtn dk" type="submit">Post review</button>
              </form>
            )}

            <div>
              {reviews.length === 0 ? (
                <div className="empty"><b>No reviews yet.</b> Be the first to share your experience.</div>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} className="rev">
                    <span className="st">{"★".repeat(r.r)}{"☆".repeat(5 - r.r)}</span>
                    <b>{r.n}</b><span>{r.t}</span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="blk" id="updates">
            <div className="sh"><span className="clabel">Updates and comments</span></div>
            <div>
              {C.updates.map((u, i) => (
                <div key={i} className="upd">
                  <b>{u.by}</b> <span className="cmuted">· {u.date}</span>
                  <p style={{ margin: "4px 0 0" }}>{u.text}</p>
                </div>
              ))}
            </div>
          </section>
          
          <a className="cback" href="/colleges">← Return to colleges</a>
        </main>

        <aside className="side">
          <div className="ccard">
            <h2>Contact the college</h2><span className="cmuted">{C.phone}</span>
            <div className="side-row">
              <a className="cbtn dk" href={`tel:${C.phone}`}>Call</a>
              <button className="cbtn ln" type="button" onClick={() => { navigator.clipboard.writeText(C.phone); showToast("Phone number copied"); }}>Copy number</button>
            </div>
            <div className="mail">
              {C.emails.map(e => <a key={e} href={`mailto:${e}`}>{e}</a>)}
            </div>
          </div>
          
          <div className="guide">
            <h2>Free admission guidance</h2>
            <p>Not sure which college or course fits you? Get free guidance for professional courses in India or abroad.</p>
            <button className="cbtn or" type="button" onClick={() => showToast("Connect to your form")}>Get guidance</button>
            <p className="sm">IndiaStudyChannel.com is not associated with this college. For admission, contact the college directly.</p>
          </div>
          
          <div className="list">
            <div className="hd"><span className="clabel">Colleges in {C.state}</span></div>
            {C.cats.map(([l, s], i) => <a key={i} href="/colleges">{l}<span className="ar">→</span></a>)}
          </div>
          
          <div className="list">
            <div className="hd"><span className="clabel">More colleges</span></div>
            {C.more.map(([n, u], i) => <a key={i} href={u}>{n}<span className="ar">→</span></a>)}
          </div>
        </aside>
      </div>

      <footer><div className="w">
        <div className="fg">
          <div><a className="logo" href="/" style={{ color: 'var(--ink)' }}><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a><p style={{ color: 'var(--mute)', maxWidth: '300px' }}>The most popular educational website in India, committed to quality content for its readers.</p></div>
        </div>
        <div className="fb"><span><a href="/about">About Us</a><a href="/contact">Contact Us</a></span><span>Promoted by SpiderWorks Technologies</span></div>
      </div></footer>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="dialog-over" onClick={() => setModalOpen(false)}>
          <div className="dg-box" onClick={e => e.stopPropagation()}>
            <form className="dg" onSubmit={(e) => {
              e.preventDefault();
              showToast("Opening your email app");
              setModalOpen(false);
            }}>
              <button className="x" type="button" aria-label="Close" onClick={() => setModalOpen(false)}>×</button>
              <h2>Enquire about admission</h2>
              <p className="cmuted" style={{ margin: "0 0 18px" }}>Opens your email app with the message ready to send to the college.</p>
              
              <label htmlFor="en">Your name</label><input id="en" required maxLength="60" />
              <label htmlFor="ep">Your phone number</label><input id="ep" type="tel" required maxLength="15" />
              <label htmlFor="ec">Course</label>
              <select id="ec" value={courseSel} onChange={e => setCourseSel(e.target.value)}>
                {C.courses.map((c, i) => <option key={i} value={c[0]}>{c[0]}</option>)}
              </select>
              <button className="cbtn or" type="submit" style={{ width: "100%" }}>Send enquiry</button>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`ctoast ${toastMsg ? "on" : ""}`}>{toastMsg}</div>
    </>
  );
}
