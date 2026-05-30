import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { productsApi, categoriesApi, partnersApi, bannersApi } from '@/api'
import { Package, Layers, Users, Image } from 'lucide-react'

const stats = [
  { key: 'products', label: '产品总数', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { key: 'categories', label: '分类总数', icon: Layers, color: 'text-green-500', bg: 'bg-green-500/10' },
  { key: 'partners', label: '合作伙伴', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { key: 'banners', label: '横幅数量', icon: Image, color: 'text-orange-500', bg: 'bg-orange-500/10' },
]

export function DashboardPage() {
  const [counts, setCounts] = useState({ products: 0, categories: 0, partners: 0, banners: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, categoriesRes, partnersRes, bannersRes] = await Promise.all([
          productsApi.list({ page: 1, limit: 1 }),
          categoriesApi.list({ page: 1, limit: 1 }),
          partnersApi.list({ page: 1, limit: 1 }),
          bannersApi.list({ page: 1, limit: 1 }),
        ])
        setCounts({
          products: productsRes.data.total,
          categories: categoriesRes.data.total,
          partners: partnersRes.data.total,
          banners: bannersRes.data.total,
        })
      } catch {
        // use default 0 values
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
        <p className="text-muted-foreground mt-1">欢迎使用 CMS 管理系统</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : counts[stat.key as keyof typeof counts]}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">使用左侧导航栏访问各个管理模块</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">系统运行正常</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
