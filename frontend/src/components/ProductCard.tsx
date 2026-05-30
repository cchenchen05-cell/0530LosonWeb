import { useState } from 'react'
import { type Product } from '@/api'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            'w-full h-52 object-cover transition-transform duration-700',
            isHovered && 'scale-110'
          )}
        />
        <div
          className={cn(
            'absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex items-center gap-3 text-white">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">查看详情</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  )
}
