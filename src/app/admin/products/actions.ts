
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
  const productsCol = collection(db, 'products');
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productList;
}

export async function addProduct(productData: any) {
  try {
    const productsCol = collection(db, 'products');
    const dataWithReviews = {
      ...productData,
      reviews: productData.reviews || [],
    };
    await addDoc(productsCol, dataWithReviews);
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: 'Failed to add product' };
  }
}
