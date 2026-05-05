import React, { useRef, useEffect, useState } from "react";
import "./TestimonialsSection.css";

// const testimonials = [
//   {
//     quote:
//       "EduAitor cut our monthly admin workload by 60%. Fee collection that used to take our staff 3 days now runs automatically. The ROI was clear within the first term.",
//     name: "Rajesh Kumar",
//     role: "Principal, Delhi Public School, Jaipur",
//     img: "https://randomuser.me/api/portraits/men/32.jpg",
//     rating: 5,
//     tag: "Fee Management",
//   },
//   {
//     quote:
//       "As a parent, I finally feel in the loop. Real-time attendance alerts, fee receipts on my phone, direct chat with teachers — everything I needed in one app.",
//     name: "Priya Sharma",
//     role: "Parent, Sunshine International School",
//     img: "https://randomuser.me/api/portraits/women/44.jpg",
//     rating: 5,
//     tag: "Parent App",
//   },
//   {
//     quote:
//       "The analytics dashboard alone is worth it. I can see which students need intervention before the term ends — not after. That's transformational for our teachers.",
//     name: "Dr. Anita Verma",
//     role: "Academic Director, Wisdom Group of Schools",
//     img: "https://randomuser.me/api/portraits/women/68.jpg",
//     rating: 5,
//     tag: "Analytics",
//   },
//   {
//     quote:
//       "We manage 4 campuses and 12,000 students. EduAitor handles all of it from one login. Vendor management, payroll, academics — everything synced, zero duplicates.",
//     name: "Sandeep Agarwal",
//     role: "Chairman, Agarwal Education Trust",
//     img: "https://randomuser.me/api/portraits/men/45.jpg",
//     rating: 5,
//     tag: "Multi-Campus",
//   },
// ];

const platformStats = [
  { val: "4.9", unit: "/5", label: "App Store Rating" },
  { val: "4.8", unit: "/5", label: "Google Play" },
  { val: "98%", unit: "", label: "Customer Retention" },
];

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
 const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/testimonials?activeOnly=true`)
  //              ^^^^ .env — not just .meta
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (data.success) {setTestimonials(data.data);
        console.log("Loaded testimonials:", data.data);
      }
      //                                     ^^^^^ data.data, not data
      else console.error("Failed to load testimonials:", data.message);
    })
    .catch((err) => console.error("Error fetching testimonials:", err));
}, []);

  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="testi" ref={ref}>
      <div className="testi__inner">

        {/* Header */}
        <div className={`testi__header ${visible ? "testi__header--show" : ""}`}>
          <span className="testi__label">Social Proof</span>
          <h2 className="testi__h2">
            Trusted by educators,<br />
            <span>loved by everyone.</span>
          </h2>

          {/* Platform stats */}
          <div className="testi__platform-stats">
            {platformStats.map((s, i) => (
              <div className="testi__pstat" key={i}>
                <div className="testi__pstat-val">
                  {s.val}<span>{s.unit}</span>
                </div>
                <div className="testi__pstat-label">{s.label}</div>
                <div className="testi__stars">★★★★★</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="testi__grid">
          {testimonials.slice(0,4).map((t, i) => (
            <div
              className={`testi__card ${visible ? "testi__card--show" : ""}`}
              key={i}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="testi__card-top">
                <span className="testi__tag">{t.tag}</span>
                <div className="testi__stars testi__stars--gold">
                  {"★".repeat(t.rating)}
                </div>
              </div>

              <blockquote className="testi__quote">
                "{t.quote}"
              </blockquote>

              <div className="testi__user">
                <div className="testi__avatar-wrap">
                  <img src={t.image} alt={t.name} className="testi__avatar" />
                  <div className="testi__avatar-ring" />
                </div>
                <div>
                  <div className="testi__name">{t.name}</div>
                  <div className="testi__role">{t.role}</div>
                </div>
              </div>

              <div className="testi__card-glow" aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}