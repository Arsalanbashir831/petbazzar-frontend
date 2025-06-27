// src/lib/mockStoreData.ts

export interface StoreDetails {
    name: string;
    createdOn: string;
    status: 'Active' | 'Suspended' | 'Pending';
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    stats: {
        totalProducts: number;
        productsSold: number;
        unclearedAmount: number;
        totalOrders: number;
        totalEarnings: number;
        avgRating: number;
    };
}

export const storeDetails: StoreDetails = {
    name: 'Furry Bites',
    createdOn: '4/8/2024',
    status: 'Active',
    ownerName: 'Ali Raza',
    ownerPhone: '+92 321 1234567',
    ownerEmail: 'aliraza123@gmail.com',
    stats: {
        totalProducts: 44,
        productsSold: 500,
        unclearedAmount: 75_060,
        totalOrders: 530,
        totalEarnings: 532_000,
        avgRating: 4.5,
    },
};

export interface Product {
    id: number;
    name: string;
    image: string;
    stats: { sold: number; likes: number; views: number };
    stock: number;
}

export const products: Product[] = [
    {
        id: 44,
        name: 'DIAMOND Care Urinary Support Formula For Adult Cats',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 32, likes: 112, views: 1000 },
        stock: 29,
    },
    {
        id: 43,
        name: 'Double plaster Bowls',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 12, likes: 400, views: 3200 },
        stock: 30,
    },
    {
        id: 42,
        name: 'Double Steel Bowls',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 4, likes: 100, views: 500 },
        stock: 5,
    },
    {
        id: 41,
        name: 'Dog Collar in Multiple Size / Adjustable',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 20, likes: 200, views: 1500 },
        stock: 10,
    },
    {
        id: 40,
        name: 'Nutragold Cat 5kg',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 50, likes: 300, views: 2500 },
        stock: 15,
    },
    {
        id: 39,
        name: 'Diamond Care Dry Dog Food',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 25, likes: 150, views: 1200 },
        stock: 8,
    },
    {
        id: 38,
        name: 'Dog House',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 10, likes: 80, views: 600 },
        stock: 5,
    },
    {
        id: 37,
        name: 'Cat Scratching Post',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 15, likes: 90, views: 700 },
        stock: 12,
    },
    {
        id: 36,
        name: 'Pet Grooming Kit',
        image: '/seller/dashboard/petCard.png',
        stats: { sold: 18, likes: 110, views: 800 },
        stock: 20,
    },
];

export interface Order {
    id: string;
    product: string;
    category: string;
    quantity: number;
    stock: number;
    price: number;
    date: string;
    status: 'Pending' | 'Confirmed' | 'Shipped' | 'Completed' | 'Cancelled';
}



export const orders: Order[] = [
    {
        id: '#6548',
        product: 'Nutragold Cat 5kg',
        category: 'Cat Food',
        quantity: 1,
        stock: 20,
        price: 4200,
        date: '4/8/2024',
        status: 'Pending',
    },
    {
        id: '#6547',
        product: 'Dog collar in multiple size / adjustable',
        category: 'Dog Essentials',
        quantity: 1,
        stock: 7,
        price: 1200,
        date: '4/8/2024',
        status: 'Cancelled',
    },
    {
        id: '#6546',
        product: 'Diamond care dry Dog Food',
        category: 'Dog Food',
        quantity: 3,
        stock: 13,
        price: 3200,
        date: '4/8/2024',
        status: 'Confirmed',
    },
    {
        id: '#6545',
        product: 'Dog House',
        category: 'Dog Essentials',
        quantity: 1,
        stock: 5,
        price: 5000,
        date: '4/8/2024',
        status: 'Shipped',
    },
    {
        id: '#6543',
        product: 'Pet Grooming Kit',
        category: 'Pet Care',
        quantity: 1,
        stock: 15,
        price: 2500,
        date: '4/8/2024',
        status: 'Pending',
    },
    {
        id: '#6542',
        product: 'Dog Leash',
        category: 'Dog Essentials',
        quantity: 2,
        stock: 8,
        price: 800,
        date: '4/8/2024',
        status: 'Confirmed',
    },
    {
        id: '#6541',
        product: 'Cat Litter Box',
        category: 'Cat Essentials',
        quantity: 1,
        stock: 12,
        price: 1500,
        date: '4/8/2024',
        status: 'Cancelled',
    },
];

export interface Transaction {
    id: string;
    product: string;
    quantity: number;
    price: number;
    date: string;
    orderStatus: 'Shipped' | 'Completed';
    paymentStatus: 'Pending' | 'Paid';
}

export const transactions: Transaction[] = [
    {
        id: '#6548',
        product: 'Nutragold Cat 5kg',
        quantity: 1,
        price: 4200,
        date: '4/8/2024',
        orderStatus: 'Shipped',
        paymentStatus: 'Pending',
    },
    {
        id: '#6547',
        product: 'Dog collar in multiple size / adjustable',
        quantity: 1,
        price: 1200,
        date: '4/8/2024',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
    },
    {
        id: '#6546',
        product: 'Diamond care dry Dog Food',
        quantity: 2,
        price: 3200,
        date: '4/8/2024',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
    },
    {
        id: '#6545',
        product: 'Dog House',
        quantity: 1,
        price: 5000,
        date: '4/8/2024',
        orderStatus: 'Shipped',
        paymentStatus: 'Pending',
    },
    {
        id: '#6543',
        product: 'Pet Grooming Kit',
        quantity: 1,
        price: 2500,
        date: '4/8/2024',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
    },
    {
        id: '#6542',
        product: 'Dog Leash',
        quantity: 2,
        price: 800,
        date: '4/8/2024',
        orderStatus: 'Shipped',
        paymentStatus: 'Pending',
    },
    {
        id: '#6541',
        product: 'Cat Litter Box',
        quantity: 1,
        price: 1500,
        date: '4/8/2024',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
    },
    {
        id: '#6540',
        product: 'Cat Scratching Post',
        quantity: 1,
        price: 1800,
        date: '4/8/2024',
        orderStatus: 'Shipped',
        paymentStatus: 'Pending',
    },
    {
        id: '#6539',
        product: 'Dog Food Bowl',
        quantity: 2,
        price: 600,
        date: '4/8/2024',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
    },
    {
        id: '#6538',
        product: 'Cat Toy Set',
        quantity: 1,
        price: 900,
        date: '4/8/2024',
        orderStatus: 'Shipped',
        paymentStatus: 'Pending',
    },
    {
        id: '#6537',
        product: 'Dog Training Pads',
        quantity: 1,
        price: 1500,
        date: '4/8/2024',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
    },
    {
        id: '#6536',
        product: 'Cat Carrier Bag',
        quantity: 1,
        price: 2000,
        date: '4/8/2024',
        orderStatus: 'Shipped',
        paymentStatus: 'Pending',
    },
];

export interface Complaint {
    id: string;
    customerId: string;
    date: string;
    product: string;
    store: string;
    orderId: string;
    issue: string;
    status: 'Pending' | 'Refund' | 'Completed';
}

export const complaints: Complaint[] = [
    {
        id: 'C034',
        customerId: 'C00334',
        date: '4/8/2024',
        product: 'Nutragold Cat 5kg',
        store: 'PetZone',
        orderId: 'O2876',
        issue: 'Received Wrong Order',
        status: 'Pending',
    },
    {
        id: 'C035',
        customerId: 'C00335',
        date: '4/8/2024',
        product: 'Dog House',
        store: 'PetZone',
        orderId: 'O2877',
        issue: 'Late Delivery',
        status: 'Refund',
    },
    {
        id: 'C036',
        customerId: 'C00336',
        date: '4/8/2024',
        product: 'Dog collar in multiple size / adjustable',
        store: 'PetZone',
        orderId: 'O2878',
        issue: 'Product Damaged',
        status: 'Completed',
    },
    {
        id: 'C037',
        customerId: 'C00337',
        date: '4/8/2024',
        product: 'Diamond care dry Dog Food',
        store: 'PetZone',
        orderId: 'O2879',
        issue: 'Wrong Size Delivered',
        status: 'Pending',
    },
    {
        id: 'C038',
        customerId: 'C00338',
        date: '4/8/2024',
        product: 'Pet Grooming Kit',
        store: 'PetZone',
        orderId: 'O2880',
        issue: 'Missing Item in Package',
        status: 'Refund',
    },
    {
        id: 'C039',
        customerId: 'C00339',
        date: '4/8/2024',
        product: 'Dog Leash',
        store: 'PetZone',
        orderId: 'O2881',
        issue: 'Product Not as Described',
        status: 'Completed',
    },
    {
        id: 'C040',
        customerId: 'C00340',
        date: '4/8/2024',
        product: 'Cat Litter Box',
        store: 'PetZone',
        orderId: 'O2882',
        issue: 'Quality Issue',
        status: 'Pending',
    },
];

export interface Review {
    id: string;
    customer: string;
    date: string;
    rating: number;
    comment: string;
}

export const reviews: Review[] = [
    {
        id: 'R001',
        customer: 'John Doe',
        date: '4/8/2024',
        rating: 5,
        comment: 'Great quality, fast shipping!',
    },
    {
        id: 'R002',
        customer: 'Jane Smith',
        date: '4/7/2024',
        rating: 4,
        comment: 'Product as described.',
    },
];


export interface ProductRow {
    id: number;
    name: string;
    storeName: string;
    category: string;
    price: number;
    submissionDate: string;
    status: 'Pending' | 'Active' | 'Suspended';
}

export const pendingProducts: ProductRow[] = [
    {
        id: 44,
        name: 'DIAMOND Care Urinary Support Formula For Adult Cats',
        storeName: 'Pet Care',
        category: 'Cat Food',
        price: 2400,
        submissionDate: '4/8/2024',
        status: 'Pending',
    },
    {
        id: 43,
        name: 'Double plaster Bowls',
        storeName: 'Paws',
        category: 'Bowls',
        price: 2400,
        submissionDate: '4/8/2024',
        status: 'Pending',
    },
    {
        id: 42,
        name: 'Double Steel Bowls',
        storeName: 'Paws',
        category: 'Bowls',
        price: 3000,
        submissionDate: '4/8/2024',
        status: 'Pending',
    },
    {
        id: 41,
        name: 'Homie Adult Cat Food',
        storeName: 'Meow & Munch',
        category: 'Bowls',
        price: 3000,
        submissionDate: '4/8/2024',
        status: 'Pending',
    },
    {
        id: 40,
        name: 'Double plaster Bowls',
        storeName: 'Paws',
        category: 'Bowls',
        price: 2400,
        submissionDate: '4/8/2024',
        status: 'Pending',
    },
    {
        id: 39,
        name: 'Double Steel Bowls',
        storeName: 'Paws',
        category: 'Bowls',
        price: 3000,
        submissionDate: '4/8/2024',
        status: 'Pending',
    },
];

export const activeProducts: ProductRow[] = pendingProducts.map(p => ({
    ...p,
    status: 'Active'
}));

export const suspendedProducts: ProductRow[] = pendingProducts.slice(0, 3).map(p => ({
    ...p,
    status: 'Suspended'
}));



// src/lib/mockProductData.ts

// — lighter-weight row interface for listing pages:
export interface ProductRow {
    id: number;
    name: string;
    storeName: string;
    category: string;
    price: number;
    submissionDate: string;
    status: 'Pending' | 'Active' | 'Suspended';
}


// — full detail interface for /products/[id]/page.tsx:
export interface ProductDetail {
    id: number;               // 44
    slug: string;             // "44" => used in URL
    name: string;             // "DIAMOND Care Urinary Support Formula For Adult Cats – 2.72 Kg"
    images: string[];         // 3× thumbnails + main image
    sizes: { label: string; inStock: boolean }[];
    selectedSize: string;     // "2.72 Kg"
    brand: string;            // "Diamond Care"
    shopDetails: string;      // "Pet and Vets Clinic, Street 141…"
    description: string;      // full lorem-style text
    price: number;            // 2400
    status: 'Pending' | 'Active' | 'Suspended';
    submissionDate: string;   // "4/8/2024"
    storeName: string;        // "Paw Care"
    category: string;         // "Cat Food"
}

// — a lookup map keyed by slug (string) so you can easily do productDetails[id]
export const productDetails: Record<string, ProductDetail> = {
    '44': {
        id: 44,
        slug: '44',
        name: 'DIAMOND Care Urinary Support Formula For Adult Cats – 2.72 Kg',
        images: [
            '/seller/dashboard/petCard.png',
            '/seller/dashboard/petCard.png',
            '/seller/dashboard/petCard.png',
        ],
        sizes: [
            { label: '2.72 Kg', inStock: true },
            { label: '5 Kg', inStock: true },
        ],
        selectedSize: '2.72 Kg',
        brand: 'Diamond Care',
        shopDetails:
            'Pet and Vets Clinic, Street 141, Sector H Dha Phase 1, Lahore, 54000',
        description: `
Royal Canin® Urinary Care in Gravy is specifically tailored to help maintain a healthy balance of minerals within your cat's urine to support a healthy urinary tract. We know urinary dilemmas are more frequent in overweight cats, so helping your cat maintain its ideal body weight will also contribute to keeping its urinary system healthy.

If you've noticed your cat urinating at a much more frequent rate and with less regard to the appropriate places to do its business (i.e. outside or in its litter tray) then your cat may have an urinary health issue. Even if you haven't noticed anything unusual with your cat's toilet habits, it's always worth checking with your vet as health issues aren't always instantly visible on the outside.

ROYAL CANIN® Urinary Care in Gravy is specifically tailored to help maintain a healthy balance of minerals within your cat’s urine to support a healthy urinary tract… (etc.)
    `.trim(),
        price: 2400,
        status: 'Pending',
        submissionDate: '4/8/2024',
        storeName: 'Paw Care',
        category: 'Cat Food',
    },

    // you can add more entries here for id '43', '42', ...
};



// src/lib/mockBuyerData.ts

export interface BuyerRow {
    id: string;
    name: string;
    email: string;
    phone: string;
    signupDate: string;
    totalOrders: number;
    totalSpent: number;
    activeComplaints: number;
}

export const buyerRows: BuyerRow[] = [
    { id: '#40', name: 'Sarah Khan', email: 'sarah@treatshub.com', phone: '+92 300 1234567', signupDate: '4/8/2024', totalOrders: 25, totalSpent: 115_000, activeComplaints: 2 },
    { id: '#39', name: 'Ali Raza', email: 'ali@furrybites.com', phone: '+92 301 5007890', signupDate: '4/8/2024', totalOrders: 40, totalSpent: 30_000, activeComplaints: 0 },
    { id: '#38', name: 'Ayesha Malik', email: 'ayesha@pawfect.com', phone: '+92 302 1300456', signupDate: '4/8/2024', totalOrders: 3, totalSpent: 520_000, activeComplaints: 0 },
    { id: '#37', name: 'Bilal Ahmed', email: 'bilal@gmail.com', phone: '+92 303 4567890', signupDate: '4/8/2024', totalOrders: 15, totalSpent: 75_000, activeComplaints: 1 },
    { id: '#36', name: 'Fatima Hassan', email: 'fatima@yahoo.com', phone: '+92 304 7891234', signupDate: '4/7/2024', totalOrders: 8, totalSpent: 45_000, activeComplaints: 0 },
    { id: '#35', name: 'Usman Ali', email: 'usman@hotmail.com', phone: '+92 305 2345678', signupDate: '4/7/2024', totalOrders: 20, totalSpent: 95_000, activeComplaints: 1 },
    { id: '#34', name: 'Zara Sheikh', email: 'zara@gmail.com', phone: '+92 306 3456789', signupDate: '4/7/2024', totalOrders: 12, totalSpent: 65_000, activeComplaints: 0 },
    { id: '#33', name: 'Hassan Khan', email: 'hassan@yahoo.com', phone: '+92 307 4567890', signupDate: '4/6/2024', totalOrders: 30, totalSpent: 150_000, activeComplaints: 2 },
    { id: '#32', name: 'Sadia Amir', email: 'sadia@gmail.com', phone: '+92 308 5678901', signupDate: '4/6/2024', totalOrders: 5, totalSpent: 25_000, activeComplaints: 0 },
    { id: '#31', name: 'Imran Shah', email: 'imran@hotmail.com', phone: '+92 309 6789012', signupDate: '4/6/2024', totalOrders: 18, totalSpent: 85_000, activeComplaints: 1 },
    { id: '#30', name: 'Nadia Qureshi', email: 'nadia@gmail.com', phone: '+92 310 7890123', signupDate: '4/5/2024', totalOrders: 22, totalSpent: 110_000, activeComplaints: 0 },
    { id: '#29', name: 'Omar Farooq', email: 'omar@yahoo.com', phone: '+92 311 8901234', signupDate: '4/5/2024', totalOrders: 7, totalSpent: 35_000, activeComplaints: 0 },
    { id: '#28', name: 'Amna Saleem', email: 'amna@gmail.com', phone: '+92 312 9012345', signupDate: '4/5/2024', totalOrders: 14, totalSpent: 70_000, activeComplaints: 1 },
    { id: '#27', name: 'Kamran Ahmed', email: 'kamran@hotmail.com', phone: '+92 313 0123456', signupDate: '4/4/2024', totalOrders: 28, totalSpent: 140_000, activeComplaints: 2 },
    { id: '#26', name: 'Saima Malik', email: 'saima@gmail.com', phone: '+92 314 1234567', signupDate: '4/4/2024', totalOrders: 10, totalSpent: 50_000, activeComplaints: 0 },
    { id: '#25', name: 'Rizwan Shah', email: 'rizwan@yahoo.com', phone: '+92 315 2345678', signupDate: '4/4/2024', totalOrders: 16, totalSpent: 80_000, activeComplaints: 1 },
    { id: '#24', name: 'Hina Abbas', email: 'hina@gmail.com', phone: '+92 316 3456789', signupDate: '4/3/2024', totalOrders: 9, totalSpent: 45_000, activeComplaints: 0 },
    { id: '#23', name: 'Asad Khan', email: 'asad@hotmail.com', phone: '+92 317 4567890', signupDate: '4/3/2024', totalOrders: 35, totalSpent: 175_000, activeComplaints: 2 },
    { id: '#22', name: 'Mehwish Ali', email: 'mehwish@gmail.com', phone: '+92 318 5678901', signupDate: '4/3/2024', totalOrders: 6, totalSpent: 30_000, activeComplaints: 0 },
    { id: '#21', name: 'Faisal Malik', email: 'faisal@yahoo.com', phone: '+92 319 6789012', signupDate: '4/2/2024', totalOrders: 24, totalSpent: 120_000, activeComplaints: 1 }
];

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
export interface OrderHistoryRow {
    id: string;
    product: string;
    category: string;
    quantity: number;
    storeName: string;
    price: number;
    date: string;
    status: OrderStatus;
}

export type ComplaintStatus = 'Pending' | 'Refund' | 'Completed';
export interface ComplaintRow {
    id: string;
    date: string;
    product: string;
    store: string;
    orderId: string;
    issue: string;
    status: ComplaintStatus;
}

export interface BuyerDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    signupDate: string;
    status: 'Active' | 'Suspended';
    orders: OrderHistoryRow[];
    complaints: ComplaintRow[];
}

export const buyerDetails: Record<string, BuyerDetail> = {
    '#40': {
        id: '#40',
        name: 'Sarah Khan',
        email: 'sarah@treatshub.com',
        phone: '+92 300 1234567',
        signupDate: '4/8/2024',
        status: 'Active',
        orders: [
            { id: '#6548', product: 'Nutragold Cat 5kg', category: 'Cat Food', quantity: 1, storeName: 'Pet Care', price: 4200, date: '4/8/2024', status: 'Delivered' },
            { id: '#6547', product: 'Dog collar…', category: 'Dog Essentials', quantity: 1, storeName: 'Paws & Claws', price: 1200, date: '4/8/2024', status: 'Cancelled' },
            { id: '#6546', product: 'Diamond dry…', category: 'Dog Food', quantity: 3, storeName: 'Pawfect Delights', price: 3200, date: '4/8/2024', status: 'Confirmed' }
        ],
        complaints: [
            { id: 'C034', date: '4/8/2024', product: 'Nutragold Cat 5kg', store: 'Pet Care', orderId: 'O2876', issue: 'Received Wrong Order', status: 'Pending' }
        ]
    },
    '#39': {
        id: '#39',
        name: 'Ali Raza',
        email: 'ali@furrybites.com',
        phone: '+92 301 5007890',
        signupDate: '4/8/2024',
        status: 'Active',
        orders: [
            { id: '#6545', product: 'Pet Grooming Kit', category: 'Pet Care', quantity: 1, storeName: 'Pet Haven', price: 2500, date: '4/8/2024', status: 'Shipped' }
        ],
        complaints: []
    }
};


// src/lib/mockOrderData.ts



// src/lib/mockSalesAnalyticsData.ts

export interface MonthlySales {
    month: string;
    sales: number;
}

export const monthlySales: MonthlySales[] = [
    { month: 'Jan', sales: 60_000 },
    { month: 'Feb', sales: 50_000 },
    { month: 'Mar', sales: 90_000 },
    { month: 'Apr', sales: 40_000 },
    { month: 'May', sales: 65_000 },
    { month: 'Jun', sales: 50_000 },
    { month: 'Jul', sales: 95_000 },
    { month: 'Aug', sales: 45_000 },
    { month: 'Sep', sales: 20_000 },
    { month: 'Oct', sales: 10_000 },
    { month: 'Nov', sales: 90_000 },
    { month: 'Dec', sales: 50_000 },
];

export interface TopStore {
    name: string;
    totalSales: number;
}

export const topStores: TopStore[] = [
    { name: 'Furry Bites', totalSales: 254_000 },
    { name: 'Meow & Munch', totalSales: 204_000 },
    { name: 'Canine Crunchers', totalSales: 204_000 },
    { name: 'PetFeast', totalSales: 204_000 },
    { name: 'TailTreats', totalSales: 204_000 },
    { name: 'Bark & Bite', totalSales: 204_000 },
    { name: 'Kitty Comforts', totalSales: 204_000 },
];

export interface CategoryShare {
    name: string;
    value: number;
    color: string;
}

export const categoryShare: CategoryShare[] = [
    { name: 'Pet Food', value: 1_500_000, color: '#A259FF' },
    { name: 'Toys & Entertainment', value: 900_000, color: '#FF5411' },
    { name: 'Grooming & Hygiene', value: 700_000, color: '#0088FE' },
    { name: 'Beds & Accessories', value: 600_000, color: '#A4F9C8' },
    { name: 'Healthcare & Supplements', value: 505_000, color: '#F9C80E' },
];




// src/lib/mockAdminTransactions.ts

export interface AdminTransaction {
    id: string;
    product: string;
    category: string;
    quantity: number;
    store: string;
    price: number;
    date: string;
    status: 'Pending' | 'Cancelled' | 'Confirmed' | 'Delivered' | 'Shipped' | 'Completed';
  
}

export const adminTransactions: AdminTransaction[] = [
    {
        id: '#6548',
        product: 'Nutragold Cat 5kg',
        category: 'Cat Food',
        quantity: 1,
        store: 'Pet Treats Hub',
        price: 4200,
        date: '4/8/2024',
        status: 'Pending',
       
    },
    {
        id: '#6547',
        product: 'Dog collar in multiple size / adjustable',
        category: 'Dog Essentials',
        quantity: 1,
        store: 'Furry Bites',
        price: 1200,
        date: '4/8/2024',
        status: 'Cancelled',
       
    },
    {
        id: '#6546',
        product: 'Diamond care dry Dog Food',
        category: 'Dog Food',
        quantity: 3,
        store: 'Pawfect Delights',
        price: 3200,
        date: '4/8/2024',
        status: 'Confirmed',
       
    },
    {
        id: '#6545',
        product: 'Dog House',
        category: 'Dog Essentials',
        quantity: 2,
        store: 'Meow & Munch',
        price: 6000,
        date: '4/8/2024',
        status: 'Delivered',
       
    },
    {
        id: '#6544',
        product: 'Nutragold Cat 5kg',
        category: 'Cat Food',
        quantity: 1,
        store: 'Canine Crunchers',
        price: 4200,
        date: '4/8/2024',
        status: 'Completed',
      
    },
    {
        id: '#6543',
        product: 'Pet Grooming Kit',
        category: 'Pet Care',
        quantity: 1,
        store: 'TailTreats',
        price: 2500,
        date: '4/8/2024',
        status: 'Pending',
        
    },
    {
        id: '#6542',
        product: 'Dog Leash',
        category: 'Dog Essentials',
        quantity: 2,
        store: 'Bark & Bite',
        price: 800,
        date: '4/8/2024',
        status: 'Confirmed',
      
    },
    {
        id: '#6541',
        product: 'Cat Litter Box',
        category: 'Cat Essentials',
        quantity: 1,
        store: 'Kitty Comforts',
        price: 1500,
        date: '4/8/2024',
        status: 'Cancelled',
      
    },
    {
        id: '#6540',
        product: 'Cat Scratching Post',
        category: 'Cat Essentials',
        quantity: 1,
        store: 'Pet Haven',
        price: 1800,
        date: '4/8/2024',
        status: 'Completed',
       
    },
    {
        id: '#6539',
        product: 'Dog Food Bowl',
        category: 'Dog Essentials',
        quantity: 2,
        store: 'Paws & Claws',
        price: 600,
        date: '4/8/2024',
        status: 'Delivered',
     
    },
    {
        id: '#6538',
        product: 'Cat Toy Set',
        category: 'Cat Toys',
        quantity: 1,
        store: 'Pet Treats Hub',
        price: 900,
        date: '4/8/2024',
        status: 'Shipped',
   
    },
    {
        id: '#6537',
        product: 'Dog Training Pads',
        category: 'Dog Essentials',
        quantity: 1,
        store: 'Furry Bites',
        price: 1500,
        date: '4/8/2024',
        status: 'Completed',
      
    },
];


// src/lib/mockAdminComplaints.ts




export interface AdminComplaint {
    id: string;               // e.g. "C034"
    customerId: string;       // e.g. "C00334"
    date: string;             // "4/8/2024"
    product: string;          // "Nutragold Cat 5kg"
    store: string;            // "PetZone"
    orderId: string;          // "O2876"
    issue: string;            // "Received Wrong Order"
    status: 'Pending' | 'Refund' | 'Completed';
    // below fields only for detail page:
    description: string;
    images: string[];
    filedBy: string;          // buyer name + id/email
    against: string;          // store name + store id
    dateFiled: string;        // e.g. "March 21, 2025"
    orderDate: string;        // e.g. "March 20, 2025"
    price: number;            // order price
    storeBalance: number;     // only for refund dialog
}

export const adminComplaints: AdminComplaint[] = [
    {
        id: 'C034',
        customerId: 'C00334',
        date: '4/8/2024',
        product: 'Nutragold Cat 5kg',
        store: 'PetZone',
        orderId: 'O2876',
        issue: 'Received Wrong Order',
        status: 'Pending',
        description:
            "I received the wrong product variant, and the seller is not responding. I had ordered beef, but received chicken instead…",
        images: [
            '/seller/dashboard/petCard.png',
            '/seller/dashboard/petCard.png',
            '/seller/dashboard/petCard.png',
            '/seller/dashboard/petCard.png',
        ],
        filedBy: 'John Doe (C00334/john@example.com)',
        against: 'PetZone (#23)',
        dateFiled: 'March 21, 2025',
        orderDate: 'March 20, 2025',
        price: 4300,
        storeBalance: 23000,
    },
    // …add more detail entries here, keyed by id…
];
