"use client";

import { useEffect, useState, type FormEvent } from "react";

const SPARKLE_PATH =
  "M50 0 C53 36 64 47 100 50 C64 53 53 64 50 100 C47 64 36 53 0 50 C36 47 47 36 50 0Z";

function Sparkle({ className }: { className?: string }) {
  return (
    <span className={`spk ${className ?? ""}`}>
      <svg viewBox="0 0 100 100">
        <path d={SPARKLE_PATH} />
      </svg>
    </span>
  );
}

function StampMark({ fill }: { fill: string }) {
  return (
    <div className="si">
      <svg width="18" height="18" viewBox="0 0 100 100">
        <path d={SPARKLE_PATH} fill={fill} />
      </svg>
    </div>
  );
}

type FaxErrors = { name?: boolean; biz?: boolean; email?: boolean };

function FaxForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<FaxErrors>({});
  const [firstName, setFirstName] = useState("there");

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const biz = form.elements.namedItem("biz") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;

    const nextErrors: FaxErrors = {};
    if (!name.value.trim()) nextErrors.name = true;
    if (!biz.value.trim()) nextErrors.biz = true;
    if (!email.value.trim()) nextErrors.email = true;
    if (
      email.value &&
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)
    ) {
      nextErrors.email = true;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setFirstName(name.value.trim().split(" ")[0] || "there");
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <div className="fax-form">
        <div className="thanks" style={{ padding: "60px 24px" }}>
          <span className="serif">Transmitted, {firstName}.</span>
          <p>
            Your message just arrived. I&apos;ll reply within a day — like a
            person, not a robot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fax-form">
      <form onSubmit={handleSubmit} noValidate>
        <div
          className="fax-form-paper"
          style={
            status === "sending"
              ? { animation: "feed 0.6s ease-in forwards" }
              : undefined
          }
        >
          <div className="fax-stamp">
            <span>YOUR FAX</span>
            <span>CLARIVA · 2026</span>
          </div>
          <div className={`fax-field${errors.name ? " error" : ""}`}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Maria" required />
          </div>
          <div className={`fax-field${errors.biz ? " error" : ""}`}>
            <label htmlFor="biz">Business</label>
            <input
              id="biz"
              name="biz"
              type="text"
              placeholder="Bloom &amp; Stem Florist"
              required
            />
          </div>
          <div className={`fax-field${errors.email ? " error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="maria@example.com"
              required
            />
          </div>
          <div className="fax-field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" name="msg" placeholder="What would you love help with?" />
          </div>
        </div>
        <div className="fax-form-body">
          <div className="fax-form-slot"></div>
          <div className="fax-form-screen">
            <span className="txt">
              {status === "sending" ? "Transmitting" : "Ready to transmit"}
              <span className="cursor"></span>
            </span>
            <span className="led"></span>
          </div>
          <button
            type="submit"
            className="fax-send-btn"
            disabled={status === "sending"}
            style={status === "sending" ? { opacity: 0.5 } : undefined}
          >
            Transmit message →
          </button>
          <div className="fax-form-label">Clariva · Model 2026</div>
        </div>
      </form>
      <div className="fax-form-foot"></div>
    </div>
  );
}

export default function ClarivaPage() {
  useEffect(() => {
    const root = document.documentElement;
    const prevScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".clariva-page .reveal")
    );

    function revealCheck() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach((el) => {
        if (el.classList.contains("in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) {
          el.classList.add("in");
        }
      });
    }

    revealCheck();
    window.addEventListener("scroll", revealCheck, { passive: true });
    window.addEventListener("resize", revealCheck);

    return () => {
      root.style.scrollBehavior = prevScrollBehavior;
      window.removeEventListener("scroll", revealCheck);
      window.removeEventListener("resize", revealCheck);
    };
  }, []);

  return (
    <>
      <header>
        <div className="wrap nav">
          <a href="#top" className="logo">
            <b>C</b>lariva
          </a>
          <nav className="nav-links">
            <a href="#problem">The honest part</a>
            <a href="#how">How it works</a>
            <a href="#services">What we do</a>
            <a href="#stories">Stories</a>
            <a href="#talk" className="btn">
              Let&apos;s talk <span className="arr">→</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <span className="grain"></span>
          <span className="vig"></span>
          <div className="wrap hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">File under ▸ The 2026 upgrade</span>
              <div className="filerule"></div>
              <h1 className="era">
                <span>A&nbsp;NEW</span>
                <br />
                <span>ERA</span>
                <span className="dot">.</span>
              </h1>
              <p className="lead">
                Everyone&apos;s talking about AI. You&apos;re quietly
                wondering if you&apos;ve fallen behind.{" "}
                <span className="serif">You haven&apos;t</span> — you just
                haven&apos;t had a guide. We handle the tech. You stay you.
              </p>
              <div className="hero-cta">
                <a href="#talk" className="btn gold">
                  Let&apos;s talk <span className="arr">→</span>
                </a>
              </div>
            </div>
            <div className="hero-stage reveal">
              <Sparkle className="s1" />
              <Sparkle className="s2" />
              <span
                className="power"
                title="Switch on the new era"
                style={{ fontSize: "32px", width: "60px", height: "60px" }}
              ></span>
              <div className="chat q">
                <div className="cap">You → the machine</div>
                <div className="ln">&quot;make my little shop famous, please.&quot;</div>
              </div>
              <div className="chat reply">
                <div className="cap">The machine → you</div>
                <div className="ln">
                  &quot;done. your bakery now ranks above three croissants in
                  Sydney.&quot;
                  <span className="cur"></span>
                </div>
              </div>
              <div className="hero-bcard">
                <div className="bbar">
                  <span className="d d1"></span>
                  <span className="d d2"></span>
                  <span className="d d3"></span>
                </div>
                <div className="bbody">
                  <h4>
                    Same noise.
                    <br />
                    Smarter robots.
                  </h4>
                  <p>
                    Now your toaster has opinions and your inbox writes
                    itself. Welcome aboard.
                  </p>
                  <div className="genbtn">GENERATE ✦</div>
                </div>
              </div>
              <div className="bot-sm">
                <div className="ant"></div>
                <div className="head">
                  <span className="eye l"></span>
                  <span className="eye r"></span>
                  <span className="mouth"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM: Notification Storm */}
        <section className="problem pad" id="problem">
          <div className="wrap">
            <div className="problem-grid reveal">
              <div>
                <span className="eyebrow teal">The honest part</span>
                <h2>
                  IT&apos;S
                  <br />
                  LOUD
                  <span className="dot">.</span>
                </h2>
                <div className="story">
                  <p>
                    Every day there&apos;s a new app, a new trend, a new
                    expert telling you what you <em>must</em> be doing. Post
                    more. Try this tool. Learn this thing by Friday.
                    It&apos;s exhausting — and you have a business to run.
                  </p>
                  <p>
                    So you close the laptop and get back to the work you
                    love. The flowers. The bread. The fittings. And that
                    quiet worry settles in the back of your mind:{" "}
                    <em>am I being left behind?</em>
                  </p>
                  <p>
                    Here&apos;s the truth. You&apos;re not behind because
                    you&apos;re not good enough. You&apos;re just lost in a
                    very loud crowd. That&apos;s not a you problem —
                    it&apos;s a guide problem.
                  </p>
                </div>
              </div>
              <div className="phone-wrap">
                <div className="phone-body">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="screen-label">
                      23 new notifications
                      <br />↓ keep scrolling ↓
                    </div>
                  </div>
                  <div className="phone-home"></div>
                </div>
                <span className="notif n1">Post more!</span>
                <span className="notif n2">New trend alert ✦</span>
                <span className="notif n3">Try this tool</span>
                <span className="notif n4">Learn this. Now.</span>
                <span className="notif n5">You&apos;re falling behind</span>
              </div>
            </div>
            <div className="pull-full reveal">
              <span className="serif">
                &quot;You don&apos;t have to figure it out alone.&quot;
              </span>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: Telegraph Dispatch */}
        <section className="dispatch pad" id="how">
          <div className="wrap">
            <div className="dispatch-header">
              <h2>
                THREE
                <br />
                STEPS
                <span className="dot">.</span>
              </h2>
              <div className="dispatch-meta">
                YOU DO VERY LITTLE
                <br />
                CLARIVA HANDLES THE REST
                <br />
                EST. 2026 · SYDNEY
              </div>
            </div>
            <div className="step-grid">
              <div className="step-card">
                <div className="s-icon talk">
                  <div className="b1"></div>
                  <div className="b2"></div>
                </div>
                <div className="num">01</div>
                <h3>We talk</h3>
                <p>
                  A real conversation about your business — what you make,
                  who you&apos;re for, and where you&apos;d love to be. No
                  tech talk, promise.
                </p>
              </div>
              <div className="step-card">
                <div className="s-icon gear">
                  <div className="g"></div>
                  <div className="sm"></div>
                </div>
                <div className="num">02</div>
                <h3>We handle it</h3>
                <p>
                  We set up the tools, write the posts, and sort the Google
                  side of things. The quiet, fiddly work happens behind the
                  scenes.
                </p>
              </div>
              <div className="step-card">
                <div className="s-icon eyelid">
                  <div className="iris"></div>
                  <div className="pupil"></div>
                  <div className="ray"></div>
                </div>
                <div className="num">03</div>
                <h3>You stay visible</h3>
                <p>
                  You get back to what you love. The right customers find
                  you — on Google, on social, everywhere that matters.
                </p>
              </div>
            </div>
            <div className="dispatch-note">
              <span className="serif">
                No dashboards to learn. No jargon to decode. That&apos;s it.
              </span>
            </div>
          </div>
        </section>

        {/* SERVICES: Classified Index */}
        <section className="classified-section pad" id="services">
          <div className="wrap">
            <div className="classified-head">
              <h2>
                What we
                <br />
                actually do.
              </h2>
              <div className="sub">
                CLASSIFIED INDEX · VOL. 01
                <br />
                PLAIN ENGLISH ONLY
                <br />
                NO JARGON · CLARIVA 2026
              </div>
            </div>
            <div className="classified-grid">
              <div className="classified">
                <div className="c-num">NO. 01</div>
                <div className="c-icon mag">
                  <div className="circle"></div>
                  <div className="handle"></div>
                </div>
                <h3>Get found on Google</h3>
                <p>
                  When someone nearby searches for what you make, you show
                  up. Simple as that.
                </p>
                <span className="c-tag">Local SEO</span>
              </div>
              <div className="classified">
                <div className="c-num">NO. 02</div>
                <div className="c-icon speech">
                  <div className="bubble"></div>
                  <div className="tail"></div>
                  <div className="d d1"></div>
                  <div className="d d2"></div>
                  <div className="d d3"></div>
                </div>
                <h3>Posts that sound like you</h3>
                <p>
                  Social posts in your own voice — warm, real, never
                  robotic. We write them, you approve them.
                </p>
                <span className="c-tag">Content &amp; Social</span>
              </div>
              <div className="classified">
                <div className="c-num">NO. 03</div>
                <div className="c-icon target">
                  <div className="r1"></div>
                  <div className="r2"></div>
                  <div className="r3"></div>
                </div>
                <h3>Ads that actually work</h3>
                <p>
                  A small, honest budget spent well — reaching the people
                  who&apos;d genuinely love what you make.
                </p>
                <span className="c-tag">Paid Media</span>
              </div>
              <div className="classified">
                <div className="c-num">NO. 04</div>
                <div className="c-icon browser">
                  <div className="win">
                    <div className="bar">
                      <span className="bd bd1"></span>
                      <span className="bd bd2"></span>
                      <span className="bd bd3"></span>
                    </div>
                  </div>
                </div>
                <h3>A website worth visiting</h3>
                <p>
                  Clear, warm and easy to use. The kind that turns a quick
                  look into a &quot;hello&quot;.
                </p>
                <span className="c-tag">Web Design</span>
              </div>
              <div className="classified">
                <div className="c-num">NO. 05</div>
                <div className="c-icon envelope">
                  <div className="env"></div>
                  <div className="flap"></div>
                </div>
                <h3>Emails people actually open</h3>
                <p>
                  A simple newsletter that keeps your regulars close and
                  brings back the ones who wandered.
                </p>
                <span className="c-tag">Email Marketing</span>
              </div>
              <div className="classified">
                <div className="c-num">NO. 06</div>
                <div className="c-icon spark">
                  <div className="sp">
                    <svg viewBox="0 0 100 100">
                      <path d={SPARKLE_PATH} />
                    </svg>
                  </div>
                </div>
                <h3>Your brand, made consistent</h3>
                <p>
                  Logos, colours, fonts and a voice that feels like you —
                  everywhere people find you online.
                </p>
                <span className="c-tag">Brand Identity</span>
              </div>
            </div>
          </div>
        </section>

        {/* STORIES: Postcard Wall */}
        <section className="postwall pad" id="stories">
          <div className="wrap">
            <div className="postwall-head">
              <div>
                <span className="eyebrow" style={{ color: "var(--teal-soft)" }}>
                  In their words
                </span>
                <h2 style={{ marginTop: "12px" }}>
                  Real people.
                  <br />
                  Real shops.
                </h2>
              </div>
              <p className="sub-note">&quot;No jargon. Just results.&quot;</p>
            </div>
            <div className="postcard-row">
              <div className="postcard">
                <div className="postcard-stripe ps-teal"></div>
                <div className="postcard-body">
                  <div className="stamp-row">
                    <div className="pc-stamp">
                      <StampMark fill="#C4A04C" />
                      CLARIVA
                    </div>
                  </div>
                  <p className="pc-q">
                    &quot;I thought AI just wasn&apos;t for someone like me.
                    They made it feel like a chat over coffee. Now my
                    flowers turn up on Google — and I barely lifted a
                    finger.&quot;
                  </p>
                </div>
                <div className="postcard-foot">
                  <div className="photo-slot" aria-hidden="true">
                    Photo
                  </div>
                  <div className="sig">
                    <b>Maria</b>
                    <span>Bloom &amp; Stem Florist</span>
                  </div>
                </div>
              </div>
              <div className="postcard">
                <div className="postcard-stripe ps-gold"></div>
                <div className="postcard-body">
                  <div className="stamp-row">
                    <div className="pc-stamp">
                      <StampMark fill="#669A93" />
                      CLARIVA
                    </div>
                  </div>
                  <p className="pc-q">
                    &quot;I run a bakery, not a tech company. They handled
                    everything and wrote posts that actually sound like me.
                    My weekends are busy again.&quot;
                  </p>
                </div>
                <div className="postcard-foot">
                  <div className="photo-slot" aria-hidden="true">
                    Photo
                  </div>
                  <div className="sig">
                    <b>Tom</b>
                    <span>Crust &amp; Crumb Bakery</span>
                  </div>
                </div>
              </div>
              <div className="postcard">
                <div className="postcard-stripe ps-deep"></div>
                <div className="postcard-body">
                  <div className="stamp-row">
                    <div className="pc-stamp">
                      <StampMark fill="#153338" />
                      CLARIVA
                    </div>
                  </div>
                  <p className="pc-q">
                    &quot;No jargon. No pressure. Just someone who explained
                    things kindly, then quietly did the hard parts. I
                    finally feel visible.&quot;
                  </p>
                </div>
                <div className="postcard-foot">
                  <div className="photo-slot" aria-hidden="true">
                    Photo
                  </div>
                  <div className="sig">
                    <b>Priya</b>
                    <span>Priya&apos;s Tailoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section className="dark cta pad" id="talk">
          <div className="wrap cta-grid">
            <div className="reveal">
              <span className="eyebrow">Let&apos;s begin</span>
              <h2>Let&apos;s have a conversation.</h2>
              <span className="promise">No tech talk, promise.</span>
              <p className="sub">
                Tell me a little about your business. I&apos;ll reply within
                a day — like a person, not a robot.
              </p>
              <ul className="reassure">
                <li>
                  <span className="ck">✓</span> A friendly chat, not a sales
                  pitch
                </li>
                <li>
                  <span className="ck">✓</span> Plain English, every step of
                  the way
                </li>
                <li>
                  <span className="ck">✓</span> You&apos;re never locked in,
                  ever
                </li>
              </ul>
            </div>
            <div className="fax-form-wrap reveal">
              <FaxForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="foot2">
        <div className="foot2-ghost">GO VISIBLE</div>
        <div className="wrap">
          <div className="foot2-top">
            <div>
              <div className="foot2-brand">
                GO
                <br />
                VISIBLE<span style={{ color: "var(--gold)" }}>.</span>
              </div>
              <div className="foot2-tagline">Your business, finally clear.</div>
            </div>
            <nav className="foot2-nav">
              <a href="#how">How it works</a>
              <a href="#services">What we do</a>
              <a href="#stories">Stories</a>
              <a href="#talk">Let&apos;s talk</a>
              <a
                href="https://instagram.com/clariva.au"
                target="_blank"
                rel="noopener"
                className="insta"
              >
                @clariva.au
              </a>
            </nav>
          </div>
          <div className="foot2-bottom">
            <span>© 2026 Clariva · clariva.au · Sydney</span>
            <div className="foot2-marks">
              <span>Guided</span>
              <span style={{ color: "var(--gold)" }}>✦</span>
              <span>Elevated</span>
              <span style={{ color: "var(--gold)" }}>✦</span>
              <span>Visible</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
