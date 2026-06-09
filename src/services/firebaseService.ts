import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Internship, Professor } from '../types';

export async function fetchInternshipsFromFirebase(): Promise<Internship[]> {
  if (!db) return [];

  try {
    const internshipsQuery = query(collection(db, 'internships'), orderBy('deadline', 'asc'), limit(50));
    const snapshot = await getDocs(internshipsQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title ?? 'Стажировка',
      organization: doc.data().organization ?? 'Лаборатория',
      location: doc.data().location ?? 'Глобально',
      acceptanceRate: doc.data().acceptanceRate ?? 0,
      type: doc.data().type ?? 'Исследовательская',
      deadline: doc.data().deadline ?? 'TBA',
      description: doc.data().description ?? 'Описание скоро появится.',
      tags: doc.data().tags ?? [],
      mentor: doc.data().mentor ?? 'Научный руководитель',
      reward: doc.data().reward ?? 'Оплата по результатам',
      remote: doc.data().remote ?? false,
      applyLink: doc.data().applyLink ?? '',
    } as Internship));
  } catch (error) {
    console.warn('Firebase query failed:', error);
    return [];
  }
}

export async function fetchProfessorsFromFirebase(): Promise<Professor[]> {
  if (!db) return [];

  try {
    const professorsQuery = query(collection(db, 'professors'), limit(20));
    const snapshot = await getDocs(professorsQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name ?? 'Профессор',
      title: doc.data().title ?? 'Профессор',
      department: doc.data().department ?? 'Физика',
      researchAreas: doc.data().researchAreas ?? ['AI', 'физика'],
      availability: doc.data().availability ?? 'Открыт для новых студентов',
      bio: doc.data().bio ?? 'Доктор наук, заинтересован в талантливых студентах.',
      imageUrl: doc.data().imageUrl ?? 'https://via.placeholder.com/160',
    } as Professor));
  } catch (error) {
    console.warn('Firebase query failed:', error);
    return [];
  }
}
