import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { productSchema } from './schemas/product.schema';

test.describe('Fakestore API Tests', () => {
    const ajv = new Ajv();
    const validateProduct = ajv.compile(productSchema);
    const endpoint = 'http://fakestoreapi.com/products/1';

    test('GET single product details', async ({ request }) => {
        // Send GET request to the endpoint
        const response = await request.get(endpoint);
        
        // Verify response status is 200
        expect(response.status()).toBe(200);
        
        // Parse response body
        const responseBody = await response.json();
        
        // Log product details for debugging
        console.log(`Product Title: ${responseBody.title}`);
        console.log(`Product Price: $${responseBody.price}`);
        
        // Verify required keys exist
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('title');
        expect(responseBody).toHaveProperty('price');
        expect(responseBody).toHaveProperty('category');
        expect(responseBody).toHaveProperty('description');
        
        // Validate schema using AJV
        const isValid = validateProduct(responseBody);
        expect(isValid).toBeTruthy();
        if (!isValid) {
            console.error('Schema validation errors:', validateProduct.errors);
        }
    });
});