import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: (item: T) => React.ReactNode
  loading?: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    onPageChange: (page: number) => void
    onLimitChange?: (limit: number) => void
  }
  sorting?: {
    field: string
    order: 'asc' | 'desc'
    onSort: (field: string) => void
  }
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  actions,
  loading,
  pagination,
  sorting,
}: DataTableProps<T>) {
  const [localSort, setLocalSort] = useState<{ field: string; order: 'asc' | 'desc' } | null>(null)

  const handleSort = (key: string) => {
    if (sorting) {
      sorting.onSort(key)
    } else {
      setLocalSort((prev) => {
        if (prev?.field === key) {
          return prev.order === 'asc' ? { field: key, order: 'desc' } : null
        }
        return { field: key, order: 'asc' }
      })
    }
  }

  const getSortedData = () => {
    const sort = sorting ? { field: sorting.field, order: sorting.order } : localSort
    if (!sort) return data
    return [...data].sort((a, b) => {
      const aVal = a[sort.field as keyof T]
      const bVal = b[sort.field as keyof T]
      if (aVal < bVal) return sort.order === 'asc' ? -1 : 1
      if (aVal > bVal) return sort.order === 'asc' ? 1 : -1
      return 0
    })
  }

  const sortedData = getSortedData()
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={col.sortable ? 'cursor-pointer select-none' : ''}>
                  {col.sortable ? (
                    <button onClick={() => handleSort(col.key)} className="flex items-center gap-1">
                      {col.header}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
              {actions && <TableHead className="w-[100px]">操作</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                    </TableCell>
                  ))}
                  {actions && <TableCell>{actions(item)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            共 {pagination.total} 条记录，第 {pagination.page} / {totalPages} 页
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(totalPages)}
              disabled={pagination.page === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
