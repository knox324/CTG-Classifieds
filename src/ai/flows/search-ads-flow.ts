'use server';
/**
 * @fileOverview A search flow for finding ads.
 *
 * - searchAds - A function that searches ads based on a query.
 * - SearchAdsInput - The input type for the searchAds function.
 * - SearchAdsOutput - The return type for the searchAds function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getAds } from '@/lib/data';
import type { AdWithSeller } from '@/lib/types';

const SearchAdsInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type SearchAdsInput = z.infer<typeof SearchAdsInputSchema>;

const AdSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  category: z.string(),
});

const SearchAdsOutputSchema = z.object({
  results: z.array(AdSchema),
});
export type SearchAdsOutput = z.infer<typeof SearchAdsOutputSchema>;


export async function searchAds(input: SearchAdsInput): Promise<SearchAdsOutput> {
  return searchAdsFlow(input);
}

const searchAdsFlow = ai.defineFlow(
  {
    name: 'searchAdsFlow',
    inputSchema: SearchAdsInputSchema,
    outputSchema: SearchAdsOutputSchema,
  },
  async ({ query }) => {
    const allAds = getAds();
    if (!query) {
        return { results: [] };
    }
    
    const lowerCaseQuery = query.toLowerCase();

    const filteredAds = allAds.filter(ad => 
        ad.title.toLowerCase().includes(lowerCaseQuery) ||
        ad.description.toLowerCase().includes(lowerCaseQuery) ||
        ad.category.toLowerCase().includes(lowerCaseQuery) ||
        ad.seller.name.toLowerCase().includes(lowerCaseQuery)
    ).slice(0, 10); // Limit to 10 results

    return {
        results: filteredAds.map(ad => ({
            id: ad.id,
            title: ad.title,
            price: ad.price,
            imageUrl: ad.imageUrl,
            category: ad.category,
        }))
    };
  }
);
