import { useState, useEffect, useCallback } from 'react'
import { bannersApi, type Banner } from '@/api'
import { DataTable } from '@/components/DataTable'
import { FormDialog } from '@/components/FormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Image } from 'lucide-react'
import { useToast } from '@/components/ui/toast-provider'

export function BannersPage() {
  const [data, setData] = useState<Banner[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Banner | null>(null)
  const [deletingItem, setDeletingItem] = useState<Banner | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ title: '', image: '', link: '', sortOrder: '0', status: 'active' })
  const { success, error: showError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await bannersApi.list({ page, limit: 10 })
      setData(res.data.data)
      setTotal(res.data.total)
    } catch {
      showError({ title: '错误', description: '获取横幅列表失败' })
    } finally {
      setLoading(false)
    }
  }, [page, showError])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = () => {
    setEditingItem(null)
    setForm({ title: '', image: '', link: '', sortOrder: '0', status: 'active' })
    setDialogOpen(true)
  }

  const handleEdit = (item: Banner) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      image: item.image,
      link: item.link || '',
      sortOrder: String(item.sortOrder),
      status: item.status,
    })
    setDialogOpen(true)
  }

  const handleDelete = (item: Banner) => {
    setDeletingItem(item)
    setConfirmOpen(true)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload = {
        title: form.title,
        image: form.image,
        link: form.link || undefined,
        sortOrder: parseInt(form.sortOrder) || 0,
        status: form.status,
      }
      if (editingItem) {
        await bannersApi.update(editingItem.id, payload)
        success({ title: '成功', description: '横幅已更新' })
      } else {
        await bannersApi.create(payload)
        success({ title: '成功', description: '横幅已创建' })
      }
      setDialogOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: editingItem ? '更新失败' : '创建失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingItem) return
    setSubmitting(true)
    try {
      await bannersApi.delete(deletingItem.id)
      success({ title: '成功', description: '横幅已删除' })
      setConfirmOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: '删除失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleSortChange = async (item: Banner, direction: 'up' | 'down') => {
    const newSort = direction === 'up' ? item.sortOrder - 1 : item.sortOrder + 1
    try {
      await bannersApi.updateSort(item.id, newSort)
      fetchData()
    } catch {
      showError({ title: '错误', description: '更新排序失败' })
    }
  }

  const columns = [
    { key: 'image', header: '预览', render: (item: Banner) => (
      <div className="h-12 w-20 rounded overflow-hidden bg-muted flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          <Image className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    )},
    { key: 'title', header: '标题', sortable: true },
    { key: 'link', header: '链接', render: (item: Banner) => (
      item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate block max-w-xs">{item.link}</a> : '-'
    )},
    { key: 'sortOrder', header: '排序', render: (item: Banner) => (
      <div className="flex items-center gap-1">
        <span className="w-6 text-center">{item.sortOrder}</span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleSortChange(item, 'up')}>
          <ArrowUp className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleSortChange(item, 'down')}>
          <ArrowDown className="h-3 w-3" />
        </Button>
      </div>
    )},
    { key: 'status', header: '状态', render: (item: Banner) => (
      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
        {item.status === 'active' ? '启用' : '禁用'}
      </Badge>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">横幅管理</h1>
          <p className="text-muted-foreground mt-1">管理首页横幅展示</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          添加横幅
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
        title={editingItem ? '编辑横幅' : '添加横幅'}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="请输入横幅标题" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">图片URL</Label>
            <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/banner.jpg" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="link">链接</Label>
              <Input id="link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">排序</Label>
              <Input id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} placeholder="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">状态</Label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="active">启用</option>
              <option value="inactive">禁用</option>
            </select>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确认删除"
        description={`确定要删除横幅"${deletingItem?.title}"吗？`}
        onConfirm={handleConfirmDelete}
        loading={submitting}
      />
    </div>
  )
}
