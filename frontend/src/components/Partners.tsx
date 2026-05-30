import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { getPartners, type Partner } from '@/api'

const mockPartners: Partner[] = [
  { id: 1, name: '华为', logo: 'https://logo.clearbit.com/huawei.com' },
  { id: 2, name: '阿里巴巴', logo: 'https://logo.clearbit.com/alibaba.com' },
  { id: 3, name: '腾讯', logo: 'https://logo.clearbit.com/tencent.com' },
  { id: 4, name: '百度', logo: 'https://logo.clearbit.com/baidu.com' },
  { id: 5, name: '字节跳动', logo: 'https://logo.clearbit.com/bytedance.com' },
  { id: 6, name: '小米', logo: 'https://logo.clearbit.com/mi.com' },
  { id: 7, name: '京东', logo: 'https://logo.clearbit.com/jd.com' },
  { id: 8, name: '网易', logo: 'https://logo.clearbit.com/netease.com' },
  { id: 9, name: '美团', logo: 'https://logo.clearbit.com/meituan.com' },
  { id: 10, name: '滴滴', logo: 'https://logo.clearbit.com/didiglobal.com' },
  { id: 11, name: '拼多多', logo: 'https://logo.clearbit.com/pinduoduo.com' },
  { id: 12, name: '快手', logo: 'https://logo.clearbit.com/kuaishou.com' },
]

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners)

  useEffect(() => {
    getPartners()
      .then((data) => data.length > 0 && setPartners(data))
      .catch(() => {})
  }, [])

  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            合作伙伴
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            携手<span className="text-primary">行业领先</span>企业
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            与众多知名企业建立深度合作关系，共同推动产业数字化转型
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 w-40 h-24 mx-6 flex items-center justify-center"
              >
                <div className={cn(
                  'w-full h-full bg-gray-50 rounded-xl flex items-center justify-center p-4 transition-all duration-300 hover:shadow-lg cursor-pointer',
                  'grayscale hover:grayscale-0'
                )}>
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                      const parent = (e.target as HTMLImageElement).parentElement
                      if (parent) {
                        const span = document.createElement('span')
                        span.className = 'text-lg font-bold text-gray-400'
                        span.textContent = partner.name
                        parent.appendChild(span)
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
