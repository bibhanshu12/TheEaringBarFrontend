// Product Types
export interface ProductColor {
    id: string;
    name:string;
    productId: string;
    colorId: string;
    stock: number;
    color?: Color; // Add this to match the backend response
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    colorIds: string[];
    stock: number;
    images: FileList | null;
    offerId?: string;
  }
  
  export interface ProductFormProps {
    initialValues?: Partial<ProductFormData>;
    onSubmit: (formData: FormData) => Promise<{ data?: { id: string } }>;
    categories: Category[];
    offers: Offer[];
    isLoading: boolean;
    onCancel: () => void;
  }
  
  export interface Offer {
    id: string;
    code: string;
    title: string;
    description: string;
    discountValue: number;
    discountType: 'PERCENTAGE' | 'FIXED';
    minOrder: number;
    maxDiscount: number;
    startDate: string;
    endDate: string;
    useCount: number;
    usageLimit: number;
    status: OfferStatus;
    visibility: 'PUBLIC' | 'PRIVATE';
    createdAt: string;
    updatedAt: string;
    products?: Product[];
  }
  
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    colors?: ProductColor[];
    images: Array<{
      id: string;
      imageUrl: string;
      publicId: string;
      isDefault: boolean;
    }>;
    categories: Array<{
      id: string;
      categoryId: number;
      category?: {
        id: number;
        name: string;
      };
    }>;
    offers?: Array<{
      id: string;
      code: string;
      discountType: 'FIXED' | 'PERCENTAGE';
      discountValue: number;
    }>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface OfferWithProducts extends Offer {
    products?: Product[];
  }
  
  export interface ApiResponse<T> {
    data: T;
    page?: number;
    limit?: number;
    message?: string;
  }
  // Category Types
  export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CategoryFormData {
    name: string;
    description?: string;
  }
  
  // Color Types
  export interface Color {
    id: string;
    name: string;
    hexCode: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ColorFormData {
    name: string;
    hexCode: string;
  }
  
  // Offer Types
  export type OfferStatus = 'ACTIVE' | 'ARCHIVED' | 'EXPIRED' | 'INACTIVE';
  export type OfferVisibility = 'PUBLIC' | 'PRIVATE';
  export type DiscountType = 'PERCENTAGE' | 'FIXED';
  
  export interface OfferProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface DetailedOffer {
    id: string;
    code: string;
    title: string;
    description: string;
    discountValue: number;
    discountType: 'FIXED' | 'PERCENTAGE';
    minOrder: number;
    maxDiscount: number;
    startDate: string;
    endDate: string;
    useCount: number;
    usageLimit: number;
    status: 'ACTIVE' | 'INACTIVE';
    visibility: 'PUBLIC' | 'PRIVATE';
    createdAt: string;
    updatedAt: string;
    products: OfferProduct[];
  }
  
  export interface OfferResponse {
    msg: string;
    data: DetailedOffer[];
    total: number;
  }
  
  export interface OfferFormData {
    code: string;
    title: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minOrder: number;
    maxDiscount: number;
    startDate: string;
    endDate: string;
    usageLimit: number;
    visibility: OfferVisibility;
    status: OfferStatus;
  }
  
  export interface OfferEditData {
    id: string;
    code: string;
    title: string;
    discountType: DiscountType;
    discountValue: number;
    endDate: string;
    status: OfferStatus;
  }
  
  export interface ApiError {
    data?: {
      message: string;
    };
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  // Auth Types
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }
  
  export interface LoginResponse {
    msg: string;
    user: User;
    token: string;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  