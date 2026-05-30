import BannerCarousel from '@/components/BannerCarousel'
import CompanyIntro from '@/components/CompanyIntro'
import ProductCenter from '@/components/ProductCenter'
import Partners from '@/components/Partners'
import ContactUs from '@/components/ContactUs'

export default function Home() {
  return (
    <>
      <BannerCarousel />
      <CompanyIntro />
      <ProductCenter />
      <Partners />
      <ContactUs />
    </>
  )
}
