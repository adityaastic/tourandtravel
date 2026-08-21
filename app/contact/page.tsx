import { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import ContactForm from '@/components/contact/ContactForm';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import JsonLd from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Karuna Travels | Travel Agency in Daryaganj, Delhi',
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karunatravels.com" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://karunatravels.com/contact" }
    ]
  };

  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero title="📞 Contact Us" subtitle="We're here to help plan your perfect trip" />
      <section className="py-16 bg-bg-light">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <a href="tel:+919911209636" className="bg-white shadow-sm hover:shadow px-6 py-3 rounded-full flex items-center gap-2 font-medium text-primary-navy transition-all"><Phone className="w-5 h-5 text-accent-orange"/> Call +91-9911209636</a>
            <a href="https://wa.me/919911209636" target="_blank" rel="noreferrer" className="bg-success-green/10 text-success-green shadow-sm hover:shadow px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all"><MessageCircle className="w-5 h-5"/> WhatsApp</a>
            <a href="mailto:karunadikoshiya000@gmail.com" className="bg-white shadow-sm hover:shadow px-6 py-3 rounded-full flex items-center gap-2 font-medium text-primary-navy transition-all"><Mail className="w-5 h-5 text-accent-orange"/> Email</a>
            <a href="#map" className="bg-white shadow-sm hover:shadow px-6 py-3 rounded-full flex items-center gap-2 font-medium text-primary-navy transition-all"><MapPin className="w-5 h-5 text-accent-orange"/> Get Directions</a>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-[55%]">
              <ScrollFadeUp>
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-poppins font-bold text-primary-navy mb-6">Send us a Message</h3>
                  <ContactForm />
                </div>
              </ScrollFadeUp>
            </div>
            
            <div className="lg:w-[45%] space-y-4">
              <ScrollFadeUp delay={0.1}>
                <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-gray-100 flex gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-xl h-fit text-accent-orange"><Phone className="w-6 h-6"/></div>
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-1">Phone</h4>
                    <p className="text-gray-600"><a href="tel:+919911209636" className="hover:text-accent-orange">+91-9911209636</a></p>
                    <p className="text-gray-600"><a href="tel:+918860978897" className="hover:text-accent-orange">+91-8860978897</a></p>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={0.2}>
                <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-gray-100 flex gap-4">
                  <div className="bg-success-green/10 p-3 rounded-xl h-fit text-success-green"><MessageCircle className="w-6 h-6"/></div>
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-1">WhatsApp</h4>
                    <p className="text-gray-600 mb-2">+91-9911209636</p>
                    <a href="https://wa.me/919911209636" target="_blank" rel="noreferrer" className="text-sm bg-success-green text-white px-4 py-1.5 rounded-lg inline-block hover:bg-emerald-600 transition-colors">Chat Now</a>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={0.3}>
                <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-gray-100 flex gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-xl h-fit text-accent-orange"><Mail className="w-6 h-6"/></div>
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-1">Email</h4>
                    <p className="text-gray-600"><a href="mailto:karunadikoshiya000@gmail.com" className="hover:text-accent-orange">karunadikoshiya000@gmail.com</a></p>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={0.4}>
                <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-gray-100 flex gap-4">
                  <div className="bg-accent-orange/10 p-3 rounded-xl h-fit text-accent-orange"><MapPin className="w-6 h-6"/></div>
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-1">Address</h4>
                    <p className="text-gray-600 mb-2">Krishna Dry Clean, Dayanand Road, Daryaganj, Delhi-110002</p>
                    <a href="#map" className="text-accent-orange text-sm font-medium hover:underline">Get Directions</a>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={0.5}>
                <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-semibold text-primary-navy mb-2">Office Hours</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Mon-Sat: 9:00 AM - 8:00 PM</li>
                    <li>Sun: 10:00 AM - 6:00 PM</li>
                    <li className="text-accent-orange font-medium pt-1 mt-1 border-t border-gray-200">Holidays: WhatsApp Available 24/7</li>
                  </ul>
                </div>
              </ScrollFadeUp>
            </div>
          </div>
          
          <div id="map" className="mt-16 rounded-3xl overflow-hidden h-96 shadow-sm border border-gray-100">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.821946051511!2d77.2307849132174!3d28.63859039600984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd107b3967d3%3A0xc331ec4f67c33748!2sDaryaganj%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
