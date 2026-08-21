import { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import CarBookingForm from '@/components/cars/CarBookingForm';
import ScrollFadeUp from '@/components/animations/ScrollFadeUp';
import JsonLd from '@/components/shared/JsonLd';
import CarCatalog from '@/components/cars/CarCatalog';

export const metadata: Metadata = {
  title: 'Car Rental Delhi | Book Cab Online — Karuna Travels',
  description: 'Book premium cars in Delhi. We offer Hatchbacks, Sedans, MUVs, and Premium SUVs for local and outstation travel. Affordable rates and professional drivers.',
};

export default function CarBookingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is included in the per km rate?", "acceptedAnswer": { "@type": "Answer", "text": "Our per km rate includes fuel and driver charges. Tolls, parking, and state taxes are extra." } },
      { "@type": "Question", "name": "Do you provide outstation cabs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide outstation car rentals from Delhi to anywhere in India." } }
    ]
  };

  return (
    <main>
      <JsonLd data={faqSchema} />
      <PageHero title="🚗 Premium Car Rental" subtitle="Delhi & Outstation | AC Vehicles | Professional Drivers" />
      <section className="py-16 bg-bg-light">
        <div className="container-custom">
          <SectionHeading title="Choose Your Ride" subtitle="Comfortable, sanitized, and well-maintained fleet" centered />
          <CarCatalog />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <ScrollFadeUp>
            <CarBookingForm />
          </ScrollFadeUp>
        </div>
      </section>
    </main>
  );
}
