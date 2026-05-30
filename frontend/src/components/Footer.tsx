import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Share2, MessageSquare, Bookmark, Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-white">科技先锋</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              致力于为企业提供领先的数字化解决方案，助力业务创新与增长。
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Bookmark className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Star className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">产品服务</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary transition-colors">企业管理软件</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">云计算服务</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">人工智能方案</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">物联网平台</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">关于我们</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">公司简介</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">发展历程</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">团队介绍</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">加入我们</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">联系方式</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>北京市朝阳区科技园区创新大厦18层</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>400-888-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>contact@techpioneer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2024 科技先锋. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">隐私政策</a>
            <a href="#" className="hover:text-primary transition-colors">服务条款</a>
            <a href="#" className="hover:text-primary transition-colors">帮助中心</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
