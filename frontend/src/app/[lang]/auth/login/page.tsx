import ThemeSwitcher from '@/components/theme/change-theme'
import { Button } from '@/components/ui/button'
import { getDictionary, Locale } from '@/i18n';


interface Props {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ oauthError?: string }>;
}


const LoginPage = async ({params, searchParams}: Props) => {
  const lang = (await params).lang;
  const oauthError = (await searchParams).oauthError
  const dictionary = await getDictionary(lang);

  return (
    <div className=' h-screen'>
        dictionary : {dictionary.auth.login.page.title}
      <Button>Hello Rwanda</Button>
      <ThemeSwitcher />
      <button className=' btn btn-primary'>Hello Button</button>

      <div>
        error :{oauthError}
      </div>
    </div>
  )
}

export default LoginPage


