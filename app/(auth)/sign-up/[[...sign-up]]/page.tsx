import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <main className="py-12 min-h-screen w-full flex justify-center items-center">
            <SignUp />
        </main>
    )
}

export default SignUpPage
