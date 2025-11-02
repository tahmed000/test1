// Product schema for validation
const productSchema = {
    type: 'object',
    required: ['id', 'title', 'price', 'category', 'description'],
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        category: { type: 'string' },
        description: { type: 'string' }
    }
};

export { productSchema };