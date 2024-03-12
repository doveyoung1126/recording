type GetParams = {
  params: {
    filepath: string[];
  };
};

export async function GET(req: Request, { params }: GetParams) {
  const filepath = params.filepath.join('/')
  const filename = params.filepath.pop()
  const FETCH_URL = `http://219.143.69.18:81/${filepath}`

  const res = await fetch(FETCH_URL, { cache: 'no-store' })

  return new Response(res.body, {
    headers: {
      ...res.headers,
      "content-disposition": `attachment; filename="${filename}"`
    }
  })
}