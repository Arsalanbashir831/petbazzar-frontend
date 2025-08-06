'use client';

import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// import { API_ROUTES } from '@/constants/apiRoutes';
// import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { toast } from 'sonner';

// import apiCaller from '@/config/apiCaller';
export function OAuthButtons() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleGoogleSignIn = async (response: any) => {
  //   try {
  //     const googleToken = response.credential;

  //     const apiResponse = await apiCaller(
  //       API_ROUTES.AUTH.GOOGLE_LOGIN,
  //       'POST',
  //       { id_token: googleToken },
  //       {},
  //       false,
  //       'json'
  //     );

  //     if (apiResponse.status === 200) {
  //       const { access, refresh } = apiResponse.data;
  //       localStorage.setItem('accessToken', access);
  //       localStorage.setItem('refreshToken', refresh);

  //       toast.success('Google sign-in successful');
  //     }
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       toast.error(
  //         error.response.data?.message ||
  //           'An error occurred during Google sign-in'
  //       );
  //     } else {
  //       toast.error('A network error occurred. Please try again.');
  //     }
  //   }
  // };

  return (
    <div className="flex justify-center items-center">
      {/* <GoogleLogin
        onSuccess={handleGoogleSignIn}
        onError={() => toast.error('An error occurred during Google sign-in')}
      /> */}
      <Button
        variant="outline"
        className="flex w-full h-10 items-center justify-center gap-2 bg-[#ffe2cc] rounded-lg hover:bg-[#ffe2cc]/90 text-[#545454]"
        onClick={() => router.push(ROUTES.SELLER.DASHBOARD)}
      >
        Google
      </Button>
    </div>
  );
}
