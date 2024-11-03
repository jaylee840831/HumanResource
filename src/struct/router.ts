export interface routerItem {
  path: string,
  name: string,
  component: Object,
  meta: {
    title: string,
    show: boolean
  },
  children: routerItem[]
}

export interface menuItem{
  title: string,
  routerName: string,
  routerList: menuItem[]
}