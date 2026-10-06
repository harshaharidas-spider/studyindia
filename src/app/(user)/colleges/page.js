"use client";

import { useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ===== Data & Helpers ===== */
const D = [
  // Kerala
  ["Rajagiri College of Engineering", "Kochi", "Kerala", "Engineering", "Private", 1.4, 4.4, 4, 1],
  ["College of Engineering Trivandrum", "Thiruvananthapuram", "Kerala", "Engineering", "Government", 0.5, 4.5, 21, 1],
  ["Government Medical College", "Kozhikode", "Kerala", "Medical", "Government", 0.8, 4.6, 9, 1],
  ["Amrita School of Nursing", "Kochi", "Kerala", "Nursing", "Private", 1.1, 4.3, 2, 1],
  ["Govt Law College", "Ernakulam", "Kerala", "Law", "Government", 0.3, 4.2, 36, 0],
  ["St. Teresa's Training College", "Kochi", "Kerala", "B.Ed", "Aided", 0.4, 4.0, -3, 0],
  ["Kerala Agricultural University", "Thrissur", "Kerala", "Agriculture", "Government", 0.4, 4.3, 24, 1],
  ["IGNOU Regional Centre", "Kochi", "Kerala", "Distance Education", "Government", 0.1, 4.1, 60, 0],
  ["Cochin College of Commerce", "Kochi", "Kerala", "Management", "Private", 0.7, 4.1, 13, 0],
  ["MES Engineering College", "Kuttippuram", "Kerala", "Engineering", "Private", 1.2, 4.0, 31, 1],
  
  // Karnataka
  ["IIM Bangalore", "Bengaluru", "Karnataka", "Management", "Government", 12.0, 4.9, 15, 1],
  ["RV College of Engineering", "Bengaluru", "Karnataka", "Engineering", "Private", 2.1, 4.6, 28, 1],
  ["Christ University", "Bengaluru", "Karnataka", "Arts & Science", "Private", 1.2, 4.5, 6, 1],
  ["Manipal Institute of Technology", "Manipal", "Karnataka", "Engineering", "Private", 3.8, 4.4, 30, 1],
  ["St. John's Medical College", "Bengaluru", "Karnataka", "Medical", "Private", 2.5, 4.7, 12, 1],
  
  // Tamil Nadu
  ["Madras Christian College", "Chennai", "Tamil Nadu", "Arts & Science", "Aided", 0.6, 4.4, 12, 1],
  ["CMC Vellore", "Vellore", "Tamil Nadu", "Medical", "Private", 1.5, 4.8, -10, 1],
  ["IIT Madras", "Chennai", "Tamil Nadu", "Engineering", "Government", 2.0, 4.9, 5, 1],
  ["Loyola College", "Chennai", "Tamil Nadu", "Arts & Science", "Aided", 0.8, 4.6, 18, 1],
  
  // Delhi
  ["IHM Pusa", "New Delhi", "Delhi", "Hotel Management", "Government", 1.0, 4.5, 18, 1],
  ["NLU Delhi", "New Delhi", "Delhi", "Law", "Government", 2.3, 4.7, 45, 1],
  ["St. Stephen's College", "New Delhi", "Delhi", "Arts & Science", "Aided", 0.5, 4.8, 14, 0],
  ["Jamia Millia Islamia", "New Delhi", "Delhi", "Arts & Science", "Government", 0.4, 4.5, -4, 1],
  ["AIIMS Delhi", "New Delhi", "Delhi", "Medical", "Government", 0.1, 4.9, 8, 1],
  
  // Maharashtra
  ["Symbiosis Institute of Business", "Pune", "Maharashtra", "Management", "Private", 4.5, 4.5, 8, 1],
  ["IIT Bombay", "Mumbai", "Maharashtra", "Engineering", "Government", 2.5, 4.9, -5, 1],
  ["Fergusson College", "Pune", "Maharashtra", "Arts & Science", "Aided", 0.4, 4.5, 15, 1],
  ["Armed Forces Medical College", "Pune", "Maharashtra", "Medical", "Government", 0.1, 4.9, 7, 1],
  ["Symbiosis Law School", "Pune", "Maharashtra", "Law", "Private", 3.5, 4.6, 19, 1],
  ["Tata Institute of Social Sciences", "Mumbai", "Maharashtra", "Arts & Science", "Government", 1.1, 4.7, 21, 1],
  
  // West Bengal
  ["Jadavpur University", "Kolkata", "West Bengal", "Engineering", "Government", 0.2, 4.8, 12, 1],
  ["Presidency College", "Kolkata", "West Bengal", "Arts & Science", "Government", 0.3, 4.7, 5, 0],
  ["IIM Calcutta", "Kolkata", "West Bengal", "Management", "Government", 13.5, 4.8, 20, 1],
  
  // Uttar Pradesh
  ["Banaras Hindu University", "Varanasi", "Uttar Pradesh", "Arts & Science", "Government", 0.5, 4.6, 30, 1],
  ["IIM Lucknow", "Lucknow", "Uttar Pradesh", "Management", "Government", 14.5, 4.8, 8, 1],
  ["Amity University", "Noida", "Uttar Pradesh", "Engineering", "Private", 3.5, 4.1, 45, 1],
  ["King George's Medical University", "Lucknow", "Uttar Pradesh", "Medical", "Government", 0.8, 4.7, 10, 1],
  
  // Gujarat
  ["NID Ahmedabad", "Ahmedabad", "Gujarat", "Arts & Science", "Government", 1.8, 4.9, 10, 1],
  ["MICA", "Ahmedabad", "Gujarat", "Management", "Private", 9.5, 4.6, -2, 1],
  ["IIM Ahmedabad", "Ahmedabad", "Gujarat", "Management", "Government", 15.0, 4.9, 25, 1],
  
  // Rajasthan
  ["AIIMS Jodhpur", "Jodhpur", "Rajasthan", "Medical", "Government", 0.6, 4.8, 20, 1],
  ["BITS Pilani", "Pilani", "Rajasthan", "Engineering", "Private", 4.5, 4.9, 5, 1],
  
  // Telangana
  ["Osmania University", "Hyderabad", "Telangana", "Arts & Science", "Government", 0.4, 4.3, 22, 1],
  ["ISB Hyderabad", "Hyderabad", "Telangana", "Management", "Private", 15.0, 4.9, -15, 1],
  ["NALSAR University of Law", "Hyderabad", "Telangana", "Law", "Government", 2.1, 4.8, 11, 1]
].map((r, i) => ({ id: i, name: r[0], city: r[1], state: r[2], cat: r[3], type: r[4], fee: r[5], rate: r[6], days: r[7], hostel: r[8] }));

const CATS = [...new Set(D.map(d => d.cat))];
const uniq = a => [...new Set(a)];
const count = fn => D.filter(fn).length;

function getStatus(d) {
  if (d.days < 0) return ["Closed " + (-d.days) + "d ago", "bad"];
  if (d.days <= 7) return ["Closing in " + d.days + (d.days == 1 ? " day" : " days"), "warn"];
  return ["Open · " + d.days + " days left", "ok"];
}

const DEF_F = { cat: "", state: "", city: "", types: [], fee: 15, rate: 0, hostel: false, open: false, sort: "dl", view: "grid", page: 1 };
const PER = 6;

export default function CollegesDirectory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewState, setViewState] = useState("home"); // "home" | "results"
  const [f, setF] = useState(DEF_F);
  const [saved, setSaved] = useState(new Set());
  const [showF, setShowF] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = gsap.utils.toArray(".ani-sec");
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [viewState]); // Re-run GSAP when view changes

  const toggleSave = id => {
    const ns = new Set(saved);
    ns.has(id) ? ns.delete(id) : ns.add(id);
    setSaved(ns);
  };

  /* Card Component */
  const Card = ({ d }) => {
    const [t, c] = getStatus(d);
    return (
      <article className="ccard" onClick={(e) => { if(!e.target.closest("button") && !e.target.closest("a")) window.location.href = `/college/${d.id}`; }}>
        <div className="ctop">
          <div>
            <h3><a href={`/college/${d.id}`}>{d.name}</a></h3>
            <div className="csub">{d.city}, {d.state}</div>
          </div>
          <button className="cheart" aria-pressed={saved.has(d.id)} onClick={(e) => { e.stopPropagation(); toggleSave(d.id); }}>
            {saved.has(d.id) ? "♥" : "♡"}
          </button>
        </div>
        <div className="ctags">
          <span className="ctag">{d.cat}</span><span className="ctag">{d.type}</span>
          <span className="ctag">₹{d.fee} L/yr</span><span className="ctag">★ {d.rate}</span>
        </div>
        <div className="cmid">
          <span>{d.cat}</span><span>{d.type}</span><span>₹{d.fee} L/yr</span><span>★ {d.rate}</span>
        </div>
        <div className="cdl"><span className={`cst ${c}`}>{t}</span></div>
      </article>
    );
  };

  /* Home Logic */
  const step = !f.cat ? 1 : !f.state ? 2 : 3;
  let q, opts;
  if (step === 1) {
    q = "What do you want to study?";
    opts = CATS.map(c => [c, count(d => d.cat === c), () => setF({...f, cat: c})]);
  } else if (step === 2) {
    q = "Which state?";
    opts = uniq(D.filter(d => d.cat === f.cat).map(d => d.state)).sort().map(s => [
      s, count(d => d.cat === f.cat && d.state === s), () => setF({...f, state: s})
    ]);
  } else {
    q = "Which city?";
    const base = d => d.cat === f.cat && d.state === f.state;
    opts = [
      ["Show all in " + f.state, count(base), () => setViewState("results"), 1],
      ...uniq(D.filter(base).map(d => d.city)).sort().map(c => [
        c, count(d => base(d) && d.city === c), () => { setF({...f, city: c}); setViewState("results"); }
      ])
    ];
  }
  const labels = [f.cat || "Course", f.state || "State", f.city || "City"];

  const curated = [
    ["Closing soon", D.filter(d => d.days >= 0).sort((x, y) => x.days - y.days), "dl"],
    ["Lowest fees", [...D].sort((x, y) => x.fee - y.fee), "fee"],
    ["Top rated", [...D].sort((x, y) => y.rate - x.rate), "rate"]
  ];

  /* Results Logic */
  const results = useMemo(() => {
    let r = D.filter(d => (!f.cat || d.cat === f.cat) && (!f.state || d.state === f.state) && (!f.city || d.city === f.city) &&
      (!f.types.length || f.types.includes(d.type)) && d.fee <= f.fee && d.rate >= f.rate &&
      (!f.hostel || d.hostel) && (!f.open || d.days >= 0));
    r.sort((a, b) => f.sort === "fee" ? a.fee - b.fee : f.sort === "rate" ? b.rate - a.rate : (a.days < 0) - (b.days < 0) || a.days - b.days);
    return r;
  }, [f]);
  
  const pages = Math.max(1, Math.ceil(results.length / PER));
  const safePage = Math.min(f.page, pages);
  const slice = results.slice((safePage - 1) * PER, safePage * PER);
  
  const chips = [
    f.cat && ["cat", f.cat], f.state && ["state", f.state], f.city && ["city", f.city],
    ...f.types.map(t => ["type:" + t, t]),
    f.fee < 15 && ["fee", "Up to ₹" + f.fee + " L"],
    f.rate > 0 && ["rate", "★ " + f.rate + "+"],
    f.hostel && ["hostel", "Hostel"],
    f.open && ["open", "Open only"]
  ].filter(Boolean);

  const removeChip = (k) => {
    if(k === "all") setF({...DEF_F, view: f.view, sort: f.sort});
    else if(k.startsWith("type:")) setF({...f, types: f.types.filter(t => t !== k.slice(5)), page: 1});
    else if(k === "cat") setF({...f, cat: "", state: "", city: "", page: 1});
    else if(k === "state") setF({...f, state: "", city: "", page: 1});
    else if(k === "city") setF({...f, city: "", page: 1});
    else if(k === "fee") setF({...f, fee: 15, page: 1});
    else if(k === "rate") setF({...f, rate: 0, page: 1});
    else if(k === "hostel") setF({...f, hostel: false, page: 1});
    else if(k === "open") setF({...f, open: false, page: 1});
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .dmain { max-width: 1180px; margin: 0 auto; padding: 56px 28px 88px; }
        .dmain h1 { font-size: clamp(2.2rem, 5.5vw, 4rem); line-height: 1.05; letter-spacing: -0.035em; font-weight: 700; margin: 0 0 22px; }
        .dmain h1 em { font-style: normal; color: var(--o); }
        .dlead { font-size: 1.25rem; line-height: 1.65; color: var(--mute); max-width: 34em; margin: 0 0 36px; }
        .csub { color: var(--mute); font-size: 0.92rem; }
        .clabel { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }

        /* Search Box */
        .csearch { border: 2px solid var(--ink); border-radius: 4px; background: #fff; max-width: 900px; }
        .csteps { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--line); }
        .cstep { background: #fff; border: 0; border-right: 1px solid var(--line); padding: 16px 10px; font-weight: 500; color: var(--mute); border-bottom: 3px solid transparent; margin-bottom: -1px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
        .cstep:last-child { border-right: 0; }
        .cstep[aria-current="step"] { background: var(--tint); color: var(--ink); border-bottom-color: var(--o); }
        .cstep.done { color: var(--ink); font-weight: 600; cursor: pointer; }
        .cstep.done:hover { background: var(--tint); }
        .cstep:disabled { cursor: default; }
        .cpick { padding: 22px 24px 12px; }
        .cq { font-size: 1.3rem; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 6px; }
        .copts { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); column-gap: 40px; }
        .corow { display: grid; grid-template-columns: 1fr auto 20px; gap: 12px; align-items: center; text-align: left; background: none; border: 0; border-bottom: 1px solid var(--line); padding: 15px 0; font-size: 1.05rem; font-weight: 500; cursor: pointer; }
        .corow small { color: var(--mute); font-weight: 400; font-size: 0.9rem; }
        .corow .car { color: var(--o); transition: transform 0.15s; }
        .corow:hover .car { transform: translateX(4px); }
        .corow:hover b { color: var(--o); }
        .corow.all b { color: var(--o); }
        .corow b { font-weight: 600; }

        /* Curated */
        .crow { margin-top: 56px; }
        .crh { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid var(--ink); padding-top: 16px; margin-bottom: 16px; }
        .crh button.see-all { background: none; border: 0; color: var(--o); font-weight: 600; padding: 0; cursor: pointer; }
        .crh button.see-all:hover { text-decoration: underline; }
        .cscroll { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 10px; scroll-snap-type: x proximity; scrollbar-width: none; -ms-overflow-style: none; }
        .cscroll::-webkit-scrollbar { display: none; }
        .cscroll .ccard { min-width: 270px; max-width: 270px; scroll-snap-align: start; }
        
        .arr { background: var(--tint); border: 0; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ink); transition: background 0.2s; font-weight: bold; font-size: 14px; }
        .arr:hover { background: var(--line); }
        .row-nav { display: flex; gap: 12px; align-items: center; }

        /* Card */
        .ccard { background: #fff; border: 1px solid var(--line); border-radius: 4px; padding: 18px; display: flex; flex-direction: column; gap: 10px; cursor: pointer; transition: border-color 0.15s; text-align: left; }
        .ccard:hover { border-color: var(--ink); }
        .ccard h3 { margin: 0; font-size: 1.08rem; line-height: 1.3; letter-spacing: -0.015em; font-weight: 600; }
        .ccard:hover h3 { color: var(--o); }
        .ctop { display: flex; justify-content: space-between; gap: 8px; }
        .cheart { background: none; border: 0; font-size: 1.3rem; line-height: 1; color: var(--mute); padding: 2px; cursor: pointer; }
        .cheart[aria-pressed="true"] { color: var(--o); }
        .ctags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ctag { font-size: 0.78rem; font-weight: 500; border-radius: 2px; padding: 3px 9px; background: var(--tint); }
        .cst { font-weight: 600; font-size: 0.88rem; } .cst.ok { color: #1a7f4b; } .cst.warn { color: var(--o); } .cst.bad { color: #b42318; }
        .cdl { border-top: 1px solid var(--line); padding-top: 12px; margin-top: auto; }

        /* Results */
        .cback { background: none; border: 0; color: var(--mute); font-weight: 600; padding: 0; margin-bottom: 18px; cursor: pointer; }
        .cback:hover { color: var(--o); }
        .crl { display: grid; grid-template-columns: 250px 1fr; gap: 40px; align-items: start; margin-top: 28px; }
        .cfilters { position: sticky; top: 80px; border-top: 2px solid var(--ink); padding-top: 16px; text-align: left; }
        .cfg { margin-bottom: 22px; } .cfg:last-child { margin-bottom: 0; }
        .cfg .clabel { display: block; margin-bottom: 10px; }
        .cfg select { width: 100%; background: #fff; color: var(--ink); border: 1px solid var(--line); border-radius: 4px; padding: 10px; font: inherit; outline: none; }
        .cfg input[type=range] { width: 100%; accent-color: var(--o); }
        .cfg input[type=checkbox] { accent-color: var(--o); width: 16px; height: 16px; cursor: pointer; }
        .cfg label.c { display: flex; gap: 10px; align-items: center; padding: 4px 0; cursor: pointer; }
        .cbar { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; border-top: 2px solid var(--ink); padding-top: 14px; margin-bottom: 14px; }
        .cbar select { background: #fff; color: var(--ink); border: 1px solid var(--line); border-radius: 4px; padding: 8px 10px; font: inherit; outline: none; }
        .cseg { display: inline-flex; border: 1px solid var(--ink); border-radius: 4px; overflow: hidden; margin-left: 8px; vertical-align: middle; }
        .cseg button { background: #fff; border: 0; padding: 8px 14px; font-weight: 500; font-size: 0.88rem; cursor: pointer; }
        .cseg button[aria-pressed="true"] { background: var(--ink); color: #fff; }
        .cactive { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .cactive button { background: var(--tint); border: 0; border-bottom: 2px solid var(--o); padding: 4px 12px; font-size: 0.85rem; font-weight: 500; cursor: pointer; }
        .cgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        .crows { display: flex; flex-direction: column; gap: 10px; }
        .crows .ccard { flex-direction: row; align-items: center; gap: 16px; padding: 14px 18px; }
        .crows .ccard > div:first-child { flex: 1; min-width: 0; }
        .crows .ctags { display: none; } .crows .cdl { border: 0; padding: 0; margin: 0; min-width: 160px; }
        .cmid { display: none; gap: 20px; color: var(--mute); font-size: 0.9rem; white-space: nowrap; } .crows .cmid { display: flex; }
        .cpager { display: flex; gap: 6px; justify-content: center; margin-top: 28px; }
        .cpager button { background: #fff; border: 1px solid var(--line); border-radius: 4px; min-width: 40px; padding: 8px 12px; font-weight: 500; cursor: pointer; }
        .cpager button:hover:not(:disabled) { border-color: var(--ink); }
        .cpager button[aria-current="true"] { background: var(--ink); border-color: var(--ink); color: #fff; }
        .cpager button:disabled { opacity: 0.4; cursor: default; }
        .cfbtn { display: none; background: #fff; border: 1px solid var(--ink); border-radius: 4px; padding: 8px 14px; font-weight: 600; cursor: pointer; }
        .cempty { padding: 40px 0; text-align: center; color: var(--mute); }

        @media (max-width:900px){
         .crl { grid-template-columns: 1fr; gap: 20px; } .cfbtn { display: inline-block; }
         .cfilters { position: static; display: none; } .cfilters.on { display: block; }
         .crows .cmid { display: none; } .crows .ccard { flex-direction: column; align-items: stretch; }
         .dlead { font-size: 1.1rem; }
        }
        @media (max-width:560px){
         .cstep { font-size: 0.85rem; padding: 14px 4px; } .cpick { padding: 18px 16px 8px; } .copts { column-gap: 0; }
        }
      `}} />
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

      <main className="dmain ani-sec">
        {viewState === "home" ? (
          <>
            <h1>Find your college, <em>2027–2028</em></h1>
            <p className="dlead">Three quick choices, then the colleges that match. {D.length} sample colleges in this directory.</p>
            
            <section className="csearch ani-sec" aria-label="Find colleges">
              <div className="csteps">
                {labels.map((l, i) => (
                  <button key={i} type="button" className={`cstep ${i+1 < step ? 'done' : ''}`} aria-current={i+1 === step ? 'step' : undefined} disabled={i+1 > step}
                    onClick={() => {
                      if (i+1 < step) {
                        if (i === 0) setF({...f, cat: "", state: "", city: ""});
                        else setF({...f, state: "", city: ""});
                      }
                    }}
                  >{l}</button>
                ))}
              </div>
              <div className="cpick" aria-live="polite">
                <p className="cq">{q}</p>
                <div className="copts">
                  {opts.map(([l, n, fn, all], i) => (
                    <button key={i} type="button" className={`corow ${all ? 'all' : ''}`} onClick={fn}>
                      <b>{l}</b><small>{n} {n === 1 ? 'college' : 'colleges'}</small><span className="car">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <div className="ani-sec">
              {curated.map(([title, list, s], i) => (
                <section key={i} className="crow">
                  <div className="crh">
                    <span className="clabel">{title}</span>
                    <div className="row-nav">
                      <button type="button" className="arr" aria-label="Scroll left" onClick={(e) => { const r = e.target.closest('.crow').querySelector('.cscroll'); if(r) r.scrollBy({left: -284, behavior: 'smooth'}); }}>←</button>
                      <button type="button" className="arr" aria-label="Scroll right" onClick={(e) => { const r = e.target.closest('.crow').querySelector('.cscroll'); if(r) r.scrollBy({left: 284, behavior: 'smooth'}); }}>→</button>
                      <button className="see-all" type="button" onClick={() => { setF({...DEF_F, sort: s}); setViewState("results"); }}>See all →</button>
                    </div>
                  </div>
                  <div className="cscroll">
                    {list.slice(0, 6).map(d => <Card key={d.id} d={d} />)}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : (
          <div className="ani-sec">
            <button className="cback" onClick={() => { setF(DEF_F); setViewState("home"); }}>← Start over</button>
            <h1>Colleges{f.cat && <em>, {f.cat}</em>}{f.state && ` in ${f.state}`}</h1>
            
            <div className="crl">
              <aside className={`cfilters ${showF ? 'on' : ''}`} aria-label="Filters">
                <div className="cfg"><span className="clabel">Course</span>
                  <select value={f.cat} onChange={e => setF({...f, cat: e.target.value, page: 1})}>
                    <option value="">All courses</option>{CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="cfg"><span className="clabel">State</span>
                  <select value={f.state} onChange={e => setF({...f, state: e.target.value, city: "", page: 1})}>
                    <option value="">All states</option>{uniq(D.map(d=>d.state)).sort().map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cfg"><span className="clabel">City</span>
                  <select value={f.city} onChange={e => setF({...f, city: e.target.value, page: 1})}>
                    <option value="">All cities</option>{uniq(D.filter(d=>!f.state||d.state===f.state).map(d=>d.city)).sort().map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="cfg"><span className="clabel">College type</span>
                  {["Government", "Private", "Aided"].map(t => (
                    <label key={t} className="c">
                      <input type="checkbox" checked={f.types.includes(t)} onChange={(e) => setF({...f, types: e.target.checked ? [...f.types, t] : f.types.filter(x => x !== t), page: 1})} />{t}
                    </label>
                  ))}
                </div>
                <div className="cfg"><span className="clabel">Max fee: ₹{f.fee} L / year</span>
                  <input type="range" min="0.5" max="15" step="0.5" value={f.fee} onChange={e => setF({...f, fee: +e.target.value, page: 1})} />
                </div>
                <div className="cfg"><span className="clabel">Minimum rating</span>
                  <select value={f.rate} onChange={e => setF({...f, rate: +e.target.value, page: 1})}>
                    {[0, 4, 4.3, 4.5].map(v => <option key={v} value={v}>{v ? `★ ${v} and above` : 'Any'}</option>)}
                  </select>
                </div>
                <div className="cfg">
                  <label className="c"><input type="checkbox" checked={f.hostel} onChange={e => setF({...f, hostel: e.target.checked, page: 1})} />Hostel available</label>
                  <label className="c"><input type="checkbox" checked={f.open} onChange={e => setF({...f, open: e.target.checked, page: 1})} />Admissions open only</label>
                </div>
              </aside>

              <section>
                <div className="cbar">
                  <div>
                    <button className="cfbtn" type="button" onClick={() => setShowF(!showF)}>{showF ? "Hide" : "Show"} filters</button>{' '}
                    <b>{results.length}</b> <span className="csub">{results.length === 1 ? 'college' : 'colleges'}</span>
                  </div>
                  <div>
                    <select value={f.sort} onChange={e => setF({...f, sort: e.target.value})}>
                      <option value="dl">Closing soonest</option><option value="fee">Lowest fee</option><option value="rate">Top rated</option>
                    </select>
                    <span className="cseg">
                      <button aria-pressed={f.view === "grid"} onClick={() => setF({...f, view: "grid"})}>Grid</button>
                      <button aria-pressed={f.view === "rows"} onClick={() => setF({...f, view: "rows"})}>List</button>
                    </span>
                  </div>
                </div>

                <div className="cactive">
                  {chips.map(([k, l]) => <button key={k} onClick={() => removeChip(k)} aria-label={`Remove ${l}`}>{l} ✕</button>)}
                  {chips.length > 1 && <button onClick={() => removeChip("all")}>Clear all</button>}
                </div>

                {slice.length === 0 ? (
                  <div className="cempty">No colleges match these filters. Remove a filter to see more.</div>
                ) : (
                  <div className={f.view === "grid" ? "cgrid" : "crows"}>
                    {slice.map(d => <Card key={d.id} d={d} />)}
                  </div>
                )}

                {pages > 1 && (
                  <nav className="cpager" aria-label="Pages">
                    <button disabled={safePage < 2} onClick={() => { setF({...f, page: safePage - 1}); window.scrollTo(0,0); }}>Prev</button>
                    {Array.from({length: pages}, (_, i) => (
                      <button key={i} aria-current={safePage === i + 1} onClick={() => { setF({...f, page: i + 1}); window.scrollTo(0,0); }}>{i + 1}</button>
                    ))}
                    <button disabled={safePage >= pages} onClick={() => { setF({...f, page: safePage + 1}); window.scrollTo(0,0); }}>Next</button>
                  </nav>
                )}
              </section>
            </div>
          </div>
        )}
      </main>

      <footer><div className="w">
        <div className="fg">
          <div><a className="logo" href="/" style={{ color: 'var(--ink)' }}><img src="/logo.png" alt="IndiaStudyChannel Logo" style={{ maxHeight: '40px', width: 'auto' }} /></a><p style={{ color: 'var(--mute)', maxWidth: '300px' }}>The most popular educational website in India, committed to quality content for its readers.</p></div>
          <div><h4>General</h4><a href="#">Admissions Consulting</a><a href="#">Become an Editor</a><a href="#">Membership Levels</a></div>
          <div><h4>Study abroad</h4><a href="#">Study in Germany</a><a href="#">Study in Italy</a><a href="#">Study in Ireland</a></div>
          <div><h4>Education</h4><a href="#">Distance MBA</a><a href="#">MBA in Bangalore</a><a href="#">MBBS in Mangalore</a></div>
        </div>
        <div className="fb"><span><a href="/about">About Us</a><a href="/contact">Contact Us</a></span><span>Promoted by SpiderWorks Technologies</span></div>
      </div></footer>
    </>
  );
}
