import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getBanners, type Banner } from '@/api'

const AUTOPLAY_INTERVAL = 3000

const mockBanners: Banner[] = [
  { id: 1, title: '引领数字化转型', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop', link: '#' },
  { id: 2, title: '智能科技 赋能未来', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=600&fit=crop', link: '#' },
  { id: 3, title: '云计算解决方案', image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1920&h=600&fit=crop', link: '#' },
]

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners)
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    getBanners()
      .then((data) => data.length > 0 && setBanners(data))
      .catch(() => {})
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent((index + banners.length) % banners.length)
  }, [banners.length])

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => goTo(current + 1), AUTOPLAY_INTERVAL)
      return () => clearInterval(timer)
    }
  }, [current, isHovered, goTo])

  return (
    <section
      className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl animate-fade-in">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                  {banner.title}
                </h1>
                <p className="text-lg text-white/80 mb-6 lg:mb-8">
                  为企业提供全方位的数字化解决方案，助力业务腾飞
                </p>
                <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => goTo(current - 1)}
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all',
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        )}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className={cn(
          'absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all',
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        )}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === current ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80'
            )}
          />
        ))}
      </div>
    </section>
  )
}
