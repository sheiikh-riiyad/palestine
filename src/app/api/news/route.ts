// For App Router (Next.js 13+)
export async function GET() {
  const res = await fetch(
    'https://gnews.io/api/v4/search?q=palestine&lang=en&token=d4c91d18cba8f3fbcecf7955bd0b251f'
  );

  const data = await res.json();
  return Response.json(data);
}
