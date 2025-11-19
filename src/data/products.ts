export type Product = {
  slug: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  image: string;
  stock: number;
};

export const products: Product[] = [
  {
    slug: "premium-wireless-earbuds",
    title: "프리미엄 무선 이어폰",
    description:
      "액티브 노이즈 캔슬링과 최대 24시간 배터리를 지원하는 차세대 무선 이어폰으로, 이동 중에도 몰입감 있는 사운드를 제공합니다.",
    price: 129000,
    seller: "사운드랩 공식스토어",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
    stock: 48,
  },
  {
    slug: "daily-coffee-machine",
    title: "데일리 커피머신",
    description:
      "원터치 추출과 자동 세척 기능으로 매일 아침 신선한 커피를 즐길 수 있는 홈카페 필수템.",
    price: 89000,
    seller: "데일리리빙",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
    stock: 32,
  },
  {
    slug: "mini-air-purifier",
    title: "미니 공기청정기",
    description:
      "초미세먼지를 99.97% 제거하는 HEPA 필터와 저소음 모드로 침실과 사무실 어디서나 사용하기 좋은 컴팩트 공기청정기입니다.",
    price: 64000,
    seller: "클린에어",
    image:
      "https://plus.unsplash.com/premium_photo-1690291494818-068ed0f63c42?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 67,
  },
  {
    slug: "nordic-table-lamp",
    title: "북유럽 감성 조명",
    description:
      "은은한 무드 조명과 3단 밝기 조절 기능으로 어느 공간이든 따뜻하게 채워주는 북유럽 스타일 테이블 램프.",
    price: 45000,
    seller: "라이트하우스",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    stock: 120,
  },
  {
    slug: "linen-bedding-set",
    title: "에센셜 린넨 침구세트",
    description:
      "통기성이 좋은 프리미엄 린넨 소재를 사용해 사계절 내내 쾌적한 숙면을 돕는 침구 세트.",
    price: 159000,
    seller: "슬로우홈",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    stock: 21,
  },
  {
    slug: "vintage-bluetooth-speaker",
    title: "감성 블루투스 스피커",
    description:
      "빈티지 디자인과 풍부한 베이스가 특징인 포터블 스피커로, 최대 12시간 연속 재생을 지원합니다.",
    price: 72000,
    seller: "뮤직라운지",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80",
    stock: 58,
  },
  {
    slug: "premium-kitchen-knife",
    title: "프리미엄 키친 나이프",
    description:
      "독일제 스테인리스 강철을 사용한 셰프 전용 나이프로, 정교한 절삭력을 자랑합니다.",
    price: 38000,
    seller: "큐이즈메이트",
    image:
      "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?auto=format&fit=crop&w=900&q=80",
    stock: 86,
  },
  {
    slug: "lifestyle-yoga-mat",
    title: "라이프스타일 요가 매트",
    description:
      "미끄럼 방지 패턴과 8mm 두께로 안정적인 자세를 유지할 수 있는 프리미엄 요가 매트.",
    price: 56000,
    seller: "밸런스랩",
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80",
    stock: 40,
  },
];

export const getAllProductSlugs = async () =>
  products.map((product) => product.slug);

export const getProductBySlug = async (slug: string) =>
  products.find((product) => product.slug === slug) ?? null;
