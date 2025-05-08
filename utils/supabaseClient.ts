import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cssspxxhqpbjlkleoryl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzc3NweHhocXBiamxrbGVvcnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNDEzNDgsImV4cCI6MjAxNjkxNzM0OH0.OdN6MtHqnQW9KvhNQ4AXwIzc3QNxqcEKDB1ah53xfHw';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Product operations
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const fetchProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createProduct = async (product: any) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Image upload for React Native
export const uploadProductImage = async (uri: string) => {
  try {
    // Generate a unique file name
    const fileName = `${Math.random()}.jpg`;
    const filePath = `products/${fileName}`;

    // Fetch the image file from URI
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, blob);

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Search and filter
export const searchProducts = async (query: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .textSearch('name', query)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const filterProducts = async (filters: any) => {
  let query = supabase.from('products').select('*');

  if (filters.category) {
    query = query.eq('category_id', filters.category);
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.inStock !== undefined) {
    query = query.eq('in_stock', filters.inStock);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};