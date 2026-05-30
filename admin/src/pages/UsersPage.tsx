import { useState, useEffect, useCallback } from 'react'
import { usersApi, type User } from '@/api'
import { DataTable } from '@/components/DataTable'
import { FormDialog } from '@/components/FormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/toast-provider'

export function UsersPage() {
  const [data, setData] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<User | null>(null)
  const [deletingItem, setDeletingItem] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ username: '', name: '', password: '', role: 'editor' })
  const { success, error: showError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await usersApi.list({ page, limit: 10 })
      setData(res.data.data)
      setTotal(res.data.total)
    } catch {
      showError({ title: '错误', description: '获取用户列表失败' })
    } finally {
      setLoading(false)
    }
  }, [page, showError])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = () => {
    setEditingItem(null)
    setForm({ username: '', name: '', password: '', role: 'editor' })
    setDialogOpen(true)
  }

  const handleEdit = (item: User) => {
    setEditingItem(item)
    setForm({ username: item.username, name: item.name, password: '', role: item.role })
    setDialogOpen(true)
  }

  const handleDelete = (item: User) => {
    setDeletingItem(item)
    setConfirmOpen(true)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload: Record<string, string> = {
        username: form.username,
        name: form.name,
        role: form.role,
      }
      if (form.password) {
        payload.password = form.password
      }
      if (editingItem) {
        await usersApi.update(editingItem.id, payload)
        success({ title: '成功', description: '用户已更新' })
      } else {
        if (!form.password) {
          showError({ title: '错误', description: '请输入密码' })
          setSubmitting(false)
          return
        }
        await usersApi.create(payload)
        success({ title: '成功', description: '用户已创建' })
      }
      setDialogOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: editingItem ? '更新用户失败' : '创建用户失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingItem) return
    setSubmitting(true)
    try {
      await usersApi.delete(deletingItem.id)
      success({ title: '成功', description: '用户已删除' })
      setConfirmOpen(false)
      fetchData()
    } catch {
      showError({ title: '错误', description: '删除用户失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const columns = [
    { key: 'avatar', header: '用户', render: (item: User) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {item.name?.charAt(0).toUpperCase() || item.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{item.name || item.username}</p>
          <p className="text-xs text-muted-foreground">{item.username}</p>
        </div>
      </div>
    )},
    { key: 'role', header: '角色', render: (item: User) => (
      <Badge variant={item.role === 'admin' ? 'destructive' : 'default'}>
        {item.role === 'admin' ? '管理员' : '编辑'}
      </Badge>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="text-muted-foreground mt-1">管理系统用户及其权限</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          添加用户
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
        title={editingItem ? '编辑用户' : '添加用户'}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input id="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="请输入用户名" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="请输入姓名" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码 {!editingItem && <span className="text-destructive">*</span>}</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={editingItem ? '留空则不修改密码' : '请输入密码'}
              required={!editingItem}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">角色</Label>
            <select
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="admin">管理员</option>
              <option value="editor">编辑</option>
            </select>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确认删除"
        description={`确定要删除用户"${deletingItem?.name || deletingItem?.username}"吗？`}
        onConfirm={handleConfirmDelete}
        loading={submitting}
      />
    </div>
  )
}
