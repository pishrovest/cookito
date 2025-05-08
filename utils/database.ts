// Types
export interface Category {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  flavor: string;
  calories: number;
  category: string;
  categoryId: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// Initial categories database
export let categories: Category[] = [
  {
    id: '1',
    title: 'شیرینی‌های سنتی',
    description: 'شیرینی‌های خانگی با طعم اصیل ایرانی',
    imageUrl: 'https://api.a0.dev/assets/image?text=traditional%20persian%20sweets%20display&aspect=16:9',
    itemCount: 3,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  },
  {
    id: '2',
    title: 'نوشیدنی‌ها',
    description: 'نوشیدنی‌های گرم و سرد خانگی',
    imageUrl: 'https://api.a0.dev/assets/image?text=persian%20hot%20drinks%20coffee%20tea&aspect=16:9',
    itemCount: 2,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  },
  {
    id: '3',
    title: 'تنقلات رژیمی',
    description: 'خوراکی‌های سالم و کم‌کالری',
    imageUrl: 'https://api.a0.dev/assets/image?text=healthy%20persian%20snacks%20display&aspect=16:9',
    itemCount: 2,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  }
];

// Initial products database
export let products: Product[] = [
  {
    id: '1',
    name: 'شیرینی زعفرانی',
    description: 'شیرینی سنتی ایرانی با طعم زعفران اعلا و مغز بادام. این شیرینی با دستور پخت اصیل و مواد اولیه درجه یک تهیه می‌شود.',
    images: [
      'https://api.a0.dev/assets/image?text=persian%20saffron%20cookie%20closeup%20professional%20lighting&aspect=1:1',
      'https://api.a0.dev/assets/image?text=persian%20saffron%20cookie%20plate%20arrangement&aspect=16:9'
    ],
    price: 185000,
    flavor: 'زعفران و بادام',
    calories: 180,
    category: 'شیرینی‌های سنتی',
    categoryId: '1',
    inStock: true,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  },
  {
    id: '2',
    name: 'کیک شکلاتی فندقی',
    description: 'کیک شکلاتی خانگی با روکش گاناش و مغز فندق تازه. این کیک با شکلات تلخ ۷۰٪ و فندق درجه یک تهیه می‌شود.',
    images: [
      'https://api.a0.dev/assets/image?text=chocolate%20hazelnut%20cake%20slice%20professional%20lighting&aspect=1:1',
      'https://api.a0.dev/assets/image?text=chocolate%20cake%20whole%20with%20hazelnuts&aspect=16:9'
    ],
    price: 280000,
    flavor: 'شکلات و فندق',
    calories: 320,
    category: 'شیرینی‌های سنتی',
    categoryId: '1',
    inStock: true,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  },
  {
    id: '3',
    name: 'قهوه ترک',
    description: 'قهوه ترک اصیل با طعم هل. دم کشیده شده با روش سنتی در قهوه جوش مسی.',
    images: [
      'https://api.a0.dev/assets/image?text=turkish%20coffee%20with%20cardamom%20professional%20lighting&aspect=1:1',
      'https://api.a0.dev/assets/image?text=turkish%20coffee%20traditional%20serving&aspect=16:9'
    ],
    price: 85000,
    flavor: 'قهوه و هل',
    calories: 5,
    category: 'نوشیدنی‌ها',
    categoryId: '2',
    inStock: true,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  },
  {
    id: '4',
    name: 'شیرینی رژیمی بادامی',
    description: 'شیرینی رژیمی تهیه شده با آرد بادام و شیرین شده با استویا. مناسب برای افراد دیابتی و رژیمی.',
    images: [
      'https://api.a0.dev/assets/image?text=healthy%20almond%20cookies%20closeup%20professional%20lighting&aspect=1:1',
      'https://api.a0.dev/assets/image?text=sugar%20free%20almond%20cookies%20plate&aspect=16:9'
    ],
    price: 220000,
    flavor: 'بادام',
    calories: 120,
    category: 'تنقلات رژیمی',
    categoryId: '3',
    inStock: true,
    createdAt: '2025-04-15',
    updatedAt: '2025-04-15'
  }
];

// Category Management Functions
export const addCategory = (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newCategory: Category = {
    ...category,
    id: (categories.length + 1).toString(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  categories = [...categories, newCategory];
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>) => {
  categories = categories.map(category => {
    if (category.id === id) {
      return {
        ...category,
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0]
      };
    }
    return category;
  });
};

export const deleteCategory = (id: string) => {
  categories = categories.filter(category => category.id !== id);
  // Also delete all products in this category or mark them as uncategorized
  products = products.map(product => {
    if (product.categoryId === id) {
      return { ...product, categoryId: 'uncategorized', category: 'بدون دسته‌بندی' };
    }
    return product;
  });
};

// Product Management Functions
export const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newProduct: Product = {
    ...product,
    id: (products.length + 1).toString(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  products = [...products, newProduct];
  // Update category item count
  updateCategoryItemCount(product.categoryId);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const oldProduct = products.find(p => p.id === id);
  products = products.map(product => {
    if (product.id === id) {
      return {
        ...product,
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0]
      };
    }
    return product;
  });
  // If category changed, update both old and new category item counts
  if (oldProduct && updates.categoryId && oldProduct.categoryId !== updates.categoryId) {
    updateCategoryItemCount(oldProduct.categoryId);
    updateCategoryItemCount(updates.categoryId);
  }
};

export const deleteProduct = (id: string) => {
  const product = products.find(p => p.id === id);
  if (product) {
    products = products.filter(p => p.id !== id);
    // Update category item count
    updateCategoryItemCount(product.categoryId);
  }
};

// Helper Functions
const updateCategoryItemCount = (categoryId: string) => {
  const count = products.filter(p => p.categoryId === categoryId).length;
  updateCategory(categoryId, { itemCount: count });
};

// Getter Functions
export const getProducts = () => products;
export const getProduct = (id: string) => products.find(product => product.id === id);
export const getCategories = () => categories;
export const getCategory = (id: string) => categories.find(category => category.id === id);
export const getProductsByCategory = (categoryId: string) => products.filter(product => product.categoryId === categoryId);