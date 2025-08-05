# Authentication Layout System

This directory contains reusable components for creating consistent authentication pages with a professional layout.

## Components

### AuthLayout
The main layout component that provides a two-column design:
- **Left side**: Form content area
- **Right side**: Image with gradient background, logo, and tagline

#### Props
- `children`: React.ReactNode - The form content to display
- `imageSrc`: string (optional) - Path to the image to display on the right side
- `imageAlt`: string (optional) - Alt text for the image
- `tagline`: string (optional) - Tagline text to display on the right side
- `showLogo`: boolean (optional) - Whether to show the logo on the right side

#### Default Values
- `imageSrc`: "/seller/shop.png"
- `imageAlt`: "Authentication illustration"
- `tagline`: "Let's sell to thousands of pet lovers at one place"
- `showLogo`: true

### AuthFormWrapper
A wrapper component that provides consistent styling for form content.

#### Props
- `children`: React.ReactNode - The form content
- `className`: string (optional) - Additional CSS classes

## Usage Examples

### Basic Login Form
```tsx
import AuthLayout from '@/app/(auth)/layout'
import AuthFormWrapper from '@/components/auth/AuthFormWrapper'

export default function LoginPage() {
    return (
        <AuthLayout>
            <AuthFormWrapper>
                <h2 className="text-2xl font-bold">Login</h2>
                {/* Your form content here */}
            </AuthFormWrapper>
        </AuthLayout>
    )
}
```

### Customized Signup Form
```tsx
import AuthLayout from '@/app/(auth)/layout'

export default function SignupPage() {
    return (
        <AuthLayout
            imageSrc="/seller/laptop.png"
            tagline="Join thousands of successful pet sellers"
            showLogo={true}
        >
            {/* Your form content here */}
        </AuthLayout>
    )
}
```

### Password Reset Form (No Logo)
```tsx
import AuthLayout from '@/app/(auth)/layout'

export default function PasswordResetPage() {
    return (
        <AuthLayout
            imageSrc="/seller/paw.png"
            tagline="We'll help you get back to selling"
            showLogo={false}
        >
            {/* Your form content here */}
        </AuthLayout>
    )
}
```

## Features

- **Responsive Design**: Right side is hidden on mobile devices
- **Customizable**: Different images, taglines, and logo visibility
- **Consistent Styling**: Professional gradient background and rounded corners
- **Reusable**: Can be used for login, signup, password reset, and other auth flows
- **TypeScript Support**: Full type safety with interfaces

## File Structure
```
src/
├── app/
│   └── (auth)/
│       ├── layout.tsx          # Main AuthLayout component
│       ├── (login)/
│       │   └── page.tsx        # Login page using AuthLayout
│       └── signup/
│           └── page.tsx        # Signup page using AuthLayout
└── components/
    └── auth/
        ├── AuthFormWrapper.tsx # Form wrapper component
        ├── AuthLayoutExample.tsx # Usage examples
        └── README.md           # This documentation
``` 