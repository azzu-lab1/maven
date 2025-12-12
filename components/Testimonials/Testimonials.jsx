import React from 'react';
import styles from './Testimonials.module.css';


// --- Sample Testimonial Data (Replace with yours) ---
const testimonialsData = [
  { name: "Arjun Nayak", handle: "@arjun_creates", text: "Working with MIARTZ was smooth. We got our full catalog shot in just 3 days.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Nisha Rao", handle: "@nisharao_designs", text: "The pricing is transparent and fair. We've already recommended MIARTZ to others.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Meera Shenoy", handle: "@meerastudio", text: "High-quality images, fast turnaround, and zero hassle. Will definitely come back.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Riya Mehta", handle: "@riya_clicks", text: "MIARTZ helped us launch our product in record time. The photos were sharp, clean, and ready for use.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Rahul Jain", handle: "@rahulonboard", text: "Their team understood our needs and delivered visuals that felt premium.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Vivek Joshi", handle: "@vivekj_brand", text: "Very professional team. The output was on time, and they even gave multiple backgrounds.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Shruti Malhotra", handle: "@shruti_branding", text: "The AI photos were super fast and looked great on our website. Exactly what we needed.", rating: 4, image: "/images/placeholder-avatar.png" },
  { name: "Karan Bhatia", handle: "@karanb_creative", text: "Loved the clarity of product shots. They understood our aesthetic perfectly.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Ananya Ghosh", handle: "@ananya_ghosh", text: "Impressed by how quickly we got the images. It saved us so much time.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Dev Patel", handle: "@devpatel_studio", text: "The post-production quality was exceptional. Every image looked polished and brand-ready.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Sneha Kapoor", handle: "@sneha.visuals", text: "They made our small brand look premium. Loved the attention to lighting and detail.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Tanya Sharma", handle: "@tanya_creates", text: "Extremely smooth communication and top-notch results. Highly recommend.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Harsh Verma", handle: "@harshv_studio", text: "From shoot to delivery, everything was efficient and professional.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Priya Nair", handle: "@priyanair_art", text: "We used their AI product photos for our launch and it looked incredible online.", rating: 4, image: "/images/placeholder-avatar.png" },
  { name: "Abhay Singh", handle: "@abhay_creates", text: "Their visual quality elevated our e-commerce listings. Super reliable.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Simran Kaur", handle: "@simran_shoots", text: "Fast, creative, and easy to work with. The images exceeded expectations.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Rohan Das", handle: "@rohand_visuals", text: "They handled our jewelry shoot with precision. Lighting was perfect.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Isha Chatterjee", handle: "@ishac_design", text: "Really happy with how the team captured our products’ texture and tone.", rating: 5, image: "/images/placeholder-avatar.png" },
  { name: "Manav Kapoor", handle: "@manav_creative", text: "Professional results at great value. Turnaround time was impressive.", rating: 4, image: "/images/placeholder-avatar.png" },
  { name: "Neha Pillai", handle: "@neha_branding", text: "The AI photography workflow is a game changer. We’ll be back for our next collection.", rating: 5, image: "/images/placeholder-avatar.png" },
];


// Split data into three columns
const numColumns = 3;
const columns = Array.from({ length: numColumns }, (_, i) =>
  testimonialsData.filter((_, index) => index % numColumns === i)
);

// Helper to generate star ratings
const renderStars = (rating) => {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? '★' : '☆';
  }
  return stars;
};
// --- End Data ---

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.title}>What our users say</h2>
      <p className={styles.subtitle}>Trusted over 1M+ users </p>

      {/* Grid container for the marquee columns */}
      <div className={styles.marqueeGridContainer}>
        {columns.map((columnData, colIndex) => {
          // Duplicate each column's data for seamless looping
          const duplicatedColumnData = [...columnData, ...columnData];
          return (
            <div key={colIndex} className={styles.marqueeContainer}>
              <div
                className={styles.marqueeContent}
                // Apply different animation delays or directions if desired
                style={{ animationDuration: `${30 + colIndex * 10}s` }}// Example: slightly different speeds
              >
                {duplicatedColumnData.map((testimonial, index) => (
                  <div key={`${colIndex}-${index}`} className={styles.testimonialCard}>
                    <p className={styles.testimonialText}>"{testimonial.text}"</p>
                    <div className={styles.rating}>{renderStars(testimonial.rating)}</div>
                    <div className={styles.userInfo}>
                      <img src={testimonial.image} alt={testimonial.name} className={styles.userImage} />
                      <div className={styles.userDetails}>
                        <p className={styles.userName}>{testimonial.name}</p>
                        <p className={styles.userHandle}>{testimonial.handle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;