'use client'

import { useEffect, useRef } from 'react'

const CHECKOUT =
  'https://pay.hotmart.com/H105232237N?off=cduhamyx&checkoutMode=10'
const IMG = {
  hero: '/baby-sleep-guide/hero-product.png',
  pain: '/baby-sleep-guide/pain.png',
  plan: '/baby-sleep-guide/plan.png',
  finalCta: '/baby-sleep-guide/final-cta.png',
} as const

export default function BabySleepGuidePage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onFaqClick = (e: Event) => {
      const btn = e.currentTarget as HTMLElement
      const item = btn.closest('.faq-item')
      if (!item) return
      const wasOpen = item.classList.contains('open')
      root.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'))
      if (!wasOpen) item.classList.add('open')
    }

    const buttons = root.querySelectorAll<HTMLButtonElement>('.faq-q')
    buttons.forEach((b) => b.addEventListener('click', onFaqClick))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    root.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    return () => {
      buttons.forEach((b) => b.removeEventListener('click', onFaqClick))
      observer.disconnect()
    }
  }, [])

  return (
    <div id="baby-sleep-guide-root" ref={rootRef}>
      <header className="site-header">
        <div className="logo">
          Baby <span>Sleep</span> Guide
        </div>
        <a
          href={CHECKOUT}
          className="btn-header"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the Guide Now →
        </a>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text fade-up">
            <div className="hero-badge">🌙 Gentle Method · 7–10 Days</div>
            <h1>
              Your Baby Will Sleep
              <br />
              <span>12 Hours Straight</span>
              <br />— Without Endless Crying
            </h1>
            <p className="hero-sub">
              A practical, loving guide built on proven methods to transform your
              family&apos;s nights into real rest. Gentle routines. Consistent
              results.
            </p>
            <a
              href={CHECKOUT}
              className="btn-hero"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Yes, I Want to Start Tonight
            </a>
            <p className="hero-note">
              🔒 Secure checkout · Instant access · Hotmart
            </p>
          </div>
          <div className="hero-img-wrap fade-up">
            <img
              src={IMG.hero}
              alt="Gentle sleep method for a peaceful night"
              width={480}
              height={600}
            />
          </div>
        </div>
        <div
          className="container"
          style={{ paddingTop: 0, paddingBottom: 0, position: 'relative', zIndex: 2 }}
        >
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">90%</div>
              <div className="lbl">Success rate with this method</div>
            </div>
            <div className="hero-stat">
              <div className="num">7–10</div>
              <div className="lbl">Days to see real results</div>
            </div>
            <div className="hero-stat">
              <div className="num">12h</div>
              <div className="lbl">Of uninterrupted sleep for baby</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pain">
        <div className="container">
          <div className="pain-grid">
            <div className="pain-img fade-up">
              <img
                src={IMG.pain}
                alt="Exhausted mother with baby at night"
                width={800}
                height={600}
              />
            </div>
            <div className="fade-up">
              <div className="section-tag">Does this sound familiar?</div>
              <h2 className="section-title">
                Exhausted. Every single night. With no end in sight.
              </h2>
              <ul className="pain-list">
                <li>
                  <span className="icon">😣</span>
                  <span>
                    Your baby wakes up <strong>3, 4, 5 times a night</strong> and
                    you simply can&apos;t take it anymore?
                  </span>
                </li>
                <li>
                  <span className="icon">🍼</span>
                  <span>
                    Nursing or bottle feeding has become the{' '}
                    <strong>only way</strong> to get your baby back to sleep?
                  </span>
                </li>
                <li>
                  <span className="icon">😴</span>
                  <span>
                    You go to bed dreading the next time you&apos;ll hear crying?
                  </span>
                </li>
                <li>
                  <span className="icon">😰</span>
                  <span>
                    You&apos;ve tried everything and nothing seems to{' '}
                    <strong>stick</strong> for your baby?
                  </span>
                </li>
                <li>
                  <span className="icon">💔</span>
                  <span>
                    You feel guilty for wanting to sleep — like that somehow makes
                    you a <strong>bad parent</strong>?
                  </span>
                </li>
              </ul>
              <div className="pain-highlight">
                <strong>Sleep deprivation is not a sign of weakness.</strong> It
                affects your health, your bond with your baby, and everyone you
                love. You deserve to sleep — and so does your baby.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why">
        <div className="container">
          <div className="section-tag" style={{ display: 'inline-block' }}>
            Why won&apos;t baby sleep?
          </div>
          <h2 className="section-title">
            The problem isn&apos;t your baby.
            <br />
            It&apos;s the patterns they&apos;ve learned.
          </h2>
          <p className="section-sub">
            Most night wakings aren&apos;t a behavior problem — they&apos;re
            learned patterns that can be gently reshaped with consistency and
            patience.
          </p>
          <div className="why-cards fade-up">
            <div className="why-card">
              <div className="why-icon">🍼</div>
              <h4>Sleep Associations</h4>
              <p>
                When babies learn to fall asleep only while feeding or rocking,
                they expect the same &quot;password&quot; when they naturally wake
                during the night.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">😵</div>
              <h4>Overtiredness</h4>
              <p>
                Missing nap windows causes babies to produce cortisol — the stress
                hormone — making it even harder to fall and stay asleep.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">🕐</div>
              <h4>Inconsistent Routine</h4>
              <p>
                Without predictable daily patterns, babies don&apos;t develop
                internal sleep cues. Their bodies need consistency to regulate
                melatonin properly.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">☀️</div>
              <h4>Daytime Sleep Imbalance</h4>
              <p>
                Too little daytime sleep leads to overtiredness; too much or
                too-late naps interfere with nighttime sleep quality and duration.
              </p>
            </div>
          </div>
          <div className="why-note fade-up">
            <span className="check">✅</span>
            <p>
              <strong>The good news:</strong> all of these patterns are completely
              normal and entirely fixable. With gentle, consistent methods, most
              families see{' '}
              <strong>significant improvement within 7–10 days</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="product">
        <div className="container">
          <div className="product-layout">
            <div className="product-mockup fade-up">
              <div className="product-badge">Gentle Method 🌙</div>
              <img
                src={IMG.hero}
                alt="12 Hours of Sleep Guide"
                width={380}
                height={480}
              />
            </div>
            <div className="fade-up">
              <div className="section-tag">The solution</div>
              <h2 className="section-title" style={{ color: 'white' }}>
                12 Hours of Sleep: A Gentle &amp; Practical Guide to Help Your
                Baby Sleep Through the Night
              </h2>
              <p className="section-sub">
                A complete, loving guide that combines the wisdom of Suzy Giordano
                and Lisa Abidin with gentle, proven methods that respect both your
                baby&apos;s needs and your family&apos;s wellbeing.
              </p>
              <div className="product-features">
                <div className="feat">
                  <div className="feat-icon">🌙</div>
                  <div className="feat-text">
                    <h4>Structured Daily Routine</h4>
                    <p>
                      Clear wake, nap, and bedtime schedules that naturally regulate
                      your baby&apos;s internal clock.
                    </p>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">🧠</div>
                  <div className="feat-text">
                    <h4>Why Timing Matters</h4>
                    <p>
                      Understand how melatonin and cortisol work — and use that
                      knowledge to your advantage for calmer nights.
                    </p>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">🤝</div>
                  <div className="feat-text">
                    <h4>Independent Sleep Without Abandonment</h4>
                    <p>
                      Teaching your baby to sleep alone isn&apos;t abandoning them —
                      it&apos;s giving them a life-long skill.
                    </p>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">📅</div>
                  <div className="feat-text">
                    <h4>7-Day Sleep Reset Plan</h4>
                    <p>
                      A daily step-by-step roadmap to transform your family&apos;s
                      nights without overwhelming anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inside">
        <div className="container">
          <div className="section-tag" style={{ display: 'inline-block' }}>
            What&apos;s inside the guide
          </div>
          <h2 className="section-title">Everything you need, all in one place</h2>
          <p className="section-sub">
            Each chapter is written to be read quickly — even when you&apos;re
            exhausted at 2 AM.
          </p>
          <div className="inside-grid fade-up">
            {[
              {
                n: '01',
                t: 'Why Your Baby Wakes So Often',
                p: 'Understand the real causes of night wakings and shift from guilt to solution.',
              },
              {
                n: '02',
                t: 'The Foundation: A Consistent Daily Routine',
                p: 'Ideal wake, nap, and sleep windows for babies 6–18 months.',
              },
              {
                n: '03',
                t: 'The Power of Early Bedtime',
                p: 'Why putting baby to bed earlier makes them sleep longer — and the signs of overtiredness to avoid.',
              },
              {
                n: '04',
                t: 'Teaching Independent Sleep',
                p: 'The ideal wind-down routine, how to put baby down drowsy-but-awake, and how to handle protests gently.',
              },
              {
                n: '05',
                t: 'Reducing Night Feedings',
                p: 'How to gradually cut night feeds without stress — plus guidance on when to check with your pediatrician.',
              },
              {
                n: '06',
                t: 'Handling Night Wakings',
                p: 'How to respond to a waking baby without creating new problematic sleep associations.',
              },
              {
                n: '07',
                t: 'Daytime Sleep Matters Too',
                p: 'A complete guide to quality naps that support great nighttime sleep.',
              },
              {
                n: '08',
                t: 'Common Mistakes Parents Make',
                p: 'The 4 most common sleep pitfalls parents create without realizing — and how to avoid them.',
              },
              {
                n: '09',
                t: 'Your 7-Day Sleep Reset Plan',
                p: 'A complete daily roadmap from Day 1 to Day 7, so you never feel lost in the process.',
              },
            ].map((c) => (
              <div key={c.n} className="inside-card">
                <div className="inside-num">{c.n}</div>
                <h4>{c.t}</h4>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plan">
        <div className="container">
          <div className="plan-layout">
            <div className="fade-up">
              <div className="section-tag">The 7-day plan</div>
              <h2 className="section-title">From chaos to rest in one week</h2>
              <p className="section-sub">
                Each day builds on the previous. No rush, no pressure — but real,
                lasting results.
              </p>
              <div className="timeline">
                <div className="tl-item">
                  <div className="tl-left">
                    <div className="tl-dot">1</div>
                    <div className="tl-connector" />
                  </div>
                  <div className="tl-content">
                    <h4>Days 1–2: Establish the Routine</h4>
                    <p>
                      Set consistent wake, nap, and bedtime windows. Start the
                      20-minute bedtime wind-down. This is the foundation —
                      don&apos;t skip ahead.
                    </p>
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-left">
                    <div className="tl-dot">2</div>
                    <div className="tl-connector" />
                  </div>
                  <div className="tl-content">
                    <h4>Days 3–4: Put Baby Down Awake</h4>
                    <p>
                      Continue the routine and now place baby in the crib drowsy but
                      awake. Expect some protest — it&apos;s normal. Consistency is
                      everything.
                    </p>
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-left">
                    <div className="tl-dot">3</div>
                    <div className="tl-connector" />
                  </div>
                  <div className="tl-content">
                    <h4>Days 5–6: Reduce Night Feedings</h4>
                    <p>
                      Shorten feeds by 1–2 minutes. Wait 2–3 minutes before
                      responding to wakings. Offer comfort without feeding whenever
                      possible.
                    </p>
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-left">
                    <div className="tl-dot">4</div>
                    <div className="tl-connector" />
                  </div>
                  <div className="tl-content">
                    <h4>Day 7: Maintain &amp; Celebrate</h4>
                    <p>
                      Keep everything consistent. Improvement should already be
                      visible. You are teaching your child a skill they&apos;ll carry
                      for life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="plan-img fade-up">
              <img
                src={IMG.plan}
                alt="Happy mom and baby in the morning"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="numbers">
        <div className="container">
          <h2 className="numbers-heading">The numbers speak for themselves</h2>
          <div className="numbers-grid fade-up">
            <div className="num-item">
              <span className="big">90%</span>
              <div className="desc">of babies improve with early bedtime</div>
            </div>
            <div className="num-item">
              <span className="big">7–10</span>
              <div className="desc">days to significant, consistent improvement</div>
            </div>
            <div className="num-item">
              <span className="big">30 min</span>
              <div className="desc">less time to fall asleep with an early bedtime</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-tag" style={{ display: 'inline-block' }}>
            Real stories
          </div>
          <h2 className="section-title">Families who transformed their nights</h2>
          <p className="section-sub">
            What parents are saying after applying the method for 7 days.
          </p>
          <div className="testi-grid fade-up">
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <p>
                &quot;My 8-month-old was waking up 5 times a night. On day 6 of the
                method, she slept 11 hours straight for the first time. I cried —
                out of pure joy and relief.&quot;
              </p>
              <div className="testi-author">
                <div className="testi-avatar">A</div>
                <div>
                  <div className="testi-name">Amanda L.</div>
                  <div className="testi-info">Mom of Valentina, 8 months</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <p>
                &quot;I didn&apos;t believe it could work without a lot of crying. But
                the method is truly gentle. By day 8, my 10-month-old was sleeping
                from 7 PM to 7 AM on his own.&quot;
              </p>
              <div className="testi-author">
                <div className="testi-avatar">C</div>
                <div>
                  <div className="testi-name">Claire M.</div>
                  <div className="testi-info">Mom of Noah, 10 months</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <p>
                &quot;The guide is clear, practical, and it works. I&apos;d tried
                other approaches and nothing stuck. This 7-day routine completely
                changed our family. Everyone sleeps now.&quot;
              </p>
              <div className="testi-author">
                <div className="testi-avatar">S</div>
                <div>
                  <div className="testi-name">Sarah K.</div>
                  <div className="testi-info">Mom of Isabelle, 13 months</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="offer">
        <div className="container">
          <div className="offer-box fade-up">
            <div className="section-tag">Special offer</div>
            <h2 className="section-title">
              Start tonight.
              <br />
              Sleep better within a week.
            </h2>
            <p className="offer-sub">
              Instant access to the complete guide with everything you need to
              transform your baby&apos;s nights — and your entire family&apos;s sleep.
            </p>
            <div className="offer-includes">
              <h4>📦 What you get</h4>
              <div className="include-item">
                <span className="check">✓</span> Full &quot;12 Hours of Sleep&quot;
                Guide (PDF)
              </div>
              <div className="include-item">
                <span className="check">✓</span> Step-by-step 7-day sleep reset plan
              </div>
              <div className="include-item">
                <span className="check">✓</span> Daily routine for babies 6–18 months
              </div>
              <div className="include-item">
                <span className="check">✓</span> Methods to gradually reduce night
                feedings
              </div>
              <div className="include-item">
                <span className="check">✓</span> Complete daytime nap guide
              </div>
              <div className="include-item">
                <span className="check">✓</span> Instant access after purchase
              </div>
            </div>
            <div className="price-block">
              <div className="price-old">From $37.00</div>
              <div className="price-new">$19.90</div>
              <div className="price-note">One-time payment · No subscription</div>
            </div>
            <a
              href={CHECKOUT}
              className="btn-offer"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌙 I Want to Sleep This Week
            </a>
            <div className="offer-trust">
              <div className="trust-item">🔒 100% Secure checkout</div>
              <div className="trust-item">⚡ Instant access</div>
              <div className="trust-item">🛡️ Hotmart platform</div>
            </div>
          </div>
        </div>
      </section>

      <section className="guarantee">
        <div className="container">
          <div className="guarantee-box fade-up">
            <span className="guarantee-icon">🛡️</span>
            <h2
              className="section-title"
              style={{
                margin: '0 auto 16px',
                maxWidth: '100%',
                textAlign: 'center',
              }}
            >
              Satisfaction Guarantee
            </h2>
            <p>
              If for any reason you&apos;re not satisfied with the guide&apos;s
              content,{' '}
              <strong>
                simply contact us within Hotmart&apos;s refund window
              </strong>{' '}
              to request a full refund. No hassle. No questions asked. Because we
              genuinely believe in the results this method delivers.
            </p>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div
            className="section-tag"
            style={{ display: 'inline-block', marginBottom: 16 }}
          >
            FAQ
          </div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            Still have questions? We&apos;ve got answers.
          </h2>
          <div className="faq-list">
            {[
              {
                q: 'What age range does this method work for?',
                a: 'The guide is specifically designed for babies 6–18 months old. At this stage, babies no longer need night feedings for nutritional reasons and are developmentally ready to learn independent sleep skills.',
              },
              {
                q: 'Will I have to let my baby cry it out?',
                a: 'No. This method is called "gentle" precisely because it does not use the cry-it-out technique. There may be some initial protest — that\'s normal for any new skill — but you never leave your baby alone. You encourage them with presence and consistency.',
              },
              {
                q: 'How long until I see results?',
                a: 'Most families see significant improvement within 7–10 days of consistent application. Some babies respond faster; others may take a bit longer. The key is consistency — especially in the first few days.',
              },
              {
                q: 'Does it work for breastfeeding babies?',
                a: 'Yes. The guide includes a dedicated chapter on how to gradually reduce night nursing sessions, always with the guidance to consult your pediatrician first — especially for babies under 12 months.',
              },
              {
                q: 'How do I receive the guide after purchasing?',
                a: "Access is instant! Right after Hotmart confirms your payment, you'll receive an email with a link to download the PDF guide. You can access it on your phone, tablet, or computer — anytime, anywhere.",
              },
              {
                q: "What if I try it and it doesn't work?",
                a: "Your purchase is covered by Hotmart's refund policy. If you apply the method and aren't satisfied, simply request a refund within the stated window. No questions, no hassle.",
              },
            ].map((item) => (
              <div key={item.q} className="faq-item">
                <button type="button" className="faq-q">
                  {item.q}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <img
            src={IMG.finalCta}
            alt="Peaceful mom and baby"
            width={160}
            height={160}
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
              margin: '0 auto 32px',
              display: 'block',
              border: '4px solid rgba(245,166,35,.4)',
              boxShadow: '0 0 40px rgba(245,166,35,.2)',
            }}
          />
          <h2>
            Imagine waking up tomorrow
            <br />
            <span>rested. Peaceful. With your baby.</span>
          </h2>
          <p>
            This isn&apos;t a fantasy. It&apos;s what happens when you follow a
            gentle, proven method and give your child the sleep skill they&apos;ll
            carry for life.
          </p>
          <a
            href={CHECKOUT}
            className="btn-offer"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', marginBottom: 16 }}
          >
            🌙 Yes, I&apos;m Ready to Transform Our Nights
          </a>
          <p
            style={{
              color: 'rgba(255,255,255,.35)',
              fontSize: '.85rem',
              marginTop: 8,
            }}
          >
            🔒 Secure checkout · Instant access · Hotmart
          </p>
        </div>
      </section>

      <footer>
        <p>© 2026 Baby Sleep Guide · All rights reserved</p>
        <p style={{ marginTop: 6 }}>
          For educational purposes only. Always consult your pediatrician before
          modifying your baby&apos;s nighttime feeding routine.
        </p>
      </footer>
    </div>
  )
}
