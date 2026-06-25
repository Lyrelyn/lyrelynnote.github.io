import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('ids')
  if (!ids) {
    return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 })
  }

  const songIds = ids.split(',').map((id) => id.trim()).filter(Boolean)

  const results = await Promise.all(
    songIds.map(async (songId) => {
      try {
        const res = await fetch(
          `https://api.injahow.cn/meting/?server=netease&type=song&id=${songId}`,
          { signal: AbortSignal.timeout(8000) },
        )

        if (!res.ok) {
          return { id: songId, error: `HTTP ${res.status}` }
        }

        const data = await res.json()
        if (!data || data.length === 0) {
          return { id: songId, error: 'not_found' }
        }

        const song = data[0]
        return {
          id: songId,
          name: song.name || '未知歌曲',
          artist: song.artist || '未知歌手',
          author: song.artist || '未知歌手',
          cover: song.cover || song.pic || '',
          pic: song.cover || song.pic || '',
          url: song.url || '',
          lrc: song.lrc || '',
        }
      } catch (error) {
        console.error(`[api/music] 获取歌曲 ${songId} 失败:`, error)
        return { id: songId, error: String(error) }
      }
    }),
  )

  return NextResponse.json(results)
}
