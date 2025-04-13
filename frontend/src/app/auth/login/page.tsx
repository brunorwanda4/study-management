import ThemeSwitcher from '@/components/theme/change-theme'
import { Button } from '@/components/ui/button'
import React from 'react'

const LoginPage = () => {
  return (
    <div className=' h-screen'>
      login page
      <Button>Hello Rwanda</Button>
      <ThemeSwitcher />
      <button className=' btn btn-primary'>Hello Button</button>
    </div>
  )
}

export default LoginPage


