'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant categories for an ad based on an uploaded image.
 *
 * - suggestCategories - A function that suggests categories based on the image.
 * - SuggestCategoriesInput - The input type for the suggestCategories function.
 * - SuggestCategoriesOutput - The return type for the suggestCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCategoriesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestCategoriesInput = z.infer<typeof SuggestCategoriesInputSchema>;

const SuggestCategoriesOutputSchema = z.object({
  categories: z.array(z.string()).describe('An array of suggested categories and subcategories for the ad. Pick up to 5 of the most relevant categories and subcategories from the list provided.'),
});
export type SuggestCategoriesOutput = z.infer<typeof SuggestCategoriesOutputSchema>;

export async function suggestCategories(input: SuggestCategoriesInput): Promise<SuggestCategoriesOutput> {
  return suggestCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCategoriesPrompt',
  input: {schema: SuggestCategoriesInputSchema},
  output: {schema: SuggestCategoriesOutputSchema},
  prompt: `You are an expert in classifying products for online classified ads.

  Based on the image provided, suggest a list of relevant categories and subcategories for the ad. Pick up to 5 of the most relevant categories and subcategories from the list provided.
  Return the categories as a JSON array of strings.

  Available Categories and Subcategories:
  - Kid's Corner
    - Toys & Games
    - Baby Gear
    - Kids' Fashion
    - School Supplies
    - Books for Kids
    - Strollers & Carriers
    - Nursery Furniture
    - Kids' Shoes
    - Outdoor Play
    - Party Supplies
  - Men's Corner
    - Men's Fashion
    - Men's Shoes
    - Watches & Accessories
    - Grooming & Personal Care
    - Sportswear
    - Formal Wear
    - Bags & Wallets
    - Gadgets for Men
    - Sunglasses
    - Traditional Wear
  - Female's Corner
    - Women's Fashion
    - Women's Shoes
    - Handbags & Purses
    - Jewelry
    - Makeup & Cosmetics
    - Skincare
    - Traditional Wear
    - Lingerie & Sleepwear
    - Maternity Wear
    - Accessories
  - Grocery Corner
    - Rice & Grains
    - Cooking Oil
    - Spices & Masalas
    - Lentils & Pulses (Dal)
    - Flour & Atta
    - Sugar & Salt
    - Tea & Coffee
    - Noodles & Pasta
    - Canned Goods
    - Snacks & Biscuits
  - Furniture's Corner
    - Sofas & Living Room
    - Beds & Bedroom
    - Dining Sets
    - Office Furniture
    - Storage & Cabinets
    - Outdoor Furniture
    - Kids' Furniture
    - Mattresses
    - Home Decor
    - Lighting
  - Fruit's Corner
    - Mangoes
    - Bananas
    - Apples
    - Oranges & Citrus
    - Grapes
    - Berries
    - Melons
    - Dates
    - Guava
    - Papaya
  - Beveridge Corner
    - Soft Drinks
    - Juices
    - Water
    - Energy Drinks
    - Powdered Drinks
    - Tea
    - Coffee
    - Milk & Dairy Drinks
    - Healthy & Herbal Drinks
    - Syrups & Concentrates

  Image: {{media url=photoDataUri}}
  `,
});

const suggestCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestCategoriesFlow',
    inputSchema: SuggestCategoriesInputSchema,
    outputSchema: SuggestCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
