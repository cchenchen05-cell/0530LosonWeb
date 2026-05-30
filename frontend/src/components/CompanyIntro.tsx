import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Award, Users, Globe, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Award, value: '15+', label: '年行业经验' },
  { icon: Users, value: '500+', label: '企业客户' },
  { icon: Globe, value: '50+', label: '服务国家' },
  { icon: TrendingUp, value: '99.9%', label: '服务可用率' },
]

export default function CompanyIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn(
          'transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        )}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="公司介绍"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                关于我们
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                引领数字化转型
                <br />
                <span className="text-primary">赋能企业未来</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                科技先锋成立于2010年，是一家专注于为企业提供数字化解决方案的高科技公司。
                我们拥有超过500人的专业团队，致力于通过创新技术帮助企业实现业务转型和增长。
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                我们的产品线涵盖企业管理软件、云计算服务、人工智能解决方案和物联网平台，
                已服务超过500家企业客户，遍布全球50多个国家和地区。
              </p>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'flex items-center gap-3 transition-all duration-500',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                      `delay-[${index * 100}ms]`
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
