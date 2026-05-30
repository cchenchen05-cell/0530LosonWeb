import { useEffect, useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getContactInfo, type ContactInfo } from '@/api'

const defaultContact: ContactInfo = {
  phone: '400-888-9999',
  email: 'contact@techpioneer.com',
  address: '北京市朝阳区科技园区创新大厦18层',
  workingHours: '周一至周五 9:00 - 18:00',
}

export default function ContactUs() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact)

  useEffect(() => {
    getContactInfo()
      .then((data) => setContact(data))
      .catch(() => {})
  }, [])

  const contactItems = [
    { icon: Phone, label: '电话', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: Mail, label: '邮箱', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: '地址', value: contact.address },
    { icon: Clock, label: '工作时间', value: contact.workingHours },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            联系我们
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            期待与<span className="text-primary">您</span>合作
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            无论您有任何问题或合作意向，都欢迎随时联系我们
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
              {item.href ? (
                <a href={item.href} className="text-gray-600 hover:text-primary transition-colors text-sm">
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-600 text-sm">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-80 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1!2d116.3974!3d39.9093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU0JzMzLjUiTiAxMTbCsDIzJzUwLjYiRQ!5e0!3m2!1sen!2scn!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="公司位置"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
