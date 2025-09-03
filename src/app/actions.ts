'use server';

import { recommendProducts } from '@/ai/flows/product-recommendations';

export async function getProductRecommendations(productDescription: string): Promise<string[]> {
  try {
    if (!productDescription) return [];
    const result = await recommendProducts({ productDescription });
    return result.recommendedProducts || [];
  } catch (error) {
    console.error('Error getting product recommendations:', error);
    // In a real app, you might want to handle this more gracefully
    return [];
  }
}
