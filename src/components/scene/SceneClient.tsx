'use client'

import dynamic from 'next/dynamic'

const SceneDynamic = dynamic(
  () => import('./Scene').then((m) => m.Scene),
  { ssr: false, loading: () => null }
)

export function SceneClient() {
  return <SceneDynamic />
}
