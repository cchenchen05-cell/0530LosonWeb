import { useState, useEffect, useCallback } from 'react'
import { categoriesApi, type Category } from '@/api'
import { DataTable } from '@/components/DataTable'
import { FormDialog } from '@/components/FormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/toast-provider'

export function CategoriesPage() {
  const [data, setData] = useState<Category[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Category | null>(null)
  const [deletingItem, setDeletingItem] = useState<Category | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', slug: '' })
  const { success, error: showError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await categoriesApi.list({ page, limit: 10 })
      setData(res.data.data)
      setTotal(res.data.total)
    } catch {
      showError({ title: '错误', description: '获取分类列表失败' })
    } finally {
      setLoading(false)
    }
  }, [page, showError])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = () => {
    setEditingItem(null)
    setForm({ name: '', description: '', slug: '' })
    setDialogOpen(true)
  }

  const handleEdit = (item: Category) => {
    setEditingItem(item)
    setForm({ name: item.name, description: item.description, slug: item.slug })
    setDialogOpen(true)
  }

  const handleDelete = (item: Category) => {
    setDeletingItem(item)
    setConfirmOpen(true)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload = { name: form.name, description: form.description, slug: form.slug }
      if (editingItem) {
        await categoriesApi.update(editingItem.id, payload)
        success({ title: '成功', description: '分类已更新' })
      } else {
        await categoriesApi.create(payload)
        success({ title: '成功', description: '分类已创建' })
      }
      setDialogOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: editingItem ? '更新分类失败' : '创建分类失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingItem) return
    setSubmitting(true)
    try {
      await categoriesApi.delete(deletingItem.id)
      success({ title: '成功', description: '分类已删除' })
      setConfirmOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: '删除分类失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const columns = [
    { key: 'name', header: '分类名称', sortable: true },
    { key: 'description', header: '描述', render: (item: Category) => (
      <span className="max-w-xs truncate block">{item.description}</span>
    )},
    { key: 'slug', header: '别名', render: (item: Category) => (
      <code className="bg-muted px-1 py-0.5 rounded text-xs">{item.slug}</code>
    )},
    { key: 'productCount', header: '产品数量', render: (item: Category) => item.productCount ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">分类管理</h1>
          <p className="text-muted-foreground mt-1">管理产品分类</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          添加分类
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
        title={editingItem ? '编辑分类' : '添加分类'}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">分类名称</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="请输入分类名称"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">别名</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              placeholder="category-slug"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="请输入分类描述"
              rows={3}
            />
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确认删除"
        description={`确定要删除分类"${deletingItem?.name}"吗？此操作不可撤销。`}
        onConfirm={handleConfirmDelete}
        loading={submitting}
      />
    </div>
  )
}
