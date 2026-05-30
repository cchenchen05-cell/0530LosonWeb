import { useState, useEffect, useCallback } from 'react'
import { partnersApi, type Partner } from '@/api'
import { DataTable } from '@/components/DataTable'
import { FormDialog } from '@/components/FormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { useToast } from '@/components/ui/toast-provider'

export function PartnersPage() {
  const [data, setData] = useState<Partner[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Partner | null>(null)
  const [deletingItem, setDeletingItem] = useState<Partner | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', logo: '', website: '', sortOrder: '0', status: 'active' })
  const { success, error: showError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await partnersApi.list({ page, limit: 10 })
      setData(res.data.data)
      setTotal(res.data.total)
    } catch {
      showError({ title: '错误', description: '获取合作伙伴列表失败' })
    } finally {
      setLoading(false)
    }
  }, [page, showError])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = () => {
    setEditingItem(null)
    setForm({ name: '', description: '', logo: '', website: '', sortOrder: '0', status: 'active' })
    setDialogOpen(true)
  }

  const handleEdit = (item: Partner) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      description: item.description,
      logo: item.logo || '',
      website: item.website || '',
      sortOrder: String(item.sortOrder),
      status: item.status,
    })
    setDialogOpen(true)
  }

  const handleDelete = (item: Partner) => {
    setDeletingItem(item)
    setConfirmOpen(true)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        logo: form.logo || undefined,
        website: form.website || undefined,
        sortOrder: parseInt(form.sortOrder) || 0,
        status: form.status,
      }
      if (editingItem) {
        await partnersApi.update(editingItem.id, payload)
        success({ title: '成功', description: '合作伙伴已更新' })
      } else {
        await partnersApi.create(payload)
        success({ title: '成功', description: '合作伙伴已创建' })
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
      await partnersApi.delete(deletingItem.id)
      success({ title: '成功', description: '已删除' })
      setConfirmOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: '删除失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleSortChange = async (item: Partner, direction: 'up' | 'down') => {
    const newSort = direction === 'up' ? item.sortOrder - 1 : item.sortOrder + 1
    try {
      await partnersApi.updateSort(item.id, newSort)
      fetchData()
    } catch {
      showError({ title: '错误', description: '更新排序失败' })
    }
  }

  const columns = [
    { key: 'logo', header: 'Logo', render: (item: Partner) => (
      <Avatar className="h-8 w-8">
        <AvatarImage src={item.logo} />
        <AvatarFallback>{item.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    )},
    { key: 'name', header: '名称', sortable: true },
    { key: 'description', header: '描述', render: (item: Partner) => (
      <span className="max-w-xs truncate block">{item.description}</span>
    )},
    { key: 'website', header: '网站', render: (item: Partner) => (
      item.website ? <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.website}</a> : '-'
    )},
    { key: 'sortOrder', header: '排序', render: (item: Partner) => (
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
    { key: 'status', header: '状态', render: (item: Partner) => (
      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
        {item.status === 'active' ? '启用' : '禁用'}
      </Badge>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">合作伙伴管理</h1>
          <p className="text-muted-foreground mt-1">管理合作伙伴信息</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          添加合作伙伴
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
        title={editingItem ? '编辑合作伙伴' : '添加合作伙伴'}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名称</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="请输入名称" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="请输入描述" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="https://example.com/logo.png" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">网站</Label>
              <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">排序</Label>
              <Input id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} placeholder="0" />
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
        </div>
      </FormDialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确认删除"
        description={`确定要删除合作伙伴"${deletingItem?.name}"吗？`}
        onConfirm={handleConfirmDelete}
        loading={submitting}
      />
    </div>
  )
}
