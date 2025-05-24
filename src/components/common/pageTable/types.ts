import type { TableColumnType } from 'ant-design-vue'

export type ColumnType = TableColumnType & {
  visible?: boolean
  dataIndex: string
}
