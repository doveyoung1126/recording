import { getUser } from '@/app/api/logto/user/get-user'
import { NextResponse } from 'next/server';

type GetParams = {
  params: {
    filepath: string[];
  };
};

export async function GET(req: Request, { params }: GetParams) {

  const { isAuthenticated } = await getUser()
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'No Premison' }, { status: 403 })
  }

  try {
    const filepath = params.filepath.join('/')
    const filename = params.filepath.pop()
    const FETCH_URL = `http://219.143.69.18:81/${filepath}`

    const res = await fetch(FETCH_URL, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new NextResponse(buffer, {
      headers: {
        ...res.headers,
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error('Error downloading file:', error)
    return NextResponse.json({ error: 'Failed to download the file.' }, { status: 500 })

  }

}