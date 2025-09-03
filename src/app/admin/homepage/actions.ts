
'use server';

import { db } from '@/lib/firebase';
import type { HeroSlide } from '@/lib/types';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const initialSlides: Omit<HeroSlide, 'id'>[] = [
    {
      imgSrc: 'https://picsum.photos/seed/laptops/1200/400',
      alt: 'Back to school',
      dataAiHint: 'laptops on desk',
      title: 'BACK TO SCHOOL',
      subtitle: 'UNE RENTRÉE PARFAITE...',
      ctaText: "J'en profite",
      ctaLink: '#',
      titleClassName: "font-['Arial_Black',_Gadget,_sans-serif]",
      containerClassName: 'bg-primary/80',
    },
    {
      imgSrc: 'https://picsum.photos/seed/laptopdeal/1200/400',
      alt: 'Offres technologiques',
      dataAiHint: 'person using laptop',
      title: 'Nouvelles Offres',
      subtitle: 'Découvrez nos derniers produits.',
      ctaText: 'Explorer',
      ctaLink: '/category/laptops',
      containerClassName: 'bg-black/30',
    },
    {
      imgSrc: 'https://picsum.photos/seed/phone-sale/1200/400',
      alt: 'Vente de téléphones',
      dataAiHint: 'smartphone sale',
      title: 'Les derniers smartphones',
      subtitle: 'À des prix imbattables.',
      ctaText: 'Voir les offres',
      ctaLink: '/category/smartphones',
      containerClassName: 'bg-black/50',
    },
];

export async function getSlides(): Promise<HeroSlide[]> {
    const slidesCol = collection(db, 'heroSlides');
    const slideSnapshot = await getDocs(slidesCol);
    const slideList = slideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroSlide));
    // Simple order for consistency, can be improved with an 'order' field later
    return slideList.sort((a, b) => a.title.localeCompare(b.title));
}

export async function seedSlides() {
    const slidesCol = collection(db, 'heroSlides');
    for (const slide of initialSlides) {
        await addDoc(slidesCol, slide);
    }
}

export async function getSlideById(id: string): Promise<HeroSlide | null> {
    const docRef = doc(db, 'heroSlides', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as HeroSlide;
    } else {
        return null;
    }
}

export async function updateSlide(id: string, data: Partial<Omit<HeroSlide, 'id'>>) {
    try {
        const docRef = doc(db, 'heroSlides', id);
        await updateDoc(docRef, data);
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { success: false, error: 'Failed to update slide' };
    }
}
