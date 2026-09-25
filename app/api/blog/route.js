import { NextResponse } from 'next/server';

const posts = [
  {
    id: 1,
    title: 'The Future of 3D on the Web: WebGPU and Beyond',
    excerpt: 'Exploring how WebGPU is set to revolutionize 3D rendering in browsers.',
    content: 'Full article content would be stored in a database or CMS...',
    category: '3D Technology',
    author: 'James Liu',
    date: '2026-03-15',
    readTime: '8 min read',
    tags: ['WebGPU', 'Three.js', '3D', 'WebGL']
  },
  {
    id: 2,
    title: 'Building Scalable Design Systems from Scratch',
    excerpt: 'A comprehensive guide to creating design systems that grow with your product.',
    content: 'Full article content...',
    category: 'Design',
    author: 'Elena Costa',
    date: '2026-03-08',
    readTime: '12 min read',
    tags: ['Design Systems', 'UI', 'Components']
  },
  {
    id: 3,
    title: 'Why We Chose React + Vite for Our Client Projects',
    excerpt: 'An honest look at our decision to standardize on React and Vite.',
    content: 'Full article content...',
    category: 'Engineering',
    author: "Ryan O'Brien",
    date: '2026-02-28',
    readTime: '6 min read',
    tags: ['React', 'Vite', 'DX', 'Performance']
  },
  {
    id: 4,
    title: 'AR in Retail: Lessons from 5 Major Deployments',
    excerpt: 'What we learned building AR experiences for retail brands.',
    content: 'Full article content...',
    category: 'AR/VR',
    author: 'Carlos Ruiz',
    date: '2026-02-20',
    readTime: '10 min read',
    tags: ['AR', 'Retail', 'Mobile', 'WebXR']
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = searchParams.get('limit');
  
  let filtered = [...posts];
  
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (limit) {
    const n = parseInt(limit, 10);
    if (!isNaN(n) && n > 0) {
      filtered = filtered.slice(0, n);
    }
  }
  
  const summary = filtered.map(({ content, ...rest }) => rest);
  return NextResponse.json({ posts: summary, total: summary.length });
}
