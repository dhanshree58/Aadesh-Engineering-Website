import { NavLink, Link, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { company, products, machines, machineList, inspection, clients, manpower, awards, awardImgs, reasons, heroSlides, plantGallery, leaders } from './data.js'
const pages = [['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/infrastructure', 'Infrastructure'], ['/quality', 'Quality'], ['/contact', 'Contact']]

function useTitle(t) { useEffect(() => { document.title = `${t} | Aadesh Engineering, Pune` }, [t]) }

function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const [ref, seen] = useInView()
  return <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

function HeroSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])
  return <div className="hero-slides" aria-hidden="true">{heroSlides.map((s, k) => <div key={s} className={k === i ? 'slide on' : 'slide'} style={{ backgroundImage: `url(${s})` }} />)}</div>
}

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}><img src={src} alt={alt} /><button className="lb-close" aria-label="Close" onClick={onClose}>×</button></div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {setOpen(false)}, [pathname])
  return (
    <header className="header">
      <Link to="/" className="brand"><img src="/images/logo.jpg" alt="Aadesh Engineering logo" /><span>Aadesh Engineering</span></Link>
      <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="nav" className={open ? 'open' : ''}>
        {pages.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap cols">
        <div><h3>Aadesh Engineering</h3><p>ISO 9001:2015 certified manufacturer of precision machined automobile components, Pune since 2007.</p></div>
        <div><h3>Visit</h3><p>{company.address}</p></div>
        <div><h3>Contact</h3><p>{company.md}, Managing Director<br /><a href={`tel:+91${company.phone}`}>{company.phone}</a><br /><a href={`mailto:${company.email}`}>{company.email}</a></p></div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Aadesh Engineering</p>
    </footer>
  )
}



function Hero({ title, text, children }) {
  return (
    <section className="hero inner-hero">
      <div className="wrap hero-content">
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  )
}


function Owner() {
  return (
    <section className="wrap section owner">
      <img src="images/owner.jpg" alt={`${company.md}, Managing Director`} />
      <div>
        <h2>{company.md}</h2>
        <p className="role">Managing Director (Marketing)</p>
        <p>Leads Aadesh Engineering, the Pune manufacturer of precision machined auto components he runs from the Talawade plant. Reach him directly for quotes and enquiries.</p>
        <a className="btn" href={`tel:+91${company.phone}`}>Call {company.phone}</a>
      </div>
    </section>
  )
}

function Stat({ n, label, from = 0 }) {
  const [ref, seen] = useInView()
  const isNum = typeof n === 'number'
  const [val, setVal] = useState(from)
  useEffect(() => {
    if (!seen || !isNum) return
    const start = performance.now(), dur = 1400
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1)
      setVal(Math.round(from + (n - from) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen])
  return <div className="stat" ref={ref}><b>{isNum ? val : n}</b><span>{label}</span></div>
}



function HomeTestimonials() {
  const [active, setActive] = useState(0)

  const testimonials = [
    {
      quote:
        "The team has been professional and responsive throughout our interactions. Their focus on quality and delivery is appreciated.",
      author: "Customer feedback",
      role: "Sample testimonial"
    },
    {
      quote:
        "We appreciate their attention to component specifications and their willingness to discuss manufacturing requirements.",
      author: "Customer feedback",
      role: "Sample testimonial"
    },
    {
      quote:
        "The communication and support provided by the team have made coordination straightforward and efficient.",
      author: "Customer feedback",
      role: "Sample testimonial"
    }
  ]

  // Automatically change testimonial every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const previous = () =>
    setActive((current) =>
      (current - 1 + testimonials.length) % testimonials.length
    )

  const next = () =>
    setActive((current) =>
      (current + 1) % testimonials.length
    )

  const review = testimonials[active]

  return (
    <section className="wrap section home-testimonials">
      <div className="testimonial-heading">
        <h2>What Our Customers Say</h2>
        <p className="why-sub">
          Building trust through quality, precision and service.
        </p>
      </div>

      <article className="testimonial-card" aria-live="polite">
        <div className="testimonial-stars" aria-hidden="true">
          ★ ★ ★ ★ ★
        </div>

        <blockquote key={active}>
          “{review.quote}”
        </blockquote>

        <h3>{review.author}</h3>
        <p className="testimonial-role">{review.role}</p>

        <div className="testimonial-controls">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <span>
            {active + 1} / {testimonials.length}
          </span>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </article>
    </section>
  )
}


function HomeEnquiry() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      '',
      'Requirement:',
      data.get('message')
    ].join('\n')

    const subject = encodeURIComponent(
      'Website enquiry - Aadesh Engineering'
    )

    const mailBody = encodeURIComponent(body)

    window.location.href =
      `mailto:${company.email}?subject=${subject}&body=${mailBody}`

    setSent(true)
  }

  return (
    <section className="home-enquiry-section">
      <div className="wrap home-enquiry-grid">
        <div className="home-enquiry-intro">
          <h2>Let's Discuss Your Requirements</h2>

          <p>
            Looking for precision-machined automobile components?
            Share your drawing details, specifications and required
            quantity. Our team will be ready to discuss your enquiry.
          </p>

          <p>
            <strong>Call:</strong>{' '}
            <a href={`tel:+91${company.phone}`}>
              {company.phone}
            </a>
          </p>

          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
        </div>

        <form className="form home-enquiry-form" onSubmit={submit}>
          <label>
            Name *
            <input name="name" autoComplete="name" required />
          </label>

          <label>
            Company
            <input name="company" autoComplete="organization" />
          </label>

          <label>
            Phone *
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
            />
          </label>

          <label>
            Your requirement *
            <textarea
              name="message"
              rows="4"
              placeholder="Component, drawing details, quantity..."
              required
            />
          </label>

          <button className="btn" type="submit">
            Send Enquiry
          </button>

          {sent && (
            <p role="status">
              Your email app should open with your enquiry ready
              to send. Please send the email to complete your enquiry.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}


function HomeClients() {
  const logos = [...clients, ...clients]

  return (
    <section className="home-clients-section">
      <div className="wrap">
        <div className="home-clients-heading">
          <h2>Our Valued Customers</h2>
          <p>
            Building long-term relationships through precision,
            quality and dependable service.
          </p>
        </div>

        <div className="client-slider">
          <div className="client-slider-track">
            {logos.map((logo, index) => (
              <div className="client-logo-card" key={`${logo}-${index}`}>
                <img
                  src={logo}
                  alt={
                    index < clients.length
                      ? `Customer company ${index + 1}`
                      : ""
                  }
                  aria-hidden={index >= clients.length}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



function Home() {
  useTitle('Precision Machined Auto Components')
  return (  <div className="home-page">
    <section className="hero home hero-bg">
      <HeroSlider />
      <div className="wrap hero-content">
        <h1>Precision machined parts for the automobile industry</h1>
        <p>Oil pump shafts, gears, tensioner nuts, decomp rollers and spacers, made to order at our Talawade plant in Pune.</p>
        <div className="btns"><Link className="btn" to="/products">See our components</Link><Link className="btn ghost" to="/contact">Request a quote</Link></div>
      </div>
    </section>
    <section className="band"><div className="wrap stats">
      <Stat n={2007} from={1990} label="Established in Pune" /><Stat n={103} label="People on the team" /><Stat n={69} label="Machines in the plant" /><Stat n="ISO 9001:2015" label="Certified quality system" />
    </div></section>
    <Reveal as="section" className="wrap section who">
      <div>
        <h2>Who we are</h2>
        <p>Aadesh Engineering makes small, precise metal parts for cars and bikes. We have done this since 2007 from our plant in Talawade, Pune.  We have been the trusted manufacturing partner for the automotive sector, engineering high-tolerance critical parts—such as chain tensioner nuts, oil pump shafts, gears, decomp rollers, and spacers—that keep the world moving reliably.</p>
        <Link className="btn" to="/about">About us</Link>
      </div>
      <img src="/images/plant.jpg" alt="Aadesh Engineering shop floor with CNC machines" loading="lazy" />
    </Reveal>
    <Reveal as="section" className="wrap section">
      <h2>What we make</h2>
      
<div className="grid4">
  {products.map((g) => (
    <Link
      to="/products"
      key={g.group}
      className="card home-product-card"
    >
      <img src={g.items[0]} alt={g.group} loading="lazy" />
      <h3>{g.group}</h3>
    </Link>
  ))}
</div>

    </Reveal>
    <section className="wrap section">
      <Reveal><h2>Why to choose us</h2><p className="why-sub">Our core commitments to engineering excellence.</p></Reveal>
      <div className="why-grid">{reasons.map((r, i) => (
        <Reveal as="article" className="why-card" delay={i * 150} key={r.title}><h3>{r.title}</h3><p>{r.text}</p></Reveal>))}
      </div>
    </section>
    <Reveal as="section" className="wrap section">
      <h2>Inside our plant</h2>
      <div className="mosaic">{plantGallery.map((g) => (
        <figure key={g.src}><img src={g.src} alt={g.label} loading="lazy" /><figcaption>{g.label}</figcaption></figure>))}
      </div>
    </Reveal>
    <HomeTestimonials />
    <HomeClients/>
<HomeEnquiry />
    
  </div>)
}


function About() {
  useTitle('About')

  return (
    <>
      <Hero
        title="About Aadesh Engineering"
        text="An ISO 9001:2015 certified company established in 2007 at Talawade, Pune, specialising in precision machined components for the automobile sector."
      />

      {/* Plant profile with image on the right */}
      <section className="wrap section about-profile">
        <div className="about-profile-grid">
          <div>
            <h2>Plant profile</h2>

            <dl className="facts">
              <dt>Established</dt>
              <dd>2007</dd>

              <dt>Location</dt>
              <dd>
                Shivshankar Industrial Estate, Gat No. 78,
                Jyotibanagar, Pune
              </dd>

              <dt>Plant area</dt>
              <dd>9,200 sq. ft.</dd>

              <dt>Team</dt>
              <dd>103 employees</dd>

              <dt>Products</dt>
              <dd>
                Oil pump shaft, gear, decomp roller, spacer,
                mounting pin, chain tensioner nut
              </dd>
            </dl>
          </div>

          <div className="about-profile-image">
            <img
              src="/images/plant.jpg"
              alt="Aadesh Engineering manufacturing plant"
            />
          </div>
        </div>
      </section>

      {/* Our team moved below the plant profile */}
      <section className="wrap section about-team">
        <h2>Our team</h2>

        <table>
          <tbody>
            {manpower.map(([name, quantity]) => (
              <tr key={name}>
                <td>{name}</td>
                <td className="num">{quantity}</td>
              </tr>
            ))}

            <tr className="total">
              <td>Total</td>
              <td className="num">103</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Owner component comes after Our team */}
      <Owner />

      {/* Existing policies retained */}
      <section className="wrap section two">
        <div>
          <h2>Quality and TPM policy</h2>
          <p>
            We work to improve customer satisfaction through reliable
            supply, good quality and timely delivery. We train and
            motivate our people to run our quality management system
            and keep improving it, in line with statutory and
            regulatory requirements.
          </p>
          <p>
            We are building a TPM culture with every employee taking
            part, aiming for continual improvement, fewer breakdowns
            and zero accidents, so that supplies reach customers
            defect free and on time.
          </p>
        </div>

        <div>
          <h2>Environment, health and safety policy</h2>
          <p>
            We are committed to environment, occupational health and
            safety excellence on a sustainable basis, with safety
            built into the planning and execution of our work.
          </p>
          <p>
            We work towards eco-friendly technology, control our
            environmental impact, comply with applicable legal
            requirements, and train employees and partners in EHS
            awareness and skills.
          </p>
        </div>
      </section>
    </>
  )
}



function Products() {
  useTitle('Products')
  const [zoom, setZoom] = useState(null)

  const descriptions = {
    "Oil pump shafts":
      "Precision-machined shafts manufactured for automotive oil pump assemblies, with attention to dimensional accuracy, surface finish and drawing specifications.",

    "Gears":
      "Precision-engineered metal components designed for dependable mechanical engagement and consistent performance in automotive applications.",

    "Tensioner nuts and sleeves":
      "Precision-turned components developed for tensioning assemblies, with a focus on dimensional consistency and reliable fit.",

    "Pins, spacers and adapters":
      "Versatile machined components used for alignment, spacing and connecting mechanical assemblies according to specified requirements."
  }

  return (
    <>
      <Hero
        title="Our Products"
        text="Explore our range of precision-machined automotive components manufactured to meet customer drawing and quality requirements."
      />

      <div className="products-page">
        {products.map((g, index) => (
          <section
            className={`product-section product-section-${index % 2 === 0 ? 'light' : 'tint'}`}
            key={g.group}
          >
            <div className="wrap product-section-inner">
              <div className="product-section-heading">
                <span className="product-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h2>{g.group}</h2>
                  <p>
                    {descriptions[g.group] ||
                      "Precision-machined components manufactured to customer specifications, with a focus on quality, consistency and reliable fit."}
                  </p>
                </div>
              </div>

              <div className="gallery product-gallery">
                {g.items.map((src, imageIndex) => (
                  <button
                    type="button"
                    className="zoomable product-image"
                    key={src}
                    aria-label={`Enlarge ${g.group} image ${imageIndex + 1}`}
                    onClick={() =>
                      setZoom({ src, alt: g.group })
                    }
                  >
                    <img
                      src={src}
                      alt={`${g.group} - example ${imageIndex + 1}`}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="wrap section product-cta">
        <h2>Looking for a specific component?</h2>
        <p>
          Share your component drawing, specifications and required
          quantity with our team to discuss your manufacturing needs.
        </p>
        <Link className="btn" to="/contact">
          Request a Quote
        </Link>
      </section>

      {zoom && (
        <Lightbox
          src={zoom.src}
          alt={zoom.alt}
          onClose={() => setZoom(null)}
        />
      )}
    </>
  )
}


function Infrastructure() {
  useTitle('Infrastructure')
  return (<>
    <Hero title="Machines and inspection" text="A shop floor of CNC, Traub, milling, grinding and drilling machines, backed by in-house inspection." />
    <section className="wrap section two">
      <div><h2>Machine list</h2>
        <table><tbody>{machineList.map(([n, q]) => <tr key={n}><td>{n}</td><td className="num">{q}</td></tr>)}<tr className="total"><td>Total</td><td className="num">{machineList.reduce((s, m) => s + m[1], 0)}</td></tr></tbody></table></div>
      <img className="fill" src="/images/m-cnc.jpg" alt="CNC machine at Aadesh Engineering" loading="lazy" />
    </section>
    <section className="wrap section">
      <h2>Key machines</h2>
      <div className="grid3">{machines.map((m) => (
        <article className="card" key={m.name}><img src={m.img} alt={m.name} loading="lazy" /><h3>{m.name}</h3><ul>{m.spec.map((s) => <li key={s}>{s}</li>)}</ul></article>))}
      </div>
    </section>
    <section className="wrap section">
      <h2>Inspection facility</h2>
      <div className="grid4">{inspection.map((i) => <figure className="card" key={i.name}><img className="contain" src={i.img} alt={i.name} loading="lazy" /><figcaption>{i.name}</figcaption></figure>)}</div>
    </section>
  </>)
}

function Quality() {
  useTitle('Quality')
  return (<>
    <Hero title="Quality and certification" text="Our quality management system is certified to ISO 9001:2015. IATF 16949 certification is in process." />
    <section className="wrap section two">
      <img className="cert" src="/images/iso-certificate.jpg" alt="ISO 9001:2015 quality management system certificate" loading="lazy" />
      <div><h2>Recognition from customers</h2>
        <ul className="awards">{awards.map(([a, y]) => <li key={a}><b>{a}</b><span>{y}</span></li>)}</ul>
        <div className="gallery small">{awardImgs.map((s) => <img key={s} src={s} alt="Advik award" loading="lazy" />)}</div>
      </div>
    </section>
  </>)
}

function Contact() {
  useTitle('Contact')
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const body = `Name: ${f.get('name')}\nCompany: ${f.get('company')}\nPhone: ${f.get('phone')}\n\n${f.get('message')}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Enquiry from website')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (<>
    <Hero title="Contact us" text="Send your drawing details and required quantity and we will get back to you." />
    <section className="wrap section two">
      <form onSubmit={submit} className="form">
        <label>Name<input name="name" required /></label>
        <label>Company<input name="company" /></label>
        <label>Phone<input name="phone" type="tel" required /></label>
        <label>Your requirement<textarea name="message" rows="5" required /></label>
        <button className="btn" type="submit">Send enquiry</button>
        {sent && <p role="status">Your email app should open with the enquiry ready to send.</p>}
      </form>
      <div>
        <h2>Aadesh Engineering</h2>
        <p>{company.address}</p>
        <p>{company.md}, Managing Director<br /><a href={`tel:+91${company.phone}`}>{company.phone}</a><br /><a href={`mailto:${company.email}`}>{company.email}</a></p>
        <iframe title="Map of Aadesh Engineering, Talawade, Pune" loading="lazy" src="https://www.google.com/maps?q=Shivshankar+Industrial+Estate+Jyotibanagar+Talawade+Pune&output=embed" />
      </div>
    </section>
  </>)
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (<>
    <Header />
    <main key={pathname} className="page">
      <Routes>
        <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/products" element={<Products />} />
        <Route path="/infrastructure" element={<Infrastructure />} /><Route path="/quality" element={<Quality />} /><Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Hero title="Page not found" text="Use the menu to get back to a page." />} />
      </Routes>
    </main>
    <Footer />
        <div className={pathname === '/' ? 'fab home-fab' : 'fab'}>
      
<a
  className="fab-wa"
  aria-label="Contact us on WhatsApp"
  href={`https://wa.me/91${company.phone}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <span className="home-fab-label">
    {pathname === '/' ? 'WA' : 'WhatsApp'}
  </span>
</a>

<a
  className="fab-call"
  aria-label="Call Aadesh Engineering"
  href={`tel:+91${company.phone}`}
>
  <span className="home-fab-label">
    {pathname === '/' ? '☎' : 'Call'}
  </span>
</a>
 </div>
  </>)
}
