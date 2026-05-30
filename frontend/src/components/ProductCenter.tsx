import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getCategories, getProducts, type Product, type Category } from '@/api'
import ProductCard from './ProductCard'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

const defaultCategories: Category[] = [
  { id: 0, name: '全部', slug: 'all' },
  { id: 1, name: '企业管理软件', slug: 'enterprise' },
  { id: 2, name: '云计算服务', slug: 'cloud' },
  { id: 3, name: '人工智能', slug: 'ai' },
  { id: 4, name: '物联网', slug: 'iot' },
]

const mockProducts: Product[] = [
  { id: 1, name: '智能ERP系统', description: '全面的企业资源规划解决方案，整合财务、采购、库存、销售等核心业务流程，提升运营效率。', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', category: 'enterprise' },
  { id: 2, name: 'CRM客户管理', description: '全方位客户关系管理平台，从线索获取到成交转化，帮助企业实现精准营销和高效销售。', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop', category: 'enterprise' },
  { id: 3, name: '弹性云服务器', description: '高性能弹性计算服务，按需分配资源，支持自动扩缩容，满足各种业务场景需求。', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop', category: 'cloud' },
  { id: 4, name: 'AI智能客服', description: '基于大语言模型的智能客服系统，7x24小时在线服务，大幅提升客户满意度和响应效率。', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop', category: 'ai' },
  { id: 5, name: 'IoT设备管理平台', description: '统一的物联网设备接入与管理平台，支持百万级设备连接，实时监控与远程控制。', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', category: 'iot' },
  { id: 6, name: '数据分析平台', description: '强大的数据分析与可视化工具，帮助企业洞察数据价值，驱动精准决策。', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', category: 'ai' },
  { id: 7, name: '容器编排服务', description: '基于Kubernetes的容器编排平台，简化微服务部署与管理，提升应用交付效率。', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop', category: 'cloud' },
  { id: 8, name: '智能仓储系统', description: '利用物联网和AI技术实现仓库智能化管理，优化库存周转，降低仓储成本。', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop', category: 'iot' },
  { id: 9, name: 'HR人力资源系统', description: '一站式人力资源管理平台，覆盖招聘、考勤、薪酬、绩效等全生命周期管理。', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop', category: 'enterprise' },
]

export default function ProductCenter({ showTitle = true }: { showTitle?: boolean }) {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const pageSize = 6

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data.length > 0) {
          setCategories([{ id: 0, name: '全部', slug: 'all' }, ...data])
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    getProducts({ page: 1, pageSize: 50, search: searchQuery || undefined, category: activeCategory === 'all' ? undefined : activeCategory })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts(mockProducts))
  }, [activeCategory, searchQuery])

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const totalPages = Math.ceil(filteredProducts.length / pageSize)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug)
    setCurrentPage(1)
  }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              产品中心
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              全场景<span className="text-primary">数字化</span>解决方案
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              从企业管理到智能硬件，从云端服务到数据分析，我们提供完整的数字化产品矩阵
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === cat.slug
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="lg:ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索产品..."
                className="w-full lg:w-72 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {paginatedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">未找到相关产品</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-10 h-10 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-500 text-lg">&times;</span>
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{selectedProduct.description}</p>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  立即咨询
                </button>
                <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
