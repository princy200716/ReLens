
import "./Contact.css";

export default function Contact() {
  const contactInfo = [
    {
      title: "Email Us",
      detail: "your-email@example.com",
      href: "mailto:your-email@example.com",
      icon: "✉",
    },
    {
      title: "Call Us",
      detail: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXXX",
      icon: "☎",
    },
    {
      title: "LinkedIn",
      detail: "Connect professionally",
      href: "https://www.linkedin.com/in/YOUR-USERNAME",
      icon: "in",
    },
    {
      title: "Instagram",
      detail: "@YOUR-USERNAME",
      href: "https://www.instagram.com/YOUR-USERNAME/",
      icon: "◎",
    },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <p className="contact-eyebrow">LET'S CONNECT</p>

        <h2>
          Get in <span>Touch.</span>
        </h2>

        <p className="contact-description">
          Have a question about ReLens? We'd love to hear from you.
          Reach out and let's explore a new way to see the world.
        </p>

        <div className="contact-grid">
          {contactInfo.map((item) => (
            <a
              className="contact-card"
              href={item.href}
              key={item.title}
              target={
                item.title === "LinkedIn" ||
                item.title === "Instagram"
                  ? "_blank"
                  : undefined
              }
              rel={
                item.title === "LinkedIn" ||
                item.title === "Instagram"
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              <span className="contact-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span className="contact-arrow">↗</span>
            </a>
          ))}
        </div>

        <p className="contact-footer">
          ReLens — One Frame. Endless Possibilities.
        </p>
      </div>
    </section>
  );
}
