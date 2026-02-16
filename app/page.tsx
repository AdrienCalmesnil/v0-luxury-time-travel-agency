import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { AgencyStats } from "@/components/agency-stats"
import { DestinationGallery } from "@/components/destination-gallery"
import { FeaturedPreviews } from "@/components/featured-previews"
import { Testimonials } from "@/components/testimonials"
import { BookingCTA } from "@/components/booking-cta"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function Page() {
  return (
    <main>
      <Navigation />
      <Hero />
      <AgencyStats />
      <DestinationGallery />
      <FeaturedPreviews />
      <Testimonials />
      <BookingCTA />
      <Footer />
      <ChatbotWidget />
    </main>
  )
}
