
'use server';

import { db } from '@/lib/firebase';
import type { HeroSlide, HomepageCategory } from '@/lib/types';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// --- Hero Slides Actions ---

export async function getSlides(): Promise<HeroSlide[]> {
    const slidesCol = collection(db, 'heroSlides');
    const slideSnapshot = await getDocs(slidesCol);
    
    const slideList = slideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroSlide));
    return slideList.sort((a, b) => a.title.localeCompare(b.title));
}

export async function addSlide(data: Omit<HeroSlide, 'id'>) {
    try {
        await addDoc(collection(db, 'heroSlides'), data);
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error adding slide: ", error);
        return { success: false, error: 'Failed to add slide' };
    }
}

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
      tag: 'Promo',
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
      tag: 'Nouveau',
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
      tag: 'Promo',
    },
];

async function seedSlides() {
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

export async function deleteSlide(id: string) {
    try {
        await deleteDoc(doc(db, 'heroSlides', id));
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error deleting slide: ", error);
        return { success: false, error: 'Failed to delete slide' };
    }
}

// --- Homepage Categories Actions ---

const initialHomepageCategories: Omit<HomepageCategory, 'id'>[] = [
    { name: 'Smartphone', href: '/category/smartphones', imgSrc: 'https://picsum.photos/seed/smartphones/100/100', dataAiHint: 'smartphone' },
    { name: 'Téléviseur', href: '/category/televisions', imgSrc: 'https://picsum.photos/seed/tv/100/100', dataAiHint: 'television' },
    { name: 'Gros électroménager', href: '/category/appliances', imgSrc: 'https://picsum.photos/seed/appliances/100/100', dataAiHint: 'home appliance' },
    { name: 'Aspirateur', href: '/category/vacuums', imgSrc: 'https://picsum.photos/seed/vacuum/100/100', dataAiHint: 'vacuum cleaner' },
    { name: 'Montre connectée', href: '/category/wearables', imgSrc: 'https://picsum.photos/seed/watch/100/100', dataAiHint: 'smartwatch' },
    { name: 'Machine à laver', href: '/category/washing-machines', imgSrc: 'https://picsum.photos/seed/washer/100/100', dataAiHint: 'washing machine' },
];

export async function getHomepageCategories(): Promise<HomepageCategory[]> {
    const categoriesCol = collection(db, 'homepageCategories');
    const categorySnapshot = await getDocs(categoriesCol);
    return categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomepageCategory));
}

async function seedHomepageCategories() {
    const categoriesCol = collection(db, 'homepageCategories');
    for (const category of initialHomepageCategories) {
        await addDoc(categoriesCol, category);
    }
}

export async function addHomepageCategory(data: Omit<HomepageCategory, 'id'>) {
    try {
        await addDoc(collection(db, 'homepageCategories'), data);
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: 'Failed to add category' };
    }
}

export async function getHomepageCategoryById(id: string): Promise<HomepageCategory | null> {
    const docRef = doc(db, 'homepageCategories', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as HomepageCategory;
    } else {
        return null;
    }
}

export async function updateHomepageCategory(id: string, data: Partial<Omit<HomepageCategory, 'id'>>) {
     try {
        const docRef = doc(db, 'homepageCategories', id);
        await updateDoc(docRef, data);
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { success: false, error: 'Failed to update category' };
    }
}

export async function deleteHomepageCategory(id: string) {
    try {
        await deleteDoc(doc(db, 'homepageCategories', id));
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error deleting document: ", error);
        return { success: false, error: 'Failed to delete category' };
    }
}

export async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Check if slides already exist
        const existingSlides = await getSlides();
        if (existingSlides.length === 0) {
            // Add slides
            console.log('📱 Adding hero slides...');
            for (const slide of initialSlides) {
                await addDoc(collection(db, 'heroSlides'), slide);
                console.log(`✅ Added slide: ${slide.title}`);
            }
        }
        
        // Check if categories already exist
        const existingCategories = await getHomepageCategories();
        if (existingCategories.length === 0) {
            // Add categories
            console.log('📁 Adding homepage categories...');
            for (const category of initialHomepageCategories) {
                await addDoc(collection(db, 'homepageCategories'), category);
                console.log(`✅ Added category: ${category.name}`);
            }
        }
        
        // Check if static banners already exist
        const existingBanners = await getStaticBanners();
        if (existingBanners.length === 0) {
            // Add static banners
            console.log('🖼️ Adding static banners...');
            for (const banner of initialStaticBanners) {
                await addDoc(collection(db, 'staticBanners'), banner);
                console.log(`✅ Added banner: ${banner.name}`);
            }
        }
        
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        
        return { 
            success: true, 
            message: 'Database seeded successfully!',
            slidesAdded: existingSlides.length === 0 ? initialSlides.length : 0,
            categoriesAdded: existingCategories.length === 0 ? initialHomepageCategories.length : 0,
            bannersAdded: existingBanners.length === 0 ? initialStaticBanners.length : 0
        };
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        return { success: false, error: 'Failed to seed database' };
    }
}

// --- Static Banners Actions ---

const initialStaticBanners: Omit<StaticBanner, 'id'>[] = [
    {
        name: 'Hisense Appliances',
        imgSrc: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        alt: 'Hisense Products',
        width: 600,
        height: 400,
        link: '#',
        dataAiHint: 'Hisense smart tv appliance',
        section: 'appliances',
        position: 'left'
    },
    {
        name: 'Ufesa Kitchen',
        imgSrc: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=192&fit=crop',
        alt: 'Ufesa Products',
        width: 600,
        height: 192,
        link: '#',
        dataAiHint: 'kitchen appliances grill',
        section: 'appliances',
        position: 'top'
    },
    {
        name: 'Elexia Small Appliances',
        imgSrc: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=192&fit=crop',
        alt: 'Elexia Products',
        width: 600,
        height: 192,
        link: '#',
        dataAiHint: 'kettle toaster mixer',
        section: 'appliances',
        position: 'bottom'
    },
    {
        name: 'Gaming Keyboards',
        imgSrc: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=150&fit=crop',
        alt: 'Gaming Keyboards',
        width: 600,
        height: 150,
        link: '#',
        dataAiHint: 'gaming keyboard',
        section: 'gaming',
        position: 'left'
    },
    {
        name: 'Laptop Offers',
        imgSrc: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=150&fit=crop',
        alt: 'Laptop Offers',
        width: 600,
        height: 150,
        link: '#',
        dataAiHint: 'laptop sale',
        section: 'gaming',
        position: 'right'
    },
    {
        name: 'MacBook Air',
        imgSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
        alt: 'Macbook Air',
        width: 600,
        height: 400,
        link: '#',
        dataAiHint: 'macbook air laptop',
        section: 'macbook',
        position: 'right'
    },
    {
        name: 'Apple Logo',
        imgSrc: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=40&fit=crop',
        alt: 'MacBook Air Logo',
        width: 150,
        height: 40,
        link: '#',
        dataAiHint: 'apple logo',
        section: 'macbook',
        position: 'left'
    }
];

export async function getStaticBanners(): Promise<StaticBanner[]> {
    const bannersCol = collection(db, 'staticBanners');
    const bannerSnapshot = await getDocs(bannersCol);
    return bannerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaticBanner));
}

export async function addStaticBanner(data: Omit<StaticBanner, 'id'>) {
    try {
        await addDoc(collection(db, 'staticBanners'), data);
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error adding banner: ", error);
        return { success: false, error: 'Failed to add banner' };
    }
}

export async function getStaticBannerById(id: string): Promise<StaticBanner | null> {
    const docRef = doc(db, 'staticBanners', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as StaticBanner;
    } else {
        return null;
    }
}

export async function updateStaticBanner(id: string, data: Partial<Omit<StaticBanner, 'id'>>) {
    try {
        const docRef = doc(db, 'staticBanners', id);
        await updateDoc(docRef, data);
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error updating banner: ", error);
        return { success: false, error: 'Failed to update banner' };
    }
}

export async function deleteStaticBanner(id: string) {
    try {
        await deleteDoc(doc(db, 'staticBanners', id));
        revalidatePath('/admin/homepage');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error deleting banner: ", error);
        return { success: false, error: 'Failed to delete banner' };
    }
}
