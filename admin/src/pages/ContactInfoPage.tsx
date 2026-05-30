import { useState, useEffect, useCallback } from 'react'
import { contactInfoApi, type ContactInfo } from '@/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Phone, Mail, MapPin, FileText } from 'lucide-react'
import { useToast } from '@/components/ui/toast-provider'

export function ContactInfoPage() {
  const [_data, setData] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ phone: '', email: '', address: '', description: '' })
  const { success, error: showError } = useToast()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await contactInfoApi.get()
      setData(res.data)
      setForm({
        phone: res.data.phone || '',
        email: res.data.email || '',
        address: res.data.address || '',
        description: res.data.description || '',
      })
    } catch {
      showError({ title: '错误', description: '获取联系信息失败' })
    } finally {
      setLoading(false)
    }
  }, [showError])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await contactInfoApi.update(form)
      success({ title: '成功', description: '联系信息已更新' })
      fetchData()
    } catch {
      showError({ title: '错误', description: '更新联系信息失败' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">联系信息</h1>
          <p className="text-muted-foreground mt-1">管理网站联系信息</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>编辑网站的联系电话、邮箱、地址等信息</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  联系电话
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="请输入联系电话"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  电子邮箱
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="请输入邮箱地址"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                联系地址
              </Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="请输入联系地址"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                描述
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="请输入描述信息"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? '保存中...' : '保存'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
