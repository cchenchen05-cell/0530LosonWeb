import { useState, useEffect, useCallback } from 'react'
import { productsApi, categoriesApi, type Product } from '@/api'
import { DataTable } from '@/components/DataTable'
import { FormDialog } from '@/components/FormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/toast-provider'

export function ProductsPage() {
  const [data, setData] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Product | null>(null)
  const [deletingItem, setDeletingItem] = useState<Product | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  const [form, setForm] = useState({ name: '', description: '', price: '', categoryId: '', status: 'active', image: '' })
  const { success, error: showError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productsApi.list({ page, limit: 10 })
      setData(res.data.data)
      setTotal(res.data.total)
    } catch {
      showError({ title: '错误', description: '获取产品列表失败' })
    } finally {
      setLoading(false)
    }
  }, [page, showError])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await categoriesApi.list({ page: 1, limit: 100 })
      setCategories(res.data.data)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])
  useEffect(() => { fetchCategories() }, [fetchCategories])

  const handleCreate = () => {
    setEditingItem(null)
    setForm({ name: '', description: '', price: '', categoryId: '', status: 'active', image: '' })
    setDialogOpen(true)
  }

  const handleEdit = (item: Product) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      categoryId: item.categoryId,
      status: item.status,
      image: item.image || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = (item: Product) => {
    setDeletingItem(item)
    setConfirmOpen(true)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price) || 0,
        categoryId: form.categoryId,
        status: form.status,
        image: form.image || undefined,
      }
      if (editingItem) {
        await productsApi.update(editingItem.id, payload)
        success({ title: '成功', description: '产品已更新' })
      } else {
        await productsApi.create(payload)
        success({ title: '成功', description: '产品已创建' })
      }
      setDialogOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: editingItem ? '更新产品失败' : '创建产品失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingItem) return
    setSubmitting(true)
    try {
      await productsApi.delete(deletingItem.id)
      success({ title: '成功', description: '产品已删除' })
      setConfirmOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: '删除产品失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const columns = [
    { key: 'name', header: '产品名称', sortable: true },
    { key: 'description', header: '描述', render: (item: Product) => (
      <span className="max-w-xs truncate block">{item.description}</span>
    )},
    { key: 'price', header: '价格', render: (item: Product) => `¥${item.price.toFixed(2)}` },
    { key: 'categoryName', header: '分类', render: (item: Product) => item.categoryName || '-' },
    { key: 'status', header: '状态', render: (item: Product) => (
      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
        {item.status === 'active' ? '上架' : '下架'}
      </Badge>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">产品管理</h1>
          <p className="text-muted-foreground mt-1">管理所有产品信息</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          添加产品
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        actions={(item) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )}
        pagination={{ page, limit: 10, total, onPageChange: setPage }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingItem ? '编辑产品' : '添加产品'}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">产品名称</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="请输入产品名称"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="请输入产品描述"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">价格</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">分类</Label>
              <Select value={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">图片URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">状态</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">上架</SelectItem>
                <SelectItem value="inactive">下架</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确认删除"
        description={`确定要删除产品"${deletingItem?.name}"吗？此操作不可撤销。`}
        onConfirm={handleConfirmDelete}
        loading={submitting}
      />
    </div>
  )
}
