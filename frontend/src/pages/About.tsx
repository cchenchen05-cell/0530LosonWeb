import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const milestones = [
  { year: '2010', title: '公司成立', description: '在北京中关村创立，专注于企业软件开发' },
  { year: '2013', title: '首个产品上线', description: '发布智能ERP系统，获得首批100家企业客户' },
  { year: '2015', title: '拓展云服务', description: '推出云计算服务平台，进入SaaS市场' },
  { year: '2017', title: '国际化布局', description: '在新加坡设立海外总部，业务拓展至东南亚' },
  { year: '2019', title: 'AI战略升级', description: '成立人工智能研究院，发布AI智能客服产品' },
  { year: '2021', title: '科创板上市', description: '成功在科创板挂牌上市，市值突破百亿' },
  { year: '2023', title: '全球化加速', description: '业务覆盖50+国家，服务500+企业客户' },
  { year: '2024', title: '新十年战略', description: '发布"数智化2.0"战略，全面拥抱大模型时代' },
]

const teamMembers = [
  { name: '张明远', role: '创始人 & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face' },
  { name: '李思涵', role: 'CTO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face' },
  { name: '王建国', role: 'COO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face' },
  { name: '陈雅琪', role: 'CFO', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face' },
]

export default function About() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 }
    )

    const elements = ref.current?.querySelectorAll('[data-index]')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="text-center relative z-10 px-4">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
            关于我们
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            科技先锋
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            用科技的力量，驱动企业数字化转型
          </p>
        </div>
      </div>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                公司简介
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                科技先锋成立于2010年，总部位于北京中关村科技园区，是一家专注于为企业提供数字化解决方案的国家高新技术企业。
                公司拥有一支超过500人的专业团队，其中研发人员占比超过60%。
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                经过十余年的发展，公司已形成企业管理软件、云计算服务、人工智能解决方案和物联网平台四大核心产品线，
                服务覆盖金融、制造、零售、医疗等多个行业领域。
              </p>
              <p className="text-gray-600 leading-relaxed">
                公司秉承"技术驱动创新，服务创造价值"的理念，致力于成为全球领先的数字化解决方案提供商。
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"
                alt="公司办公环境"
                className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              发展历程
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              十四年<span className="text-primary">砥砺前行</span>
            </h2>
          </div>

          <div ref={ref} className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden lg:block" />

            <div className="space-y-8 lg:space-y-12">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  data-index={index}
                  className={cn(
                    'relative flex flex-col lg:flex-row items-center gap-4 lg:gap-8 transition-all duration-700',
                    visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  )}
                >
                  <div className={cn(
                    'w-full lg:w-1/2',
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  )}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow inline-block">
                      <span className="text-primary font-bold text-lg">{item.year}</span>
                      <h3 className="text-xl font-semibold text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:flex w-4 h-4 bg-primary rounded-full relative z-10 flex-shrink-0 ring-4 ring-white" />

                  <div className="w-full lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              核心团队
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              精英<span className="text-primary">领导团队</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              汇聚行业顶尖人才，引领公司持续创新与发展
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
